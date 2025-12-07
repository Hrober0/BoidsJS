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
        separator ? 'mb-4 pb-3' : undefined
      }
    >
      {children}
    </section>
  );
}
