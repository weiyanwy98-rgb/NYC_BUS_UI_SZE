import SearchableDropdown from "./SearchableDropdown";
export default function Sidebar({
  serverStatus,
  vehRefs,
  lineNames,
  onVehRefSelect,
  onLineSelect
}) {
  return (
    <div className="absolute top-20 left-4 bg-white shadow-lg rounded-xl p-4 w-64 z-[1000]">
      <h2 className="text-lg font-semibold mb-4">Bus Route Controls</h2>
      <div className={`w-15 rounded-md ${serverStatus? "bg-green-500" : "bg-red-500"} py-0.5 px-2.5 border border-transparent text-sm text-black transition-all shadow-sm`}>
        Server
      </div>
      <SearchableDropdown
        label="Search By Vehicle"
        options={vehRefs}
        onSelect={onVehRefSelect}
      />

      <SearchableDropdown
        label="Search By Line Name"
        options={lineNames}
        onSelect={onLineSelect}
      />
    </div>
  );
}
