"use client";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { LogOutIcon, MenuIcon, UserIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "./ui/avatar";

const Header = () => {
  const { data, status } = useSession();

  const handleLogOutClick = () => signOut();
  const handleLoginClick = () => signIn("google");

  return (
    <Card>
      <CardContent className="p-5 justify-between flex flex-row items-center">
        <Image src="/logo.png" alt="logo" height={22} width={120} />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon size={16} />
            </Button>
          </SheetTrigger>

          <SheetContent className="p-0">
            <SheetHeader className="text-left border-b border-secondary p-5">
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            {data?.user ? (
              <div className="flex justify-between px-5 py-6 items-center">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={data.user.image ?? ""} />
                  </Avatar>

                  <h2 className="font-bold">{data.user.name}</h2>
                </div>

                <Button variant="secondary" size="icon">
                  <LogOutIcon size={18} onClick={handleLogOutClick} />
                </Button>
              </div>
            ) : (
              <div className="flex flex-col px-5 py-6 gap-3">
                <div className="flex items center gap-2">
                  <UserIcon size={32} />
                  <h2 className="font-bold">Olá, faça seu login!</h2>
                </div>
                <Button
                  variant="secondary"
                  className="w-full justify-start"
                  onClick={handleLoginClick}
                >
                  Fazer Login
                </Button>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  );
};

export default Header;
