import { useParams } from "react-router-dom";
import AssignmentIndividualOverview from "../components/Assignment/AssignmentIndividualOverview";
import GenerateTemplate from "../components/Templates/GenerateTemplate";
import FeedbackForm from "../components/Feedback/FeedbackForm";
import TemplateTableOverview from "../components/Templates/TemplateTableOverview";

const AssignmentIndividualOverviewPage: React.FC = () => {
    const { id } = useParams<{ id: any }>();
    const user = sessionStorage.getItem('user');
    const role = user ? JSON.parse(user).role : null;

    return (
        <div className="w-3/4 content-center mx-auto">
            <AssignmentIndividualOverview />
            {role === 'teacher' &&
                <>
                    <GenerateTemplate assignmentId={parseInt(id)} />
                    <TemplateTableOverview />
                </>
            }
            {role === 'student' &&
                <FeedbackForm />
            }

        </div>
    );
}

export default AssignmentIndividualOverviewPage;