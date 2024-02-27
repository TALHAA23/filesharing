import { doc, runTransaction } from "firebase/firestore";
import { db } from "../assets/firebase";

export default async function updateSharedFiles(
  userId,
  fileId,
  receiverName,
  receiverUid
) {
  const userDoc = doc(db, "users", userId);

  await runTransaction(db, async (transaction) => {
    const userSnapshot = await transaction.get(userDoc);
    if (!userSnapshot.exists()) {
      throw "Document does not exist!";
    }

    const userData = userSnapshot.data();
    const shares = userData?.shares || {};
    const sharedFile = shares[fileId] || { receivers: [] };

    sharedFile.receivers.push({
      receiverName,
      receiverUid,
    });

    shares[fileId] = sharedFile;

    transaction.update(userDoc, { shares: shares });
  });
}
