import { format } from "date-fns";
import Header from "../_components/header";
import { ptBR } from "date-fns/locale";
import Search from "./_components/search";
import BookingItem from "../_components/booking-item";
import { db } from "../_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const [barbershops, recommendedBarbershops, confirmedBookings] =
    await Promise.all([
      await db.barbershop.findMany({}),
      db.barbershop.findMany({
        orderBy: {
          id: "asc",
        },
      }),

      session?.user
        ? await db.booking.findMany({
            where: {
              userId: (session.user as any).id,
              date: {
                gte: new Date(),
              },
            },
            include: {
              service: true,
              barbershop: true,
            },
          })
        : Promise.resolve([]),
    ]);

  return (
    <div>
      <Header />

      <div className="pt-5 px-5 lg:flex lg:justify-center lg:flex-wrap">
        <h2 className="text-xl font-bold lg:text-2xl">
          {session?.user
            ? `Opa, ${session.user.name?.split(" ")[0]}!`
            : "Eae, vamos ficar na régua meu patrão?"}
        </h2>
        <p className="text-sm lg:text-2xl">
          Hoje é{" "}
          {format(new Date(), "EEEE',' dd 'de' MMMM", {
            locale: ptBR,
          })}
        </p>
      </div>

      <div className="px-5 mt-6 ">
        <Search />
      </div>

      <div className="mt-6 lg:mt-10">
        <h2 className="pl-5 text-xs uppercase text-gray-400 font-bold mb-3 lg:flex lg:justify-center lg:mb-7 lg:text-lg">
          Agendamentos
        </h2>

        {confirmedBookings.length > 0 && (
          <div className="px-5 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden cursor-pointer">
            {confirmedBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 lg:mt-10">
        <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold lg:flex lg:justify-center lg:mb-7 lg:text-lg">
          Recomendações
        </h2>

        <div className="flex gap-4 px-5 overflow-x-auto [&::-webkit-scrollbar]:hidden lg:justify-center">
          {barbershops.map((barbershop) => (
            <div key={barbershop.id} className="min-w-[167px] max-w-[167px]">
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 mb-[4.5rem] lg:mt-10">
        <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold lg:flex lg:justify-center lg:mb-7 lg:text-lg">
          Populares
        </h2>

        <div className="flex gap-4 px-5  overflow-x-auto [&::-webkit-scrollbar]:hidden lg:justify-center">
          {recommendedBarbershops.map((barbershop) => (
            <div key={barbershop.id} className="min-w-[167px] max-w-[167px]">
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
