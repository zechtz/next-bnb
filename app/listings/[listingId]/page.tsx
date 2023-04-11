import React from "react";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";

import { getListingById } from "@/app/actions/getListingById";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ListingClient from "@/app/components/Listing/ListingClient";
import { SafeListing, SafeUser } from "@/app/types";
import getReservations from "@/app/actions/getReservations";

interface IParams {
  listingId: string;
  userId?: string;
  authorId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();
  const reservations = await getReservations(params);
  let safeListing = {} as SafeListing & { user: SafeUser };

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  if (currentUser) {
    safeListing = {
      ...listing,
      user: {
        ...currentUser,
      },
    };
  }

  return (
    <ClientOnly>
      <ListingClient
        listing={safeListing}
        reservations={reservations}
        currentUser={currentUser as SafeUser}
      />
    </ClientOnly>
  );
};

export default ListingPage;
