import React from "react";
import { Waitlist } from "@components/Home/Waitlist";

interface IWaitListProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: any;
  setData: any;
}
const Home = ({ isOpen, onClose, onOpen, setData }: IWaitListProps) => {
  return (
    <Waitlist
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      setData={setData}
    />
  );
};

export default Home;
