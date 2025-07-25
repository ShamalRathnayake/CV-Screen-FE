import { Button, ConfigProvider, Progress, Tooltip } from "antd";
import type { JDMatchResult } from "../../services/predictionApi/predictionApi";
import ProfileCard from "../ProfileCard/ProfileCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import cx from "classnames";
import { FilePdfOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../state/useAppDispatch";
import { setSelectedCvFile } from "../../state/predictions/predictionsSlice";

type PredictionCardProps = {
  selectedCv: JDMatchResult | null;
  enableReportBtn?: boolean;
};

const PredictionCard = ({
  selectedCv,
  enableReportBtn,
}: PredictionCardProps) => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const getTechnicalMessage = (value: number) => {
    switch (true) {
      case value < 0.25:
        return {
          msg: "Low Technical Match",
          suggestion:
            "Your listed skills may not match the job’s tech stack. Consider revising",
        };

      case value > 0.25 && value < 0.49:
        return {
          msg: "Limited Tech Overlap",
          suggestion:
            "Some skills align, but others are off the mark. Customize your resume",
        };

      case value >= 0.49 && value < 0.74:
        return {
          msg: "Good Technical Fit",
          suggestion:
            "You meet many technical requirements, but a few are missing",
        };

      case value >= 0.74 && value <= 1:
        return {
          msg: "Strong Technical Match",
          suggestion:
            "Your skills are spot-on for the job. Tech recruiters will love this!",
        };
    }
  };
  const getEducationMessage = (value: number) => {
    switch (true) {
      case value < 0.25:
        return {
          msg: "Mismatch in education",
          suggestion: "The role likely expects a different academic background",
        };

      case value > 0.25 && value < 0.49:
        return {
          msg: "Partial Match in education",
          suggestion:
            "Your degree helps, but it might not fully meet expectations",
        };

      case value >= 0.49 && value < 0.74:
        return {
          msg: "Relevant Education",
          suggestion:
            "You have a related background, but there’s a slight mismatch",
        };

      case value >= 0.74 && value <= 1:
        return {
          msg: "Perfect Academic Fit",
          suggestion: "Your education directly matches what the role requires",
        };
    }
  };

  const getWorkExpMessage = (value: number) => {
    switch (true) {
      case value < 0.25:
        return {
          msg: "Low Experience Relevance",
          suggestion: "Consider emphasizing more relevant experiences",
        };

      case value > 0.25 && value < 0.49:
        return {
          msg: "Partial Alignment",
          suggestion: "Your past roles only somewhat align with this job",
        };

      case value >= 0.49 && value < 0.74:
        return {
          msg: "Solid Experience Fit",
          suggestion:
            "You have relevant experience, but it's not a perfect match",
        };

      case value >= 0.74 && value <= 1:
        return {
          msg: "Excellent Experience Match",
          suggestion: "Your work history closely mirrors the job’s demands",
        };
    }
  };

  const getOverallMatchMessage = (value: number) => {
    switch (true) {
      case value < 0.25:
        return {
          msg: "Poor Match Overall",
          suggestion:
            "Very little overlap. Consider targeting a more suitable role",
        };

      case value > 0.25 && value < 0.49:
        return {
          msg: "Weak Overall Match",
          suggestion:
            "Some parts match, but others don’t. Try realigning terminology",
        };

      case value >= 0.49 && value < 0.74:
        return {
          msg: "Good Match Overall",
          suggestion: "There's a lot of shared content, but refining can help",
        };

      case value >= 0.74 && value <= 1:
        return {
          msg: "Excellent Textual Match Overall",
          suggestion:
            "Strong direct overlap in content. You’re targeting the right role!",
        };
    }
  };

  const getPillClass = (value: number) => {
    switch (true) {
      case value < 0.25:
        return "error-glass";

      case value > 0.25 && value < 0.49:
        return "warn-glass";

      case value >= 0.49 && value < 0.74:
        return "info-glass";

      case value >= 0.74 && value <= 1:
        return "success-glass";
    }
  };

  const handleReportBtnClick = async () => {
    if (!selectedCv) return;
    await dispatch(setSelectedCvFile({ cvFile: selectedCv }));
    await navigate("/result");
  };

  return (
    <div className="p-3 glass w-full h-full">
      <div className="flex w-full h-full">
        {/* <div className="w-50  text-center inner-card mr-3 p-3">
          <div className="flex flex-col w-full h-full">
            <div className=" py-3  cursor-pointer">
              <Tooltip
                title="This score is based purely on raw text similarity between your resume and the job description — it sets the baseline before deeper analysis."
                placement="left"
              >
                <ConfigProvider
                  theme={{
                    components: {
                      Progress: {
                        circleTextColor: "#ffffff",
                      },
                    },
                  }}
                >
                  <Progress
                    percent={parseFloat(
                      parseFloat(
                        `${(selectedCv?.cosineSimilarity?.raw as number) * 100}`
                      ).toFixed(0)
                    )}
                    type="circle"
                    format={(percent) => `${percent}%`}
                    strokeLinecap="round"
                    trailColor="#c1bbbb33"
                  />
                </ConfigProvider>

                <p className="text-(--color-title) text-xs my-2">
                  Overall Match
                </p>
              </Tooltip>
            </div>
            <div className=" py-3">
              <ConfigProvider
                theme={{
                  components: {
                    Progress: {
                      circleTextColor: "#ffffff",
                    },
                  },
                }}
              >
                <Progress
                  percent={parseFloat(
                    parseFloat(
                      `${
                        (selectedCv?.cosineSimilarity
                          ?.hireProbability as number) * 100
                      }`
                    ).toFixed(0)
                  )}
                  type="circle"
                  format={(percent) => `${percent}%`}
                  strokeLinecap="round"
                  trailColor="#c1bbbb33"
                />
              </ConfigProvider>
              <p className="text-(--color-title) text-xs my-2">
                Hire Probability
              </p>
            </div>
          </div>
        </div> */}
        <div className=" flex-grow inner-card p-3">
          <div className="flex pt-3 flex-col justify-between w-full h-full">
            <div className="w-full">
              <div className="flex px-6">
                <ProfileCard selectedCv={selectedCv} />
                <div className="">
                  <div
                    className={cx(
                      "p-3 mt-3 mb-7 rounded-3xl text-sm text-center font-semiboldw-full",
                      parseFloat(
                        parseFloat(
                          `${
                            (((selectedCv?.cosineSimilarity
                              ?.hireProbability as number) /
                              2 +
                              (selectedCv?.cosineSimilarity?.total as number) +
                              (selectedCv?.cosineSimilarity?.raw as number)) /
                              3) *
                            100
                          }`
                        ).toFixed(0)
                      ) > 50
                        ? "success-main text-dark-300"
                        : "failure-main text-yellow-200"
                    )}
                  >
                    <FontAwesomeIcon
                      icon={
                        parseFloat(
                          parseFloat(
                            `${
                              (((selectedCv?.cosineSimilarity
                                ?.hireProbability as number) /
                                2 +
                                (selectedCv?.cosineSimilarity
                                  ?.total as number) +
                                (selectedCv?.cosineSimilarity?.raw as number)) /
                                3) *
                              100
                            }`
                          ).toFixed(0)
                        ) > 50
                          ? faCheckCircle
                          : faXmarkCircle
                      }
                      className={cx(`mr-2 pr-1`)}
                    />
                    {parseFloat(
                      parseFloat(
                        `${
                          (((selectedCv?.cosineSimilarity
                            ?.hireProbability as number) /
                            2 +
                            (selectedCv?.cosineSimilarity?.total as number) +
                            (selectedCv?.cosineSimilarity?.raw as number)) /
                            3) *
                          100
                        }`
                      ).toFixed(0)
                    ) > 50
                      ? "Recommended for Hire"
                      : "Not Recommended for Hire"}
                  </div>
                  {enableReportBtn && (
                    <div className="">
                      <Button
                        type="primary"
                        variant="solid"
                        color="geekblue"
                        shape="round"
                        icon={<FilePdfOutlined />}
                        size={"small"}
                        className="w-full"
                        onClick={handleReportBtnClick}
                      >
                        View Report
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full">
              <div className="flex w-full">
                <div className="flex flex-grow items-center justify-center">
                  <div className=" py-3 text-center cursor-pointer w-50">
                    <Tooltip
                      title="This score is based purely on raw text similarity between your resume and the job description — it sets the baseline before deeper analysis."
                      placement="left"
                    >
                      <ConfigProvider
                        theme={{
                          components: {
                            Progress: {
                              circleTextColor: "#ffffff",
                            },
                          },
                        }}
                      >
                        <Progress
                          percent={parseFloat(
                            parseFloat(
                              `${
                                (selectedCv?.cosineSimilarity?.raw as number) *
                                100
                              }`
                            ).toFixed(0)
                          )}
                          type="circle"
                          format={(percent) => `${percent}%`}
                          strokeLinecap="round"
                          trailColor="#c1bbbb33"
                        />
                      </ConfigProvider>

                      <p className="text-(--color-title) text-xs my-2">
                        Overall Match
                      </p>
                    </Tooltip>
                  </div>
                  <div className=" py-3 text-center">
                    <ConfigProvider
                      theme={{
                        components: {
                          Progress: {
                            circleTextColor: "#ffffff",
                          },
                        },
                      }}
                    >
                      <Progress
                        percent={parseFloat(
                          parseFloat(
                            `${
                              (((selectedCv?.cosineSimilarity
                                ?.hireProbability as number) /
                                2 +
                                (selectedCv?.cosineSimilarity
                                  ?.total as number) +
                                (selectedCv?.cosineSimilarity?.raw as number)) /
                                3) *
                              100
                            }`
                          ).toFixed(0)
                        )}
                        type="circle"
                        format={(percent) => `${percent}%`}
                        strokeLinecap="round"
                        trailColor="#c1bbbb33"
                      />
                    </ConfigProvider>
                    <p className="text-(--color-title) text-xs my-2">
                      Hire Probability
                    </p>
                  </div>
                </div>
                <div className="flex-grow">
                  <div
                    className={cx(
                      "rounded-3xl font-light text-white text-xs p-3 mt-2",
                      getPillClass(selectedCv?.cosineSimilarity?.raw as number)
                    )}
                  >
                    <p className="font-semibold text-sm">
                      {
                        getOverallMatchMessage(
                          selectedCv?.cosineSimilarity?.raw as number
                        )?.msg
                      }
                    </p>
                    <p className="text-(--color-sub)">
                      *{" "}
                      {
                        getOverallMatchMessage(
                          selectedCv?.cosineSimilarity?.raw as number
                        )?.suggestion
                      }
                    </p>
                  </div>

                  <div
                    className={cx(
                      "rounded-3xl font-light text-white text-xs p-3 mt-2",
                      getPillClass(
                        selectedCv?.cosineSimilarity?.technical as number
                      )
                    )}
                  >
                    <p className="font-semibold text-sm">
                      {
                        getTechnicalMessage(
                          selectedCv?.cosineSimilarity?.technical as number
                        )?.msg
                      }
                    </p>
                    <p className="text-(--color-sub)">
                      *{" "}
                      {
                        getTechnicalMessage(
                          selectedCv?.cosineSimilarity?.technical as number
                        )?.suggestion
                      }
                    </p>
                  </div>

                  <div
                    className={cx(
                      "rounded-3xl font-light text-white text-xs p-3 mt-2",
                      getPillClass(
                        selectedCv?.cosineSimilarity?.education as number
                      )
                    )}
                  >
                    <p className="font-semibold text-sm">
                      {
                        getEducationMessage(
                          selectedCv?.cosineSimilarity?.education as number
                        )?.msg
                      }
                    </p>
                    <p className="text-(--color-sub)">
                      *{" "}
                      {
                        getEducationMessage(
                          selectedCv?.cosineSimilarity?.education as number
                        )?.suggestion
                      }
                    </p>
                  </div>

                  <div
                    className={cx(
                      "rounded-3xl font-light text-white text-xs p-3 mt-2",
                      getPillClass(
                        selectedCv?.cosineSimilarity?.workExp as number
                      )
                    )}
                  >
                    <p className="font-semibold text-sm">
                      {
                        getWorkExpMessage(
                          selectedCv?.cosineSimilarity?.workExp as number
                        )?.msg
                      }
                    </p>
                    <p className="text-(--color-sub)">
                      *{" "}
                      {
                        getWorkExpMessage(
                          selectedCv?.cosineSimilarity?.workExp as number
                        )?.suggestion
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="w-33 flex-grow inner-card p-3">
                      <div className="flex pt-8 flex-col items-center justify-between w-full h-full">
                        <div
                          className={cx(
                            "rounded-xl text-center font-light text-white text-xs p-3 ",
                            getPillClass(
                              selectedCv?.cosineSimilarity?.raw as number
                            )
                          )}
                        >
                          {
                            getOverallMatchMessage(
                              selectedCv?.cosineSimilarity?.raw as number
                            )?.suggestion
                          }
                        </div>

                        <div
                          className={cx(
                            "rounded-xl text-center font-light text-white text-xs p-3 ",
                            getPillClass(
                              selectedCv?.cosineSimilarity?.technical as number
                            )
                          )}
                        >
                          {
                            getTechnicalMessage(
                              selectedCv?.cosineSimilarity?.technical as number
                            )?.suggestion
                          }
                        </div>

                        <div
                          className={cx(
                            "rounded-xl text-center font-light text-white text-xs p-3",
                            getPillClass(
                              selectedCv?.cosineSimilarity?.education as number
                            )
                          )}
                        >
                          {
                            getEducationMessage(
                              selectedCv?.cosineSimilarity?.education as number
                            )?.suggestion
                          }
                        </div>

                        <div
                          className={cx(
                            "rounded-xl text-center font-light text-white text-xs p-3",
                            getPillClass(
                              selectedCv?.cosineSimilarity?.workExp as number
                            )
                          )}
                        >
                          {
                            getWorkExpMessage(
                              selectedCv?.cosineSimilarity?.workExp as number
                            )?.suggestion
                          }
                        </div>
                      </div>
                    </div> */}
      </div>
    </div>
  );
};

export default PredictionCard;
