import { Box, Button, Input } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@components/firebase/firebase";
import { AuthContext } from "@components/Context/AuthContext";

export const Search = ({ chat, setChat }: any) => {
  const [userName, setuserName] = useState<any>("");
  const [user, setuser] = useState<any>("");
  const { currentUser } = useContext(AuthContext);

  const combinedId =
    currentUser?.uid > user.uid
      ? currentUser?.uid + user.uid
      : user.uid + currentUser?.uid;

  const handleSearch = async () => {
    // const response = chat?.filter((x: any) =>
    //   x[0]?.userInfo?.displayName?.includes(userName)
    // );
    // console.log({ response });
    // setChat(response);
    const q = query(
      collection(db, "user"),
      where("displayName" as string, "==", userName)
    );
    console.log("triggered");
    try {
      const querySnapshot = await getDocs(q);
      console.log({ querySnapshot });
      querySnapshot?.forEach((doc) => {
        setuser(doc.data());

        // setChat(doc.data());
      });
    } catch (error) {
      console.log(error);
    }
    // const chatsRef = collection(db, "userChats");

    // chatsRef
    //   .where("userInfo.displayName", "==", userName)
    //   .get()
    //   .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       // Access the document data here
    //       const chat = doc.data();
    //       console.log(chat);
    //     });
    //   })
    //   .catch((error) => {
    //     console.error("Error retrieving display name:", error);
    //   });
  };
  console.log({ chat, userName });
  const handleKey = (e: any) => {
    e.code == "Enter" && handleSearch();
  };
  const handleSelect = async () => {
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      console.log({ res });
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        await updateDoc(doc(db, "userChats", currentUser?.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser?.uid,
            displayName: currentUser?.displayName,
            photoURL: currentUser?.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {}
    setuser(null);
    setuserName("");
    console.log({ userName });
  };
  return (
    <Box w="90%" mx="auto">
      <Input
        onChange={(e) => setuserName(e.target.value)}
        onKeyDown={handleKey}
        value={userName}
        borderRadius="25px"
        placeholder="Search..."
        borderColor="gray.300"
      />
      {/* <Button onClick={handleSearch}>Search</Button> */}
      {user && (
        <Box onClick={handleSelect}>
          <div>{user.displayName}</div>
        </Box>
      )}
    </Box>
  );
};
