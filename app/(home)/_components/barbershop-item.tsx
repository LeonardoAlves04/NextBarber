import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Barbershop } from "@prisma/client";
import Image from "next/image";

interface BarbershopItemProps {
  barbershop: Barbershop;
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  return (
    <div>
      <Card className="min-w-[167px] max-w-[167px] rounded-2xl">
        <CardContent className="p-1 pb-0">
          <div className="px-1 w-full h-[159px] relative">
            <Image
              src={barbershop.imageUrl}
              alt={barbershop.name}
              style={{ objectFit: "cover" }}
              fill
              className="rounded-2xl"
            />
          </div>

          <div className="px-2 pb-3">
            <h2 className="font-bold mt-2 overflow-hidden text-ellipsis text-nowrap">
              {barbershop.name}
            </h2>
            <p className="text-sm text-gray-400 overflow-hidden text-ellipsis text-nowrap">
              {barbershop.address}
            </p>
            <Button variant="secondary" className="w-full mt-3">
              Reservar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BarbershopItem;
