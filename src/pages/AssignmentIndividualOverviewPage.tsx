import { Link, useParams } from "react-router-dom";
import AssignmentIndividualOverview from "../components/Assignment/AssignmentIndividualOverview";
import GenerateTemplate from "../components/Templates/GenerateTemplate";
import FeedbackForm from "../components/Feedback/FeedbackForm";
import TemplateTableOverview from "../components/Templates/TemplateTableOverview";
import { ToastContainer } from "react-toastify";

const AssignmentIndividualOverviewPage: React.FC = () => {
    const { id } = useParams<{ id: any }>();
    const user = sessionStorage.getItem('user');
    const role = user ? JSON.parse(user).role : null;

    return (
        <div className="bg-neutral-100 dark:bg-dark-neutral">
            <div className="w-3/4 content-center mx-auto">
                <ToastContainer position="top-center" />
                <div className="btn bg-neutral-300 dark:text-light-text dark:btn-primary mb-8">
                    <Link to="/assignment">Back to overview</Link>
                </div>
                <AssignmentIndividualOverview />
                {role === 'teacher' &&
                    <>
                        <GenerateTemplate assignmentId={parseInt(id)} />
                        <TemplateTableOverview />
                    </>
                }
                {role === 'student' &&
                    <FeedbackForm assignmentId={parseInt(id)} />
                }

            </div>
        </div>

    );
}

export default AssignmentIndividualOverviewPage;