const API_URL = import.meta.env.VITE_BACKEND_URL + "/api";

const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const getBikeModels = async () => {
  const res = await fetch(`${API_URL}/bike-models`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Error cargando modelos");
  return res.json();
};
