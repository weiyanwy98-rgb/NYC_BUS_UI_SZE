export default function Sidebar({
  vehRefs,
  lineNames,
  onVehRefSelect,
  onLineSelect
}) {
  return (
    <div className="absolute top-4 left-4 bg-white shadow-lg rounded-xl pt-4 w-64 z-[1000]">
      <h2 className="text-lg font-semibold mb-3">Bus Route Controls</h2>

      {/* VehicleRef */}
      <label className="font-medium">VehicleRef</label>
      <select
        className="w-full p-2 border rounded mb-4"
        onChange={(e) => onVehRefSelect(e.target.value)}
      >
        <option>Select VehicleRef</option>
        {vehRefs.map(v => <option key={v}>{v}</option>)}
      </select>

      {/* LineName */}
      <label className="font-medium">Line Name</label>
      <select
        className="w-full p-2 border rounded"
        onChange={(e) => onLineSelect(e.target.value)}
      >
        <option>Select Line</option>
        {lineNames.map(v => <option key={v}>{v}</option>)}
      </select>
    </div>
    
  );
}
