import SearchableDropdown from "./SearchableDropdown";
export default function Sidebar({
  serverStatus,
  vehRefs,
  lineNames,
  onVehRefSelect,
  onLineSelect,
  vehMsg,
  lineMsg
}) {
  return (
    <div className="absolute top-20 left-4 bg-white shadow-lg rounded-xl p-4 w-64 z-[1000]">
      <h2 className="text-lg font-semibold mb-4">Bus Route Controls</h2>
      <div className={`w-30 rounded-md ${serverStatus ? "bg-green-500" : "bg-red-500"} py-0.5 px-2.5 border border-transparent text-sm text-black transition-all shadow-sm`}>
        {serverStatus ? "Server: Online" : "Server: Offline"}
      </div>
      <SearchableDropdown
        label="Search By Vehicle"
        options={vehRefs}
        onSelect={onVehRefSelect}
      />
      {/* Display error messages */}
      {vehMsg && (
        <div className={`text-sm font-medium ${vehMsg.type==="error" ? "text-red-600" : "text-black-600"}`}>
          {vehMsg.message}
        </div>
      )}

      <SearchableDropdown
        label="Search By Line Name"
        options={lineNames}
        onSelect={onLineSelect}
      />

      {/* Display error messages */}
      {lineMsg && (
        <div className={`text-sm font-medium ${lineMsg.type==="error"? "text-red-600" : "text-black-600"}`}>
          {lineMsg.message}
        </div>
      )}
    </div>
  );
}
