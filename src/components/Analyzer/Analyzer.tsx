import { Tabs, type TabsProps } from "antd";
import React, { useEffect, useState } from "react";
import FileUploader from "../FileUploader/FileUploader";
import PredictionReport from "../PredictionReport/PredictionReport";
import { useAppSelector } from "../../state/useAppSelector";

const Analyzer = () => {
  const cvFiles = useAppSelector((state) => state.predictions.cvFiles);
  const [activeTab, setActiveTab] = useState("1");

  useEffect(() => {
    if (cvFiles?.length > 0) {
      setActiveTab("2");
    }
  }, []);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "",
      children: (
        <div className={"w-full h-full overflow-y-auto"}>
          <div
            className={
              "  min-w-xl min-h-fit max-w-2xl absolute top-10 left-1/2 -translate-x-1/2 "
            }
          >
            <FileUploader
              allowMultiple={true}
              onAnalyzeComplete={() => {
                setActiveTab("2");
              }}
            />
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: "",
      children: (
        <div className={"w-full h-full overflow-y-auto"}>
          <div
            className={
              "  min-w-5xl min-h-fit max-w-2xl absolute top-10 left-1/2 -translate-x-1/2 "
            }
          >
            <PredictionReport onBackClick={() => setActiveTab("1")} />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <Tabs
        activeKey={activeTab}
        renderTabBar={() => <span> </span>}
        defaultActiveKey="1"
        items={items}
      />
    </div>
  );
};

export default Analyzer;
