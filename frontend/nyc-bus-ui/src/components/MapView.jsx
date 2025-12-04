import { MapContainer, TileLayer, GeoJSON, Marker, Popup, Polyline } from "react-leaflet";

export default function MapView({ layers }) {

    return (
        <div className="w-full h-full">
            <MapContainer
                center={[40.82, -73.92]}
                zoom={10}
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


            </MapContainer>
        </div>
    );
}
