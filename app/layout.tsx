import type { Metadata } from "next";
import { NAME, TITLE } from "./identity";
import "./styles/globals.css";

export const metadata: Metadata = {
  title: `${NAME} — ${TITLE}`,
  description: `Personal site of ${NAME} — ${TITLE.replace(/ \| /g, ", ").replace(/ · /g, ", ")}.`,
  metadataBase: new URL("https://craig-o-curtis.github.io"),
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
