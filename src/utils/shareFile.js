import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "../assets/firebase";
import addNotification from "./addNotification";
import updateSharedFiles from "./updateSharedFiles";
export default async function shareFile(owner, userId, fileId) {
  const userDoc = doc(db, "users", userId);
  const userSnapshot = await getDoc(userDoc);
  const userEamil = userSnapshot.data().info.email;
  try {
    await updateDoc(userDoc, {
      receivedFiles: arrayUnion({ ownerId: owner.uid, fileId }),
    });
    await updateSharedFiles(owner.uid, fileId, userEamil, userSnapshot.id);
    await addNotification(userId, `${owner.email} send you a file: ${fileId}`);
  } catch (err) {
    throw err;
  }
}
