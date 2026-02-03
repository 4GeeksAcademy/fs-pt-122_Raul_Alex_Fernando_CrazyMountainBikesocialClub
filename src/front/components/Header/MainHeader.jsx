import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../../context/UserContext";

import "../../styles/header.css";

export default function MainHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  // 👇 viene del Context (una sola fuente de verdad)
  const { user } = useUser();

  const variant = location.pathname === "/home" ? "home" : "profile";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="main-header">
      <div className="header-inner">

        {/* IZQUIERDA */}
        <div className="header-left">

          <div
            className="user-avatar clickable"
            onClick={() => navigate("/profile")}
          >
            <img
              src={user?.avatar || "https://via.placeholder.com/64"}
              alt="avatar"
              className={variant === "profile" ? "profile-avatar active" : ""}
            />
          </div>

          <div className="header-text">

            {variant === "home" ? (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span className="home-hello">
                    Hola {user?.name || user?.email}
                  </span>

                  <button
                    className="edit-profile-btn"
                    onClick={() => navigate("/profile")}
                  >
                    Editar perfil
                  </button>
                </div>

                <span className="home-subtitle">¿Listo para pedalear hoy?</span>
              </>
            ) : (
              <>
                <span className="home-hello">
                  {user?.name || user?.email}
                </span>

                <span className="home-subtitle">
                  {user?.location || ""}
                </span>
              </>
            )}

          </div>

        </div>

        {/* DERECHA */}
        <div className="header-actions">

          <button
            className="settings-btn home-btn"
            onClick={() => navigate("/home")}
          >
            <i
              className={`fa-solid fa-house nav-home-icon ${
                variant === "home" ? "active" : ""
              }`}
            />
          </button>

          <button className="settings-btn" onClick={handleLogout}>
            <i className="fa-solid fa-power-off logout-icon"></i>
          </button>

        </div>

      </div>
    </header>
  );
}
