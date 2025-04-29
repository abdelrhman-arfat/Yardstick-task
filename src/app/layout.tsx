import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import SetUserID from "@/components/SetUserID";
import { Toaster } from "react-hot-toast";
const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Transaction App",
  description:
    "This app to follow your transaction with charts and modern dashboard",
  authors: [
    {
      name: "Abdo Yasser",
      url: "https://github.com/abdelrhman-arfat/Yardstick-task",
    },
  ],
  keywords: [
    "transaction",
    "dashboard",
    "charts",
    "money",
    "nextjs",
    "react",
    "mongodb",
    "Yardstick",
    "full stack",
    "backend",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}  antialiased`}>
        <SidebarProvider>
          <Toaster position="top-center" reverseOrder={false} />
          <AppSidebar />
          <main className="w-full py-10 px-2 sm:px-10">
            <SidebarTrigger size={"icon"} />
            <SetUserID />
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
