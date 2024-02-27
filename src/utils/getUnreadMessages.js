import { doc, collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../assets/firebase";

export default function getUnreadNotifications(userId, callback) {
  const userDoc = doc(db, "users", userId);
  const notificationsCollection = collection(userDoc, "notifications");
  const q = query(notificationsCollection, where("read", "==", false));
  return onSnapshot(q, (snapshot) => {
    let unreadNotifications = [];
    snapshot.forEach((doc) => {
      unreadNotifications.push({ ...doc.data(), id: doc.id });
    });
    callback(unreadNotifications);
  });
}
