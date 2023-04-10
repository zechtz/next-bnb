import Container from "@/app/components/Container";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import getListings from "@/app/actions/getListings";
import ListingCard from "@/app/components/Listing/Card";
import { Listing } from "@prisma/client";
import getCurrentUser from "@/app/actions/getCurrentUser";
import CurrentUser from "@/app/types/current-user";

const Home = async () => {
  const listings = await getListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div
          className="
            pt-24
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
            "
        >
          {listings.map((listing: Listing, index: number) => (
            <ListingCard key={index} data={listing} currentUser={currentUser as CurrentUser} />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default Home;
