import React from "react";

interface SubmissionFeedbacktProps {
  feedback: string;
}

const FeedbackContent: React.FC<SubmissionFeedbacktProps> = ({ feedback }) => {
  // Function to convert the description text into HTML format
  const formatDescription = (feedback: string) => {
    // Split the description into paragraphs based on the newline characters
    const paragraphs = feedback.split("\n");

    // Map each paragraph to a <p> element
    return paragraphs.map((paragraph, index) => (
      <p key={index} className="mb-4">{paragraph}</p>
    ));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Submission Feedback</h2>
      <div className="description">
        {formatDescription(feedback)}
      </div>
    </div>
  );
}

export default FeedbackContent;