import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as XLSX from "xlsx";
import { 
  setScreenDetail, 
  setMediaPlayerDetail, 
  setMountDetail, 
  setReceptacleBoxDetail, 
  setOrientation, 
  setWallType,
  setFloorDistance,
  setNicheDepth
} from "../redux/screenSlice";


const Configuration = () => {
  const dispatch = useDispatch();
  const screen = useSelector((state) => state.screen.screen);

  const [screens, setScreens] = useState([]);
  const [mediaPlayers, setMediaPlayers] = useState([]);
  const [mounts, setMounts] = useState([]);
  const [receptacles, setReceptacles] = useState([]);

  useEffect(() => {
  
    const filePath = "/data/PDFBuilder.xlsx";
    fetch(filePath)
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        const workbook = XLSX.read(buffer, { type: "array" });

        // Parse specific sheets
        const screensData = XLSX.utils.sheet_to_json(workbook.Sheets["Screen MFR"]);
        const mediaPlayersData = XLSX.utils.sheet_to_json(workbook.Sheets["Media Player MFR"]);
        const mountsData = XLSX.utils.sheet_to_json(workbook.Sheets["Mounts"]);
        const receptaclesData = XLSX.utils.sheet_to_json(workbook.Sheets["Receptacle Box"]);
        
        // Function to get unique data based on a key
        const getUniqueData = (data, key) => {
          const seen = new Set();
          return data.filter((item) => {
            if (!seen.has(item[key])) {
              seen.add(item[key]);
              return true;
            }
            return false;
          });
        };
        
        // Set state with parsed data
        setScreens(getUniqueData(screensData, 'Screen MFR'));
        setMediaPlayers(getUniqueData(mediaPlayersData, 'MFG. PART'));
        setMounts(getUniqueData(mountsData, 'MFG. PART'));
        setReceptacles(getUniqueData(receptaclesData, 'MFG. PART'));
      });
  }, []);

  const handleScreenChange = (screenId) => {
    const screen = screens.find((s) => s["Screen MFR"] === screenId);
    dispatch(setScreenDetail({
      screenSize: screen['Screen Size'],
      height: screen.Height,
      width: screen.Width,
      screenDepth: screen.Depth,
    }))
    
  };
  const handlePayerChange = (mediaplayerId) => {
    const player = mediaPlayers.find((s) => s["MFG. PART"] === mediaplayerId);
    dispatch(setMediaPlayerDetail({
      mediaPlayerDepth: player.Depth,
    }))
    
  };
  const handleMountChange = (mountId) => {
    const mount = mounts.find((s) => s["MFG. PART"] === mountId);
    dispatch(setMountDetail({
      mountDepth: mount["Depth (in)"],
    }))
    
  };
  const handleReceptacleBoxChange = (boxId) => {
    const box = receptacles.find((s) => s["MFG. PART"] === boxId);
    dispatch(setReceptacleBoxDetail({
      boxDepth: box["Depth (in)"],
      
    }))
    
  };

  const handleOrientationChange = (newOrientation) => {
    dispatch(setOrientation(newOrientation));
  };

  const handleWallTypeChange = (newWallType) => {
    dispatch(setWallType(newWallType));
  };

  const handleFloorDistanceChange = (value) => {
    dispatch(setFloorDistance(value));
  };

  const handleNicheDepthChange = (value) => {
    dispatch(setNicheDepth(value));
  };

  console.log(screen);
  
  return (
    <div className='flex flex-col gap-2 border border-slate-500'>
      <h2 className='ml-2 font-bold'>Configuration</h2>
      
      {/* Screen Dropdown */}
      <label className='ml-2 text-sm font-semibold text-gray-700'>
        Screen 
      </label>
      {screens.length > 0 && (
          <select className='w-3/4 ml-4 py-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500' onChange={(e) => handleScreenChange(e.target.value)}>
            <option value="">Select Screen</option>
            {screens.map((screen) => (
              <option key={screen["Screen MFR"]} value={screen["Screen MFR"]}>
                {screen["Screen MFR"]}
              </option>
            ))}
          </select>
        )}

        {/* Media Player Dropdown */}
      <label className='ml-2 text-sm font-semibold text-gray-700'>
        Media Player 
      </label>
      {mediaPlayers.length > 0 && (
          <select className='w-3/4 ml-4 py-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500' onChange={(e) => handlePayerChange(e.target.value)}>
            <option value="">Select Media Player</option>
            {mediaPlayers.map((mp) => (
              <option key={mp["MFG. PARTR"]} value={mp["MFG. PART"]}>
                {mp["MFG. PART"]}
              </option>
            ))}
          </select>
        )}

      {/* Mount Dropdown */}
      <label className='ml-2 text-sm font-semibold text-gray-700'>
        Mount: 
      </label>
      {mounts.length > 0 && (
          <select className='w-3/4 ml-4 py-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500' onChange={(e) => handleMountChange(e.target.value)}>
            <option value="">Select Mount</option>
            {mounts.map((mount) => (
              <option key={mount["MFG. PART"]} value={mount["MFG. PART"]}>
                {mount["MFG. PART"]}
              </option>
            ))}
          </select>
        )}

      {/* Receptacle Box Dropdown */}
      <label className='ml-2 text-sm font-semibold text-gray-700'>
        Receptacle Box: 
      </label>
      {receptacles.length > 0 && (
          <select className='w-3/4 ml-4 py-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500' onChange={(e) => handleReceptacleBoxChange(e.target.value)}>
            <option value="">Select Screen</option>
            {receptacles.map((rec) => (
              <option key={rec["MFG. PART"]} value={rec["MFG. PART"]}>
                {rec["MFG. PART"]}
              </option>
            ))}
          </select>
        )}

      {/* Vertical/Horizontal Toggle */}
      <div className="w-full flex">
        <button
          onClick={() => handleOrientationChange("Vertical")}
          className={`w-1/2 px-4 py-2 ${
            screen.orientation === "Vertical"
              ? "bg-gray-800 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Vertical
        </button>
        <button
          onClick={() => handleOrientationChange("Horizontal")}
          className={`w-1/2 px-4 py-2 ${
            screen.orientation === "Horizontal"
              ? "bg-gray-800 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Horizontal
        </button>
      </div>


      {/* Niche/Flat Wall Toggle */}
      <div className="w-full flex">
        <button
          onClick={() => handleWallTypeChange("Niche")}
          className={`w-1/2 px-4 py-2 ${
            screen.wallType === "Niche"
              ? "bg-gray-800 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Niche
        </button>
        <button
          onClick={() => handleWallTypeChange("Flat Wall")}
          className={`w-1/2 px-4 py-2 ${
            screen.wallType === "Flat Wall"
              ? "bg-gray-800 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Flat Wall
        </button>
      </div> 

       {/* Floor Distance Input */}
       <div className="flex w-full border border-black">
        <label className="w-1/2 border border-black bg-slate-500 flex items-center justify-center">
          Floor Distance
        </label>
        <input
            type="number"
            value={screen.floorDistance}
            onChange={(e) => handleFloorDistanceChange(e.target.value)}
            className="w-1/2 border p-2 text-center"
          />
      </div>
      {/* Niche Depth Input */}
      <div className="flex w-full border border-black">
        <label className="w-1/2 border border-black bg-slate-500 flex items-center justify-center">
          Niche Depth Var
        </label>
        <input
            type="number"
            value={screen.nicheDepth}
            onChange={(e) => handleNicheDepthChange(e.target.value)}
            className="w-1/2 border p-2 text-center"
          />
      </div>
    </div>
  );
};

export default Configuration;
