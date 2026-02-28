// Root layout is now handled by [locale]/layout.tsx
// This file only exists as a minimal passthrough for the app router
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
