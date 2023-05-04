import React from "react";
import Modal from "../../features/Modal";
import { AiFillBulb } from "react-icons/ai";
import { BiChevronRight } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { closeTour } from "./tourSlice";
import Welcome from "./modals/Welcome";
import Demo from "./modals/Demo";

type Props = {};

const Tour = (props: Props) => {
  const [step, setStep] = React.useState(0);
  const opened = useAppSelector((state) => state.tour.opened);
  const dispatch = useAppDispatch();

  return (
    <Modal
      opened={opened}
      onClose={() => dispatch(closeTour())}
      components={[<Welcome />, <Demo />]}
    ></Modal>
  );
};

export default Tour;
