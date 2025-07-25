import {
  faBriefcase,
  faFilePdf,
  faHardDrive,
  faHourglass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  useLazyAnalyticsQuery,
  useLazyPredictionsQuery,
  type Analytics,
} from "../../services/predictionApi/predictionApi";
import toast from "react-hot-toast";
import { useAppDispatch } from "../../state/useAppDispatch";
import { setLoadingState } from "../../state/settings/settingsSlice";
import { Button, ConfigProvider, Table, type TableProps } from "antd";
import { FilePdfOutlined } from "@ant-design/icons";
import {
  setJdFiles,
  setSelectedCvFile,
} from "../../state/predictions/predictionsSlice";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "#1f1f2e",
      titleColor: "#fff",
      bodyColor: "#d1d1d1",
    },
    title: {
      display: true,
      text: "Vacancies by Profession",
      color: "#ffffff",
      font: {
        size: 18,
      },
      padding: {
        bottom: 20,
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: "#eaeaea",
        font: { size: 12 },
      },
      grid: { display: false },
    },
    y: {
      ticks: {
        color: "#eaeaea",
        font: { size: 12 },
      },
      grid: { color: "#2e2e40" },
    },
  },
};

const Analytics = () => {
  const [analytics, setAnalytics] = useState<Analytics | undefined>(undefined);
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [tableData, setTableData] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [trigger] = useLazyAnalyticsQuery();
  const [predTrigger] = useLazyPredictionsQuery();

  const dispatch = useAppDispatch();

  const loadData = async () => {
    dispatch(setLoadingState({ isLoading: true }));
    try {
      const analyticsResponse = await trigger().unwrap();
      if (analyticsResponse.status) {
        setAnalytics(analyticsResponse.data);
      }

      const predictionsResponse = await predTrigger({ limit, page }).unwrap();
      if (predictionsResponse.status) {
        const data = predictionsResponse?.data?.predictions?.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (pred: any, index: number) => ({
            key: index,
            name: pred?.result[0]?.extractedCv?.personalInfo?.fullName,
            email: pred?.result[0]?.extractedCv?.personalInfo?.email,
            phone: pred?.result[0]?.extractedCv?.personalInfo?.phone,
            pred,
          })
        );

        setTableData(data);
      }

      dispatch(setLoadingState({ isLoading: false }));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("🚀 ~ loadData ~ error:", error);
      toast.error(error?.message as string);
      dispatch(setLoadingState({ isLoading: false }));
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleReportBtnClick = async (record: any) => {
    dispatch(
      setSelectedCvFile({
        cvFile: record?.pred?.result[0],
      })
    );
    dispatch(setJdFiles({ jdFile: record?.pred?.extractedJD }));
    navigate("/result");
  };

  const data = {
    labels: analytics?.vacanciesByType?.map((vacancy) => vacancy._id) || [],
    datasets: [
      {
        label: "Vacancy Count",
        data: analytics?.vacanciesByType?.map((vacancy) => vacancy.total) || [],
        backgroundColor: [
          "#a79bfa",
          "#93e4d2",
          "#4a66f0",
          "#94c7fd",
          "#adc6ec",
          "#97f2cb",
        ],
        borderRadius: 8,
        barThickness: 40,
      },
    ],
  };

  const columns: TableProps["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          variant="filled"
          color="blue"
          shape="round"
          icon={<FilePdfOutlined />}
          size={"small"}
          className="w-full"
          onClick={() => handleReportBtnClick(record)}
        >
          View Report
        </Button>
      ),
    },
  ];

  return (
    <>
      <div className={"w-full h-full overflow-y-auto"}>
        <div
          className={
            "  min-w-5xl min-h-fit max-w-2xl absolute top-10 left-1/2 -translate-x-1/2 "
          }
        >
          <div className="w-full h-full">
            <div className="flex w-full justify-between align-center">
              <div className="flex-grow text-white p-3 glass mr-2">
                <div className="flex">
                  <div>
                    <p className="text-md">Total CVs processed</p>
                    <p className="my-3 text-2xl">{analytics?.totalCvs || 0}</p>
                  </div>
                  <div className="flex flex-grow align-center items-center justify-end mt-3">
                    <FontAwesomeIcon
                      icon={faFilePdf}
                      className={`text-5xl text-(--color-sub-text)`}
                    />
                  </div>
                </div>
              </div>
              <div className="flex-grow text-white p-3 glass mx-2">
                <div className="flex">
                  <div>
                    <p className="text-md">Total JDs uploaded</p>
                    <p className="my-3 text-2xl">{analytics?.totalJds || 0}</p>
                  </div>
                  <div className="flex flex-grow align-center items-center justify-end mt-3">
                    <FontAwesomeIcon
                      icon={faBriefcase}
                      className={`text-5xl text-(--color-sub-text)`}
                    />
                  </div>
                </div>
              </div>
              <div className="flex-grow text-white p-3 glass mx-2">
                <div className="flex">
                  <div>
                    <p className="text-md">Average Match Score</p>
                    <p className="my-3 text-2xl">
                      {parseFloat(
                        `${analytics?.averageMatchTotal || 0}`
                      ).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex flex-grow align-center items-center justify-end mt-3">
                    <FontAwesomeIcon
                      icon={faHardDrive}
                      className={`text-5xl text-(--color-sub-text)`}
                    />
                  </div>
                </div>
              </div>
              <div className="flex-grow text-white p-3 glass ml-2">
                <div className="flex">
                  <div>
                    <p className="text-md">Average Hire Probability</p>
                    <p className="my-3 text-2xl">
                      {parseFloat(
                        `${analytics?.averageHireProbability || 0}`
                      ).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex flex-grow align-center items-center justify-end mt-3">
                    <FontAwesomeIcon
                      icon={faHourglass}
                      className={`text-5xl text-(--color-sub-text)`}
                    />
                  </div>
                </div>
              </div>
            </div>
            {analytics?.vacanciesByType &&
              analytics?.vacanciesByType?.length > 0 && (
                <div className="flex w-full justify-between align-center mt-15 glass p-6  mb-10 min-h-[50vh]">
                  <Bar data={data} options={options} />
                </div>
              )}
            <div className="flex w-full justify-between align-center mt-5 mb-10 glass p-6">
              <div className="w-full">
                <div className="flex h-full">
                  <div className="">
                    <div className="w-full h-full  inline-block">
                      {tableData && (
                        <ConfigProvider
                          theme={{
                            token: {
                              colorBgContainer: "rgba(0, 0, 0, 0.2)",
                              colorText: "#fff",
                              fontSize: 12,
                              colorPrimaryBorder: "#000)",
                            },
                            components: {
                              Table: {
                                borderColor: "#000",
                              },
                            },
                          }}
                        >
                          <Table
                            columns={columns}
                            dataSource={tableData}
                            size="large"
                            className="w-full"
                          />
                        </ConfigProvider>
                      )}
                    </div>
                  </div>
                  <div className="flex-grow"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
