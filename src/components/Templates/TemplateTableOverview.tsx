import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchAssignmentTemplates } from "../../services/assignmentService";

const AssignmentTemplatesOverview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [templates, setTemplates] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAssignmentTemplates(parseInt(id ?? ""));
        setTemplates(data);
      } catch (error: any) {
        console.error('Error fetching assignment templates:', error);
      }
    };

    fetchData();
  }, [id]);

  // Function to format the template content into paragraphs
  const formatTemplateContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => (
      <p key={index} className="mb-4">{paragraph}</p>
    ));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Assignment Templates Overview</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-base">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Template Content
            </th>
          </tr>
        </thead>
        <tbody className="bg-base divide-y divide-gray-200">
          {templates.map((template, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                {formatTemplateContent(template.content)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssignmentTemplatesOverview;
