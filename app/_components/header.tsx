import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

const Header = () => {
  return (
    <h1>
      <Card>
        <CardContent className="p-5 justify-between flex flex-row items-center">
          <Image src="/logo.png" alt="logo" height={22} width={120} />
          <Button variant="outline" size="icon" className="h-8 w-8">
            <MenuIcon size={16} />
          </Button>
        </CardContent>
      </Card>
    </h1>
  );
};

export default Header;
