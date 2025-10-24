export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="relative min-h-screen bg-background text-black-200 overflow-hidden">
        {/* decorative blobs */}
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-88 w-88 rounded-full bg-primary-l"></div>
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-45 w-45 rounded-full bg-secondary"></div>

        <section className="grid min-h-screen place-items-center p-4">
          {/* <div className="relative w-full max-w-sm rounded-xl bg-foreground shadow-[0_10px_25px_rgba(0,0,0,0.08)] ring-1 ring-zinc-200"> */}
          <div className="relative w-full max-w-sm rounded-xl bg-foreground shadow-[0_10px_25px_rgba(0,0,0,0.08)]">
            <div className="pointer-events-none absolute right-0 top-0 h-15 w-15 rounded-bl-full bg-secondary"></div>
            {children}
          </div>
        </section>
      </main>
    </>
  );
}
