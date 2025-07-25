import { Button } from "antd";
import { useAppSelector } from "../../state/useAppSelector";
import PredictionCard from "../PredictionCard/PredictionCard";
import { ArrowLeftOutlined } from "@ant-design/icons";

type PredictionReportProps = {
  onBackClick: () => void;
};

const PredictionReport = ({ onBackClick }: PredictionReportProps) => {
  const cvFiles = useAppSelector((state) => state.predictions.cvFiles);

  return (
    <div>
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-col align-center">
          <Button
            type="primary"
            variant="outlined"
            shape="round"
            icon={<ArrowLeftOutlined />}
            size={"small"}
            className="w-50 m-2"
            onClick={onBackClick}
          >
            Back to Analyzer
          </Button>
          <p className="text-(--color-title) text-sm p-3">Analysis Report</p>
        </div>

        {cvFiles?.map((cvFile, index) => {
          return (
            <div className="my-2" key={index}>
              <PredictionCard selectedCv={cvFile} enableReportBtn />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PredictionReport;
