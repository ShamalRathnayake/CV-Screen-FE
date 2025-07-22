import "./App.css";
import Loader from "./components/Loader/Loader";
import AppRoutes from "./routes/AppRoutes";
import { useAppSelector } from "./state/useAppSelector";
import { Toaster } from "react-hot-toast";

function App() {
  const { isLoading } = useAppSelector((state) => state.settings);
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          className: "notification",
        }}
      />
      {isLoading && <Loader />}
      <div className="absolute top-0 left-0 z-1">
        <AppRoutes />
      </div>
    </>
  );
}

export default App;
