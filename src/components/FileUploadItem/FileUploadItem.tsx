import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ConfigProvider, Progress, type UploadFile } from "antd";
import pdfImage from "../../assets/pdf.png";

type FileUploadItemProps = {
  file: UploadFile;
  handleFileRemove: (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    id: string
  ) => void;
};

const FileUploadItem = ({ file, handleFileRemove }: FileUploadItemProps) => {
  return (
    <div key={file.uid} className="glass h-[65px] max-w-lg my-1">
      <div className="flex flex-col justify-center">
        <div className="flex px-3 pt-2 pb-0">
          <img src={pdfImage} alt="pdf" className="h-[25px]" />
          <div className="flex-grow text-start px-3 text-xs text-(--color-sub-text) w-75">
            <div className="flex flex-col ">
              <p className="line-clamp-1 text-wrap break-all">{file.name}</p>
              <p className="text-[10px]">
                {((file.size || 0) / (1024 * 1024)).toFixed(2)}MB
              </p>
            </div>
          </div>
          <div className="px-3">
            <FontAwesomeIcon
              icon={faTrash}
              className={`ml-2  text-(--color-sub-text) cursor-pointer `}
              onClick={(e) => handleFileRemove(e, file.uid)}
            />
          </div>
        </div>
        <div className="pl-4 pr-6">
          <ConfigProvider
            theme={{
              token: {
                colorSuccess: "#006FEE",
                colorText: "#b2b2b2",
                fontSize: 10,
              },
            }}
          >
            <Progress
              percent={Math.round(file.percent || 0)}
              success={{ strokeColor: "#006FEE" }}
            />
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
};

export default FileUploadItem;
