import { type UploadFile, type UploadProps } from "antd";
import Dragger from "antd/es/upload/Dragger";
import React, { useEffect, useState } from "react";
import FileUploadItem from "../FileUploadItem/FileUploadItem";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import {
  usePredictMutation,
  type PredictionRequest,
} from "../../services/predictionApi/predictionApi";
import { useAppDispatch } from "../../state/useAppDispatch";
import { setLoadingState } from "../../state/settings/settingsSlice";

type FileUploaderProps = {
  allowMultiple?: boolean;
  onAnalyzeComplete: () => void;
};

const FileUploaderSchema = z.object({
  jdText: z
    .string()
    .min(20, "Minimum 20 characters required")
    .optional()
    .or(z.literal("")),
});

type FormValues = z.infer<typeof FileUploaderSchema>;

const FileUploader = ({
  allowMultiple,
  onAnalyzeComplete,
}: FileUploaderProps) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [jdFileList, setJdFileList] = useState<UploadFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const [predict, { isLoading }] = usePredictMutation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = ""; // Chrome requires this
    };

    if (isProcessing) {
      window.addEventListener("beforeunload", handleBeforeUnload);
    } else {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isProcessing]);

  useEffect(() => {
    dispatch(setLoadingState({ isLoading }));
  }, [dispatch, isLoading]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(FileUploaderSchema),
    mode: "all",
  });

  const props: UploadProps = {
    accept: ".pdf",
    name: "file",
    action: "http://localhost:4000/api/v1/upload",
    style: {
      border: "none",
    },
    showUploadList: false,
  };

  const handleFileRemove = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    id: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setFileList(fileList.filter((file) => file.uid !== id));
  };

  const handleJdFileRemove = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    id: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setJdFileList(jdFileList.filter((file) => file.uid !== id));
  };

  const onSubmit = async (data: FormValues) => {
    if (fileList.length === 0) {
      toast.error("Please upload at least one CV.");
      return;
    }

    if (jdFileList.length === 0 && (!data.jdText || data.jdText.length < 20)) {
      toast.error(
        "Please upload a JD file or enter at least 20 characters of JD text."
      );
      return;
    }

    if (jdFileList.length > 0 && data.jdText) {
      toast.error(
        "Please either upload a JD file or enter JD text. Only one mehod is allowed!"
      );
      return;
    }

    setIsProcessing(true);

    const body: PredictionRequest = {};

    if (allowMultiple)
      body.cvFileNames = fileList.map((file) => file.response.data[0].filename);
    else body.cvFileName = fileList[0].response.data[0].filename;

    if (jdFileList.length > 0)
      body.jdFileName = jdFileList[0].response.data[0].filename;
    else body.jdText = data.jdText;

    try {
      await predict({
        ...body,
        isMultiple: !!allowMultiple,
      }).unwrap();

      toast.success("Prediction successfull");
      await onAnalyzeComplete();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("🚀 ~ onSubmit ~ error:", error);
      toast.error(error?.data?.message as string);
    }

    setIsProcessing(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-full flex flex-col justify-center align-center"
    >
      <div className="glass w-full min-h-[15vh] max-h-[50vh] overflow-hidden px-4 pt-3 pb-4 flex flex-col">
        <p className="text-(--color-title) text-sm">Upload CV</p>
        <div className="inner-card min-h-[10vh] mt-5">
          <Dragger
            {...props}
            multiple={allowMultiple}
            maxCount={allowMultiple ? 100 : 1}
            onChange={(info) => {
              console.log("🚀 ~ FileUploader ~ info:", info);
              setFileList(info.fileList);
            }}
            fileList={fileList}
          >
            <p className="text-(--color-sub-text) text-xs">
              Drag & drop your CV here or click to browse
            </p>
            <p className="text-(--color-sub-text) text-[10px] mt-2">
              Only supports PDF files
            </p>

            {fileList.length > 0 && (
              <div className="mt-6 w-full max-h-[30vh] px-2 overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
                {fileList.map((file) => (
                  <FileUploadItem
                    key={file.uid}
                    file={file}
                    handleFileRemove={handleFileRemove}
                  />
                ))}
              </div>
            )}
          </Dragger>
        </div>
      </div>

      <div className="glass w-full min-h-[15vh] mt-10 max-h-[50vh] overflow-hidden px-4 pt-3 pb-4 flex flex-col">
        <p className="text-(--color-title) text-sm">Job Description</p>
        <div className="jd-card min-h-[10vh] mt-5 p-3">
          <textarea
            {...register("jdText")}
            className={`text-(--color-sub-text) text-xs w-full h-full min-h-[7vh] p-2 resize-none overflow-hidden ${
              errors.jdText ? "border border-red-500" : ""
            }`}
            placeholder="Paste the job description here or upload a file..."
          />
          {errors.jdText && (
            <p className="text-red-500 text-xs mt-1">{errors.jdText.message}</p>
          )}
        </div>

        <div className="inner-card min-h-[10vh] mt-5">
          <Dragger
            {...props}
            multiple={false}
            maxCount={1}
            onChange={(info) => {
              setJdFileList(info.fileList);
            }}
            fileList={jdFileList}
          >
            <p className="text-(--color-sub-text) text-xs">
              Or upload a job description file
            </p>
            <p className="text-(--color-sub-text) text-[10px] mt-2">
              Only supports PDF files
            </p>

            {jdFileList.length > 0 && (
              <div className="mt-6 w-full max-h-[30vh] px-2 overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
                {jdFileList.map((file) => (
                  <FileUploadItem
                    key={file.uid}
                    file={file}
                    handleFileRemove={handleJdFileRemove}
                  />
                ))}
              </div>
            )}
          </Dragger>
        </div>
      </div>

      <button
        type="submit"
        className={`mt-8 p-2 w-full rounded-2xl text-white text-sm text-center ${
          !(fileList.length > 0 && (jdFileList.length > 0 || !errors.jdText))
            ? "cursor-not-allowed bg-gray-600"
            : "cursor-pointer bg-gradient-to-r from-g-start to-g-end"
        }`}
        disabled={
          !(fileList.length > 0 && (jdFileList.length > 0 || !errors.jdText)) ||
          isProcessing ||
          isSubmitting
        }
      >
        Analyze
      </button>
      <div className="h-[10vh]">&nbsp;</div>
    </form>
  );
};

export default FileUploader;
