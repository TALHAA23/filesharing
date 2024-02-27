import { doc, setDoc } from "firebase/firestore";
import { db } from "../assets/firebase";

export default async function createEmptyUserDoc(userId, email) {
  const userDoc = doc(db, "users", userId);
  await setDoc(userDoc, {
    info: { email },
    receivedFiles: [],
    files: {},
    shares: {},
  });
}
