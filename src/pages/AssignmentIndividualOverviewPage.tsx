import { useParams } from "react-router-dom";
import AssignmentIndividualOverview from "../components/Assignment/AssignmentIndividualOverview";
import GenerateTemplate from "../components/Templates/GenerateTemplate";

const AssignmentIndividualOverviewPage: React.FC = () => {
    const { id } = useParams<{ id: any }>();
    const user = sessionStorage.getItem('user');
    const role = user ? JSON.parse(user).role : null;



    return (
        <div className="container">
            <AssignmentIndividualOverview />
            {role === 'teacher' &&
                <GenerateTemplate assignmentId={parseInt(id)} />
            }

        </div>
    );
}

export default AssignmentIndividualOverviewPage;