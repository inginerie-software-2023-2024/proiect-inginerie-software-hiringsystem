import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import jwtInterceptor from "./JwtInterceptor";

const JobApplicationContext = createContext();

export const JobApplicationContextProvider = ({ children }) => {

    const navigate = useNavigate();

    const createApplication = async (jobId) => {
        await jwtInterceptor.post("http://localhost:8081/api/v1/application/create?jobId=" + jobId);
        navigate("/");
    }

    const eraseApplication = async (jobApplicationId) => {
        await jwtInterceptor.post("http://localhost:8081/api/v1/application/erase?id=" + jobApplicationId);
    }

    const withdrawApplication = async (jobApplicationId) => {
        await jwtInterceptor.post("http://localhost:8081/api/v1/application/withdraw?id=" + jobApplicationId);
    }

    return (
        <JobApplicationContext.Provider value={{ createApplication, eraseApplication, withdrawApplication }}>
            {children}
        </JobApplicationContext.Provider>
    );

};

export default JobApplicationContext;
