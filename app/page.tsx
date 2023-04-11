import Container from "@/app/components/Container";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import getListings, { IListingParams } from "@/app/actions/getListings";
import ListingCard from "@/app/components/Listing/Card";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { SafeListing } from "@/app/types";

interface HomeProps {
  searchParams: IListingParams,
}

const Home = async ({searchParams} : HomeProps) => {
  const listings = await getListings(searchParams);
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
          {listings.map((listing: SafeListing, index: number) => (
            <ListingCard key={index} data={listing} currentUser={currentUser} />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default Home;
