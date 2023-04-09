"use client";

import React from "react";
import Container from "@/app/components/Container";
import Logo from "@/app/components/Navbar/Logo";
import Search from "@/app/components/Navbar/Search";
import UserMenu from "@/app/components/Navbar/UserMenu";
import CurrentUser from "@/app/types/current-user";
import Category from "@/app/components/Navbar/Category";

const Navbar: React.FC<CurrentUser> = ({ currentUser }) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 borde-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Category />
    </div>
  );
};

export default Navbar;
