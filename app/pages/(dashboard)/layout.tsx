import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import SideBar from "@/components/layout/sidebar";
import Navy from "./components/navbar";
import Footer from "./components/footer/page";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <>
          <div className="flex gap-2">
            <SideBar />
            <div>
              <Navy />
              {children}
            </div>
          </div>
          <Footer />
        </>
      </body>
    </html>
  );
}
