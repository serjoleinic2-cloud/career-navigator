import type { PlaybookEntry } from '@/core/playbook/playbook_types';

interface SectionViewProps {
  entry: PlaybookEntry;
  onBack: () => void;
}

export function SectionView({ entry: e, onBack }: SectionViewProps) {
  return (
    <>
      <h2 className="playbook-entry-title">{e.title}</h2>
      <span className="playbook-entry-cat">{e.category}</span>

      <div className="playbook-entry-sections">
        <section>
          <h3>Overview</h3>
          <p>{e.overview}</p>
        </section>

        <section>
          <h3>Guides</h3>
          <ul>{e.guides.map(g => <li key={g}>{g}</li>)}</ul>
        </section>

        {e.templates.length > 0 && (
          <section>
            <h3>Templates</h3>
            {e.templates.map((t, i) => (
              <pre key={i}>{t}</pre>
            ))}
          </section>
        )}

        {e.examples.length > 0 && (
          <section>
            <h3>Examples</h3>
            {e.examples.map((ex, i) => (
              <pre key={i}>{ex}</pre>
            ))}
          </section>
        )}

        {e.checklist.length > 0 && (
          <section>
            <h3>Checklist</h3>
            <ul>{e.checklist.map(c => <li key={c}>{c}</li>)}</ul>
          </section>
        )}
      </div>

      <button className="playbook-back-btn" onClick={onBack}>← Back</button>
    </>
  );
}
