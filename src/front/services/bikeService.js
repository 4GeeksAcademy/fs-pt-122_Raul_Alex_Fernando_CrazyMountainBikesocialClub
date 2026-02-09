const API_URL = import.meta.env.VITE_BACKEND_URL + "/api";

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const getBikes = async () => {
  const res = await fetch(`${API_URL}/bikes`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Error cargando bikes");
  return res.json();
};

export const createBike = async (bike) => {
  const res = await fetch(`${API_URL}/bikes`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(bike),
  });
  if (!res.ok) throw new Error("Error creando bike");
  return res.json();
};

export const deleteBike = async (bikeId) => {
  const res = await fetch(`${API_URL}/bikes/${bikeId}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Error eliminando bike");
  return true;
};

export const updateBike = async (bikeId, bike) => {
  const res = await fetch(`${API_URL}/bikes/${bikeId}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(bike),
  });

  if (!res.ok) {
    throw new Error("Error actualizando bike");
  }

  return res.json();
};
