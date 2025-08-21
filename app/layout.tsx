// This is the root layout - it redirects to the locale-specific layouts
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
