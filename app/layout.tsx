import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import ClientOnly from "@/app/components/ClientOnly";
import ToasterProvider from "@/app/providers/ToasterProvider";

import RegisterModal from "@/app/components/Modal/RegisterModal";
import LoginModal from "@/app/components/Modal/LoginModal";
import RentModal from "@/app/components/Modal/RentModal";

import { getCurrentUser } from "@/app/actions/getCurrentUser";

export const metadata = {
  title: "AirBnb",
  description: "AirBnb Clone",
};

const font = Nunito({
  subsets: ["latin"],
});

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <LoginModal />
          <RentModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
