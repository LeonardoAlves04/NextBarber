import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  // const { data, status } = useSession();

  const handleLogoutClick = () => signOut;
  return (
    <h1>
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
            </SheetContent>
          </Sheet>
        </CardContent>
      </Card>
    </h1>
  );
};

export default Header;
