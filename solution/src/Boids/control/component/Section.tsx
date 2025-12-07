export function Section({
  children,
  separator,
}: {
  children: React.ReactNode;
  separator?: boolean;
}) {
  return (
    <section
      className={
        separator ? 'mb-4 border-b-2 border-slate-100/60 pb-3' : undefined
      }
    >
      {children}
    </section>
  );
}
