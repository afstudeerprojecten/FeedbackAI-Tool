import React from "react";

interface AssignmentDescriptionProps {
  description: string;
}

const AssignmentDescription: React.FC<AssignmentDescriptionProps> = ({ description }) => {
  // Function to convert the description text into HTML format
  const formatDescription = (description: string) => {
    // Split the description into paragraphs based on the newline characters
    const paragraphs = description.split("\n");

    // Map each paragraph to a <p> element
    return paragraphs.map((paragraph, index) => (
      <p key={index} className="mb-4">{paragraph}</p>
    ));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Assignment Description</h2>
      <div className="description">
        {formatDescription(description)}
      </div>
    </div>
  );
};

export default AssignmentDescription;
