import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ApolloWrapper } from "@/lib/apolloWrapper";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rick And Morty",
  description: "Rick And Morty. One Hundred Years.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div id="app">
          <div className="portal-container items-center">
            <div className="portal">
              <div className="title-container">
                <div className="title">
                  Rick<span>and </span>Morty
                </div>
                <div className="title middle">
                  Rick<span>and </span>Morty
                </div>
                <div className="title bottom">
                  Rick<span>and </span>Morty
                </div>
              </div>
            </div>
          </div>
          <ApolloWrapper>{children}</ApolloWrapper>
        </div>
      </body>
    </html>
  );
}
