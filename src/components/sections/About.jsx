import { motion, useReducedMotion } from 'framer-motion';
import { educationEntries, heroStats, languageLevels } from '../../data/profile';
import { useT } from '../../i18n';
import { Reveal, RevealGroup, RevealItem } from '../Reveal';

/** Small mono label used above every block in this section. */
function Label({ children }) {
  return (
    <h3 className="font-mono text-[10px] uppercase tracking-[0.26em] text-faint">{children}</h3>
  );
}

/** Language row: name, level, and a hairline meter. */
function LanguageRow({ name, level, value, index }) {
  const prefersReduced = useReducedMotion();

  return (
    <li className="py-4">
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-[15px] font-light tracking-tight text-fg">{name}</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
          {level}
        </span>
      </div>
      <div className="mt-3 h-px w-full bg-line">
        <motion.div
          className="h-px bg-fg-soft"
          initial={prefersReduced ? undefined : { scaleX: 0 }}
          whileInView={prefersReduced ? undefined : { scaleX: value / 100 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.4, delay: 0.1 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'left' }}
        />
      </div>
    </li>
  );
}

export function About() {
  const t = useT();

  return (
    <section id="about" className="relative scroll-mt-28 py-32 sm:py-40 lg:py-52">
      <div className="shell">
        {/* Eyebrow */}
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint">
            01 — {t.about.eyebrow}
          </p>
        </Reveal>

        {/* The statement. This is the section. */}
        <Reveal delay={0.08} className="mt-12 sm:mt-16">
          <h2 className="max-w-5xl font-serif text-[clamp(2.1rem,6.4vw,4.75rem)] font-normal leading-[1.08] tracking-[-0.02em] text-fg">
            {t.about.titleLead} <span className="italic text-muted">{t.about.titleRest}</span>
          </h2>
        </Reveal>

        <Reveal delay={0.14} className="mt-16 sm:mt-20">
          <div className="h-px w-full bg-line" />
        </Reveal>

        {/* Body copy — two short paragraphs, nothing more. */}
        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal delay={0.06}>
              <p className="text-[clamp(1rem,1.5vw,1.15rem)] font-light leading-[1.8] text-fg-soft">
                {t.about.intro1}
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-8 text-[clamp(1rem,1.5vw,1.15rem)] font-light leading-[1.8] text-fg-soft">
                {t.about.intro2}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 text-[clamp(1rem,1.5vw,1.15rem)] font-light leading-[1.8] text-fg-soft">
                {t.about.intro3}
              </p>
            </Reveal>

            {/* Disciplines — the short version of what I do. */}
            <Reveal delay={0.22}>
              <ul className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-2">
                {t.about.disciplines.map((item, i) => (
                  <li key={item} className="flex items-center gap-3">
                    {i > 0 && <span className="text-line-strong">·</span>}
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        {/* Numbers */}
        <RevealGroup
          className="mt-24 grid grid-cols-2 gap-x-8 gap-y-12 border-t border-line pt-14 sm:grid-cols-4 sm:mt-28"
          stagger={0.08}
        >
          {heroStats.map((stat) => (
            <RevealItem key={stat.key}>
              <div className="flex flex-col-reverse">
                <dt className="mt-2.5 font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-faint">
                  {t.about.stats[stat.key]}
                </dt>
                <dd className="tabular text-[clamp(1.9rem,4vw,2.6rem)] font-light tracking-[-0.04em] text-fg">
                  {stat.value}
                  <span className="text-muted">{stat.suffix}</span>
                </dd>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Education · Languages · Principles */}
        <div className="mt-28 grid gap-16 border-t border-line pt-16 lg:grid-cols-12 lg:gap-12 sm:mt-32">
          {/* Education */}
          <div className="lg:col-span-6">
            <Reveal>
              <Label>{t.about.educationLabel}</Label>
            </Reveal>

            <RevealGroup className="mt-8 divide-y divide-line border-t border-line">
              {educationEntries.map((entry) => {
                const copy = t.about.education[entry.key];
                return (
                  <RevealItem key={entry.key}>
                    <article className="py-7">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                        <h4 className="max-w-md text-[16px] font-normal leading-snug tracking-[-0.015em] text-fg">
                          {copy.degree}
                        </h4>
                        <span className="tabular shrink-0 font-mono text-[10px] tracking-[0.14em] text-faint">
                          {entry.period}
                        </span>
                      </div>

                      <p className="mt-2 text-[13.5px] font-light text-muted">
                        {copy.school}
                        <span className="text-faint"> — {copy.place}</span>
                      </p>

                      {entry.current && (
                        <p className="mt-3 inline-flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.2em] text-fg-soft">
                          <span className="h-1 w-1 rounded-full bg-fg-soft" />
                          {t.about.inProgress}
                        </p>
                      )}

                      {copy.notes.length > 0 && (
                        <ul className="mt-4 space-y-1.5">
                          {copy.notes.map((note) => (
                            <li
                              key={note}
                              className="text-[13px] font-light leading-relaxed text-muted"
                            >
                              {note}
                            </li>
                          ))}
                        </ul>
                      )}
                    </article>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>

          {/* Languages */}
          <div className="lg:col-span-3">
            <Reveal>
              <Label>{t.about.languagesLabel}</Label>
            </Reveal>
            <Reveal delay={0.08}>
              <ul className="mt-8 divide-y divide-line border-t border-line">
                {languageLevels.map((item, i) => (
                  <LanguageRow
                    key={item.key}
                    name={t.about.languages[item.key].name}
                    level={t.about.languages[item.key].level}
                    value={item.value}
                    index={i}
                  />
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Principles */}
          <div className="lg:col-span-3">
            <Reveal>
              <Label>{t.about.howIWorkLabel}</Label>
            </Reveal>
            <Reveal delay={0.08}>
              <ul className="mt-8 divide-y divide-line border-t border-line">
                {t.about.softSkills.map((skill) => (
                  <li
                    key={skill}
                    className="py-4 text-[13.5px] font-light leading-relaxed tracking-tight text-muted"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-10 text-[13px] font-light leading-relaxed text-faint">
                {t.about.interests}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
