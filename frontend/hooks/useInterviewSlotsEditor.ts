import InterviewSlotsEditContext from "@/context/InterviewSlotsEditProvider";
import { useContext } from "react";

const useInterviewSlotsEditor = () => {
  return useContext(InterviewSlotsEditContext);
};

export default useInterviewSlotsEditor;