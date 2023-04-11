import { SafeUser } from "@/app/types";

import Category from "@/app/components/Navbar/Category";
import Container from "@/app/components/Container";
import Logo from "@/app/components/Navbar/Logo";
import UserMenu from "@/app/components/Navbar/UserMenu";
import Search from "@/app/components/Navbar/Search";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div
        className="
          py-4 
          border-b-[1px]
        "
      >
        <Container>
          <div
            className="
            flex 
            flex-row 
            items-center 
            justify-between
            gap-3
            md:gap-0
          "
          >
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
