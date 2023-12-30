import InterviewSlotsContext from "@/context/InterviewSlotsProvider";
import { useContext } from "react";

const useInterviewSlots = () => {
  return useContext(InterviewSlotsContext);
};

export default useInterviewSlots;