"use client";

import * as React from "react";
import Image from "next/image";
import styles from "./works-wheel.module.css";

export interface WorksWheelItem {
  title: string;
  image: string;
  href?: string;
  slug?: string;
}

export interface WorksWheelProps extends Omit<React.ComponentPropsWithoutRef<"section">, "children"> {
  items: WorksWheelItem[];
  label?: string;
  logoSrc?: string;
}

const clamp = (value: number, low: number, high: number) => Math.min(high, Math.max(low, value));
const rad = (degrees: number) => degrees * Math.PI / 180;
const reducedQuery = "(prefers-reduced-motion: reduce)";
const readReduced = () => window.matchMedia(reducedQuery).matches;
const serverReduced = () => true;
function subscribeReduced(callback: () => void) {
  const query = window.matchMedia(reducedQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

// Original ring-to-drum movement, fitted to the supplied square project artwork.
function place(ringDegrees: number, drumDegrees: number, ringRadius: number, drumRadius: number, bow: number, morph: number) {
  return `translateX(${-morph * bow * (1 - Math.cos(rad(drumDegrees)))}px)` +
    ` rotateZ(${(1 - morph) * ringDegrees}deg) translateY(${-(1 - morph) * ringRadius}px)` +
    ` rotateX(${morph * drumDegrees}deg) translateZ(${morph * drumRadius}px)`;
}

export function WorksWheel({ items, label = "Wordcom", logoSrc, className, ...props }: WorksWheelProps) {
  const root = React.useRef<HTMLElement>(null);
  const pinnedRef = React.useRef<HTMLDivElement>(null);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const wheelRef = React.useRef<HTMLOListElement>(null);
  const labelRef = React.useRef<HTMLDivElement>(null);
  const cards = React.useRef<(HTMLLIElement | null)[]>([]);
  const turn = React.useRef(0);
  const target = React.useRef(0);
  const drawRef = React.useRef<() => void>(() => {});
  const seekRef = React.useRef<(next: number, immediate?: boolean) => void>(() => {});
  const [active, setActive] = React.useState(0);
  const activeRef = React.useRef(0);
  const [stage, setStage] = React.useState({ w: 0, h: 0 });
  const reduced = React.useSyncExternalStore(subscribeReduced, readReduced, serverReduced);
  const count = items.length;
  const last = Math.max(0, count - 1);
  const enhanced = !reduced && count > 1;

  React.useEffect(() => {
    const element = stageRef.current;
    if (!element) return;
    const observer = new ResizeObserver(() => {
      setStage(previous => previous.w === element.clientWidth && previous.h === element.clientHeight
        ? previous : { w: element.clientWidth, h: element.clientHeight });
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const metrics = React.useMemo(() => {
    const compact = stage.w <= 700 || stage.h < 340;
    /* No celular os cards sairam ilegiveis: 162px de largura num aparelho de
       375px, ou seja, 43% da tela, para uma arte que e um banner com texto.
       Tres coisas disputavam o espaco — o card, o raio da roda e o logo
       central — e o logo levava 112px do miolo.

       Medido e ajustado no aparelho, nao calculado: o logo encolheu, o card
       cresceu e o raio diminuiu um pouco para o card caber sem sair da tela.
       As proporcoes de desktop ficaram intactas. */
    const cardW = Math.min(stage.h * (compact ? 0.50 : 0.38), stage.w * (compact ? 0.88 : 0.78), 600);
    const cardH = cardW;
    const ringR = compact ? Math.min(stage.w * 0.30, stage.h * 0.26) : Math.min(cardH * 1.14, stage.w * 0.25);
    const logoSize = compact ? Math.min(84, stage.w * 0.22, stage.h * 0.16, ringR * 0.8) : 200;
    const ringScale = count ? clamp(((2 * Math.PI * ringR / count) * 0.82) / (cardW || 1), 0.16, 0.72) : 1;
    // Keep the ring inside the viewport and leave clear space around the central logo.
    const fittedScale = compact ? Math.max(0.1, Math.min(ringScale,
      (stage.w / 2 - 12 - ringR * Math.sin(rad(120))) / (0.683 * (cardW || 1)),
      (ringR - logoSize / 2 - 12) * 2 / (cardH || 1))) : ringScale;
    return {
      cardW, cardH, ringR, logoSize,
      drumR: cardH * (compact ? 1.55 : 2.22), bow: cardH * (compact ? 0.6 : 1.82), depth: cardH * (compact ? 3.4 : 2.7),
      ringScale: fittedScale,
    };
  }, [stage, count]);

  const to = React.useCallback((next: number) => {
    seekRef.current(next);
  }, []);

  React.useEffect(() => {
    const region = root.current;
    if (!region || !enhanced || !stage.w) return;
    let frame = 0;
    let visible = true;
    let previousTime = 0;
    let disposed = false;

    function requestDraw() {
      if (!disposed && !frame && visible && !document.hidden) frame = requestAnimationFrame(draw);
    }

    function draw(time: number) {
      frame = 0;
      if (disposed || !visible || document.hidden) return;
      const delta = previousTime ? Math.min(time - previousTime, 64) : 16.67;
      previousTime = time;
      const gap = target.current - turn.current;
      turn.current = Math.abs(gap) < 0.0005 ? target.current : turn.current + gap * (1 - Math.pow(0.88, delta / 16.67));
      const value = turn.current;
      const morph = clamp(value, 0, 1);
      const position = Math.max(0, value - 1);
      if (wheelRef.current) wheelRef.current.style.transform = `translateZ(${-morph * metrics.drumR}px)`;
      cards.current.forEach((card, index) => {
        if (!card) return;
        const distance = index - position;
        const culled = morph > 0.5 && Math.abs(distance) > 1.6;
        card.style.transform = place(distance * (360 / count), distance * 40, metrics.ringR, metrics.drumR, metrics.bow, morph);
        card.style.opacity = culled ? "0" : "1";
        card.style.pointerEvents = culled ? "none" : "auto";
        card.style.zIndex = String(Math.round(100 - Math.abs(distance) * 2));
        const face = card.firstElementChild as HTMLElement | null;
        if (face) {
          face.style.transform = `scale(${metrics.ringScale + (1 - metrics.ringScale) * morph})`;
          if (face.tagName === "A") face.tabIndex = culled ? -1 : 0;
        }
      });
      if (labelRef.current) labelRef.current.style.opacity = String(1 - morph);
      region!.dataset.wheelTurn = value.toFixed(3);
      const next = clamp(Math.round(position), 0, last);
      if (next !== activeRef.current) {
        activeRef.current = next;
        setActive(next);
      }
      if (Math.abs(target.current - value) > 0.0001) requestDraw();
    }

    drawRef.current = requestDraw;
    const observer = new IntersectionObserver(entries => {
      visible = entries[0]?.isIntersecting ?? false;
      if (visible) { previousTime = 0; requestDraw(); }
      else { cancelAnimationFrame(frame); frame = 0; }
    });
    observer.observe(region);
    const onVisibility = () => { previousTime = 0; requestDraw(); };
    document.addEventListener("visibilitychange", onVisibility);
    requestDraw();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      drawRef.current = () => {};
    };
  }, [enhanced, metrics, count, last, stage.w]);

  React.useEffect(() => {
    const element = root.current;
    const pinned = pinnedRef.current;
    if (!element || !pinned || !enhanced) return;
    let start = 0;
    let travel = 1;
    let refreshFrame = 0;
    let disposed = false;
    function update() {
      const next = clamp((window.scrollY - start) / travel, 0, 1) * count;
      if (next !== target.current) {
        target.current = next;
        drawRef.current();
      }
    }
    function refresh() {
      refreshFrame = 0;
      if (disposed) return;
      start = element!.getBoundingClientRect().top + window.scrollY;
      travel = Math.max(1, element!.offsetHeight - pinned!.offsetHeight);
      update();
    }
    function scheduleRefresh() {
      if (!refreshFrame && !disposed) refreshFrame = requestAnimationFrame(refresh);
    }
    seekRef.current = (next, immediate = false) => {
      const destination = clamp(next, 0, count);
      if (immediate) {
        turn.current = destination;
        target.current = destination;
        drawRef.current();
      }
      window.scrollTo({ top: start + travel * destination / count, behavior: immediate ? "instant" : "smooth" });
    };
    const observer = new ResizeObserver(scheduleRefresh);
    observer.observe(document.body);
    observer.observe(pinned);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", scheduleRefresh);
    document.fonts.ready.then(scheduleRefresh);
    refresh();
    return () => {
      disposed = true;
      cancelAnimationFrame(refreshFrame);
      observer.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", scheduleRefresh);
      seekRef.current = () => {};
    };
  }, [enhanced, count]);

  if (!count) return null;

  return <section ref={root} className={`${styles.region} ${className ?? ""}`} aria-label="Plataformas próprias da Wordcom" data-works-wheel data-enhanced={enhanced} data-active-index={active} style={{ "--wheel-travel": `${count * 85}svh` } as React.CSSProperties} {...props}>
    <div ref={pinnedRef} className={styles.pinned} data-wheel-pinned>
    <div ref={stageRef} className={styles.stage} tabIndex={enhanced ? 0 : undefined} role="group" aria-label="Selecionar plataforma"
      style={enhanced ? { perspective: `${metrics.depth}px` } : undefined}
      onKeyDown={event => {
        if (!enhanced) return;
        if (event.key === "ArrowDown" || event.key === "ArrowRight") seekRef.current(Math.round(target.current) + 1, true);
        else if (event.key === "ArrowUp" || event.key === "ArrowLeft") seekRef.current(Math.round(target.current) - 1, true);
        else if (event.key === "Home") seekRef.current(0, true);
        else if (event.key === "End") seekRef.current(last + 1, true);
        else return;
        event.preventDefault();
      }}>
      <ol ref={wheelRef} className={styles.wheel}>
        {items.map((item, index) => <li key={item.slug ?? item.title}
          ref={element => { cards.current[index] = element; }}
          className={`${styles.card} projectScrollCard`} data-wheel-index={index}
          style={enhanced ? { width: metrics.cardW, height: metrics.cardH, marginLeft: -metrics.cardW / 2, marginTop: -metrics.cardH / 2 } : undefined}>
          <a href={item.href} target="_blank" rel="noopener noreferrer" className={styles.face}
            tabIndex={enhanced ? undefined : 0}
            data-project={item.slug} aria-label={`Conhecer o projeto ${item.title} (abre em nova aba)`}
            onFocus={event => { if (enhanced && event.currentTarget.matches(":focus-visible")) seekRef.current(index + 1, true); }} draggable={false}>
            <span className={styles.artwork}>
            <Image src={item.image} alt={`Projeto ${index + 1}: ${item.title}`} width={1254} height={1254}
              sizes="(max-width: 700px) 78vw, 600px" draggable={false} />
            </span>
          </a>
        </li>)}
      </ol>
    {enhanced ? <>
      <div ref={labelRef} className={styles.label} aria-hidden="true">{logoSrc ? <Image src={logoSrc} alt="" width={200} height={200} style={{ width: metrics.logoSize, height: metrics.logoSize }} /> : label}</div>
      <ol className={styles.index} aria-label="Projetos">
        {items.map((item, index) => <li key={item.slug ?? item.title}>
          <button type="button" onClick={event => event.detail === 0 ? seekRef.current(index + 1, true) : to(index + 1)} aria-pressed={active === index}>{item.title}</button>
        </li>)}
      </ol>
    </> : null}
    </div>
    </div>
  </section>;
}

export default WorksWheel;
