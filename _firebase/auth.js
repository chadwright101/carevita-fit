import { signInWithEmailAndPassword, signOut } from "firebase/auth";

import { auth } from "./firebase";

export async function loginWithEmailAndPassword(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user.uid;
  } catch (error) {
    throw error;
  }
}

export async function logoutUser() {
  try {
    await signOut(auth);
    window.location.href = "/login";
  } catch (error) {
    throw error;
  }
}
