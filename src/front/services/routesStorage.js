const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export async function getBikes() {
  const resp = await fetch(`${API_URL}/bikes`, {
    headers: getAuthHeaders(),
  });

  if (!resp.ok) throw new Error("Error cargando bikes");
  return resp.json();
}

export async function saveBike(bike) {
  const resp = await fetch(`${API_URL}/bikes`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(bike),
  });

  if (!resp.ok) throw new Error("Error creando bike");
  return resp.json();
}

export async function deleteBike(bikeId) {
  const resp = await fetch(`${API_URL}/bikes/${bikeId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!resp.ok) throw new Error("Error borrando bike");
  return resp.json();
}

