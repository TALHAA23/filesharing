import { auth } from "../assets/firebase";
export default async function signOutUser() {
  try {
    auth.signOut();
  } catch (err) {
    return err;
  }
}
