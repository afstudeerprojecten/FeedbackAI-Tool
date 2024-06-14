import React, { useState, useEffect } from "react";
import { fetchCourses } from "../../services/courseService";
import { fetchTeacher } from "../../services/teacherService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createAssignment } from "../../services/assignmentService";

const AssignmentNew: React.FC = () => {
    const [formData, setFormData] = useState({
        teacher_id: "",
        course_id: "",
        description: "",
        title: "",
        student_ages: "",
        teacher_name: "",
        word_count: "",
    });
    const [courses, setCourses] = useState<any[]>([]);
    // const [error, setError] = useState<string | null>(null);
    // const [success, setSuccess] = useState(false);
    // const [assignment, setAssignment] = useState<any>();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchCourses();
                setCourses(data);
            } catch (error: any) {
                console.error(error.message);
            }
        };

        fetchData();
    }, []);

    const handleChange = async (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        // If the name of the select field is 'course_id', update teacher_id when a course is selected
        if (name === "course_id") {
            const selectedCourse = courses.find(
                (course) => course.id === parseInt(value)
            );
            if (selectedCourse) {
                // console.log(`Selected Course ID: ${selectedCourse.id}`);
                // console.log(`Selected Teacher ID: ${selectedCourse.teacher_id}`);
                setFormData((prevState) => ({
                    ...prevState,
                    teacher_id: selectedCourse.teacher_id,
                }));

                // Fetch teacher details based on the selected course ID
                try {
                    const teacher = await fetchTeacher(selectedCourse.teacher_id);
                    if (teacher) {
                        // console.log(`Teacher Name: ${teacher.name}`);
                        // Update the teacher name in the form data
                        setFormData((prevState) => ({
                            ...prevState,
                            teacher_name: teacher.name,
                        }));
                    }
                } catch (error) {
                    console.error("Error fetching teacher:", error);
                }
            }
        }
    };

    const handleAssignmetSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        console.log("Form Data:", formData);
        try {
            const dataToSend = {
                ...formData,
                courseId: parseInt(formData.course_id),
                student_ages: parseInt(formData.student_ages),
                word_count: parseInt(formData.word_count),
            };
            const createdAssignment = await createAssignment(dataToSend);
            // setAssignment(createdAssignment);
            setFormData({
                teacher_id: "",
                course_id: "",
                description: "",
                title: "",
                student_ages: "",
                teacher_name: "",
                word_count: "",
            });
            toast.success("Assignment created successfully");
            setTimeout(() => {
                navigate("/assignment/" + createdAssignment.id);
            }, 2000);
        } catch (error: any) {
            toast.error("Failed to create assignment");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container w-1/2 mx-auto p-4 bgneutra-100 rounded dark:bg-dark-neutral">
            <h2 className="text-4xl font-bold mb-4 text-center text-light-text dark:text-dark-text pt-8 pb-4">
                Assignment Form
            </h2>
            <form>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label
                            className="block text-sm font-bold mb-2 text-light-text dark:text-dark-text"
                            htmlFor="course_id">
                            Course
                        </label>
                        <select
                            id="course_id"
                            name="course_id"
                            value={formData.course_id}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2 text-light-text dark:text-dark-text bg-light-neutral dark:bg-dark-neutral dark:border-gray-500 dark:text-dark-text dark:focus-dark-primary focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                            required
                        >
                            <option value="">Select Course</option>
                            {courses.map((org) => (
                                <option key={org.id} value={org.id}>
                                    {org.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="teachername"
                            className="block text-sm font-bold mb-2 text-light-text dark:text-dark-text"
                        >
                            Teacher Name
                        </label>
                        <input
                            type="text"
                            id="teachername"
                            placeholder="Teacher Name"
                            className="w-full border rounded px-3 py-2 text-light-text dark:text-dark-text bg-light-neutral dark:bg-dark-neutral dark:border-gray-500 dark:text-dark-text dark:focus-dark-primary"
                            required
                            value={formData.teacher_name}
                            disabled
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="title"
                        className="block text-sm font-bold mb-2 text-light-text dark:text-dark-text"
                    >
                        Assignment Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Enter Assignment Title"
                        className="w-full border rounded px-3 py-2 text-light-text dark:text-dark-text bg-light-neutral dark:bg-dark-neutral dark:border-gray-500 dark:text-dark-text dark:focus-dark-primary focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        value={formData.title}
                        onChange={(e) =>
                            setFormData((prevState) => ({
                                ...prevState,
                                title: e.target.value,
                            }))
                        }
                        required
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="description"
                        className="block text-sm font-bold mb-2 text-light-text dark:text-dark-text"
                    >
                        Assignment Description
                    </label>
                    <textarea
                        id="description"
                        placeholder="Enter Assignment Description"
                        className="mt-1 p-2 block w-full border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-light-text bg-light-neutral dark:bg-dark-neutral dark:border-gray-500 dark:text-dark-text"
                        value={formData.description}
                        onChange={(e) =>
                            setFormData((prevState) => ({
                                ...prevState,
                                description: e.target.value,
                            }))
                        }
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label
                            htmlFor="student_ages"
                            className="block text-sm font-bold mb-2 text-light-text dark:text-dark-text"
                        >
                            Age of Students
                        </label>
                        <input
                            type="number"
                            id="student_ages"
                            placeholder="Enter Age of Students"
                            className="w-full border rounded px-3 py-2 text-light-text dark:text-dark-text bg-light-neutral dark:bg-dark-neutral dark:border-gray-500 dark:text-dark-text dark:focus-dark-primary focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            value={formData.student_ages}
                            onChange={(e) =>
                                setFormData((prevState) => ({
                                    ...prevState,
                                    student_ages: e.target.value,
                                }))
                            }
                            required
                            min="0"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="word_count"
                            className="block text-sm font-bold mb-2 text-light-text dark:text-dark-text"
                        >
                            Word Count
                        </label>
                        <input
                            type="number"
                            id="word_count"
                            placeholder="Enter Word Count for the Assignment"
                            className="w-full border rounded px-3 py-2 text-light-text dark:text-dark-text bg-light-neutral dark:bg-dark-neutral dark:border-gray-500 dark:text-dark-text dark:focus-dark-primary focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            value={formData.word_count}
                            onChange={(e) =>
                                setFormData((prevState) => ({
                                    ...prevState,
                                    word_count: e.target.value,
                                }))
                            }
                            required
                            min="0"
                        />
                    </div>
                </div>
                <div className="flex justify-center mt-4">
                    {" "}
                    {/* Flex container to center the button */}
                    <button
                        type="submit"
                        className="btn btn-neutral dark:bg-dark-btn dark:text-light-text dark:btn-primary"
                        onClick={handleAssignmetSubmit}
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                            "Create Assignment"
                        )}
                    </button>
                </div>
            </form>
        </div >
    );
}

export default AssignmentNew;
