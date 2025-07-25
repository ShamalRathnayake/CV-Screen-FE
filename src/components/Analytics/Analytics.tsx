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
import { Pie } from "react-chartjs-2";
import {
  useLazyAnalyticsQuery,
  type Analytics,
} from "../../services/predictionApi/predictionApi";
import toast from "react-hot-toast";
import { useAppDispatch } from "../../state/useAppDispatch";
import { setLoadingState } from "../../state/settings/settingsSlice";

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

// const rawData = [
//   { label: "Colombo", value: 52.1, color: "#4a66f0" }, // Blue
//   { label: "Kandy", value: 22.8, color: "#94c7fd" }, // Light Blue
//   { label: "Negombo", value: 13.9, color: "#97f2cb" }, // Mint
//   { label: "Other", value: 11.2, color: "#cccccc" }, // Grey
// ];

// const pieData = {
//   labels: rawData.map((d) => d.label),
//   datasets: [
//     {
//       data: rawData.map((d) => d.value),
//       backgroundColor: rawData.map((d) => d.color),
//       borderColor: "rgba(255, 255, 255, 0.1)",
//       borderWidth: 4,
//       cutout: "60%",
//     },
//   ],
// };

// const pieOptions = {
//   responsive: true,
//   maintainAspectRatio: true,
//   plugins: {
//     legend: {
//       position: "right" as const,
//       labels: {
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         generateLabels: (chart: any) => {
//           const data = chart.data;
//           if (!data.labels || !data.datasets.length) return [];
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           return data.labels.map((label: any, i: number) => {
//             const value = chart.data.datasets[0].data[i];
//             return {
//               text: `${label}  ${value.toFixed(1)}%`,
//               fillStyle: chart.data.datasets[0].backgroundColor[i],
//               strokeStyle: chart.data.datasets[0].backgroundColor[i],
//               index: i,
//             };
//           });
//         },
//         color: "#FFFFFFFF",
//         font: {
//           size: 13,
//         },
//         boxWidth: 12,
//         padding: 15,
//       },
//     },
//     tooltip: {
//       backgroundColor: "#1f1f2e",
//       titleColor: "#ffffff",
//       bodyColor: "#d1d1d1",
//     },
//     title: {
//       display: true,
//       text: "Candidates by Location",
//       color: "#ffffff",
//       font: {
//         size: 18,
//       },
//       padding: {
//         bottom: 20,
//       },
//     },
//   },
// };

const Analytics = () => {
  const [analytics, setAnalytics] = useState<Analytics | undefined>(undefined);

  const [trigger] = useLazyAnalyticsQuery();

  const dispatch = useAppDispatch();

  const loadData = async () => {
    dispatch(setLoadingState({ isLoading: true }));
    try {
      const analyticsResponse = await trigger().unwrap();
      if (analyticsResponse.status) {
        setAnalytics(analyticsResponse.data);
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
                      {parseFloat(`${analytics?.averageMatchTotal}`).toFixed(
                        2
                      ) || 0}
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
                        `${analytics?.averageHireProbability}`
                      ).toFixed(2) || 0}
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
            {/* <div className="flex w-full justify-between align-center mt-5 mb-10 glass p-6 h-[50vh]">
              <div className="w-full">
                <div className="flex h-full">
                  <div className="">
                    <div className="w-full  inline-block">
                      <Pie data={pieData} options={pieOptions} />
                    </div>
                  </div>
                  <div className="flex-grow"></div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
