import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SettingsDropdown from "./SettingsDropdown";
import "../../styles/header.css";

const ProfileHeader = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <header className="profile-header">
      <div className="profile-left">
        <img
          src="https://ca.slack-edge.com/T0BFXMWMV-U08U5P1CMT8-66334e023a99-512"
          alt="avatar"
          className="profile-avatar"
        />

        <div className="profile-info">
          <h1>Fernando Del Rio</h1>
          <span>Ponferrada, ES</span>
        </div>
      </div>

      <div className="profile-actions">
       
        <div className="settings-wrapper">
          <button
            className="icon-btn tooltip"
            data-tooltip="Opciones"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Opciones de usuario"
          >
            ⚙️
          </button>

          {open && <SettingsDropdown />}
        </div>

        <button
          className="icon-btn tooltip"
          data-tooltip="Cerrar sesión"
          onClick={handleLogout}
          aria-label="Cerrar sesión"
        >
          ⏻
        </button>
      </div>
    </header>
  );
};

export default ProfileHeader;