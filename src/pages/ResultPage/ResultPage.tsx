import { Button, Empty, Tag } from "antd";
import NavBar from "../../components/Navbar/NavBar";
import { useAppSelector } from "../../state/useAppSelector";
import ProfileCard from "../../components/ProfileCard/ProfileCard";

import { ArrowLeftOutlined } from "@ant-design/icons";
import PredictionCard from "../../components/PredictionCard/PredictionCard";
import { useNavigate } from "react-router-dom";

const ResultPage = () => {
  const selectedCv = useAppSelector((state) => state.predictions.selectedCv);
  const jobDescription = useAppSelector((state) => state.predictions.jdFile);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const navigate = useNavigate();

  const handleBackClick = async () => {
    if (isAuthenticated) navigate("/dashboard");
    else navigate("/");
  };
  return (
    <div>
      <div className={"w-screen h-screen bg-(--color-theme-bg) dot-bg"}>
        <div className={"flex flex-col w-screen h-screen"}>
          <div className={"w-full h-auto"}>
            <NavBar isHomeActive={true} isSignInActive={true} />
          </div>
          <div className={"w-full h-full relative overflow-y-auto"}>
            {selectedCv && (
              <div
                className={
                  "min-w-5xl min-h-fit max-w-2xl absolute top-10 left-1/2 -translate-x-1/2 "
                }
              >
                <div className="flex flex-col w-full h-full">
                  <div className="flex flex-col align-center">
                    <Button
                      type="primary"
                      variant="outlined"
                      shape="round"
                      icon={<ArrowLeftOutlined />}
                      size={"small"}
                      className="w-20 m-2"
                      onClick={handleBackClick}
                    >
                      back
                    </Button>
                    <p className="text-(--color-title) text-sm p-3">
                      Analysis Report
                    </p>
                  </div>

                  <PredictionCard selectedCv={selectedCv} />
                  <div className="my-10 p-3 glass w-full h-full">
                    <div className="flex w-full h-full mt-4">
                      <div className="w-50 flex-grow  inner-card mr-3 p-3">
                        <ProfileCard selectedCv={selectedCv} />
                        <div className="flex flex-col w-full h-full mt-6 px-3">
                          <div className="">
                            {selectedCv?.extractedCv?.skills && (
                              <p className="text-white">Skills</p>
                            )}
                            <div className="flex flex-wrap">
                              {selectedCv?.extractedCv?.skills?.technicalSkills?.map(
                                (skill, index) => {
                                  return (
                                    <div key={index}>
                                      <p className="glass text-xs text-white px-3 py-1 m-2 ">
                                        {skill}
                                      </p>
                                    </div>
                                  );
                                }
                              )}
                              {selectedCv?.extractedCv?.skills?.languages?.map(
                                (language, index) => {
                                  return (
                                    <p
                                      className="glass text-xs text-white px-3 py-1 m-2 "
                                      key={index}
                                    >
                                      {language?.language}
                                    </p>
                                  );
                                }
                              )}
                            </div>
                          </div>
                          <div className="mt-6">
                            {selectedCv?.extractedCv?.education && (
                              <p className="text-white">Education</p>
                            )}
                            <div className="flex flex-wrap">
                              {selectedCv?.extractedCv?.education?.map(
                                (education, index) => {
                                  return (
                                    <div key={index}>
                                      <div className="glass text-xs text-white px-3 py-1 m-2 ">
                                        <p>{education?.degree}</p>
                                        <p>
                                          {education?.institution}{" "}
                                          <span>
                                            (
                                            {new Date(
                                              education?.startDate || "2020"
                                            ).getFullYear()}{" "}
                                            -{" "}
                                            {new Date(
                                              education?.endDate || "2025"
                                            ).getFullYear()}
                                            )
                                          </span>
                                        </p>
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          </div>

                          <div className="mt-6">
                            {selectedCv?.extractedCv?.workExperience && (
                              <p className="text-white">Work Experience</p>
                            )}
                            <div className="flex flex-wrap">
                              {selectedCv?.extractedCv?.workExperience?.map(
                                (work, index) => {
                                  return (
                                    <div key={index}>
                                      <div className="glass text-xs text-white px-3 py-1 m-2 ">
                                        <p>{work?.position}</p>
                                        <p>
                                          {work?.company}{" "}
                                          <span>
                                            (
                                            {new Date(
                                              work?.startDate || "2020"
                                            ).getFullYear()}{" "}
                                            -{" "}
                                            {new Date(
                                              work?.endDate || "2025"
                                            ).getFullYear()}
                                            )
                                          </span>
                                        </p>
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          </div>
                          <div className="mt-6">
                            {selectedCv?.extractedCv?.projects && (
                              <p className="text-white">Projects</p>
                            )}
                            <div className="flex flex-wrap">
                              {selectedCv?.extractedCv?.projects?.map(
                                (project, index) => {
                                  return (
                                    <div key={index}>
                                      <div className="glass text-xs text-white px-3 py-1 m-2 ">
                                        <p className="mb-2">{project?.title}</p>
                                        <p className="">
                                          {project?.technologies?.map(
                                            (tech, index) => {
                                              return (
                                                <span
                                                  className="my-1 inline-block"
                                                  key={index}
                                                >
                                                  <Tag color="purple-inverse">
                                                    {tech}
                                                  </Tag>
                                                </span>
                                              );
                                            }
                                          )}
                                        </p>
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-50 flex-grow text-center inner-card mr-3 p-3">
                        <p className="text-white font-bold">Job Description</p>
                        <div className="flex flex-col text-start w-full h-full mt-10 px-3">
                          <div className="mb-3">
                            {jobDescription?.qualifications && (
                              <p className="text-white">Job Role</p>
                            )}

                            {jobDescription?.qualifications && (
                              <div className="flex flex-wrap">
                                <p className="glass text-xs text-white px-3 py-1 m-2 w-auto">
                                  {jobDescription?.jobTitle}
                                </p>
                              </div>
                            )}
                          </div>

                          <div className="">
                            {((jobDescription?.skillsRequired &&
                              jobDescription?.skillsRequired?.length > 0) ||
                              (jobDescription?.softSkills &&
                                jobDescription?.softSkills?.length > 0)) && (
                              <p className="text-white">Skills</p>
                            )}
                            <div className="flex flex-wrap">
                              {jobDescription?.skillsRequired?.map(
                                (skill, index) => {
                                  return (
                                    <div key={index}>
                                      <p className="glass text-xs text-white px-3 py-1 m-2 ">
                                        {skill}
                                      </p>
                                    </div>
                                  );
                                }
                              )}
                              {jobDescription?.softSkills?.map(
                                (softSkill, index) => {
                                  return (
                                    <p
                                      className="glass text-xs text-white px-3 py-1 m-2 "
                                      key={index}
                                    >
                                      {softSkill}
                                    </p>
                                  );
                                }
                              )}
                            </div>
                          </div>
                          <div className="mt-6">
                            {jobDescription?.qualifications && (
                              <p className="text-white">Qualifications</p>
                            )}
                            <div className="flex flex-wrap">
                              {jobDescription?.qualifications?.map(
                                (qualification, index) => {
                                  return (
                                    <div key={index}>
                                      <div className="glass text-xs text-white px-3 py-1 m-2 ">
                                        <p>{qualification}</p>
                                      </div>
                                    </div>
                                  );
                                }
                              )}

                              {jobDescription?.preferredQualifications?.map(
                                (qualification, index) => {
                                  return (
                                    <div key={index}>
                                      <div className="glass text-xs text-white px-3 py-1 m-2 ">
                                        <p>{qualification}</p>
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          </div>

                          <div className="mt-6">
                            {jobDescription?.responsibilities && (
                              <p className="text-white">Responsibilities</p>
                            )}
                            <div className="flex flex-wrap">
                              {jobDescription?.responsibilities?.map(
                                (responsibility, index) => {
                                  return (
                                    <div key={index}>
                                      <div className="glass text-xs text-white px-3 py-1 m-2 ">
                                        <p>{responsibility}</p>
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          </div>
                          <div className="mt-6">
                            {jobDescription?.benefits && (
                              <p className="text-white">Benefits</p>
                            )}
                            <div className="flex flex-wrap">
                              {jobDescription?.benefits?.map(
                                (benefit, index) => {
                                  return (
                                    <div key={index}>
                                      <div className="glass text-xs text-white px-3 py-1 m-2 ">
                                        <p className="mb-2">{benefit}</p>
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!selectedCv && (
              <div
                className={
                  "min-w-5xl min-h-fit max-w-2xl absolute top-50 left-1/2 -translate-x-1/2 "
                }
              >
                <div className="flex flex-col w-full h-full">
                  <div className="flex flex-col align-center items-center">
                    <Empty
                      description={<p className="text-white">No cv detected</p>}
                    />
                    <Button
                      type="primary"
                      variant="outlined"
                      shape="round"
                      icon={<ArrowLeftOutlined />}
                      size={"small"}
                      className="w-20 m-2"
                      onClick={handleBackClick}
                    >
                      back
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
