import { Children, type CSSProperties, type ReactNode } from "react";
import styles from "./scroll-cards.module.css";

type CardsParallaxProps = {
  children: ReactNode;
  className?: string;
  itemClassName?: string;
  label: string;
};

export function CardsParallax({
  children,
  className = "",
  itemClassName = "",
  label,
}: CardsParallaxProps) {
  return (
    <ol className={`${styles.list} ${className}`} aria-label={label} data-scroll-cards>
      {Children.map(children, (child, index) => (
        <li
          className={`${styles.item} ${itemClassName}`}
          style={{ "--scroll-card-index": index + 1 } as CSSProperties}
          tabIndex={0}
        >
          {child}
        </li>
      ))}
    </ol>
  );
}
