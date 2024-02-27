import { doc, setDoc } from "firebase/firestore";
import { db } from "../assets/firebase";

export default async function markNotificationAsRead(userId, notificationId) {
  try {
    const notificationDoc = doc(
      db,
      "users",
      userId,
      "notifications",
      notificationId
    );

    await setDoc(notificationDoc, { read: true }, { merge: true });
  } catch (err) {
    throw err;
  }
}
