import {
  getCountFromServer,
  doc,
  getDoc,
  collection,
  setDoc,
  getDocs,
} from "firebase/firestore";

import { db } from "../lib/firebase";
const postOrGetUserId = async (id) => {
  try {
    const userRef = doc(db, "users", id);
    const docRef = await getDoc(userRef);
    if (!docRef.exists()) {
      const group = await decideAboutUserGroups();
      await setDoc(userRef, { id, group, stage: 1 });
      console.log(`User created with ID: ${id}, group: ${group}, stage: 1`);
      return { id, group, stage: 1 };
    } else {
      console.log(`User fetched with ID: ${id}`);
      return docRef.data();
    }
  } catch (error) {
    console.error("Error in postOrGetUserId:", error);
  }
};

const decideAboutUserGroups = async () => {
  try {
    const coll = collection(db, "users");
    const snapshot = await getCountFromServer(coll);
    const size = snapshot.data().count - 1;
    const group = (size % 14) + 1;
    return group;
  } catch (error) {
    console.error("Error in decideAboutUserGroups:", error);
  }
};

const setUserOnDb = async (user) => {
  try {
    const userRef = doc(db, "users", user.id);
    let didAnswerAttentionQuestion =
      localStorage.getItem("attentionQuestion") === "0";
    await setDoc(userRef, { ...user, didAnswerAttentionQuestion });
    console.log(`User updated with ID: ${user.id}`);
  } catch (error) {
    console.error("Error in setUser:", error);
  }
};

const getAllUsers = async () => {
  try {
    const coll = collection(db, "users");
    const snapshot = await getDocs(coll);
    const users = snapshot.docs.map((doc) => doc.data());
    return users;
  } catch (error) {
    console.error("Error in getAllUsers:", error);
  }
};

export { postOrGetUserId, setUserOnDb, getAllUsers };
