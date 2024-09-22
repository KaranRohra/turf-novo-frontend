"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UI_PATH from "@/constants/ui-path-constants";
import { useUser } from "@/providers/user-provider";
import { CreditCard, LogIn, LogOut, Menu, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { Cookies } from "react-cookie";

interface IHeaderDropdownMenuProps {
  dropdownTitle?: React.ReactNode;
  showProfile?: boolean;
  showBookingHistory?: boolean;
  showLogout?: boolean;
  showLogin?: boolean;
  onMenuToggle?: () => void;
}

export default function HeaderDropdownMenu({
  dropdownTitle,
  showProfile = true,
  showBookingHistory = true,
  showLogout = true,
  showLogin = false,
  onMenuToggle,
}: IHeaderDropdownMenuProps) {
  const cookies = new Cookies();
  const userContext = useUser();
  const router = useRouter();
  const navigateOnItemClick = (path: string) => router.push(path);

  const handleLogout = () => {
    cookies.remove("token");
    userContext.setUser(null);
    navigateOnItemClick(UI_PATH.LOGIN);
  };

  return (
    <DropdownMenu onOpenChange={onMenuToggle}>
      <DropdownMenuTrigger asChild>
        {dropdownTitle || (
          <Button variant="outline">
            <Menu className="h-5 w-5" />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white mt-2">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {showProfile && (
            <DropdownMenuItem className="cursor-pointer" onClick={() => navigateOnItemClick(UI_PATH.PROFILE)}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          )}
          {showBookingHistory && (
            <DropdownMenuItem className="cursor-pointer" onClick={() => navigateOnItemClick(UI_PATH.BOOKING_HISTORY)}>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Booking History</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {showLogout && (
          <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        )}
        {showLogin && (
          <DropdownMenuItem className="cursor-pointer" onClick={() => navigateOnItemClick(UI_PATH.LOGIN)}>
            <LogIn className="mr-2 h-4 w-4" />
            <span>Log in</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
