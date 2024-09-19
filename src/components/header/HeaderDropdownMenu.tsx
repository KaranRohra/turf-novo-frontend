import { CreditCard, LogIn, LogOut, Menu, Settings, User } from "lucide-react";

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

interface IHeaderDropdownMenuProps {
  dropdownTitle?: React.ReactNode;
  showProfile?: boolean;
  showBookingHistory?: boolean;
  showLogout?: boolean;
  showLogin?: boolean;
}

export default function HeaderDropdownMenu({
  dropdownTitle,
  showProfile = true,
  showBookingHistory = true,
  showLogout = true,
  showLogin = false,
}: IHeaderDropdownMenuProps) {
  return (
    <DropdownMenu>
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
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          )}
          {showBookingHistory && (
            <DropdownMenuItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Booking History</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {showLogout && (
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        )}
        {showLogin && (
          <DropdownMenuItem>
            <LogIn className="mr-2 h-4 w-4" />
            <span>Log in</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
