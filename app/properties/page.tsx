import React from "react";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import getListings from "@/app/actions/getListings";
import PropertiesClient from "@/app/properties/PropertiesClient";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please sign in first" />
      </ClientOnly>
    );
  }

  const listings = await getListings({
    userId: currentUser.id.toString(),
  });
  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No listings found"
          subtitle="Looks like you have any listings'"
        />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <PropertiesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default PropertiesPage;
