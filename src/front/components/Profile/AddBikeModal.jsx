import { useState, useCallback } from "react";
import CloudinaryUploadWidget from "../CloudinaryUploadWidget";
import "../../styles/Profile/AddBikeModal.css";

const DEFAULT_PART = {
    id: 1,
    part_name: "Llantas",
    brand: "",
    model: "",
    km_life: 0,
};

const AddBikeModal = ({ open, onClose, onBikeCreated }) => {
    const [name, setName] = useState("");
    const [model, setModel] = useState("");
    const [specs, setSpecs] = useState("");
    const [parts, setParts] = useState([DEFAULT_PART]);
    const [imagePublicId, setImagePublicId] = useState("");
    const [videoUrl, setVideoUrl] = useState("");

    const imageWidgetConfig = {
        cloudName: "ddx9lg1wd",
        uploadPreset: "upload_preset", // cambia por el tuyo real
        sources: ["local", "camera", "url", "image_search", "google_drive", "dropbox"],
        multiple: false,
        maxFiles: 1,
        folder: "bikes/images",
        resourceType: "image",
    };

    const handleChangePart = useCallback((id, field, value) => {
        setParts((prev) =>
            prev.map((part) =>
                part.id === id ? { ...part, [field]: value } : part
            )
        );
    }, []);

    const handleAddPart = () => {
        setParts((prev) => [
            ...prev,
            {
                id: Date.now(),
                part_name: "",
                brand: "",
                model: "",
                km_life: 0,
            },
        ]);
    };

    const handleVideoChange = (e) => {
        setVideoUrl(e.target.value);
    };

    const resetForm = () => {
        setName("");
        setModel("");
        setSpecs("");
        setParts([DEFAULT_PART]);
        setImagePublicId("");
        setVideoUrl("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        const res = await fetch(
            import.meta.env.VITE_BACKEND_URL + "/api/bikes",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name,
                    model,
                    specs,
                    image_url: imagePublicId
                        ? `https://res.cloudinary.com/ddx9lg1wd/image/upload/w_400,h_300,c_fill/${imagePublicId}.jpg`
                        : null,
                    video_url: videoUrl,
                    parts,
                }),
            }
        );

        if (!res.ok) {
            // manejar errores
            return;
        }

        const newBike = await res.json();
        onBikeCreated(newBike);
        resetForm();
        onClose();
    };

    const handleClose = () => {
        onClose();
    };

    if (!open) return null;

    return (
        <div className="modal-overlay">
            <div className="add-bike-modal">
                <h2>Añadir Bici</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nombre de la bici"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <input
                        type="text"
                        placeholder="Modelo"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                    />

                    <textarea
                        placeholder="Especificaciones"
                        value={specs}
                        onChange={(e) => setSpecs(e.target.value)}
                    />

                    {/* FOTO con CloudinaryUploadWidget */}
                    <label>Foto de la bici</label>
                    {!imagePublicId && (
                        <CloudinaryUploadWidget
                            uwConfig={imageWidgetConfig}
                            setPublicId={setImagePublicId}
                        />
                    )}
                    {imagePublicId && (
                        <div className="bike-image-preview">
                            <img
                                src={`https://res.cloudinary.com/ddx9lg1wd/image/upload/w_400,h_300,c_fill/${imagePublicId}.jpg`}
                                alt="Bici"
                                className="bike-preview"
                            />
                            <button
                                type="button"
                                onClick={() => setImagePublicId("")}
                            >
                                Cambiar foto
                            </button>
                        </div>
                    )}

                    {/* VÍDEO (opcional, URL) */}
                    <label>Vídeo (opcional, URL)</label>
                    <input
                        type="url"
                        placeholder="https://..."
                        value={videoUrl}
                        onChange={handleVideoChange}
                    />

                    {/* PARTES */}
                    <div className="parts-section">
                        <h3>Partes de la bici</h3>
                        {parts.map((p) => (
                            <div key={p.id} className="part-row">
                                <input
                                    type="text"
                                    placeholder="Parte (Llantas, Frenos...)"
                                    value={p.part_name}
                                    onChange={(e) =>
                                        handleChangePart(p.id, "part_name", e.target.value)
                                    }
                                />
                                <input
                                    type="text"
                                    placeholder="Marca"
                                    value={p.brand}
                                    onChange={(e) =>
                                        handleChangePart(p.id, "brand", e.target.value)
                                    }
                                />
                                <input
                                    type="text"
                                    placeholder="Modelo"
                                    value={p.model}
                                    onChange={(e) =>
                                        handleChangePart(p.id, "model", e.target.value)
                                    }
                                />
                                <input
                                    type="number"
                                    placeholder="Km vida útil"
                                    value={p.km_life}
                                    onChange={(e) =>
                                        handleChangePart(
                                            p.id,
                                            "km_life",
                                            Number(e.target.value)
                                        )
                                    }
                                />
                            </div>
                        ))}
                        <button type="button" onClick={handleAddPart}>
                            + Añadir parte
                        </button>
                    </div>

                    <div className="modal-actions">
                        <button type="button" onClick={handleClose}>
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={!imagePublicId}
                        >
                            Guardar bici
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBikeModal;
