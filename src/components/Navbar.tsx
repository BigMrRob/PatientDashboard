import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Calendar,
  CreditCard,
  House,
  MessageSquare,
  Users,
  Settings,
  EllipsisVertical,
} from "lucide-react";
import { UserDropdownMenu } from "./UserDropdownMenu";
import { Button } from "./ui/button";

const navItems = [
  { label: "Overview", icon: <House size={17} /> },
  { label: "Patients", icon: <Users size={17} /> },
  { label: "Schedule", icon: <Calendar size={17} /> },
  { label: "Message", icon: <MessageSquare size={17} /> },
  { label: "Transactions", icon: <CreditCard size={17} /> },
];

export function Navbar() {
  return (
    <nav className="mx-5 my-2 flex items-center justify-between rounded-full bg-white px-10">
      <Image src="/test-logo.svg" alt="logo" width={161} height={51} />
      <ul className="flex items-center justify-center gap-4 py-3">
        {navItems.map((item) => (
          <li
            key={item.label}
            className="flex items-center justify-center gap-2"
          >
            <Link
              href="#"
              className={cn(
                "flex items-center justify-center gap-2 rounded-full px-3 py-2 hover:bg-[#01F0D0]",
                item.label === "Patients" && "bg-[#01F0D0]",
              )}
            >
              {item.icon}
              <p className="text-xs font-medium">{item.label}</p>
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src="/doctor.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium">Dr. Jose Simmons</p>
          <p className="text-xs text-[#808080]">General Practitioner</p>
        </div>
        <Separator orientation="vertical" className="h-10" />
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-10 w-4 p-0 hover:bg-transparent"
              >
                <Settings size={17} />
              </Button>
            </DropdownMenuTrigger>
            <UserDropdownMenu />
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-10 w-4 p-0 hover:bg-transparent"
              >
                <EllipsisVertical size={17} />
              </Button>
            </DropdownMenuTrigger>
            <UserDropdownMenu />
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
