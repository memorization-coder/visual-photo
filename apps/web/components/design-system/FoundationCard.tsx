type FoundationCardProps = {
  title: string;
  body: string;
};

export function FoundationCard({ title, body }: FoundationCardProps) {
  return (
    <article className="rounded-lg border border-[#e6d7c8] bg-surface p-lg shadow-card">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-sm text-sm leading-6 text-text-secondary">{body}</p>
    </article>
  );
}

