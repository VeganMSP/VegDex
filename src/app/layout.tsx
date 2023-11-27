import {Roboto} from "next/font/google";
import {Metadata} from "next";
import {Footer} from "@/components/Footer";
import {Header} from "@/components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import {Container} from "reactstrap";

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "VegDex",
  description: "VegDex is a vegan restaurant directory."
};

export default function RootLayout({children,}: { children: React.ReactNode }) {
  return (
    <html lang={"en"} className={"bg-white"}>
    <body className={roboto.className}>
    <Header/>
    <div className={"flex-shrink-0 pb-3"}>
      <Container>
        {children}
      </Container>
    </div>
    <Footer/>
    </body>
    </html>
  );
}
