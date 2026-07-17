"use client"

import type { CSSProperties } from "react"
import { useEffect, useState } from "react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/app/components/ui/collapsible"
import styles from "./PerformanceAnalytics.module.css"

const categoryScores = [
  { label: "Performance", value: 100 },
  { label: "Accessibility", value: 100 },
  { label: "Best Practices", value: 100 },
  { label: "SEO", value: 100 },
]

const metricLabels = ["SI", "FCP", "LCP", "TBT", "CLS"]

const metrics = [
  { label: "First Contentful Paint", value: "0.2 s" },
  { label: "Largest Contentful Paint", value: "0.2 s" },
  { label: "Total Blocking Time", value: "0 ms" },
  { label: "Cumulative Layout Shift", value: "0" },
  { label: "Speed Index", value: "0.2 s" },
]

const confetti = Array.from({ length: 144 }, (_, index) => ({
  id: index,
  left: `${3 + ((index * 29) % 94)}%`,
  top: `${3 + ((index * 41) % 92)}%`,
  delay: `${1.25 + (index % 36) * 0.035}s`,
  size: `${0.22 + (index % 5) * 0.08}rem`,
  color: [
    "var(--score-green)",
    "var(--score-cyan)",
    "var(--score-violet)",
    "var(--score-yellow)",
    "var(--score-orange)",
    "var(--score-red)",
  ][index % 6],
}))

function CountUp({ active, value }: { active: boolean; value: number }) {
  const [current, setCurrent] = useState(active ? 0 : value)

  useEffect(() => {
    if (!active) {
      setCurrent(value)
      return
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCurrent(value)
      return
    }

    let frame = 0
    const duration = 1250
    const startedAt = performance.now()

    function tick(now: number) {
      const progress = Math.min((now - startedAt) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCurrent(Math.round(value * eased))

      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      }
    }

    setCurrent(0)
    frame = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(frame)
  }, [active, value])

  return current
}

function ScoreRing({
  label,
  value,
  active,
  large = false,
}: {
  label: string
  value: number
  active: boolean
  large?: boolean
}) {
  return (
    <div className={large ? styles.featuredScore : styles.score}>
      <div className={large ? styles.largeRing : styles.ring}>
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <circle className={styles.track} cx="60" cy="60" r="48" />
          <circle
            className={styles.progress}
            cx="60"
            cy="60"
            r="48"
            pathLength="100"
          />
        </svg>
        <span className={large ? styles.largeValue : styles.value}>
          <CountUp active={active} value={value} />
        </span>
        {large
          ? metricLabels.map((metric) => (
              <span
                className={`${styles.metric} ${styles[`metric${metric}`]}`}
                key={metric}
              >
                {metric}
              </span>
            ))
          : null}
      </div>
      <span className={large ? styles.featuredLabel : styles.label}>
        {label}
      </span>
    </div>
  )
}

export function PerformanceAnalytics() {
  const [open, setOpen] = useState(false)

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <p className={styles.description}>
        This is twofold: it reflects what I strive for and deliver in my
        projects, and it shows what this site is in practice. These are the
        Lighthouse scores and metrics for this specific page.
      </p>
      <CollapsibleTrigger className={styles.trigger}>
        {open ? "Hide analytics" : "View analytics"}
      </CollapsibleTrigger>
      <CollapsibleContent className={styles.content}>
        <div className={styles.panel} aria-label="Lighthouse scores">
          {confetti.map((dot) => (
            <span
              aria-hidden="true"
              className={styles.confetti}
              key={dot.id}
              style={{
                "--confetti-left": dot.left,
                "--confetti-top": dot.top,
                "--confetti-delay": dot.delay,
                "--confetti-size": dot.size,
                "--confetti-color": dot.color,
              } as CSSProperties}
            />
          ))}
          <div className={styles.categories}>
            {categoryScores.map((score) => (
              <ScoreRing key={score.label} active={open} {...score} />
            ))}
            <div className={styles.agentic}>
              <span className={styles.agenticPill}>
                <span className={styles.agenticDot} aria-hidden="true" />
                <span>2/2</span>
              </span>
              <span className={styles.label}>Agentic Browsing</span>
            </div>
          </div>
          <ScoreRing label="Performance" value={100} active={open} large />
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
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
