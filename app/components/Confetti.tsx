import type { CSSProperties } from 'react'
import styles from './Confetti.module.css'

const COLORS = [
  'var(--score-green)',
  'var(--score-cyan)',
  'var(--score-violet)',
  'var(--score-yellow)',
  'var(--score-orange)',
  'var(--score-red)',
]

/** Keeps successive dots from clumping into visible spokes. */
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5))

type ConfettiProps = {
  count?: number
  /** Burst radius in rem. */
  spread?: number
  /** Offsets the angles so sibling bursts don't look cloned. */
  seed?: number
  delay?: number
}

/**
 * A firework burst anchored to the centre of its parent, which must be
 * position: relative. Every dot starts at the centre and travels outward along
 * its own angle, then falls — the trajectory is per-dot, so the angle and
 * distance go to CSS as variables rather than baked into shared keyframes.
 */
export function Confetti({
  count = 28,
  spread = 6,
  seed = 0,
  delay = 0,
}: ConfettiProps) {
  const dots = Array.from({ length: count }, (_, index) => {
    const angle = index * GOLDEN_ANGLE + seed
    // sqrt keeps the burst evenly dense instead of crowding the centre.
    const distance = (0.45 + Math.sqrt((index + 1) / count) * 0.55) * spread

    return {
      id: index,
      dx: `${Math.cos(angle) * distance}rem`,
      dy: `${Math.sin(angle) * distance}rem`,
      fall: `${2 + (index % 5) * 0.7}rem`,
      delay: `${delay + (index % 6) * 0.02}s`,
      duration: `${1.5 + (index % 4) * 0.2}s`,
      size: `${0.18 + (index % 4) * 0.06}rem`,
      color: COLORS[index % COLORS.length],
    }
  })

  return (
    <span className={styles.burst} aria-hidden="true">
      {dots.map((dot) => (
        <span
          key={dot.id}
          className={styles.dot}
          style={
            {
              '--confetti-dx': dot.dx,
              '--confetti-dy': dot.dy,
              '--confetti-fall': dot.fall,
              '--confetti-delay': dot.delay,
              '--confetti-duration': dot.duration,
              '--confetti-size': dot.size,
              '--confetti-color': dot.color,
            } as CSSProperties
          }
        />
      ))}
    </span>
  )
}
