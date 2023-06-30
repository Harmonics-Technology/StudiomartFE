import {
  Avatar,
  Box,
  Flex,
  Heading,
  HStack,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@components/firebase/firebase";

export const Search = ({ chat, setChat, handleSelect }: any) => {
  const [userName, setuserName] = useState<any>("");
  const [user, setuser] = useState<any>("");

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName" as string, "==", userName)
    );
    // console.log("triggered");
    try {
      const querySnapshot = await getDocs(q);
      console.log({ querySnapshot });
      querySnapshot?.forEach((doc) => {
        setuser(doc.data());
        setChat(undefined);
      });
    } catch (error) {
      console.log(error);
    }
  };
  console.log({ chat, userName });
  const handleKey = (e: any) => {
    e.code == "Enter" && handleSearch();
  };

  return (
    <Box>
      <Box w="90%" mx="auto">
        <Input
          onChange={(e) => setuserName(e.target.value)}
          onKeyDown={handleKey}
          value={userName}
          borderRadius="25px"
          placeholder="Search..."
          borderColor="gray.300"
        />
      </Box>
      {/* <Button onClick={handleSearch}>Search</Button> */}
      {user && (
        <Box mt="1rem">
          <Text textAlign="center" fontSize=".9rem">
            User: {userName} found:
          </Text>
          <Flex
            justify="space-between"
            px="1rem"
            key={user?.uid}
            onClick={() => handleSelect(user)}
            cursor="pointer"
          >
            <HStack spacing={2} w="78%">
              <Avatar src={user?.photoURL} name={user?.displayName} size="md" />
              <Box>
                <Heading fontSize="1rem" color="#333333" mb=".1rem">
                  {user?.displayName}
                </Heading>
                <Text mb="0" fontSize=".9rem" noOfLines={1}>
                  {user?.text}
                </Text>
              </Box>
            </HStack>
          </Flex>
        </Box>
      )}
    </Box>
  );
};
