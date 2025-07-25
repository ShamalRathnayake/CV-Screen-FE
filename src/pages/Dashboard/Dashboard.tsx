import NavBar from "../../components/Navbar/NavBar";
import { Tabs } from "antd";
import Analytics from "../../components/Analytics/Analytics";
import Analyzer from "../../components/Analyzer/Analyzer";
import { useState } from "react";
import cx from "classnames";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("1");
  return (
    <div>
      <div className={"w-screen h-screen bg-(--color-theme-bg) dot-bg"}>
        <div className={"flex flex-col w-screen h-screen"}>
          <div className={"w-full h-auto"}>
            <NavBar
              isHomeActive={true}
              isSignInActive={false}
              isSignOutActive={true}
            />
          </div>
          <div className={"w-full h-full relative overflow-y-auto"}>
            <div
              className={
                "min-w-5xl min-h-fit max-w-2xl absolute top-5 left-1/2 -translate-x-1/2 "
              }
            >
              <div className="flex flex-col w-full h-full">
                <div className="p-3 w-full h-full flex flex-wrap justify-center">
                  <div className="flex w-100 glass p-2 m-3 text-center">
                    <div
                      className={cx(
                        "w-50 px-3 py-1 text-white text-sm rounded-3xl mx-1 cursor-pointer",
                        activeTab === "1" ? "info-glass" : "glass glass-hover "
                      )}
                      onClick={() => setActiveTab("1")}
                    >
                      Analytics
                    </div>
                    <div
                      className={cx(
                        "w-50 glass px-3 py-1 text-white text-sm rounded-3xl mx-1 cursor-pointer",
                        activeTab === "2" ? "info-glass" : "glass glass-hover "
                      )}
                      onClick={() => setActiveTab("2")}
                    >
                      CV Analyzer
                    </div>
                  </div>
                  <div className=" w-full h-full p-3 text-white">
                    <Tabs
                      activeKey={activeTab}
                      type="card"
                      centered={true}
                      style={{}}
                      renderTabBar={() => <span> </span>}
                      items={Array.from({ length: 2 }).map((_, i) => {
                        const id = String(i + 1);
                        return {
                          label: id === "1" ? `Analytics` : "CV Analyzer",
                          key: id,
                          children: id === "1" ? <Analytics /> : <Analyzer />,
                        };
                      })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
