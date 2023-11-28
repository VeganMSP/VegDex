import {Metadata} from "next";
import {Footer, Header} from "@/app/ui/headers";
import "./globals.css";
import {roboto} from "@/app/ui/fonts";
import {SessionProvider} from "next-auth/react";
import {auth} from "@/auth";

export const metadata: Metadata = {
  title: "VegDex",
  description: "VegDex is a vegan restaurant directory."
};

export default async function RootLayout({children,}: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang={"en"} className={"bg-white"}>
      <body className={`${roboto.className} flex flex-col h-screen`}>
      <Header/>
      <div className={"pb-3 w-full"}>
        <div className={"w-5/6 mx-auto px-3"}>
          {children}
        </div>
      </div>
      <Footer/>
      </body>
      </html>
    </SessionProvider>
  );
}
