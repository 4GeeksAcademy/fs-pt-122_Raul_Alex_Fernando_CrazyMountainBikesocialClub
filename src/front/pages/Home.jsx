import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/home.css";

import StartRouteButton from "../components/Home/StartRouteButton";
import FeaturedRoutes from "../components/Home/FeaturedRoutes";
import Garage from "../components/Profile/Garage";


import { useFetchWithLoader } from "../hooks/useFetchWithLoader";
import { session } from "../services/session";

const Home = () => {
  const navigate = useNavigate();


  const fetchWithLoader = useFetchWithLoader();


 

  useEffect(() => {
    const loadData = async () => {
      const token = session.getToken();
      
      await fetchWithLoader(
        `${import.meta.env.VITE_BACKEND_URL}/api/home-data`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    };

    loadData();
  }, []);

  
  return (
    <div className="home">
      <div className="home-content">
        


        <main className="home-content">
          <StartRouteButton className="ui-btn--cta" />
          <FeaturedRoutes />
          <div className="ui-panel">
            <Garage />
          </div>          
         </main>
      </div>
    </div>
  );
};

export default Home;
