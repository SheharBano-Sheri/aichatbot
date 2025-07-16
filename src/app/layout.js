import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
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
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden`}>
        <SidebarProvider>
          <AppSidebar />
          <SidebarTrigger className="fixed top-4 left-4 z-50" />
          <main className="flex flex-1 h-screen w-full overflow-hidden">{children}</main>
        </SidebarProvider>
      </body>
    </html>
  );
}
