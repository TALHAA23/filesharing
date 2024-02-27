import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../assets/firebase";
import recordFile from "./recordFile";
export default async function uploadFile(file, user, progressUpdate) {
  if (!user) throw new Error("Signup required");

  const storageRef = ref(storage, `user_files/${user.uid}/${file.name}`);

  const uploadTask = uploadBytesResumable(storageRef, file);

  // Wrap the upload task in a Promise
  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        progressUpdate(progress);
      },
      (error) => {
        // On error, reject the Promise
        reject(error);
      },
      async () => {
        // On success, resolve the Promise
        const metadata = (await uploadTask).metadata;
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await recordFile(file.name, downloadURL, metadata, user.uid);
        resolve();
      }
    );
  });
}
