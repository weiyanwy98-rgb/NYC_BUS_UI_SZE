import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import { useEffect } from "react";

function ChangeCenter({ center }) {
    const map = useMap();
    //console.log("new center", center);
    useEffect(() => {
        if (!center || !center[0] || !center[1]) return; // prevents "lat of null"
        map.setView(center);
    }, [center]);

    return null;
}
export default function MapView({ layers, center }) {

    return (
        <div className="w-full h-full">
            <MapContainer
                center={center}
                zoom={13}
                className="h-full w-full"
            >
                <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {layers.map((layer, idx) => (
                    <GeoJSON
                        key={idx}
                        data={layer.data}
                        style={{ color: layer.color, weight: 4 }}
                        onEachFeature={(feature, layerObj) => {
                            // Build popup text from your GeoJSON properties
                            const props = feature.properties;
                            const text = Object.entries(props)
                                .map(([k, v]) => `<b>${k}:</b> ${v}`)
                                .join("<br>");

                            layerObj.bindPopup(text);
                        }}
                    />
                ))}
                <ChangeCenter center={center} />

            </MapContainer>
        </div>
    );
}