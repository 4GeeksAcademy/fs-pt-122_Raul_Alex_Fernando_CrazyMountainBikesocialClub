import Stats from "../components/Profile/Stats";
import Maintenance from "../components/Maintenance/MaintenanceCard";
import Garage from "../components/Profile/Garage";

const Profile = () => {
  return (
    <div className="profile-wrapper">



      {/* Garage con panel */}
      <div className="ui-panel">
        <Garage />
      </div>


    </div>
  );
};

export default Profile;
