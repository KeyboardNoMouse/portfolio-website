import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'
import { projects } from '../data/projects.js'
import { skillGroups } from '../data/skills.js'
import { timeline, certifications } from '../data/experience.js'

const LINKS = {
  github: 'https://github.com/KeyboardNoMouse',
  linkedin: 'https://www.linkedin.com/in/ritun-jain',
  site: 'https://ritun.space',
  email: 'mailto:ritunjain246@gmail.com',
}
const CMDS = ['help', 'about', 'projects', 'skills', 'experience', 'certs', 'contact', 'github', 'linkedin', 'clear']

const run = (raw) => {
  const [cmd, arg] = raw.trim().toLowerCase().split(/\s+/)
  switch (cmd) {
    case '':
      return []
    case 'help':
      return ['Available commands:', ...CMDS.map((c) => `  ${c}`), 'Tip: try "projects 2" for details.']
    case 'about':
      return ['Ritun Jain — B.E. CSE (AI & ML), NIE Mysuru, 2024–2028.', 'Goal: AI Engineer + Full-Stack Developer.', 'Builds web apps, ML systems, and AI developer tooling.']
    case 'projects': {
      const i = parseInt(arg, 10) - 1
      if (projects[i]) {
        const p = projects[i]
        return [`${p.title} — ${p.tagline}`, p.description, `Stack: ${p.tech.join(', ')}`, ...(p.github ? [`Repo: ${p.github}`] : [])]
      }
      return projects.map((p, n) => `  [${n + 1}] ${p.title}`).concat('Type "projects <number>" for details.')
    }
    case 'skills':
      return skillGroups.map((g) => `${g.label.padEnd(10)} ${g.items.join(', ')}`)
    case 'experience':
    case 'exp':
      return timeline.map((t) => `${t.period}  ${t.title} @ ${t.org}`)
    case 'certs':
      return certifications.map((c) => `• ${c.title} — ${c.issuer}`)
    case 'contact':
      return ['ritunjain246@gmail.com', `GitHub:   ${LINKS.github}`, `LinkedIn: ${LINKS.linkedin}`, `Site:     ${LINKS.site}`]
    case 'github':
    case 'linkedin':
      window.open(LINKS[cmd], '_blank', 'noopener')
      return [`Opening ${cmd}...`]
    case 'sudo':
      return ['Nice try. Permission denied.']
    default:
      return [`command not found: ${cmd}. Type "help".`]
  }
}

export default function Terminal() {
  const [log, setLog] = useState([{ cmd: 'welcome', out: ['Welcome to ritun.sh — type "help" or tap a command below.'] }])
  const [val, setVal] = useState('')
  const hist = useRef({ list: [], i: 0 })
  const body = useRef(null)

  useEffect(() => {
    if (body.current) body.current.scrollTop = body.current.scrollHeight
  }, [log])

  const exec = (raw) => {
    if (raw.trim() === 'clear') return setLog([])
    hist.current.list.push(raw)
    hist.current.i = hist.current.list.length
    setLog((l) => [...l, { cmd: raw, out: run(raw) }])
  }
  const onKey = (e) => {
    const h = hist.current
    if (e.key === 'Enter') { exec(val); setVal('') }
    else if (e.key === 'ArrowUp') { e.preventDefault(); h.i = Math.max(0, h.i - 1); setVal(h.list[h.i] || '') }
    else if (e.key === 'ArrowDown') { e.preventDefault(); h.i = Math.min(h.list.length, h.i + 1); setVal(h.list[h.i] || '') }
    else if (e.key === 'Tab') { e.preventDefault(); const m = CMDS.find((c) => c.startsWith(val)); if (m) setVal(m) }
  }

  return (
    <section id="terminal" className="relative border-b border-obsidian-line/60 py-28 md:py-36">
      <div className="mx-auto max-w-4xl px-6 md:px-10">
        <SectionHeading eyebrow="Interactive" title="Ask the Terminal" />
        <Reveal as="div" y={28} className="mt-12">
          <div className="overflow-hidden rounded-xl border border-obsidian-line bg-black/60 shadow-glow-sm backdrop-blur">
            <div className="flex items-center gap-2 border-b border-obsidian-line px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-sakura" />
              <span className="h-3 w-3 rounded-full bg-steel/50" />
              <span className="h-3 w-3 rounded-full bg-steel/30" />
              <span className="ml-3 font-mono text-xs text-steel">ritun@portfolio ~ %</span>
            </div>
            <div ref={body} className="h-80 overflow-y-auto p-4 font-mono text-sm leading-relaxed text-blade" data-lenis-prevent>
              {log.map((e, i) => (
                <div key={i} className="mb-2">
                  {e.cmd !== 'welcome' && <p><span className="text-sakura">❯</span> {e.cmd}</p>}
                  {e.out.map((line, j) => (
                    <p key={j} className="whitespace-pre-wrap break-words text-steel">{line}</p>
                  ))}
                </div>
              ))}
              <label className="flex gap-2">
                <span className="text-sakura">❯</span>
                <input
                  value={val}
                  onChange={(e) => setVal(e.target.value)}
                  onKeyDown={onKey}
                  spellCheck={false}
                  autoComplete="off"
                  aria-label="terminal input"
                  className="flex-1 bg-transparent text-blade outline-none"
                />
              </label>
            </div>
            <div className="flex flex-wrap gap-2 border-t border-obsidian-line p-3">
              {CMDS.map((c) => (
                <button key={c} onClick={() => exec(c)} className="rounded-full border border-obsidian-line px-3 py-1 font-mono text-xs text-steel transition-colors hover:border-sakura hover:text-sakura">
                  {c}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
