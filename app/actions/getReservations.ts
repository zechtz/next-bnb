import prisma from "@/app/libs/prismadb";
import { Reservation } from "@prisma/client";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(params: IParams) {
  const { listingId, userId, authorId } = params;

  const query: any = {};
  if (listingId) {
    query.listingId = parseInt(listingId);
  }

  if (userId) {
    query.userId = parseInt(userId);
  }

  if (authorId) {
    query.listing = { userId: parseInt(authorId) };
  }

  try {
    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeReservations = reservations.map((reservation: Reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      updatedAt: reservation.updatedAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
        updatedAt: reservation.listing.createdAt.toISOString(),
      },
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
