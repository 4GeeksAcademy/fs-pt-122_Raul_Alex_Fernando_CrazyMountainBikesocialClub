import { Loader } from "../components/Loader/Loader";
import { useLoader } from "../context/loaderContext";
import { Outlet } from "react-router-dom"


export const Layout = () => {
  const { isLoading } = useLoader();

  return (
    <div className="app-root">
      {isLoading && <Loader />}
      <Outlet />
    </div>
  );
};