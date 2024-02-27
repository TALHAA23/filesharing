import { doc, setDoc } from "firebase/firestore";
import { db } from "../assets/firebase";
export default async function recordFile(
  fileName,
  downloadURL,
  metadata,
  userId
) {
  try {
    metadata = validMetadata(metadata);
    const userDoc = doc(db, "users", userId);
    const userData = {
      files: {
        [fileName]: {
          metadata,
          downloadURL,
        },
      },
    };
    await setDoc(userDoc, userData, { merge: true });
    return true;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

//filter out undefined metadata
const validMetadata = (metadata) =>
  Object.fromEntries(
    Object.entries(metadata).filter(([key, value]) => value !== undefined)
  );
