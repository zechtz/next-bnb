import CurrentUser from "@/app/types/current-user";
import { useRouter } from "next/navigation";
import useLoginModal from "@/app/hooks/useLoginModal";
import React from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

interface IUseFavorite extends CurrentUser {
  listingId: number;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorited = React.useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = React.useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;

        if (hasFavorited) {
          request = () => axios.delete(`/api/v1/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/v1/favorites/${listingId}`);
        }

        await request();
        router.refresh();
        toast.success("Success");
      } catch (error){
        console.log('error', error);
        toast.error("Something went wrong");
      }
    },
    [currentUser, hasFavorited, listingId, loginModal, router]
  );
  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
