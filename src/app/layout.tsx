import Providers from "@/components/Providers";
import "./globals.css";

// Done after the video and optional: add page metadata
export const metadata = {
  title: "KhiKhi",
  description: "Welcome to the KhiKhi",
  
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/chat.svg"></link>
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
