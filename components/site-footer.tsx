import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-stone-200/80 bg-white/60">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-xs text-stone-500">
        <p className="max-w-2xl leading-5">
          Jessie is an AI. She does not pretend to be human, and she tells you
          what she keeps.
        </p>

        <Link
          href="/trust"
          className="underline underline-offset-4 transition-colors hover:text-stone-800"
        >
          Data principles
        </Link>
      </div>
    </footer>
  );
}
