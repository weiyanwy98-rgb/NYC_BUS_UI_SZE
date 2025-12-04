import { useEffect, useState } from "react";
import MapView from "./components/MapView";
import Sidebar from "./components/Sidebar";

const API = "http://localhost:5000/api/bus_trip";

export default function App() {
  const [vehRefs, setVehRefs] = useState([]);
  const [lineNames, setLineNames] = useState([]);
  const [layers, setLayers] = useState([]);
  const [serverStatus, setServerStatus] = useState(null);
  const [statusTimeOut, setStatusTimeOut] = useState(null);

  const randomColor = () =>
    "#" + Math.floor(Math.random() * 16777215).toString(16);

  // Load dropdown data on startup
  useEffect(() => {
    fetchVehRefs()
    fetchLineNames()
    console.log("Fetched dropdown data", vehRefs, lineNames);
  }, []);

  useEffect(() => {
    fetchServerStatus(); // fetch immediately

    const timeout = setTimeout(() => {
      setStatusTimeOut(prev => !prev); // toggle to trigger next fetch
    }, 30000);

    return () => clearTimeout(timeout); // cleanup previous timeout
  }, [statusTimeOut]);

  const fetchServerStatus = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/bus_trip/ready");
      const data = await res.json();
      console.log("Server status:", data.status);
      if (data.status === "Ready")
        setServerStatus(true);
      else
        setServerStatus(false);
    } catch (err) {
      setServerStatus(false);
      console.error("Failed to fetch server status:", err);
    }
  };

  const fetchVehRefs = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/bus_trip/getVehRef`)
      if(!res.ok) throw new Error("Network response was not ok");
      const data = await res.json(); 
      setVehRefs(data);
    }
    catch (err) {
      console.error("Failed to fetch vehicle references:");
    }
  };

  const fetchLineNames = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/bus_trip/getPubLineName`)
      if(!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      setLineNames(data);
    }
    catch (err) {
      console.error("Failed to fetch line names:", err);
    }
  };

  const loadVehRef = async (vehRef) => {
    try {
      setLayers([]);
      const res = await fetch(`${API}/getBusTripByVehRef/${vehRef}`)
      if(!res.ok) throw new Error("Network response was not ok");
      const geo = await res.json();
      setLayers([{ data: geo, color: "#ff0000" }]);
    }
    catch (err) {
      console.error("Failed to load vehicle trip data:", err);
    }
  };

  const loadLine = async (line) => {
    try {
      setLayers([]);
      const res = await fetch(`${API}/getBusTripByPubLineName/${line}`)
      if(!res.ok) throw new Error("Network response was not ok");
      const geo = await res.json();
      const newLayers = geo.features.map(f => ({
        data: f,
        color: randomColor()
      }));

      setLayers(newLayers);
    }
    catch (err) {
      console.error("Failed to load line trip data:", err);
    }
  };

  return (
    <div className="flex-col h-screen w-screen flex">
      {/* Sidebar left */}
      <Sidebar
        serverStatus={serverStatus}
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
