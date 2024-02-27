import { doc, collection, addDoc } from "firebase/firestore";
import { db } from "../assets/firebase";

export default async function addNotification(userId, message) {
  const userDoc = doc(db, "users", userId);
  const notificationsCollection = collection(userDoc, "notifications");

  let notification = {
    message,
    read: false,
    timestamp: Date.now(),
  };

  await addDoc(notificationsCollection, notification);
}

// import { doc, updateDoc, arrayUnion } from "firebase/firestore";

// import { db } from "../assets/firebase";

// export default async function addNotification(userId, message) {
//   const userDoc = doc(db, "users", userId);
//   console.log(userDoc.id);
//   console.log(message);
//   let notification = {
//     message,
//     read: false,
//   };
//   // Get the current timestamp
//   let now = Date.now();

//   // Add the timestamp to the notification object
//   notification.timestamp = now;

//   // Update the document with the modified notification object
//   await updateDoc(userDoc, {
//     notifications: arrayUnion(notification),
//   });
// }
