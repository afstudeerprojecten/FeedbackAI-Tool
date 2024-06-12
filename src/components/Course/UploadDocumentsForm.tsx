import React, { useState, useEffect } from 'react';
import { Course, TeacherUploadCourseDocument } from '../../Interfaces/interfaces';
import { fetchCoursesByTeacherId, teacherUploadDocumentToCourse } from '../../services/courseService';
import { User } from '../../data/mockData';
import CourseSelector from './CourseSelector';
import FileUploader from './FileUploader';
import { fetchTeacherByEmail } from '../../services/teacherService';

const UploadDocumentsForm: React.FC = ()=> {
    const [courses, setCourses] = useState<Course[]>([]);
    const [selectedCourseId, setSelectedCourseId] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            let teacherId = await getTeacherIdFromLocalStorage()
            if (teacherId) {
                console.log(teacherId);
                const data = await fetchCoursesByTeacherId(teacherId);
                setCourses(data);                
            }
        } catch (error) {
            console.error('Error fetching assignments by course:', error);
        }
    };

    const handleCourseSelect = (courseId: string) => {
        setSelectedCourseId(courseId);        
    };


    const getTeacherIdFromLocalStorage = async () : Promise<number | null> => {
        // Retrieve teacher  ID from local storage
        const user = sessionStorage.getItem('user');

        if (user) {
            const userData: User = JSON.parse(user);

            let teacher = await fetchTeacherByEmail(userData.email)
            // let teacher = await fetchTeacherByEmail(userData.email)
            if (teacher) {
                return teacher.id
            }
            else {
                return null
            }
        } 
        else {
            return null;
        }
    };

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            if (e.target.files) {
                setSelectedFile(e.target.files[0]);
                setError(null);
            } else {
                setSelectedFile(null);
                setError('Please try selecting a file again.');
            }
        }
        catch (error: any) {
            setError("Somethign went wrong")
        }
        finally {
            setLoading(false)
        }
    };

    const handleUploadDocumentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            let teacherId = await getTeacherIdFromLocalStorage()
            if (teacherId) {
                if ( (selectedCourseId) && (selectedCourseId != '') ) {
                    if (selectedFile) {
                        const dataUploadDocument: TeacherUploadCourseDocument = {
                            teacher_id: teacherId,
                            course_id: parseInt(selectedCourseId),
                            file: selectedFile
                        }
                        var formData = new FormData();
                        formData.append("teacher_id", String(dataUploadDocument.teacher_id));
                        formData.append("course_id", String(dataUploadDocument.course_id));
                        formData.append("file", dataUploadDocument.file);
                        console.log(formData);
                        await teacherUploadDocumentToCourse(formData)
                        setError("File successfully uploaded")
                        setTimeout(() => {
                        setError(null)
                        }, 2000);


                    }
                    else {
                        throw new Error("Please select a file first")
                    }
                }
                else {
                    throw new Error("Please select a course")
                }
            }
            else {
                throw new Error("ID missing, please retry logging in")
            }
        }
        catch (error: any) {
            setError("Something went wrong")
        }
        finally {
            setLoading(false)
        }
    };

    return (
        <>
        <div className="container mx-auto p-4">
            <div className="bg-base shadow-2xl rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl font-bold mb-4 text-center">Upload Documents Form</h2>
                <form>
                    <CourseSelector
                        courses={courses}
                        selectedCourse={selectedCourseId}
                        onSelectCourse={handleCourseSelect}
                    />
                    <FileUploader
                        selectedFile={selectedFile}
                        handleFileSelect={handleFileSelect}
                    />
                    <button 
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    onClick={handleUploadDocumentSubmit}>Submit</button>
                    {error && <div className="text-red-600 mt-4">{error.toString()}</div>}
                    {loading && <div className="text-green-600 mt-4">Uploading document</div>}
                </form>
            </div>
        </div>
        </>
    );
};

export default UploadDocumentsForm;
