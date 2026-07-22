"use client";

import { useEffect, useState } from "react";
import { Confetti } from "@/app/components/Confetti";
import { ScoreRing } from "@/app/components/ScoreRing";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/app/components/ui/collapsible";
import styles from "./PerformanceAnalytics.module.css";

const categoryScores = [
  { label: "Performance", value: 100 },
  { label: "Accessibility", value: 100 },
  { label: "Best Practices", value: 100 },
  { label: "SEO", value: 100 },
];

const metrics = [
  { label: "First Contentful Paint", value: "0.2 s" },
  { label: "Largest Contentful Paint", value: "0.2 s" },
  { label: "Total Blocking Time", value: "0 ms" },
  { label: "Cumulative Layout Shift", value: "0" },
  { label: "Speed Index", value: "0.2 s" },
];

/**
 * Metric labels around the big ring, clockwise, sitting between the breaks.
 *
 * The breaks themselves are at 0° — the star points, the first at 12 o'clock,
 * which is where the sweep starts. A break there means the arc begins in a gap
 * instead of cutting off mid-segment.
 */
const RING_LABELS = ["SI", "FCP", "LCP", "TBT", "CLS"];
const RING_LABEL_OFFSET = -36;
const RING_BREAK_OFFSET = 0;

function CountUp({ active, value }: { active: boolean; value: number }) {
  const [current, setCurrent] = useState(active ? 0 : value);

  useEffect(() => {
    if (!active) {
      setCurrent(value);
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCurrent(value);
      return;
    }

    let frame = 0;
    const duration = 1250;
    const startedAt = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(value * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    }

    setCurrent(0);
    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [active, value]);

  return current;
}

/** A labelled score ring that fires its own confetti burst when revealed. */
function Score({
  label,
  value,
  active,
  index = 0,
  large = false,
}: {
  label: string;
  value: number;
  active: boolean;
  /** Varies this burst's angles so sibling bursts don't look cloned. */
  index?: number;
  large?: boolean;
}) {
  return (
    <div className={large ? styles.featuredScore : styles.score}>
      <div className={styles.ringWrap}>
        <ScoreRing
          value={<CountUp active={active} value={value} />}
          score={value}
          labels={large ? RING_LABELS : []}
          labelOffset={RING_LABEL_OFFSET}
          breakOffset={RING_BREAK_OFFSET}
          labelRoom={large ? "1.75rem" : "0rem"}
          size={large ? "11rem" : "4rem"}
          stroke={large ? 5 : 7}
          valueSize={large ? "3rem" : "1.1rem"}
          animate={active}
        />
        {active ? (
          <Confetti
            count={large ? 44 : 20}
            spread={large ? 9 : 4.5}
            seed={index * 1.1}
            delay={large ? 0.9 : 0.75}
          />
        ) : null}
      </div>
      <span className={large ? styles.featuredLabel : styles.label}>
        {label}
      </span>
    </div>
  );
}

export function PerformanceAnalytics() {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <p className={styles.description}>
        This covers the full quality picture: how the site performs for users,
        how inclusive it is, how well it ranks, whether it follows modern best
        practices, and whether agentic tools can actually use it. Open up the
        `Show analytics` section to see the Lighthouse scores and metrics for
        this specific page.
      </p>
      <CollapsibleTrigger className={styles.trigger}>
        {open ? "Hide analytics" : "View analytics"}
      </CollapsibleTrigger>
      <CollapsibleContent className={styles.content}>
        <div className={styles.panel} aria-label="Lighthouse scores">
          <div className={styles.categories}>
            {categoryScores.map((score, index) => (
              <Score key={score.label} active={open} index={index} {...score} />
            ))}
            <div className={styles.agentic}>
              <span className={styles.agenticPill}>
                <span className={styles.agenticDot} aria-hidden="true" />
                <span>2/2</span>
              </span>
              <span className={styles.label}>Agentic Browsing</span>
            </div>
          </div>
          <Score
            label="Performance"
            value={100}
            active={open}
            index={4}
            large
          />
          <div className={styles.metrics} aria-label="Performance metrics">
            <div className={styles.metricsHeader}>
              <h3 className={styles.metricsTitle}>Metrics</h3>
            </div>
            <dl className={styles.metricsList}>
              {metrics.map((metric) => (
                <div className={styles.metricRow} key={metric.label}>
                  <dt className={styles.metricName}>
                    <span className={styles.metricDot} aria-hidden="true" />
                    {metric.label}
                  </dt>
                  <dd className={styles.metricValue}>{metric.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={styles.blurbs}>
            <div className={styles.blurb}>
              <h3 className={styles.blurbTitle}>Accessibility</h3>

              <p className={styles.blurbText}>
                Accessibility is built on the WCAG standards. WCAG 2.0 (2008)
                established the four core principles — Perceivable, Operable,
                Understandable, and Robust (POUR). WCAG 2.1 (2018) extended that
                with new success criteria for mobile use, low-vision support,
                and cognitive accessibility. WCAG 2.2 (2023) pushed further,
                introducing requirements like accessible authentication (no
                cognitive function tests), support for non-dragging alternatives,
                and enhanced help for users who need more time or fewer
                interruptions. I target the highest level across every project to
                make sure the broadest possible audience can use and navigate
                everything I build.
              </p>

              <ul className={styles.checkList}>
                <li className={styles.checkItem}>
                  <span className={styles.checkIcon} aria-hidden="true">
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
                      <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />
                    </svg>
                  </span>
                  Semantic HTML and ARIA roles used throughout
                </li>
                <li className={styles.checkItem}>
                  <span className={styles.checkIcon} aria-hidden="true">
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
                      <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />
                    </svg>
                  </span>
                  Full keyboard navigation with visible focus indicators
                </li>
                <li className={styles.checkItem}>
                  <span className={styles.checkIcon} aria-hidden="true">
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
                      <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />
                    </svg>
                  </span>
                  Color contrast meets or exceeds WCAG 2.2 AAA standards
                </li>
                <li className={styles.checkItem}>
                  <span className={styles.checkIcon} aria-hidden="true">
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
                      <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />
                    </svg>
                  </span>
                  Skip links and landmark regions for screen reader users
                </li>
                <li className={styles.checkItem}>
                  <span className={styles.checkIcon} aria-hidden="true">
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
                      <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />
                    </svg>
                  </span>
                  Reduced motion preferences respected by default
                </li>
              </ul>
            </div>

            <div className={styles.blurb}>
              <h3 className={styles.blurbTitle}>SEO</h3>
              <p className={styles.blurbText}>
                Every page is built with search intent in mind: meaningful heading
                hierarchy, descriptive link text, Open Graph and Twitter Card
                metadata, canonical URLs, and structured data where appropriate.
                Speed and Core Web Vitals feed directly into rank factors — a
                fast, accessible site is also a search-friendly one. I treat
                discoverability as part of the build, not an afterthought.
              </p>
            </div>

            <div className={styles.blurb}>
              <h3 className={styles.blurbTitle}>Agentic Browsing</h3>
              <p className={styles.blurbText}>
                Agentic browsing is about whether autonomous AI tools can
                understand and interact with a site. Clean markup, predictable
                navigation patterns, and machine-readable content all help agents
                crawl, summarize, and act on pages correctly. This portfolio
                scores 2/2 on agentic capability — the agent can both find the
                content and interact with it.
              </p>
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
