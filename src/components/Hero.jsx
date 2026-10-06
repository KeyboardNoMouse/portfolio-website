import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import SakuraCanvas from './SakuraCanvas.jsx'
import { useLenis } from '../lib/LenisProvider.jsx'

const HEADLINE = ['PRECISION', 'IN EVERY', 'COMMIT.']

export default function Hero() {
  const rootRef = useRef(null)
  const topPanelRef = useRef(null)
  const bottomPanelRef = useRef(null)
  const lineRef = useRef(null)
  const lineRefs = useRef([])
  const taglineRef = useRef(null)
  const ctaRef = useRef(null)
  const eyebrowRef = useRef(null)
  const { scrollTo } = useLenis() ?? {}

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      const lines = lineRefs.current

      gsap.set(lines, { yPercent: 110 })
      gsap.set([eyebrowRef.current, taglineRef.current, ctaRef.current], {
        opacity: 0,
        y: 16,
      })

      if (reduced) {
        gsap.set([topPanelRef.current, bottomPanelRef.current, lineRef.current], {
          display: 'none',
        })
        gsap.to([eyebrowRef.current, ...lines, taglineRef.current, ctaRef.current], {
          opacity: 1,
          y: 0,
          yPercent: 0,
          duration: 0.4,
        })
        return
      }

      const tl = gsap.timeline({ delay: 0.15, defaults: { ease: 'power4.out' } })

      tl.set(lineRef.current, { scaleX: 0, opacity: 1 })
        .to(lineRef.current, { scaleX: 1, duration: 0.4, ease: 'power2.inOut' }, 0.15)
        .to(lineRef.current, { opacity: 0, duration: 0.5 }, '+=0.05')
        .to(
          topPanelRef.current,
          { x: -70, y: -110, rotate: -2, opacity: 0, duration: 1, ease: 'power3.inOut' },
          '<'
        )
        .to(
          bottomPanelRef.current,
          { x: 70, y: 110, rotate: 2, opacity: 0, duration: 1, ease: 'power3.inOut' },
          '<'
        )
        .set([topPanelRef.current, bottomPanelRef.current], { pointerEvents: 'none' })
        .to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.6 }, '-=0.75')
        .to(lines, { yPercent: 0, duration: 0.9, stagger: 0.09, ease: 'power4.out' }, '-=0.55')
        .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.5 }, '-=0.35')
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative flex h-[100svh] min-h-[640px] w-full items-center overflow-hidden border-b border-obsidian-line/60"
    >
      {/* Ambient fog + sakura drift */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(255,183,197,0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(20,20,26,0.9),transparent_60%)]" />
        <SakuraCanvas />
      </div>

      {/* Slash overlay panels — cover the screen on load, then part diagonally */}
      <div
        ref={topPanelRef}
        className="absolute inset-0 z-30 bg-obsidian"
        style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 45%, 0% 60%)' }}
      />
      <div
        ref={bottomPanelRef}
        className="absolute inset-0 z-30 bg-obsidian-soft"
        style={{ clipPath: 'polygon(0% 60%, 100% 45%, 100% 100%, 0% 100%)' }}
      />
      <div
        ref={lineRef}
        className="absolute left-0 right-0 z-40 h-[2px] origin-center bg-blade-gradient shadow-glow"
        style={{ top: '52%', transform: 'rotate(-4deg) scaleX(0)' }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-10">
        <p
          ref={eyebrowRef}
          className="mb-6 font-display text-xs uppercase tracking-widest2 text-sakura"
        >
          Portfolio — Software Engineer
        </p>

        <h1 className="font-display text-[13vw] font-black uppercase leading-[0.92] text-blade sm:text-[9vw] lg:text-[6.4vw]">
          {HEADLINE.map((word, i) => (
            <span key={word} className="mask-reveal block">
              <span
                ref={(el) => (lineRefs.current[i] = el)}
                className="block"
                style={i === HEADLINE.length - 1 ? { color: '#ffb7c5' } : undefined}
              >
                {word}
              </span>
            </span>
          ))}
        </h1>

        <p
          ref={taglineRef}
          className="mt-8 max-w-xl font-body text-base leading-relaxed text-steel md:text-lg"
        >
          Ritun Jain — B.E. Computer Science &amp; Engineering — AI &amp; ML @ NIE Mysuru.
          Full-stack builds, AI tooling, and the occasional Discord bot.
        </p>

        <div ref={ctaRef} className="mt-10 flex flex-wrap items-center gap-5">
          <button
            onClick={() => scrollTo?.('#work')}
            data-cursor="flower"
            className="group relative overflow-hidden rounded-full bg-sakura px-7 py-3 font-display text-xs uppercase tracking-widest2 text-obsidian transition-transform hover:scale-[1.03]"
          >
            View the work
          </button>
          <button
            onClick={() => scrollTo?.('#contact')}
            data-cursor="shuriken"
            className="font-display text-xs uppercase tracking-widest2 text-steel transition-colors hover:text-sakura"
          >
            Say hello →
          </button>
        </div>
      </div>
    </section>
  )
}
