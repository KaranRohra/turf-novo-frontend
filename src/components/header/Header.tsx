"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";
import HeaderDropdownMenu from "./HeaderDropdownMenu";

interface User {
  firstName: string;
  isLoggedIn: boolean;
}

interface HeaderProps {
  user: User;
}

const Header = ({ user }: HeaderProps) => {
  return (
    <header className="p-4 shadow-md bg-white">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">Turf Novo</h1>
        </div>

        {/* Search bar and Login/User for Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <Input type="text" placeholder="Search..." className="w-64" />
          {user.isLoggedIn ? (
            <HeaderDropdownMenu
              dropdownTitle={
                <div className="flex items-center">
                  <span className="text-gray-600">Hello, {user.firstName}</span>
                  <ChevronDown className="mt-1" />
                </div>
              }
            />
          ) : (
            <Button variant="outline">Login</Button>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="block md:hidden flex">
          <Input type="text" placeholder="Search..." className="w-50 mr-2" />
          <HeaderDropdownMenu showProfile={user.isLoggedIn} showBookingHistory={user.isLoggedIn} showLogout={user.isLoggedIn} showLogin={!user.isLoggedIn} />
        </div>
      </div>
    </header>
  );
};

export default Header;
