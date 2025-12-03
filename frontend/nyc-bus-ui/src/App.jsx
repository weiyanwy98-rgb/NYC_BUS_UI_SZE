import { useEffect, useState } from "react";
import MapView from "./components/MapView";
import Sidebar from "./components/Sidebar";

const API = "http://localhost:5000/api/bus_trip";

export default function App() {
  const [vehRefs, setVehRefs] = useState([]);
  const [lineNames, setLineNames] = useState([]);
  const [layers, setLayers] = useState([]);

  const randomColor = () =>
    "#" + Math.floor(Math.random() * 16777215).toString(16);

  // Load dropdown data on startup
  useEffect(() => {
    fetchVehRefs()
    fetchLineNames()
    console.log("Fetched dropdown data", vehRefs, lineNames);
  }, []);
  const fetchVehRefs = async () => {
    const data = await fetch(`http://localhost:5000/api/bus_trip/getVehRef`)
      .then(r => r.json());
    setVehRefs(data);
  };

  const fetchLineNames = async () => {
    const data = await fetch(`http://localhost:5000/api/bus_trip/getPubLineName`)
      .then(r => r.json());
    setLineNames(data);
  };
  const loadVehRef = async (vehRef) => {
    setLayers([]);
    const geo = await fetch(`${API}/getBusTripByVehRef/${vehRef}`)
      .then(r => r.json());
    setLayers([{ data: geo, color: "#ff0000" }]);
  };

  const loadLine = async (line) => {
    setLayers([]);
    const geo = await fetch(`${API}/getBusTripByPubLineName/${line}`)
      .then(r => r.json());

    const newLayers = geo.features.map(f => ({
      data: f,
      color: randomColor()
    }));

    setLayers(newLayers);
  };
  return (
    <div className="flex-col h-screen w-screen flex pt-10">
      {/* Sidebar left */}
      <Sidebar
        vehRefs={vehRefs}
        lineNames={lineNames}
        onVehRefSelect={loadVehRef}
        onLineSelect={loadLine}
      />

      {/* Map right */}
      <div className=" h-screen">
        <MapView layers={layers} />
      </div>
    </div>   // <— correct closing tag
  );
}
