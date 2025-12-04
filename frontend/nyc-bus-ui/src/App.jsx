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
  const [vehMsg, setVehMsg] = useState("");
  const [lineMsg, setLineMsg] = useState("");
  const [center, setCenter] = useState([40.71720631412039, -74.00322241032815]);

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
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      setVehRefs(data);
    }
    catch (err) {
      console.error("Failed to fetch vehicle references:");
      setVehMsg({ type: "error", message: "Failed to load vehicle references" });
      setTimeout(() => setVehMsg(""), 5000);
    }
  };

  const fetchLineNames = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/bus_trip/getPubLineName`)
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      setLineNames(data);
    }
    catch (err) {
      console.error("Failed to fetch line names:", err);
      setLineMsg({ type: "success", message: "Failed to load line names" });
      setTimeout(() => setLineMsg(""), 5000);
    }
  };

  const loadVehRef = async (vehRef) => {
    try {
      setLayers([]);
      if(serverStatus)
        setVehMsg({ type: "success", message: "Loading..." })
      else
        setVehMsg({ type: "error", message: "Server offline, loading cached data..." })
      const res = await fetch(`${API}/getBusTripByVehRef/${vehRef}`)
      if (!res.ok) throw new Error("Network response was not ok");
      const geo = await res.json();
      setLayers([{ data: geo, color: "#ff0000" }]);
      console.log("Loaded vehicle trip data:", geo);
      // Set center based on first coordinate
      if (geo.features[0].geometry.type === "LineString")
        setCenter([geo.features[0].geometry.coordinates[0][1], geo.features[0].geometry.coordinates[0][0]]);
      else if (geo.features[0].geometry.type === "Point")
        setCenter([geo.features[0].geometry.coordinates[1], geo.features[0].geometry.coordinates[0]]);
      // Clear message
      setVehMsg(null);
    }
    catch (err) {
      console.error("Failed to load vehicle trip data:", err);
      setVehMsg({ type: "error", message: "Failed to load vehicle trip data" });
      setTimeout(() => setVehMsg(""), 5000);
    }
  };

  const loadLine = async (line) => {
    try {
      setLayers([]);
      if(serverStatus)
        setLineMsg({ type: "success", message: "Loading..." })
      else
        setLineMsg({ type: "error", message: "Server offline, loading cached data..." })
      const res = await fetch(`${API}/getBusTripByPubLineName/${line}`)
      if (!res.ok) throw new Error("Network response was not ok");
      const geo = await res.json();
      const newLayers = geo.features.map(f => ({
        data: f,
        color: randomColor()
      }));

      setLayers(newLayers);
      console.log("Loaded line trip data:", geo);
      console.log(geo.features[0].geometry.coordinates.length);
      if (geo.features[0].geometry.type === "LineString")
        setCenter([geo.features[0].geometry.coordinates[0][1], geo.features[0].geometry.coordinates[0][0]]);
      else if (geo.features[0].geometry.type === "Point")
        setCenter([geo.features[0].geometry.coordinates[1], geo.features[0].geometry.coordinates[0]]);

      setLineMsg(null);
    }
    catch (err) {
      console.error("Failed to load line trip data:", err);
      setLineMsg({ type: "error", message: "Failed to load line trip data" });
      setTimeout(() => setLineMsg(""), 5000);
      console.log("error", lineMsg);
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
        vehMsg={vehMsg}
        lineMsg={lineMsg}
      />
      {/* Map right */}
      <div className=" h-screen">
        <MapView layers={layers} center={center} />
      </div>
    </div>
  );
}
