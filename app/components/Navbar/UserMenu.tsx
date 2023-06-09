"use client";

import Avatar from "@/app/components/Avatar";
import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import MenuItem from "@/app/components/Navbar/MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import CurrentUser from "@/app/types/current-user";
import { signOut } from "next-auth/react";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";

const UserMenu: React.FC<CurrentUser> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const registerModel = useRegisterModal();
  const rentModal = useRentModal();
  const loginModal = useLoginModal();
  const router = useRouter();

  const toggleOpen = React.useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = React.useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    // open rent modal
    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          className="hidden md:block text-sm font-semibold py-2 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          onClick={onRent}
        >
          Airbnb Your Home
        </div>
        <div
          className="p-4 md:py-2 md:px-2 border-[1px] border-neutral-100 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition "
          onClick={toggleOpen}
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => router.push("/trips")}
                  label="My Trips"
                />
                <MenuItem
                  onClick={() => router.push("/favorites")}
                  label="My Favorites"
                />
                <MenuItem
                  onClick={() => router.push("/reservations")}
                  label="My Reservations"
                />
                <MenuItem
                  onClick={() => router.push("/properties")}
                  label="My Properties"
                />
                <MenuItem onClick={rentModal.onOpen} label="AirBnb My Home" />
                <hr />
                <MenuItem onClick={() => signOut()} label="LogOut" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModel.onOpen} label="Sign Up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default UserMenu;
