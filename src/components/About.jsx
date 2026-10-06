import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'

const FACTS = [
  { label: 'Focus', value: 'AI & ML' },
  { label: 'Base', value: 'Mysuru, IN' },
  { label: 'Status', value: 'Open to Internships', live: true },
  { label: 'Graduating', value: '2028' },
]

export default function About() {
  return (
    <section id="about" className="relative border-b border-obsidian-line/60 py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <SectionHeading eyebrow="The Architect" title="About" />

          <Reveal as="div" y={20}>
            <div className="relative rounded-2xl border border-obsidian-line bg-obsidian-raised p-8 md:p-10">
              {/* Corner brackets — HUD framing to match the site's blade/scan motifs */}
              <span className="pointer-events-none absolute -left-px -top-px h-6 w-6 rounded-tl-2xl border-l-2 border-t-2 border-sakura/60" />
              <span className="pointer-events-none absolute -right-px -top-px h-6 w-6 rounded-tr-2xl border-r-2 border-t-2 border-sakura/60" />
              <span className="pointer-events-none absolute -bottom-px -left-px h-6 w-6 rounded-bl-2xl border-b-2 border-l-2 border-sakura/60" />
              <span className="pointer-events-none absolute -bottom-px -right-px h-6 w-6 rounded-br-2xl border-b-2 border-r-2 border-sakura/60" />

              <p className="font-display text-xl font-bold leading-snug text-blade md:text-2xl">
                I build <span className="text-sakura">across the stack</span> — full-stack
                web apps, applied AI tooling, and Discord bots — usually because I wanted
                to see if an idea would actually hold up outside a notebook.
              </p>

              <p className="mt-6 max-w-2xl font-body text-base leading-relaxed text-steel/90">
                Computer Science &amp; Engineering student specializing in AI &amp; ML at{' '}
                <span className="text-blade">The National Institute of Engineering</span>,
                Mysuru — graduating in 2028. What I care about most is craft: code that's
                precise, deliberate, and built to be understood by the next person who
                reads it — including future me.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-obsidian-line bg-obsidian-line sm:grid-cols-4">
                {FACTS.map((fact) => (
                  <div key={fact.label} className="bg-obsidian-raised p-4">
                    <p className="font-display text-[10px] uppercase tracking-widest2 text-steel">
                      {fact.label}
                    </p>
                    <p className="mt-2 flex items-center gap-2 font-display text-sm font-bold text-blade">
                      {fact.live && (
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sakura opacity-75" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-sakura" />
                        </span>
                      )}
                      {fact.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
