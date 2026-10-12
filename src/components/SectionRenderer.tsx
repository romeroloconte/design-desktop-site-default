import { useState } from 'react';
import type { Media, Section } from '../content/types';

function MediaBlock({ media }: { media: Media }) {
  if (media.embed) {
    return (
      <figure className="media">
        <iframe src={media.embed} title={media.alt} loading="lazy" allowFullScreen />
      </figure>
    );
  }
  return (
    <figure className="media">
      {media.src ? (
        <img src={media.src} alt={media.alt} loading="lazy" />
      ) : (
        <div className="media__placeholder" role="img" aria-label={media.alt}>
          <span>{media.alt}</span>
        </div>
      )}
    </figure>
  );
}

function Head({ index, label, heading }: { index: string; label: string; heading: string }) {
  return (
    <header className="section__head">
      <p className="section__eyebrow">
        <span className="section__index">{index}</span> {label}
      </p>
      <h2 className="section__heading">{heading}</h2>
    </header>
  );
}

function PromptCard({ n, title, desc, code }: { n: number; title: string; desc: string; code: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };
  const download = () => {
    const url = URL.createObjectURL(new Blob([code], { type: 'text/markdown' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `prompt-${n}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <article className="prompt-card" id={`prompt-${n}`}>
      <p className="section__eyebrow">Prompt {n}</p>
      <h3>{title}</h3>
      <p className="prompt-card__desc">{desc}</p>
      <div className="prompt-card__code">
        <div className="prompt-card__actions">
          <button type="button" className="prompt-card__btn" onClick={download} aria-label={`Download prompt ${n} as Markdown`} title="Download .md">
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M8 2v8M4.5 7 8 10.5 11.5 7M3 13.5h10" />
            </svg>
          </button>
          <button type="button" className="prompt-card__btn" onClick={copy} aria-label={copied ? 'Copied' : `Copy prompt ${n}`} title={copied ? 'Copied' : 'Copy'}>
            {copied ? (
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m3.5 8.5 3 3 6-7" />
              </svg>
            ) : (
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
                <path d="M10.5 5.5v-2a1.5 1.5 0 0 0-1.5-1.5H4A1.5 1.5 0 0 0 2.5 3.5V9A1.5 1.5 0 0 0 4 10.5h1.5" />
              </svg>
            )}
          </button>
        </div>
        <pre>{code}</pre>
      </div>
    </article>
  );
}

export function SectionRenderer({ section }: { section: Section }) {
  const id = section.anchor;
  switch (section.type) {
    case 'hero':
      return (
        <section className="section section--hero" id={id} data-anchor={id}>
          <p className="section__eyebrow">{section.eyebrow}</p>
          <h2 className="section__title">
            {section.title.split('\n').map((l, i) => (
              <span key={i} className="section__title-line">
                {l}
              </span>
            ))}
          </h2>
          <p className="section__lead">{section.lead}</p>
          <ul className="tags">
            {section.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          {section.media && <MediaBlock media={section.media} />}
        </section>
      );
    case 'intro':
      return (
        <section className="section section--intro" id={id} data-anchor={id}>
          <Head {...section} />
          <p className="section__body">{section.body}</p>
          <dl className="meta">
            {section.meta.map((m) => (
              <div key={m.label}>
                <dt>{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      );
    case 'numberedList':
      return (
        <section className={`section section--list${section.inverted ? ' is-inverted' : ''}`} id={id} data-anchor={id}>
          <Head {...section} />
          <p className="section__body">{section.body}</p>
          <ol className="numbered">
            {section.items.map((it) => (
              <li key={it}>{it}</li>
            ))}
          </ol>
        </section>
      );
    case 'process':
      return (
        <section className="section section--process" id={id} data-anchor={id}>
          <Head {...section} />
          <p className="section__body">{section.body}</p>
          <ol className="steps">
            {section.steps.map((s) => (
              <li className="card" key={s.n}>
                <span className="card__n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </li>
            ))}
          </ol>
        </section>
      );
    case 'evidence':
      return (
        <section className="section section--evidence" id={id} data-anchor={id}>
          <Head {...section} />
          <p className="section__body">{section.body}</p>
          <ul className="bullets">
            {section.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <div className="media-row">
            {section.media.map((m) => (
              <MediaBlock key={m.alt} media={m} />
            ))}
          </div>
        </section>
      );
    case 'decisionGrid':
      return (
        <section className="section section--decisions" id={id} data-anchor={id}>
          <div className="decision-grid">
            {section.articles.map((a) => (
              <article key={a.index}>
                <Head {...a} />
                <p className="section__body">{a.body}</p>
                <MediaBlock media={a.media} />
              </article>
            ))}
          </div>
        </section>
      );
    case 'solution':
      return (
        <section className="section section--solution" id={id} data-anchor={id}>
          <Head {...section} />
          <p className="section__body">{section.body}</p>
          {section.features.map((f, i) => (
            <div className={`feature${i % 2 ? ' is-reversed' : ''}`} key={f.n}>
              <div className="feature__text">
                <span className="card__n">{f.n}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
              <div className="feature__screens">
                {f.screens.map((s) => (
                  <MediaBlock key={s.alt} media={s} />
                ))}
              </div>
            </div>
          ))}
        </section>
      );
    case 'changelog':
      return (
        <section className="section section--changelog" id={id} data-anchor={id}>
          <Head {...section} />
          {section.groups.map((g) => (
            <div className="changelog__group" key={g.date}>
              <p className="changelog__date">{g.date}</p>
              {g.entries.map((e) => (
                <article className="changelog__entry" key={e.title}>
                  <span className="changelog__tag">{e.tag}</span>
                  <div className="changelog__body">
                    <h3>{e.title}</h3>
                    <p>{e.desc}</p>
                    {e.media && <MediaBlock media={e.media} />}
                  </div>
                </article>
              ))}
            </div>
          ))}
        </section>
      );
    case 'builtWith':
      return (
        <section className="section section--builtwith" id={id} data-anchor={id}>
          <Head {...section} />
          <ul className="chips">
            {section.items.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </section>
      );
    case 'buildSteps':
      return (
        <section className="section section--buildsteps" id={id} data-anchor={id}>
          <Head {...section} />
          <ol className="buildsteps">
            {section.steps.map((st) => (
              <li key={st.n}>
                <span className="buildsteps__n">{st.n}</span>
                <div>
                  <h3>{st.title}</h3>
                  <p>
                    {st.desc}
                    {st.prompt && (
                      <button
                        type="button"
                        className="buildsteps__link"
                        onClick={() =>
                          document.getElementById(`prompt-${st.prompt}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        }
                      >
                        Prompt {st.prompt} ↓
                      </button>
                    )}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      );
    case 'prompts':
      return (
        <section className="section section--prompts" id={id} data-anchor={id}>
          <Head {...section} />
          <p className="section__body">{section.body}</p>
          {section.items.map((it, i) => (
            <PromptCard key={it.title} n={i + 1} {...it} />
          ))}
        </section>
      );
    case 'outcomes':
      return (
        <section className="section section--outcomes" id={id} data-anchor={id}>
          <Head {...section} />
          <ul className="metrics">
            {section.metrics.map((m) => (
              <li key={m.label}>
                <strong>{m.value}</strong>
                <span>{m.label}</span>
              </li>
            ))}
          </ul>
          <ul className="bullets">
            {section.learnings.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </section>
      );
  }
}
