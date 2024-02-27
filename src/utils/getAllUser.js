import { getDocs } from "firebase/firestore";
import { registeredUserCollection, usersCollection } from "../assets/firebase";
export default async function getAllUsers() {
  const userSnapshot = await getDocs(usersCollection);
  const users = userSnapshot.docs.map((doc) => ({
    ...doc.data().info,
    userId: doc.id,
  }));
  return users;
}
