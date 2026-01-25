const BikeCard = ({ name, specs, km, image, active, onEdit, onDelete, onViewDetails }) => {
  return (
    <div className={`bike-card ${active ? "active" : ""}`}>
      {active && <span className="badge">Activa</span>}

      <img
        src={image}
        alt={name}
        onClick={onViewDetails}
        style={{ cursor: 'pointer' }}
      />

      <h3>{name}</h3>
      <p className="specs">{specs}</p>

      <div className="bike-footer">
        <span>{km}</span>
        <div className="bike-card-actions">
          <button onClick={onEdit}>
            {active ? "📋 Detalles" : "✏️ Editar"}
          </button>
          <button
            onClick={onDelete}
            title="Eliminar bici"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

export default BikeCard;
