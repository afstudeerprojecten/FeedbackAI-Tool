import React, { useState, useEffect } from "react";
import { fetchCourses } from "../../services/courseService";
import { fetchTeacher } from "../../services/teacherService";
import { createAssignment } from "../../services/assignmentService";
import {
  generateTemplate,
  createTemplate,
} from "../../services/templateService";

const AssignmentForm: React.FC = () => {
  const [formData, setFormData] = useState({
    teacher_id: "",
    course_id: "",
    description: "",
    title: "",
    student_ages: "",
    teacher_name: "",
    word_count: "",
  });
  const [loading, setLoading] = useState(false);
  const [loadingTemplate, setLoadingTemplate] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [templateSuccess, setTemplateSuccess] = useState(false);
  const [templateError, setTemplateError] = useState<string | null>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [assignment, setAssignment] = useState<any>();
  const [template, setTemplate] = useState<any>();
  const [templateCount, setTemplateCount] = useState(0);

  // Placeholder function to simulate response from OpenAI API

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
        console.log(`Selected Course ID: ${selectedCourse.id}`);
        console.log(`Selected Teacher ID: ${selectedCourse.teacher_id}`);
        setFormData((prevState) => ({
          ...prevState,
          teacher_id: selectedCourse.teacher_id,
        }));

        // Fetch teacher details based on the selected course ID
        try {
          const teacher = await fetchTeacher(selectedCourse.teacher_id);
          if (teacher) {
            console.log(`Teacher Name: ${teacher.name}`);
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
    setError(null);
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
      setSuccess(true);
      setAssignment(createdAssignment);
      setFormData({
        teacher_id: "",
        course_id: "",
        description: "",
        title: "",
        student_ages: "",
        teacher_name: "",
        word_count: "",
      });
      console.log("Assignment created:", assignment);
      setTimeout(() => {
        // navigate('/assignments');
      }, 2000);
    } catch (error: any) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  const handleTemplateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTemplateError(null);
    try {
      if (templateCount >= 3) {
        return setTemplateError(
          "You have reached the maximum number of templates"
        );
      }
      setLoadingTemplate(true);
      const createdTemplate = await generateTemplate(assignment.id);
      setTemplate(createdTemplate);
      console.log("Template created:", template);
      setTemplateSuccess(true);
      setTemplateCount((prevCount) => prevCount + 1);
      console.log("Template Count:", templateCount);
      setTimeout(() => {
        // navigate('/assignments');
      }, 2000);
    } catch (error: any) {
      setTemplateError(error);
    } finally {
      setLoadingTemplate(false);
    }
  };
  const handleTemplateAccept = async (e: React.FormEvent) => {
    e.preventDefault();
    setTemplateError(null);
    try {
      // Accept the template
      createTemplate({
        template_content: template,
        assignment_id: assignment.id,
      });
      console.log("Template accepted:", template);
      setTemplate("");
      setTimeout(() => {
        // navigate('/assignments');
      }, 2000);
    } catch (error: any) {
      setTemplateError(error);
    } finally {
      setLoadingTemplate(false);
    }
  };

  const handleTemplateDecline = async (e: React.FormEvent) => {
    e.preventDefault();
    setTemplateError(null);
    try {
      if (templateCount <= 0) {
        return setError("No template to decline");
      } else {
        setTemplateCount((prevCount) => prevCount - 1);
      }
      // Decline the template
      setTemplate("");
      console.log("Template declined:", template);
      setTimeout(() => {
        // navigate('/assignments');
      }, 2000);
    } catch (error: any) {
      setTemplateError(error);
    } finally {
      setLoadingTemplate(false);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-light-neutral rounded dark:bg-dark-neutral">
      <div className="bg-light-neutral rounded px-8 pt-6 pb-8 mb-4 dark:bg-dark-neutral">
        <h2 className="text-2xl font-bold mb-4 text-center text-light-text dark:text-dark-text">
          Assignment Form
        </h2>
        <form>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2 text-light-text dark:text-dark-text"
                htmlFor="course_id"
              >
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
              className="btn bg-light-btn text-dark-text dark:bg-dark-btn dark:text-light-text dark:btn-primary"
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
          {error && <div className="alert alert-error mt-4 py-2 px-4">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>{error.toString()}</div>}
          {success && (
             <div className="alert alert-success mt-4 py-2 px-4">
             <svg
               xmlns="http://www.w3.org/2000/svg"
               className="stroke-current shrink-0 h-6 w-6"
               fill="none"
               viewBox="0 0 24 24"
             >
               <path
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 strokeWidth="2"
                 d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
               />
             </svg>
              Assignment created successfully!
            </div>
          )}
        </form>
      </div>
      <div className="flex justify-center">
      <div className="tooltip tooltip-left" data-tip="This allows you to directly generate templates for the assignment you just created">
        <button
          type="submit"
          onClick={handleTemplateSubmit}
          disabled={loadingTemplate}
          className="btn bg-light-btn text-dark-text dark:bg-dark-btn dark:text-light-text dark:btn-primary"
        >
          {loadingTemplate ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            "Generate Template"
          )}
        </button>
        </div>
      </div>
      {templateError && (
        <div className="alert alert-error mt-4 py-2 px-4">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{templateError.toString()}</span>
        </div>
      )}
      {templateSuccess && (
        <div className="alert alert-success mt-4 py-2 px-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Template successfully generated!
        </div>
      )}
      <div className="bg-light-neutral dark:bg-dark-neutral rounded p-4 mb-4">
        <h2 className="text-2xl font-bold mb-4 text-light-text dark:text-dark-text">
          Generated Templates
        </h2>
        <div className="border border-gray-500 p-2 rounded-md">
          <p className="text-lg font-bold text-light-text dark:text-dark-text">
            {templateCount === 0
              ? "No templates generated yet"
              : `Template ${templateCount}`}
          </p>
          <p className="text-sm text-light-text dark:text-dark-text">
            {template || "No template generated yet"}
          </p>
        </div>
      </div>
      <div className="flex justify-center">
      <div className="tooltip tooltip-left" data-tip="Accepting a template will save it for the recently created assignment">
        <button
          type="button"
          onClick={handleTemplateAccept}
          className="btn bg-light-btn text-dark-text dark:bg-dark-btn dark:text-light-text dark:btn-primary mr-4"
        >
          Accept Templates
        </button>
        </div>
        <button
          type="button"
          onClick={handleTemplateDecline}
          className="btn bg-light-btn text-dark-text dark:bg-dark-btn dark:text-light-text dark:btn-primary"
        >
          Decline Templates
        </button>
      </div>
    </div>
  );
};

export default AssignmentForm;
