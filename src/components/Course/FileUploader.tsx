
interface FileUploaderProps {
    selectedFile: File | null | undefined
    handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  

const FileUploader: React.FC<FileUploaderProps> = ({ selectedFile, handleFileSelect }) => {
  return (
    <div className='mb-4'>
        <label className="block text-sm font-bold mb-2" htmlFor="file">
                Choose an PDF file
        </label>
      <input id="file" type="file" onChange={(e) => handleFileSelect(e)} />
      {selectedFile && (
        <div>
          <p>Selected File:</p>
          <p>{selectedFile.name}.{selectedFile.type}</p>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
