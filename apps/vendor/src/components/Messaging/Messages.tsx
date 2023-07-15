import { Box } from "@chakra-ui/react";
import { ChatContext } from "@components/Context/ChatContext";
import { db } from "@components/firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Message } from "./Message";

export const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      unSub();
    };
  }, [data.chatId]);

  //
  return (
    <Box>
      <Box
        h={{ base: "60vh", lg: "58vh" }}
        py="2rem"
        overflow="hidden auto"
        px="1rem"
      >
        {messages.map((m: any) => (
          <Message message={m} key={m?.id} />
        ))}
      </Box>
    </Box>
  );
};
