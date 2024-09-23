"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UI_PATH from "@/constants/ui-path-constants";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import HeaderDropdownMenu from "./HeaderDropdownMenu";

interface User {
  firstName: string;
  isLoggedIn: boolean;
}

interface HeaderProps {
  user: User;
}

const Header = ({ user }: HeaderProps) => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="p-4 shadow-md bg-white">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4 cursor-pointer" onClick={() => router.push(UI_PATH.HOME)}>
          <h1 className="text-xl font-bold">Turf Novo</h1>
        </div>

        {/* Search bar and Login/User for Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <Input type="text" placeholder="Search..." className="w-64" />
          {user.isLoggedIn ? (
            <HeaderDropdownMenu
              onMenuToggle={() => setIsDropdownOpen(!isDropdownOpen)}
              dropdownTitle={
                <div className="flex items-center cursor-pointer">
                  <span className="text-gray-600">Hello, {user.firstName}</span>
                  {isDropdownOpen ? <ChevronUp className="mt-1" /> : <ChevronDown className="mt-1" />}
                </div>
              }
            />
          ) : (
            <Button onClick={() => router.push(UI_PATH.LOGIN)}>Login</Button>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex">
          <Input type="text" placeholder="Search..." className="w-50 mr-2" />
          <HeaderDropdownMenu showProfile={user.isLoggedIn} showBookingHistory={user.isLoggedIn} showLogout={user.isLoggedIn} showLogin={!user.isLoggedIn} />
        </div>
      </div>
    </header>
  );
};

export default Header;
