import React, { useState } from 'react';
import Markdown from 'react-markdown'
import { generateTemplate, createTemplate } from '../../services/templateService';

interface Props {
    assignmentId: number; // Define the prop for assignmentId
}

const GenerateTemplate: React.FC<Props> = ({ assignmentId }) => {
    const [template, setTemplate] = useState<string>(''); // Adjusted the type to string
    const [templateError, setTemplateError] = useState<string | null>(null); // Adjusted the type to string | null
    const [templateSuccess, setTemplateSuccess] = useState<boolean>(false); // Adjusted the type to boolean
    const [loadingTemplate, setLoadingTemplate] = useState<boolean>(false); // Adjusted the type to boolean
    const [templateCount, setTemplateCount] = useState<number>(0); // Adjusted the type to number

    const handleTemplateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setTemplateError(null);
        try {
          if (templateCount >= 3) {
            return setTemplateError('You have reached the maximum number of templates');
          }
          setLoadingTemplate(true);
          const createdTemplate = await generateTemplate(assignmentId);
          setTemplate(createdTemplate);
          console.log('Template created:', template);
          setTemplateSuccess(true);
          setTemplateCount((prevCount) => prevCount + 1);
          console.log('Template Count:', templateCount);
          setTimeout(() => {
            // navigate('/assignments');
          }, 2000);
        } catch (error: any) {
          setTemplateError(error);
        } finally {
          setLoadingTemplate(false);
        }
      }
      const handleTemplateAccept = async (e: React.FormEvent) => {
        e.preventDefault();
        setTemplateError(null);
        try {
          // Accept the template
          createTemplate({ template_content: template, assignment_id: assignmentId });
          console.log('Template accepted:', template);
          setTemplate('');
          setTimeout(() => {
            // navigate('/assignments');
          }, 2000);
        } catch (error: any) {
          setTemplateError(error);
        } finally {
          setLoadingTemplate(false);
        }
      }
    
      const handleTemplateDecline = async (e: React.FormEvent) => {
        e.preventDefault();
        setTemplateError(null);
        try {
          if (templateCount <= 0) {
            return setTemplateError('No template to decline');
          } else {
            setTemplateCount((prevCount) => prevCount - 1);
          }
          // Decline the template
          setTemplate('');
          console.log('Template declined:', template);
          setTimeout(() => {
            // navigate('/assignments');
          }, 2000);
        } catch (error: any) {
          setTemplateError(error);
        } finally {
          setLoadingTemplate(false);
        }
      }

    return (
        <div>
            <div className="bg-light-neutral dark:bg-dark-neutral rounded p-4 mb-4">
                <h2 className="text-2xl text-light-text dark:text-dark-text font-bold mb-4">Generated Templates</h2>
                <div className="border border-gray-300 p-2 rounded-md">
                    <p className="text-lg text-light-text dark:text-dark-text font-bold">
                        {templateCount === 0 ? "No templates generated yet" : `Template ${templateCount}`}
                    </p>
                    <Markdown>
                        { template || 'No template generated yet'}
                        </Markdown>
                </div>
            </div>
            <div className="flex justify-center">
            <button
                type='submit'
                onClick={handleTemplateSubmit}
                disabled={loadingTemplate}
                className="btn bg-light-btn text-dark-text dark:bg-dark-btn dark:text-light-text dark:btn-primary"
            >
                {loadingTemplate ? <span className="loading loading-spinner loading-xs"></span> : 'Generate Template'}
            </button>
            {templateError && <div className="text-red-600 mt-4">{templateError}</div>}
            {templateSuccess && (
                <div className="bg-green-200 text-green-800 px-4 py-2 mt-4">
                    Template successfully generated!
                </div>
            )}
            </div>
            <div className="flex justify-center">
                <button
                    type='button'
                    onClick={handleTemplateAccept}
                    className="btn bg-light-btn text-dark-text dark:bg-dark-btn dark:text-light-text dark:btn-primary m-4"
                >
                    Accept Templates
                </button>
                <button
                    type='button'
                    onClick={handleTemplateDecline}
                    className="btn bg-light-btn text-dark-text dark:bg-dark-btn dark:text-light-text dark:btn-primary m-4"
                >
                    Decline Templates
                </button>
            </div>

        </div>
    );
};

export default GenerateTemplate;
