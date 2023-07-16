import { Grid, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { AiOutlineUpload, AiOutlineCloudUpload } from "react-icons/ai";
import { ModalWrapper } from "ui";
import { Options } from "./Options";
import { UnsplashModal } from "./UnsplashModal";

export const OptionsModal = ({
  isOpen,
  onClose,
  fun,
}: {
  isOpen: boolean;
  onClose: any;
  fun: any;
}) => {
  const { isOpen: open, onOpen, onClose: close } = useDisclosure();

  return (
    <>
      <ModalWrapper
        isOpen={isOpen}
        onClose={onClose}
        title="Select a source"
        w="30%"
      >
        <Grid templateColumns={"repeat(2, 1fr)"} gap="1rem">
          <Options
            text="Upload from device"
            icon={AiOutlineUpload}
            onClick={() => fun.click.openDialog()}
          />
          <Options
            text="Search Photo online"
            icon={AiOutlineCloudUpload}
            onClick={onOpen}
          />
        </Grid>
      </ModalWrapper>

      {open && (
        <UnsplashModal open={open} close={close} fun={fun} onClose={onClose} />
      )}
    </>
  );
};
