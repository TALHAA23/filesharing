import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { db } from "../assets/firebase";

export default function getReceivedFiles(userId, callback) {
  try {
    const userDoc = doc(db, "users", userId);
    return onSnapshot(userDoc, async (userSnapshot) => {
      if (userSnapshot.exists()) {
        const user = userSnapshot.data();
        const receivedFiles = user.receivedFiles;

        // Array to hold all file data
        let filesData = [];

        // Loop over the receivedFiles array
        for (let i = 0; i < receivedFiles.length; i++) {
          const fileRef = receivedFiles[i];
          const ownerId = fileRef.ownerId;
          const fileId = fileRef.fileId;
          // Get the owner's document
          const ownerDoc = doc(db, "users", ownerId);
          const ownerSnapshot = await getDoc(ownerDoc);

          if (ownerSnapshot.exists()) {
            const owner = ownerSnapshot.data();
            const files = owner.files;
            // Get the file data from the files object
            const fileData = files[fileId];
            // Add the file data to the array
            filesData.push(fileData);
          }
        }
        // Call the callback with the array of file data
        callback(filesData);
      } else {
        throw new Error(`No such user: ${userId}`);
      }
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../assets/firebase";

// export default async function getReceivedFiles(userId) {
//   const userDoc = doc(db, "users", userId);
//   const userSnapshot = await getDoc(userDoc);

//   if (userSnapshot.exists()) {
//     const user = userSnapshot.data();
//     const receivedFiles = user.receivedFiles;

//     // Array to hold all file data
//     let filesData = [];

//     // Loop over the receivedFiles array
//     for (let i = 0; i < receivedFiles.length; i++) {
//       const fileRef = receivedFiles[i];
//       const ownerId = fileRef.ownerId;
//       const fileId = fileRef.fileId;

//       // Get the owner's document
//       const ownerDoc = doc(db, "users", ownerId);
//       const ownerSnapshot = await getDoc(ownerDoc);

//       if (ownerSnapshot.exists()) {
//         const owner = ownerSnapshot.data();
//         const files = owner.files;

//         // Get the file data from the files object
//         const fileData = files[fileId];

//         // Add the file data to the array
//         filesData.push(fileData);
//       }
//     }

//     // Return the array of file data
//     return filesData;
//   } else {
//     throw new Error(`No such user: ${userId}`);
//   }
// }
