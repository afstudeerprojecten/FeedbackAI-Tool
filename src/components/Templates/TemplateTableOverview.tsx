import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchAssignmentTemplates } from "../../services/assignmentService";
import Markdown from "react-markdown";
import { toast } from 'react-toastify';
import { fetchTeacherByEmail } from '../../services/teacherService';
import { registerEvent } from '../../services/eventLogService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

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

  const handleLike = async (templateId: number) => {
    try {
      const user = sessionStorage.getItem('user');
      const email = user ? JSON.parse(user).email : null;
      const userRole = user ? JSON.parse(user).role : null;

      if (!email) {
        throw new Error('Email not found in sessionStorage');
      }

      if (userRole === 'teacher') {
        const teacher = await fetchTeacherByEmail(email);
        await registerEvent({ event_id: 3, user_id: teacher.id, value: templateId });
        toast.info('Liked template successfully');
      }
    } catch (error) {
      toast.error('Error liking the template');
    }
  };

  const handleDislike = async (templateId: number) => {
    try {
      const user = sessionStorage.getItem('user');
      const email = user ? JSON.parse(user).email : null;
      const userRole = user ? JSON.parse(user).role : null;

      if (!email) {
        throw new Error('Email not found in sessionStorage');
      }

      if (userRole === 'teacher') {
        const teacher = await fetchTeacherByEmail(email);
        await registerEvent({ event_id: 4, user_id: teacher.id, value: templateId });
        toast.info('Disliked template successfully');
      }
    } catch (error) {
      toast.error('Error disliking the template');
    }
  };

  return (
    <div className="p-6 bg-light-neutral dark:bg-dark-neutral">
    <h2 className="text-xl text-light-text dark:text-dark-text font-bold mb-4">Sample Solutions Overview</h2>
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-light-neutral dark:bg-dark-neutral">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-light-text dark:text-dark-text uppercase tracking-wider">
            Sample Solution Content
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-light-text dark:text-dark-text uppercase tracking-wider w-32">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-light-neutral dark:bg-dark-neutral divide-y divide-gray-200">
        {templates.map((template, index) => (
          <tr key={index}>
            <td className="px-6 py-4 whitespace-normal text-light-text dark:text-dark-text">
              <Markdown>
                {template.content}
              </Markdown>
            </td>
            <td className="px-6 py-4 whitespace-normal text-light-text dark:text-dark-text flex items-center justify-center">
              <button onClick={() => handleLike(template.id)} className="mr-2 text-blue-500">
                <FontAwesomeIcon icon={faThumbsUp} size="2x" />
              </button>
              <button onClick={() => handleDislike(template.id)} className="text-red-500">
                <FontAwesomeIcon icon={faThumbsDown} size="2x" />
              </button>
            </td>
          </tr>
        ))}

      </tbody>
    </table>
  </div>
  
  );
};

export default AssignmentTemplatesOverview;
