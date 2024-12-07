import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as XLSX from "xlsx";
import { setScreenDetail, setMediaPlayerDetail, setMountDetail, setReceptacleBoxDetail } from "../redux/screenSlice";


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
      height: screen.Height,
      width: screen.Width,
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

  console.log(screen);
  
  return (
    <div className='flex flex-col gap-4'>
      <h2>Configuration</h2>

      {/* Screen Dropdown */}
      <label>
        Screen: 
        {screens.length > 0 && (
          <select onChange={(e) => handleScreenChange(e.target.value)}>
            <option value="">Select Screen</option>
            {screens.map((screen) => (
              <option key={screen["Screen MFR"]} value={screen["Screen MFR"]}>
                {screen["Screen MFR"]}
              </option>
            ))}
          </select>
        )}
      </label>

      <label>
        Media Player: 
        {mediaPlayers.length > 0 && (
          <select onChange={(e) => handlePayerChange(e.target.value)}>
            <option value="">Select Media Player</option>
            {mediaPlayers.map((mp) => (
              <option key={mp["MFG. PARTR"]} value={mp["MFG. PART"]}>
                {mp["MFG. PART"]}
              </option>
            ))}
          </select>
        )}
      </label>

      <label>
        Mount: 
        {mounts.length > 0 && (
          <select onChange={(e) => handleMountChange(e.target.value)}>
            <option value="">Select Mount</option>
            {mounts.map((mount) => (
              <option key={mount["MFG. PART"]} value={mount["MFG. PART"]}>
                {mount["MFG. PART"]}
              </option>
            ))}
          </select>
        )}
      </label>

      <label>
        Receptacle Box: 
        {receptacles.length > 0 && (
          <select onChange={(e) => handleReceptacleBoxChange(e.target.value)}>
            <option value="">Select Screen</option>
            {receptacles.map((rec) => (
              <option key={rec["MFG. PART"]} value={rec["MFG. PART"]}>
                {rec["MFG. PART"]}
              </option>
            ))}
          </select>
        )}
      </label>




      {/* Screen Details
      {screen && (
        <div>
          <h3>Screen Details</h3>
          <p>Height: {screen.height}</p>
          <p>Width: {screen.width}</p>
        </div>
      )} */}
    </div>
  );
};

export default Configuration;
