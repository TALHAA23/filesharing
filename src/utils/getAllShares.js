import { doc, getDoc } from "firebase/firestore";
import { db } from "../assets/firebase";

export default async function getAllShares(userId) {
  const userDoc = doc(db, "users", userId);
  const userSnaphot = await getDoc(userDoc);

  if (!userSnaphot.exists()) throw new Error("User Document not exists");
  const data = userSnaphot.data();
  const shares = data?.shares || false;
  return shares;
}
