"use client";

import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Barbershop } from "@prisma/client";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BarbershopItemProps {
  barbershop: Barbershop;
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  const router = useRouter();

  const handleBookClick = () => {
    router.push(`/barbershops/${barbershop.id}`);
  };

  return (
    <div>
      <Card className="min-w-full max-w-full rounded-2xl">
        <CardContent className="px-1 pb-0 pt-1">
          <div className="w-full h-[159px] relative">
            <div className="absolute top-2 left-2 z-50">
              <Badge
                variant="secondary"
                className="flex gap-1 items-center top-3 left-3 oppacity-90 bg-yellow-500"
              >
                <StarIcon size={12} className="fill-primary text-primary " />
                <span className="text-xs text-bold text-black">5.0</span>
              </Badge>
            </div>
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
            <Button
              variant="secondary"
              className="w-full mt-3 text-bold bg-yellow-500"
              onClick={handleBookClick}
            >
              <p className="text-black">Reservar</p>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BarbershopItem;
