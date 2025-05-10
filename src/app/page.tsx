import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto] p-8 sm:p-20 font-sans text-sm">
      <main className="row-start-2 flex flex-col items-center sm:items-start gap-8">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <ol className="list-decimal list-inside text-center sm:text-left font-mono space-y-2">
          <li>
            Get started by editing{" "}
            <code className="bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] transition-colors rounded-full h-12 px-5 flex items-center gap-2 font-medium"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logo"
              width={20}
              height={20}
            />
            Deploy now
          </a>

          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-black/10 dark:border-white/20 hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] transition-colors rounded-full h-12 px-5 flex items-center font-medium"
          >
            Read our docs
          </a>
        </div>
      </main>

      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6 mt-16 text-sm">
        <FooterLink
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          src="/file.svg"
          label="Learn"
        />
        <FooterLink
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          src="/window.svg"
          label="Examples"
        />
        <FooterLink
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          src="/globe.svg"
          label="Go to nextjs.org →"
        />
      </footer>
    </div>
  );
}

function FooterLink({
  href,
  src,
  label,
}: {
  href: string;
  src: string;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    >
      <Image aria-hidden src={src} alt="" width={16} height={16} />
      {label}
    </a>
  );
} 