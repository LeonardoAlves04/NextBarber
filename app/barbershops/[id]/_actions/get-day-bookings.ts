"use server";

import { db } from "@/app/_lib/prisma";
import { endOfDay, startOfDay } from "date-fns";

export const getDayBookings = async (barberShopId: string, date: Date) => {
  const bookings = await db.booking.findMany({
    where: {
      barberShopId,
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
  });

  return bookings;
};
