import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../assets/firebase";
import createEmptyUserDoc from "./createEmptyUserDoc";

export default async function createUser(email, password, username) {
  console.log(email, password);
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    updateProfile(user, {
      displayName: username,
    });
    await createEmptyUserDoc(user.uid, user.email);
    return "User created successfully";
  } catch (error) {
    const errorMessage = error.message;
    throw new Error(`Error creating user: ${errorMessage}`);
  }
}
