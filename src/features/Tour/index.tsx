import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Modal from "../../features/Modal";
import Demo from "./modals/Demo";
import Welcome from "./modals/Welcome";
import { closeTour } from "./tourSlice";

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
