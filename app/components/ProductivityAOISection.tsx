"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ProductivityAOISection.module.css";

const BEFORE = 4000;
const AFTER = 10000;
const MULTIPLIER = AFTER / (BEFORE / 7);
const DAILY_BEFORE = Math.round(BEFORE / 7);
const NET_IMPROVEMENT = AFTER - DAILY_BEFORE;

function CountUp({
  active,
  value,
  decimals = 0,
  duration = 2000,
  suffix = "",
}: {
  active: boolean;
  value: number;
  decimals?: number;
  duration?: number;
  suffix?: string;
}) {
  const [current, setCurrent] = useState(active ? 0 : value);

  useEffect(() => {
    if (!active) {
      setCurrent(value);
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) {
      setCurrent(value);
      return;
    }

    let frame = 0;
    const startedAt = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCurrent(parseFloat((value * eased).toFixed(decimals)));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    }

    setCurrent(0);
    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [active, value, decimals, duration]);

  if (decimals > 0) {
    return <>{current.toFixed(decimals)}{suffix}</>;
  }

  return <>{Math.round(current).toLocaleString()}{suffix}</>;
}

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export function ProductivityAOISection() {
  const { ref, inView } = useInView();

  return (
    <div ref={ref} className={styles.section}>
      <h2 className={styles.title}>Velocity</h2>

      <p className={styles.description}>
        My output has completely shifted since adopting AI coding assistants.
        Before AI, I shipped around 4,000 lines a week (manual coding). Now?
        Over 10,000 lines in a single day (AI workflow).
      </p>

      <figure
        className={styles.diffPanel}
        aria-labelledby="diff-caption"
        aria-describedby="diff-desc"
      >
        <figcaption id="diff-caption" className="sr-only">
          Productivity diff showing before and after AI adoption
        </figcaption>
        <span id="diff-desc" className="sr-only">
          Green lines show additions, red line shows removed values
        </span>

        <div className={styles.diffHeader}>
          <svg
            className={styles.diffHeaderIcon}
            viewBox="0 0 16 16"
            width="16"
            height="16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M1 3.5A2.5 2.5 0 0 1 3.5 1h9A2.5 2.5 0 0 1 15 3.5v9a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5v-9zM3.5 2a1.5 1.5 0 0 0-1.5 1.5v9a1.5 1.5 0 0 0 1.5 1.5h9a1.5 1.5 0 0 0 1.5-1.5v-9a1.5 1.5 0 0 0-1.5-1.5h-9z" />
            <path d="M5 5h6v1H5V5zm0 2.5h6v1H5V7.5zM5 10h6v1H5V10z" />
          </svg>
          <span className={styles.diffFilename}>productivity.diff</span>
          <span className={styles.diffBadge}>3 changes</span>
        </div>

        <div className={styles.diffLegend} aria-hidden="true">
          <span className={`${styles.diffLegendItem} ${styles.diffRemovedLegend}`}>
            <span className={styles.diffLegendIndicator}>−</span>
            Removed
          </span>
          <span className={`${styles.diffLegendItem} ${styles.diffAddedLegend}`}>
            <span className={styles.diffLegendIndicator}>+</span>
            Added
          </span>
        </div>

        <div className={styles.diffBody}>
          <div
            className={`${styles.diffRow} ${styles.diffRemoved}`}
            aria-label="Deleted line"
          >
            <span className={styles.diffIndicator}>−</span>
            <span className={styles.diffLineNum}>1</span>
            <span className={styles.diffCode}>
              weekly_output =&nbsp;
              {Math.round(BEFORE).toLocaleString()}
            </span>
            <span className={styles.diffSuffix}> lines/week (manual coding)</span>
          </div>

          <div className={`${styles.diffRow} ${styles.diffAdded}`} aria-label="Added line">
            <span className={styles.diffIndicator}>+</span>
            <span className={styles.diffLineNum}>2</span>
            <span className={styles.diffCode}>
              daily_output =&nbsp;
              <span className={styles.counterGlow}>
                <CountUp active={inView} value={AFTER} />
              </span>
            </span>
            <span className={styles.diffSuffix}> lines/day (AI workflow)</span>
          </div>

          <div className={`${styles.diffRow} ${styles.diffAdded}`} aria-label="Added line">
            <span className={styles.diffIndicator}>+</span>
            <span className={styles.diffLineNum}>3</span>
            <span className={styles.diffCode}>
              velocity_multiplier =&nbsp;
              <span className={styles.counterGlow}>
                <CountUp active={inView} value={parseFloat(MULTIPLIER.toFixed(1))} decimals={1} />
              </span>
              <span className={styles.diffSuffix}>×</span>
            </span>
          </div>

          <div className={styles.diffMath} aria-label="Calculation">
            <span className={styles.mathLabel}>Report:</span>
            <span className={styles.mathValue}>
              {AFTER.toLocaleString()} ÷ {(BEFORE / 7).toFixed(0).replace(/\.0$/, "")} =&nbsp;
              <strong>
                <CountUp
                  active={inView}
                  value={parseFloat(MULTIPLIER.toFixed(1))}
                  decimals={1}
                />
                × faster
              </strong>
            </span>
            <span className={styles.mathComment}>
              // net improvement: +{NET_IMPROVEMENT.toLocaleString()} lines per day
            </span>
          </div>
        </div>
      </figure>
    </div>
  );
}
