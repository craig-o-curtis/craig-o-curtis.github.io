import type { CSSProperties, ReactNode } from 'react'
import styles from './ScoreRing.module.css'

const VIEWBOX = 120
const CENTER = VIEWBOX / 2
const RADIUS = 48

/**
 * pathLength="100" normalises the circle so the drawn amount is a percentage
 * rather than a real arc length — no circumference maths needed.
 */
const PATH_LENGTH = 100

type ScoreRingProps = {
  /** Shown in the middle — a number, or a component that renders one. */
  value: ReactNode
  /** 0–100. How much of the ring is drawn. */
  score?: number
  /**
   * Labels placed around the ring. The arc stays one continuous progress
   * circle, broken by cosmetic gaps.
   */
  labels?: string[]
  /** Rotates the labels, in degrees. Independent of the breaks. */
  labelOffset?: number
  /**
   * Rotates the breaks, in degrees. Separate from labelOffset so the gaps can
   * sit at the star points (0° = 12 o'clock, where the sweep starts) while the
   * labels sit between them.
   */
  breakOffset?: number
  breakWidth?: number
  /** Distance of the labels out from the ring, in viewBox units. */
  labelDistance?: number
  /** Space reserved around the ring so labels aren't clipped. */
  labelRoom?: string
  size?: string
  stroke?: number
  valueSize?: string
  animate?: boolean
}

/**
 * A circular score gauge: one continuous progress arc that sweeps from grey
 * through red/orange/yellow to green as it draws, matching Lighthouse.
 */
export function ScoreRing({
  value,
  score = 100,
  labels = [],
  labelOffset = 0,
  breakOffset = 0,
  breakWidth = 5,
  labelDistance = 16,
  labelRoom = '0rem',
  size = '9rem',
  stroke = 6,
  valueSize = '2.5rem',
  animate = true,
}: ScoreRingProps) {
  const count = labels.length
  const step = 360 / count
  // Breaks and labels are evenly spaced but rotated independently.
  const breakAngle = (index: number) => index * step + breakOffset
  const labelAngle = (index: number) => index * step + labelOffset

  return (
    <div
      className={styles.ring}
      style={
        {
          '--ring-size': size,
          '--ring-stroke': stroke,
          '--ring-value-size': valueSize,
          // How much of the path stays hidden once the sweep finishes.
          '--ring-offset': PATH_LENGTH - score,
          '--ring-label-room': labelRoom,
        } as CSSProperties
      }
    >
      <svg
        className={styles.svg}
        viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
        aria-hidden="true"
      >
        <circle
          className={styles.track}
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          pathLength={PATH_LENGTH}
        />
        {/*
         * The dash pattern is the full path with a gap of the same length, so
         * stroke-dashoffset can sweep the arc on from nothing: it starts at
         * `score` (nothing drawn) and animates to 0 (the arc drawn).
         *
         * Do NOT set dasharray to `score (100-score)` — for a score of 100 that
         * renders a complete circle on the first frame and there is nothing
         * left to animate.
         */}
        <circle
          className={animate ? styles.progress : styles.progressStatic}
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          pathLength={PATH_LENGTH}
          strokeDasharray={PATH_LENGTH}
        />

        {/*
         * Cosmetic breaks, drawn over the arc in the panel's own background
         * rather than cut out of it, so the progress arc stays a single
         * animatable path.
         */}
        {count > 0 ? (
          <g className={styles.breaks}>
            {labels.map((label, index) => (
              <line
                key={label}
                x1={CENTER}
                y1={CENTER - RADIUS - stroke}
                x2={CENTER}
                y2={CENTER - RADIUS + stroke}
                strokeWidth={breakWidth}
                transform={`rotate(${breakAngle(index)} ${CENTER} ${CENTER})`}
              />
            ))}
          </g>
        ) : null}
      </svg>

      <span
        className={`${styles.value} ${animate ? styles.valueAnimated : ''}`}
      >
        {value}
      </span>

      {labels.map((label, index) => {
        // -90° puts 0° at 12 o'clock, matching the rotated svg.
        const radians = ((labelAngle(index) - 90) * Math.PI) / 180
        // Offset from the centre, as a fraction of the ring's rendered size.
        const distance = (RADIUS + labelDistance) / VIEWBOX
        const dx = Math.cos(radians) * distance
        const dy = Math.sin(radians) * distance

        return (
          <span
            key={label}
            className={styles.label}
            style={
              {
                '--label-dx': `calc(var(--ring-size) * ${dx.toFixed(4)})`,
                '--label-dy': `calc(var(--ring-size) * ${dy.toFixed(4)})`,
              } as CSSProperties
            }
          >
            {label}
          </span>
        )
      })}
    </div>
  )
}
