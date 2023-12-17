import { useContext } from "react";
import InterviewContext from "@/context/InterviewProvider";

const useInterview = () => {
  return useContext(InterviewContext);
};

export default useInterview;