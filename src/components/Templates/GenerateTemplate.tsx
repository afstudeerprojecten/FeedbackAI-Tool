import React, { useState } from 'react';
import Markdown from 'react-markdown'
import { generateTemplate, createTemplate } from '../../services/templateService';
import { toast } from 'react-toastify';

interface Props {
    assignmentId: number; // Define the prop for assignmentId
}

const GenerateTemplate: React.FC<Props> = ({ assignmentId }) => {
    const [template, setTemplate] = useState<string>(''); // Adjusted the type to string
    // const [templateError, setTemplateError] = useState<string | null>(null); // Adjusted the type to string | null
    // const [templateSuccess, setTemplateSuccess] = useState<boolean>(false); // Adjusted the type to boolean
    const [loadingTemplate, setLoadingTemplate] = useState<boolean>(false); // Adjusted the type to boolean
    const [templateCount, setTemplateCount] = useState<number>(0); // Adjusted the type to number
    const [editedTemplate, setEditedTemplate] = useState<string>(''); // Adjusted the type to string
  

    const handleTemplateSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        if (templateCount >= 3) {
          toast.error("You can only generate 3 templates");
        }
        setLoadingTemplate(true);
        const createdTemplate = await generateTemplate(assignmentId);
        setTemplate(createdTemplate);
        setEditedTemplate(createdTemplate); // Set initial edited template content
        console.log("Template created:", template);
        toast.success("Template generated successfully");
        setTemplateCount((prevCount) => prevCount + 1);
        console.log("Template Count:", templateCount);
        setTimeout(() => {
          // navigate('/assignments');
        }, 2000);
      } catch (error: any) {
        toast.error("Failed to generate template");
      } finally {
        setLoadingTemplate(false);
      }
    };
    const handleTemplateAccept = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        // Accept the template
        createTemplate({
          template_content: editedTemplate, // Send edited template content
          assignment_id: assignmentId,
        });
        console.log("Template accepted:", editedTemplate); // Log edited template content
        toast.success("Template accepted successfully");
        setTemplate("");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error: any) {
        toast.error("Failed to accept template");
      } finally {
        setLoadingTemplate(false);
      }
    };
  
    const handleTemplateDecline = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        if (templateCount <= 0) {
          toast.error("No templates to decline");
        } else {
          setTemplateCount((prevCount) => prevCount - 1);
        }
        // Decline the template
        setTemplate("");
        console.log("Template declined:", template);
        toast.success("Template declined successfully");
        setTimeout(() => {
          // navigate('/assignments');
        }, 2000);
      } catch (error: any) {
        toast.error("Failed to decline template");
      } finally {
        setLoadingTemplate(false);
      }
    };

    return (
      <div>
      <div className="bg-neutral-100 dark:bg-dark-neutral rounded p-4 mb-4">
        <h2 className="text-2xl text-light-text dark:text-dark-text font-bold mb-4 text-center">Sample solutions</h2>
        <div className="border border-gray-500 p-2 rounded-md">
          <p className="text-lg font-bold text-light-text dark:text-dark-text">
            {templateCount === 0
              ? 'Sample Solution'
              : `Sample SOlution ${templateCount}`}
          </p>
          <div
            contentEditable="true"
            onInput={(e) => setEditedTemplate(e.currentTarget.textContent || '')}
          >
            <Markdown className="text-light-text dark:text-dark-text">
              {template || 'Click here to make your own sample solution or generate a new one.'}
            </Markdown>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          onClick={handleTemplateSubmit}
          disabled={loadingTemplate}
          className="btn btn-neutral text-dark-text dark:bg-dark-btn dark:text-light-text dark:btn-primary"
        >
          {loadingTemplate ? <span className="loading loading-spinner loading-xs"></span> : 'Generate Template'}
        </button>
      </div>
            <div className="flex justify-center">
                <button
                    type='button'
                    onClick={handleTemplateAccept}
                    className="btn btn-neutral text-dark-text dark:bg-dark-btn dark:text-light-text dark:btn-primary m-4"
                >
                    Accept Sample Solution
                </button>
                <button
                    type='button'
                    onClick={handleTemplateDecline}
                    className="btn btn-neutral text-dark-text dark:bg-dark-btn dark:text-light-text dark:btn-primary m-4"
                >
                    Decline Sample Solution
                </button>
            </div>

        </div>
    );
};

export default GenerateTemplate;
