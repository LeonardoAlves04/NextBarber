import { getServerSession } from "next-auth";
import Header from "../_components/header";
import { redirect } from "next/navigation";
import { db } from "../_lib/prisma";
import BookingItem from "../_components/booking-item";
import { authOptions } from "../_lib/auth";

const BookingsPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/");
  }

  const [confirmedBookings, finishedBookings] = await Promise.all([
    db.booking.findMany({
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
    }),

    db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: {
          lt: new Date(),
        },
      },
      include: {
        service: true,
        barbershop: true,
      },
    }),
  ]);

  return (
    <>
      <Header />

      <div className="px-5 py-6">
        <h1 className="text-xl font-bold mb-6 lg:flex lg:justify-center lg:text-3xl">
          Agendamentos
        </h1>

        {confirmedBookings.length > 0 && (
          <>
            <h2 className="text-gray-400 uppercase text-sm font-bold mb-3 lg:flex lg:justify-center lg:mt-10 lg:mb-5 lg:text-2xl">
              Confirmados
            </h2>

            <div className="flex flex-col gap-3 cursor-pointer">
              {confirmedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </>
        )}

        {finishedBookings.length > 0 && (
          <>
            <h2 className="text-gray-400 uppercase text-sm font-bold mt-6 mb-3 lg:text-2xl lg:flex lg:justify-center lg:mt-10 lg:mb-5">
              Finalizados
            </h2>

            <div className="flex flex-col gap-3 cursor-pointer">
              {finishedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default BookingsPage;
