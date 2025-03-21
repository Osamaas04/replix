import Link from "next/link";

export default function DocsCard({ href, icon, title, description, hover, disabled }) {
  return (
    <Link href={href}>
      <div
        className={`bg-secondary border border-secondary/70 p-8 rounded-md text-primary grid gap-8 transition-all duration-300 ${hover} ${disabled}`}
      >
        <div>{icon}</div>

        <div className="grid gap-2">
          <h1 className="font-semibold">{title}</h1>
          <p className="text-primary/60">{description}</p>
        </div>
      </div>
    </Link>
  );
}