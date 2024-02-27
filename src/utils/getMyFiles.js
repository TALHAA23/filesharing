import { doc, getDoc } from "firebase/firestore";
import { db } from "../assets/firebase";
export default async function getUserFiles(userId) {
  const userDocRef = doc(db, "users", userId);
  try {
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      return userDocSnap.data().files;
    } else {
      throw new Error("No File Exists");
    }
  } catch (err) {
    throw err;
  }
}
