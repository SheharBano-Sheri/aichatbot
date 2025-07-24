import { ThemeProvider } from "next-themes";
import SidebarWrapper from "@/components/sidebar-wrapper";
import { ChatProvider } from "@/components/chat-provider";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Chat App",
  description: "Chat interface",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ChatProvider>
            <SidebarWrapper>
              {children}
            </SidebarWrapper>
          </ChatProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
