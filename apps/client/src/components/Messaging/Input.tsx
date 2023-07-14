import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Image,
  Input,
  Square,
  Textarea,
} from "@chakra-ui/react";
import { AuthContext } from "@components/Context/AuthContext";
import { ChatContext } from "@components/Context/ChatContext";
import { db, storage } from "@components/firebase/firebase";
import { async, FirebaseError, uuidv4 } from "@firebase/util";
import Picker from "@emoji-mart/react";
import emojiData from "@emoji-mart/data";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useContext, useRef, useState } from "react";
import { MdAttachFile } from "react-icons/md";
import { Widget } from "@uploadcare/react-widget";
import NoSSR from "react-no-ssr";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { useComponentVisible } from "ui";

export const Inputs = () => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  console.log({ data });

  const [text, setText] = useState("");
  const [file, setFile] = useState<any>(null);
  const [imageLoading, setImageLoading] = useState<any>({
    status: false,
    total: "0",
  });
  const [saveImagePrompt, setSaveImagePrompt] = useState(false);
  const handleEmojiSelect = (emoji: any) => {
    setText(text + emoji.native);
  };

  const widgetApi = useRef<any>(null);
  const onChangeImg = (file: any) => {
    if (file) {
      file.progress((info: any) => {
        setImageLoading({ status: true, total: info.progress });
        if (info.state == "ready") {
          setImageLoading({ status: false, total: "" }),
            setFile(info.incompleteFileInfo.originalUrl);
        }
      });
    }
  };

  const handleSendWithEnter = (e: any) => {
    if (e.code == "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
      return;
    }
  };
  const handleSend = async () => {
    setText("");
    setFile(null);
    if (file) {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuidv4(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
          img: file,
          isRead: false,
        }),
      });
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuidv4(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
          isRead: false,
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
        isRead: false,
        senderId: currentUser.uid,
      },
      [data.chatId + ".date"]: new Date(),
      [data.chatId + ".isRead"]: false,
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
        isRead: false,
        senderId: currentUser.uid,
      },
      [data.chatId + ".date"]: new Date(),
      [data.chatId + ".isRead"]: false,
    });
  };

  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  return (
    <Flex
      bgColor="#e8e8e8"
      borderRadius="4px"
      h="60px"
      justify="center"
      pos="relative"
    >
      <Flex justify="space-between" w="95%" align="center">
        <HStack px="1rem" w="80%">
          <NoSSR>
            <Box display="none">
              <Widget
                publicKey="fda3a71102659f95625f"
                systemDialog
                imagesOnly
                onFileSelect={onChangeImg}
                ref={widgetApi}
                inputAcceptTypes={".jpeg,.jpg, .png"}
              />
            </Box>
          </NoSSR>

          <Square size="2rem">
            {imageLoading.status ? (
              <CircularProgressbar
                value={imageLoading.total}
                maxValue={1}
                text={`${imageLoading.total * 100}%`}
              />
            ) : (
              <Icon
                as={MdAttachFile}
                fontSize=".9rem"
                color="#292929"
                onClick={() => widgetApi.current.openDialog()}
              />
            )}
          </Square>

          <Icon
            as={BsFillEmojiSmileFill}
            fontSize=".9rem"
            color="#292929"
            cursor="pointer"
            onClick={() => setIsComponentVisible(true)}
          />

          <Textarea
            onChange={(e) => setText(e.target.value)}
            border="0"
            outline="0"
            color="#333333"
            fontSize=".8rem"
            minH="20px"
            placeholder="Type your message...."
            resize="none"
            value={text}
            onKeyDown={handleSendWithEnter}
            _focusVisible={{
              border: 0,
            }}
            _placeholder={{
              color: "#afafaf",
            }}
            w="full"
          />
        </HStack>
        <Button
          onClick={handleSend}
          isDisabled={text.trim().length < 1 && !file}
          bgColor={text.trim().length < 1 && !file ? "#afafaf" : "brand.100"}
          color="white"
          h="2.2rem"
          px="1.5rem"
          fontSize=".9rem"
        >
          Send
        </Button>
      </Flex>

      {isComponentVisible && (
        <Box pos="absolute" bottom="20" left="0" ref={ref}>
          <Picker
            data={emojiData}
            onEmojiSelect={handleEmojiSelect}
            previewPosition="none"
          />
        </Box>
      )}

      {file && (
        <Box
          w="40%"
          h="10rem"
          bgColor="white"
          p=".3rem"
          borderRadius="8px"
          overflow="hidden"
          pos="absolute"
          bottom="20"
          left="0"
          zIndex="800"
          boxShadow="md"
        >
          <Image
            src={file}
            alt="Uploaded Image"
            w="full"
            h="full"
            borderRadius="8px"
            objectFit="cover"
          />
        </Box>
      )}
    </Flex>
  );
};
