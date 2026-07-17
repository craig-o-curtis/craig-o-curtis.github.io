"use client"

import { useEffect, useState } from "react"
import { Confetti } from "@/app/components/Confetti"
import { ScoreRing } from "@/app/components/ScoreRing"
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

const metrics = [
  { label: "First Contentful Paint", value: "0.2 s" },
  { label: "Largest Contentful Paint", value: "0.2 s" },
  { label: "Total Blocking Time", value: "0 ms" },
  { label: "Cumulative Layout Shift", value: "0" },
  { label: "Speed Index", value: "0.2 s" },
]

/**
 * Metric labels around the big ring, clockwise. Offset by half a step so the
 * gap between SI and FCP straddles 12 o'clock rather than sitting on it.
 */
const RING_LABELS = ["SI", "FCP", "LCP", "TBT", "CLS"]
const RING_LABEL_OFFSET = -36

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

/** A labelled score ring that fires its own confetti burst when revealed. */
function Score({
  label,
  value,
  active,
  index = 0,
  large = false,
}: {
  label: string
  value: number
  active: boolean
  /** Varies this burst's angles so sibling bursts don't look cloned. */
  index?: number
  large?: boolean
}) {
  return (
    <div className={large ? styles.featuredScore : styles.score}>
      <div className={styles.ringWrap}>
        <ScoreRing
          value={<CountUp active={active} value={value} />}
          score={value}
          labels={large ? RING_LABELS : []}
          labelOffset={RING_LABEL_OFFSET}
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
          <div className={styles.categories}>
            {categoryScores.map((score, index) => (
              <Score
                key={score.label}
                active={open}
                index={index}
                {...score}
              />
            ))}
            <div className={styles.agentic}>
              {/* Already complete, so no count-up and no burst — just green. */}
              <span className={styles.agenticPill}>
                <span className={styles.agenticDot} aria-hidden="true" />
                <span>2/2</span>
              </span>
              <span className={styles.label}>Agentic Browsing</span>
            </div>
          </div>
          <Score label="Performance" value={100} active={open} index={4} large />
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
