import { useEffect, useState } from "react";
import BikeCard from "./BikeCard";
import AddBikeModal from "./AddBikeModal";
import BikeDetailModal from "./BikeDetailModal";
import AiChatDialog from "../AiChatDialog";
import "../../styles/Profile/garage.css";

import { getBikes, deleteBike } from "../../services/bikeService";

const Garage = () => {
  const [bikes, setBikes] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedBike, setSelectedBike] = useState(null);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [bikeToView, setBikeToView] = useState(null);

  useEffect(() => {
    getBikes()
      .then(setBikes)
      .catch(err => console.error("Error cargando bikes:", err));
  }, []);

  const handleBikeCreated = (bike) => {
    setBikes(prev => [...prev, bike]);
  };

  const handleBikeUpdated = (updatedBike) => {
    setBikes(prev =>
      prev.map(b => (b.id === updatedBike.id ? updatedBike : b))
    );
  };

  const handleOpenEdit = (bike) => {
    setSelectedBike(bike);
    setOpenModal(true);
  };

  const handleViewDetails = (bike) => {
    setBikeToView(bike);
    setOpenDetailModal(true);
  };

  const handleDelete = async (bikeId) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar esta bici?")) {
      return;
    }

    try {
      await deleteBike(bikeId);
      setBikes(prev => prev.filter(b => b.id !== bikeId));
    } catch (error) {
      console.error(error);
      alert("No se pudo eliminar la bici");
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedBike(null);
  };

  return (
    <section className="garage">
      <div className="garage-header">
        <h2>Mi Garaje</h2>
        <div className="header-actions">
          <AiChatDialog floating={false} />
          <button
            className="add-bike ui-btn ui-btn--primary"
            onClick={() => setOpenModal(true)}
          >
            + Añadir Bici
          </button>
        </div>
      </div>

      <div className="garage-list">
        {bikes.map(bike => (
          <BikeCard
            key={bike.id}
            active={bike.is_active}
            name={bike.name}
            specs={bike.specs}
            km={`${bike.km_total} km registrados`}
            image={bike.image_url}
            onEdit={() => handleOpenEdit(bike)}
            onDelete={() => handleDelete(bike.id)}
            onViewDetails={() => handleViewDetails(bike)}
          />
        ))}
      </div>

      <AddBikeModal
        open={openModal}
        onClose={handleCloseModal}
        onBikeCreated={handleBikeCreated}
        onBikeUpdated={handleBikeUpdated}
        existingBike={selectedBike}
      />

      <BikeDetailModal
        bike={bikeToView}
        open={openDetailModal}
        onClose={() => setOpenDetailModal(false)}
      />
    </section>
  );
};

export default Garage;
