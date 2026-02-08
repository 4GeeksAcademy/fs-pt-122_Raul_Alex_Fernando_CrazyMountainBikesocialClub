const KEY = "trail_routes_v2";
const LIMIT = 50;
const PREVIEW_POINTS = 80;

const safeParse = (raw, fallback) => {
  try {
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch (e) {
    console.error("Error parsing JSON:", e);
    return fallback;
  }
};

const normalizeRoute = (route) => {
  if (!route || typeof route !== "object") return null;

  const id = route.id || route._id || String(Date.now());
  const name = route.name || route.title || "Ruta sin nombre";

  const createdAt =
    route.createdAt ||
    route.created_at ||
    route.date ||
    new Date().toISOString();

  
  const coords =
    route.preview_coords ||
    route.coords ||
    route.coordinates ||
    route.geojson?.geometry?.coordinates ||
    route.geojsonFeature?.geometry?.coordinates ||
    route.geojsonLine?.geometry?.coordinates ||
    null;

  return {
    id,
    name,
    distance_km: route.distance_km ?? route.distance ?? null,
    duration_min: route.duration_min ?? route.duration ?? null,
    bbox: route.bbox ?? null,

    
    preview_coords: Array.isArray(coords)
      ? coords.slice(0, PREVIEW_POINTS)
      : null,

    createdAt,
  };
};


export const getRoutes = () => {
  const raw = localStorage.getItem(KEY);
  const routes = safeParse(raw, []);
  return Array.isArray(routes) ? routes : [];
};

export const saveRoute = (route) => {
  const summary = normalizeRoute(route);
  if (!summary) return getRoutes();

  const prev = getRoutes();
  const withoutDup = prev.filter((r) => r?.id !== summary.id);
  const next = [summary, ...withoutDup].slice(0, LIMIT);

  try {
    localStorage.setItem(KEY, JSON.stringify(next));
    return next;
  } catch {
    const trimmed = next.slice(0, 10);
    localStorage.setItem(KEY, JSON.stringify(trimmed));
    return trimmed;
  }
};


export const deleteRoute = (routeId) => {
  const prev = getRoutes();
  const next = prev.filter((r) => r?.id !== routeId);
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
};


export const clearRoutes = () => {
  localStorage.removeItem(KEY);
  return [];
};
