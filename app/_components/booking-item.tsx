import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";

const BookingItem = () => {
  return (
    <Card>
      <CardContent className="p-5 flex justify-between py-0">
        <div className="flex flex-col gap-2 py-5">
          <Badge className="bg-[#221C30] text-primary hover:bg-[#221C30] w-fit">
            Confirmado
          </Badge>
          <h2 className="font-bold">Corte de Cabelo</h2>

          <div className="flex items-center gap-2">
            <Avatar>
              <img
                src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png"
                alt="icon"
              />
              <AvatarFallback>B</AvatarFallback>
            </Avatar>

            <h3 className="text-sm">Vintage Barber</h3>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center border-l border-solid border-secondary px-3">
          <p>Fevereiro</p>
          <p className="text-2xl">06</p>
          <p className="text-sm">09:45</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingItem;
