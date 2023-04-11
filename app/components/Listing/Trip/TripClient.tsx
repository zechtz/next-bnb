"use client";

import React from "react";
import { SafeReservation, SafeUser } from "@/app/types";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "@/app/components/Listing/Card";

interface TripClientProps {
  currentUser: SafeUser;
  reservations: SafeReservation[];
}

const TripClient: React.FC<TripClientProps> = ({
  currentUser,
  reservations,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = React.useState("");

  const onCancel = React.useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/v1/reservations/${id}`)
        .then(() => {
          toast.success("Reservation Cancelled");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
          throw new Error(error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you're heading and where you've been"
      />
      <div
        className="
        mt-10
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-5
        gap-8
        "
      >
        {reservations.map((reservation: SafeReservation, idx: number) => (
          <ListingCard
            key={idx}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id.toString()}
            onAction={onCancel}
            disabled={deletingId === reservation.id.toString()}
            actionLabel="Cancel Reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default TripClient;
