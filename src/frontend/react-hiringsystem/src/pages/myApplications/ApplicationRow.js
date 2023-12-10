import {useContext} from "react";
import JobApplicationContext from "../../components/shared/JobApplicationContext";

const ApplicationRow = ({index, application}) => {
    const {withdrawApplication} = useContext(JobApplicationContext);

    const withdraw = async () => {
        await withdrawApplication(application.job_application.id);
        window.location.reload();
    }

    return (
        <tr>
            <th scope="row">{index}</th>
            <td>{application.job.title}</td>
            <td>{application.job_application.applicationDate}</td>
            <td>{application.job_application.status}</td>
            <td><div className="btn btn-danger" onClick={withdraw}>Withdraw application</div></td>
        </tr>
    )
}

export default ApplicationRow;