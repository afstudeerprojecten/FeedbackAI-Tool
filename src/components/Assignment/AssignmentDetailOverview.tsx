import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAssigments } from "../../services/assignmentService";
import { fetchCourses } from "../../services/courseService";

const AssignmentDetailOverview: React.FC = () => {
    const [assignments, setAssignments] = useState<any[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<any[]>([]);
    const [courses, setCourses] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchAssigments();
                setAssignments(data);
                const data1 = await fetchCourses();
                setCourses(data1);
                setFilteredCourses(data1);
                (data);
            } catch (error: any) {
                console.error(error.message);
            }
        };

        fetchData();
    }, []);

    const courseAssignments = (courseId: number) => {
        // assignments for a course, sorted alphabetically by assignment title
        return assignments.filter(assignment => assignment.course.id === courseId).sort((a, b) => a.title.localeCompare(b.title));

    }
    const handleViewMore = (id: number) => {
        navigate(`/assignment/${id}`);
    }

    const shortenDescription = (description: string) => {
        return description.length > 100 ? `${description.substring(0, 100)}...` : description;
    }

    const filterCourses = (courseId: number) => {
        const filteredCourses = [...courses].filter(course => course.id === courseId);
        setFilteredCourses(filteredCourses);
    }
    const removeFilter = () => {
        setFilteredCourses(courses);
    }



    return (
        <div className="w-3/4 mx-auto mt-10 pb-10">

            <div>
                <div className="btn ml-3 mr-2" onClick={() => removeFilter()}>
                    All courses
                </div>
                {courses.map(course => (
                    <div className="btn btn-light-btn dark:btn-dark-btn mr-2" onClick={() => filterCourses(course.id)}>
                        {course.name}
                    </div>
                    ))}
            </div>

            <div>
                {filteredCourses.map(course => (
                    <div >
                        <h2 className="text-2xl font-bold text-center mt-14 mb-2 bg-white dark:bg-gray-800 rounded-lg m-3 pt-2 pb-2">
                            {course.name}</h2>
                            { (courseAssignments(course.id).length === 0) &&
                                <div className="text-center ">No assignments for this course</div>
                            }
                        <div className="grid xl:grid-cols-3 gap-4 md:grid-cols-2 grid-cols-1">
                            {
                            courseAssignments(course.id).map(assignment => (
                                <div key={assignment.id} className="card text-light-text dark:text-dark-text bg-white dark:bg-gray-800 rounded-lg p-2 m-3">
                                    <div className="card-body ">
                                        <h3 className="text-lg font-bold pb-1">
                                            {assignment.title}</h3>
                                        <p className="pb-3">{shortenDescription(assignment.description)}</p>
                                        <div className="btn bg-light-btn text-dark-text dark:bg-dark-btn dark:text-light-text dark:btn-primary mt-1 w-1/4" onClick={() => handleViewMore(assignment.id)}>
                                            More...</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                ))}
            </div>



        </div>

    );

}

export default AssignmentDetailOverview;