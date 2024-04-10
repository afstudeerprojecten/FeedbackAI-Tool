export interface Assignment {
    id: number;
    course_id: number;
    title: string;
    description: string;
    word_count: number;
    student_ages: number;

}


export interface CreateSubmission {
    assignment_id: number
    student_id: number
    content: string
}
    

export interface Feedback {
    id: number
    submission_id: number
    content: string
}
