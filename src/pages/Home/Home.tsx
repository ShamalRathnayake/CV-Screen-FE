import { useNavigate } from "react-router-dom";
import FileUploader from "../../components/FileUploader/FileUploader";
import NavBar from "../../components/Navbar/NavBar";
import { useEffect } from "react";
import { useAppSelector } from "../../state/useAppSelector";

const Home = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const onAnalyzeComplete = async () => {
    await navigate("/result");
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
  }, []);

  return (
    <div>
      <div className={"w-screen h-screen bg-(--color-theme-bg) dot-bg"}>
        <div className={"flex flex-col w-screen h-screen"}>
          <div className={"w-full h-auto"}>
            <NavBar isHomeActive={true} isSignInActive={true} />
          </div>
          <div className={"w-full h-full relative overflow-y-auto"}>
            <div
              className={
                "  min-w-lg min-h-fit max-w-2xl absolute top-25 left-1/2 -translate-x-1/2 "
              }
            >
              <FileUploader
                allowMultiple={false}
                onAnalyzeComplete={onAnalyzeComplete}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
