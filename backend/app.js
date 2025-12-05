import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());

const NYC_API = "https://nyc-bus-engine-k3q4yvzczq-an.a.run.app/api/bus_trip";
const DATA = path.join(process.cwd(), "data");

// ----- API: SERVER READY -----
app.get("/api/bus_trip/ready", async (req, res) => {
    try {
        //throw new Error("Simulated NYC API failure");
        const response = await axios.get(`${NYC_API}/ready`);
        return res.status(200).json(response.data);
    } catch (err) {
        return res.status(500).json({ status: false});
    }
});

// ----- API: VEHICLE REFS -----
app.get("/api/bus_trip/getVehRef", async (req, res) => {
    try {
       // throw new Error("Simulated NYC API failure");
        console.log("Fetching vehRefs from NYC API...");
        // 1. Call NYC API
        const response = await axios.get(`${NYC_API}/getVehRef`);
        const vehRefs = response.data;
        // 2. Save to local file
        fs.writeFileSync(`${DATA}/vehRef.json`, JSON.stringify(vehRefs.sort(), null, 2));
        // 3. Return to client
        return res.status(200).json(vehRefs);

    } catch (error) {
        console.log("NYC API down, loading from local file...");
        if(!fs.existsSync(`${DATA}/vehRef.json`)) {
            return res.status(400).json({ error: "No cached data available" });
        }
        //4. Fallback to local JSON
        const cache = JSON.parse(fs.readFileSync(`${DATA}/vehRef.json`, "utf-8"));
        return res.json(cache);
    }
});

// ----- API: TRIP BY VEHREF -----
app.get("/api/bus_trip/getBusTripByVehRef/:vehRef", async (req, res) => {
    const { vehRef } = req.params;
    try {
        console.log("Getting vehRef:", vehRef);
        //throw new Error("Simulated NYC API failure");
        // 1. Call NYC API
        const response = await axios.get(`${NYC_API}/getBusTripByVehRef/${vehRef}`);
        const tripData = response.data;
        // 2. Save to local file
        fs.writeFileSync(`${DATA}/tripsByVehRef/${vehRef}.geojson`, JSON.stringify(tripData, null, 2));
        // 3. Return to client
        return res.status(200).json(tripData);
    } catch (error) {
        console.log("NYC API down, loading from local file...");
        //4. Fallback to local JSON
        const file = `${DATA}/tripsByVehRef/${vehRef}.geojson`;
        if (!fs.existsSync(file)) {
            console.log("File not found:");
            return res.status(500).json({ error: "Vehicle reference not found" });
        }
        const cache = JSON.parse(fs.readFileSync(file, "utf-8"));
        res.json(cache);
    }
});

// ----- API: PUBLISHED LINE NAMES -----
app.get("/api/bus_trip/getPubLineName", async (req, res) => {
    try {
        console.log("Fetching line names from NYC API...");
        //throw new Error("Simulated NYC API failure");
        // 1. Call NYC API
        const response = await axios.get(`${NYC_API}/getPubLineName`);
        const lineNames = response.data;
        // 2. Save to local file
        fs.writeFileSync(`${DATA}/pubLineName.json`, JSON.stringify(lineNames.sort(), null, 2));

        // 3. Return to client
        return res.status(200).json(lineNames);
    } catch (error) {
        console.log("NYC API down, loading from local file...");
        //4. Fallback to local JSON
        if (!fs.existsSync(`${DATA}/pubLineName.json`)) {
            return res.status(500).json({ error: "No cached data available" });
        }
        const cache = JSON.parse(fs.readFileSync(`${DATA}/pubLineName.json`, "utf-8"));
        res.status(400).json(cache);
    }
});

// ----- API: TRIP BY LINE NAME -----
app.get("/api/bus_trip/getBusTripByPubLineName/:line", async(req, res) => {
    const { line } = req.params;
    const file = `${DATA}/tripsByLine/${line}.geojson`;
    try {
        console.log("Getting line name:", line);
        //throw new Error("Simulated NYC API failure");
        // 1. Call NYC API
        const response = await axios.get(`${NYC_API}/getBusTripByPubLineName/${line}`);
        const tripData = response.data;
        // 2. Save to local file
        fs.writeFileSync(file, JSON.stringify(tripData, null, 2));
        // 3. Return to client
        return res.status(200).json(tripData);
    } catch (error) {
        console.log("NYC API down, loading from local file...");
        //4. Fallback to local JSON
        if (!fs.existsSync(file)) {
            return res.status(404).json({ error: "Line name not found" });
        }
        const cache = JSON.parse(fs.readFileSync(file, "utf-8"));
        res.status(500).json(cache);
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
