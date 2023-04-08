import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import ClientOnly from "@/app/components/ClientOnly";
import ToasterProvider from "@/app/providers/ToasterProvider";

import RegisterModal from "@/app/components/Modal/RegisterModal";
import LoginModal from "@/app/components/Modal/LoginModal";

export const metadata = {
  title: "AirBnb",
  description: "AirBnb Clone",
};

const font = Nunito({
  subsets: ["latin"],
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <LoginModal />
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
