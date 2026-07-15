import { ArrowLeft, Check, Clipboard, ExternalLink } from "lucide-react";
import { useState } from "react";
import type { Domain, SelectedCategory, Technology } from "../types/catalog";

interface StackSummaryProps {
  selectedCategories: SelectedCategory[];
  selectedCount: number;
  onBack: () => void;
}

const domains: Domain[] = ["backend", "frontend"];
const domainLabels: Record<Domain, string> = {
  backend: "Backend",
  frontend: "Frontend",
};

function TechnologySummary({ technology }: { technology: Technology }) {
  const [iconFailed, setIconFailed] = useState(false);

  return (
    <li className="grid grid-cols-[2.5rem_minmax(0,1fr)_2rem] gap-x-3 gap-y-3 border-t border-rule py-4 first:border-t-0 sm:grid-cols-[3rem_minmax(0,1fr)_2rem] sm:gap-x-4 sm:py-5">
      <div className="grid size-10 place-items-center border border-rule bg-paper sm:size-12">
        {iconFailed ? (
          <span
            className="font-editorial text-lg font-medium text-coral"
            aria-hidden="true"
          >
            {technology.name[0]}
          </span>
        ) : (
          <img
            src={`https://cdn.simpleicons.org/${technology.icon}/191919`}
            className="size-5 sm:size-6"
            alt=""
            onError={() => setIconFailed(true)}
          />
        )}
      </div>

      <div className="min-w-0">
        <h4 className="text-sm font-semibold sm:text-base">
          {technology.name}
        </h4>
        <p className="mt-1 text-xs leading-5 text-muted sm:text-sm sm:leading-6">
          {technology.description}
        </p>
      </div>

      <a
        href={technology.website}
        target="_blank"
        rel="noreferrer"
        className="grid size-8 place-items-center border border-rule text-muted transition-colors hover:border-ink hover:text-ink focus-visible:ring-2 focus-visible:ring-coral/30"
        aria-label={`Open ${technology.name} official website`}
        title={`Open ${technology.name} official website`}
      >
        <ExternalLink className="size-3.5" aria-hidden="true" />
      </a>

      <ul className="col-start-2 col-end-4 flex flex-wrap gap-1.5">
        {technology.strengths.map((strength) => (
          <li
            key={strength}
            className="border border-rule bg-white/60 px-2 py-1 text-[10px] font-medium text-muted"
          >
            {strength}
          </li>
        ))}
      </ul>
    </li>
  );
}

function buildArchitecturePrompt(
  selectedCategories: SelectedCategory[],
): string {
  const lines: string[] = [
    "Generate a tech stack architecture diagram for the following application setup.",
    "",
  ];

  for (const domain of domains) {
    const groups = selectedCategories.filter(
      ({ category }) => category.domain === domain,
    );
    if (!groups.length) continue;

    lines.push(`## ${domainLabels[domain]}`);
    for (const { category, technologies } of groups) {
      lines.push(`\n### ${category.name} (${category.mode} choice)`);
      for (const tech of technologies) {
        lines.push(`- **${tech.name}**: ${tech.description}`);
      }
    }
    lines.push("");
  }

  return lines.join("\n");
}

export function StackSummary({
  selectedCategories,
  selectedCount,
  onBack,
}: StackSummaryProps) {
  const [copied, setCopied] = useState(false);

  const counts = domains.map((domain) => ({
    domain,
    count: selectedCategories
      .filter(({ category }) => category.domain === domain)
      .reduce((total, { technologies }) => total + technologies.length, 0),
  }));

  async function handleCopyPrompt() {
    const prompt = buildArchitecturePrompt(selectedCategories);
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section aria-labelledby="summary-heading">
      <div className="flex items-start justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex h-10 items-center gap-2 border border-rule bg-white px-3 text-xs font-semibold uppercase tracking-[0.12em] transition-colors hover:border-ink focus-visible:ring-2 focus-visible:ring-coral/30"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to picker
        </button>

        <button
          type="button"
          onClick={handleCopyPrompt}
          className="flex h-10 items-center gap-2 border border-rule bg-white px-3 text-xs font-semibold uppercase tracking-[0.12em] transition-colors hover:border-ink focus-visible:ring-2 focus-visible:ring-coral/30"
        >
          {copied ? (
            <>
              <Check className="size-4 text-green-600" aria-hidden="true" />
              Copied!
            </>
          ) : (
            <>
              <Clipboard className="size-4" aria-hidden="true" />
              Copy architecture prompt
            </>
          )}
        </button>
      </div>

      <header className="mt-8 border-b border-rule pb-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-coral">
          Selection report
        </p>
        <h1
          id="summary-heading"
          tabIndex={-1}
          className="mt-1 max-w-4xl font-editorial text-5xl leading-none font-medium outline-none sm:text-6xl lg:text-7xl"
        >
          Your stack, at a glance.
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">
          A field sheet of the technologies selected across your application,
          organized by the role each one plays.
        </p>
      </header>

      <dl
        className="grid grid-cols-3 border-b border-rule"
        aria-label="Stack totals"
      >
        {[
          { label: "Total", count: selectedCount },
          ...counts.map(({ domain, count }) => ({
            label: domainLabels[domain],
            count,
          })),
        ].map(({ label, count }, index) => (
          <div
            key={label}
            className={`py-5 ${index > 0 ? "border-l border-rule pl-4 sm:pl-6" : "pr-4 sm:pr-6"}`}
          >
            <dt className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">
              {label}
            </dt>
            <dd className="mt-1 font-editorial text-4xl leading-none font-medium sm:text-5xl">
              {count}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-10 grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        {domains.map((domain) => {
          const groups = selectedCategories.filter(
            ({ category }) => category.domain === domain,
          );

          if (!groups.length) return null;

          return (
            <section key={domain} aria-labelledby={`${domain}-summary-heading`}>
              <h2
                id={`${domain}-summary-heading`}
                className="flex items-end justify-between border-b-2 border-ink pb-3 font-editorial text-3xl font-medium sm:text-4xl"
              >
                <span>{domainLabels[domain]}</span>
                <span
                  className="font-sans text-[10px] font-semibold uppercase tracking-[0.15em] text-muted"
                  aria-hidden="true"
                >
                  {groups.reduce(
                    (total, { technologies }) => total + technologies.length,
                    0,
                  )}{" "}
                  selected
                </span>
              </h2>
              <div>
                {groups.map(({ category, technologies }) => (
                  <section
                    key={category.id}
                    className="grid border-b border-rule py-5 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-6 sm:py-6"
                  >
                    <header>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-coral">
                        {category.mode} choice
                      </p>
                      <h3 className="mt-1 text-sm font-semibold">
                        {category.name}
                      </h3>
                      <p className="mt-1 text-xs leading-5 text-muted">
                        {category.description}
                      </p>
                    </header>
                    <ul className="mt-4 sm:mt-0">
                      {technologies.map((technology) => (
                        <TechnologySummary
                          key={technology.id}
                          technology={technology}
                        />
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}
