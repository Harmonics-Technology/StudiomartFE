import { Box, useDisclosure } from "@chakra-ui/react";
import { WaitListModal } from "@components/homeandcategory/Component/WaitListModal";
import React, { useState } from "react";
import { Footer, Header } from "..";

interface ChildProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: any;
  data: any;
  setData: any;
}

export const Layout: React.FC = ({ children }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [data, setData] = useState();

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement<ChildProps>(child)) {
      return React.cloneElement<ChildProps>(child, {
        isOpen,
        onClose,
        onOpen,
        data,
        setData,
      });
    }
    return child;
  });
  return (
    <>
      <Header onOpen={onOpen} />
      {childrenWithProps}
      <Footer />
      <WaitListModal isOpen={isOpen} onClose={onClose} data={data} />
    </>
  );
};
