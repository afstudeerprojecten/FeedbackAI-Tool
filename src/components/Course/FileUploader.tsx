
interface FileUploaderProps {
    selectedFile: File | null | undefined
    handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  

const FileUploader: React.FC<FileUploaderProps> = ({ selectedFile, handleFileSelect }) => {
  return (
    <div>
        <label className="block text-sm font-bold mb-2 text-light-text dark:text-dark-text" htmlFor="file">
                Choose an PDF file
        </label>
      <input id="file" type="file" onChange={(e) => handleFileSelect(e)} />
      {selectedFile && (
        <div className="mt-2 text-light-text dark:text-dark-text">
          <p>Selected File:</p>
          <p>{selectedFile.name}.{selectedFile.type}</p>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
