import { SafeUser } from "@/app/types";

export default interface CurrentUser {
  currentUser?: SafeUser | null | undefined;
}
