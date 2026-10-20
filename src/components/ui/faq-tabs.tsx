"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useId, useRef, useState } from "react";
import styles from "./faq-tabs.module.css";
import { ShinyButton } from "./shiny-button";

export type FAQCategory = {
  id: string;
  label: string;
  questions: { question: string; answer: string }[];
};

const AnimatedAccordionItem = motion.create(Accordion.Item);

export function FAQ({ categories }: { categories: FAQCategory[] }) {
  const [selected, setSelected] = useState(0);
  const [openQuestion, setOpenQuestion] = useState("");
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const root = useRef<HTMLDivElement>(null);
  const inView = useInView(root, { once: true, amount: 0.1 });
  const reduced = useReducedMotion();

  return (
    <div ref={root} className={styles.faq}>
      <div className={styles.tabs} role="tablist" aria-label="Sobre a WordCom">
        {categories.map((category, index) => (
          <ShinyButton
            key={category.id}
            label={category.label}
            ref={(node) => { tabs.current[index] = node; }}
            type="button"
            role="tab"
            id={`${id}-tab-${category.id}`}
            aria-controls={`${id}-panel-${category.id}`}
            aria-selected={selected === index}
            tabIndex={selected === index ? 0 : -1}
            onClick={() => {
              if (selected !== index) setOpenQuestion("");
              setSelected(index);
            }}
            onKeyDown={(event) => {
              const destinations: Record<string, number> = {
                ArrowRight: (index + 1) % categories.length,
                ArrowLeft: (index - 1 + categories.length) % categories.length,
                Home: 0,
                End: categories.length - 1,
              };
              const next = destinations[event.key];
              if (next === undefined) return;
              event.preventDefault();
              setOpenQuestion("");
              setSelected(next);
              tabs.current[next]?.focus();
            }}
          />
        ))}
      </div>
      {categories.map((category, index) => (
        <div
          key={category.id}
          role="tabpanel"
          id={`${id}-panel-${category.id}`}
          aria-labelledby={`${id}-tab-${category.id}`}
          hidden={selected !== index}
          tabIndex={0}
          className={styles.panel}
        >
          {selected === index && (
            <div>
              <Accordion.Root
                type="single"
                collapsible
                value={openQuestion}
                onValueChange={setOpenQuestion}
                className={styles.list}
              >
                {category.questions.map((faq, questionIndex) => (
                  <AnimatedAccordionItem
                    key={faq.question}
                    value={String(questionIndex)}
                    className={styles.item}
                    data-faq-entrance
                    initial={reduced ? false : { opacity: 0, transform: "translateY(24px)" }}
                    animate={inView || reduced
                      ? { opacity: 1, transform: "translateY(0px)" }
                      : { opacity: 0, transform: "translateY(24px)" }}
                    transition={{
                      duration: reduced ? 0 : 0.85,
                      delay: reduced || !inView ? 0 : questionIndex * 0.3,
                      ease: [0.33, 1, 0.68, 1],
                    }}
                  >
                    <Accordion.Header className={styles.header}>
                      <Accordion.Trigger className={styles.trigger}>
                        <span>{faq.question}</span>
                        <Plus size={20} className={styles.icon} aria-hidden="true" />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content
                      forceMount
                      aria-hidden={openQuestion !== String(questionIndex)}
                    >
                      <div
                        className={styles.answer}
                        data-state={openQuestion === String(questionIndex) ? "open" : "closed"}
                      >
                        <div className={styles.answerInner}>
                          <p>{faq.answer}</p>
                        </div>
                      </div>
                    </Accordion.Content>
                  </AnimatedAccordionItem>
                ))}
              </Accordion.Root>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
