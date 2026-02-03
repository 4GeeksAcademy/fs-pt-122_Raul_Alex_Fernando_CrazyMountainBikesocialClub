import "../../styles/featuredRoutes.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRoutes } from "../../services/routesStorage.js";

const FeaturedRoutes = () => {
  const navigate = useNavigate();
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const saved = getRoutes();
    console.log("ROUTES ===>", saved);
    setRoutes(saved.slice(0, 5)); // se muestran las 5 rutas destacadas
  }, []);

  return (
    <section className="featured-routes home-section ui-panel">
      <div className="featured-header">
        <h2 className="ui-subtitle">Rutas destacadas</h2>

        <button
          className="ui-btn ui-btn--secondary"
          onClick={() => navigate("/saved-routes")}
        >
          Ver todas
        </button>
      </div>

      <div className="featured-list">
        {routes.map(route => (
          <article key={route.id} className="route-card clickable" onClick={() => navigate(`/saved-routes/${route.id}`)}>
            <img
              src={route.image || "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"}
              alt={route.name}
            />

            <div className="route-info">
              <div className="route-tags">
                <span className="tag">{route.terrain}</span>
              </div>

              <h3>{route.name}</h3>

              <div className="route-stats">
                <span>{route.distance_km.toFixed(1)} km</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default FeaturedRoutes;