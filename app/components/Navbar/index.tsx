import React from "react";
import Container from "@/app/components/Container";
import Logo from "@/app/components/Logo";

const Navbar = (props: {}) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 borde-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
