import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from "xlsx";
import { setScreens, setMediaPlayers, setMounts, setReceptacles } from "./excelSlice";

const Configuration = () => {
  const dispatch = useDispatch();
  const { screens, mediaPlayers, mounts, receptacles } = useSelector((state) => state.excel);

  const [selectedScreen, setSelectedScreen] = useState(null);
  const [screenDetails, setScreenDetails] = useState(null);

  useEffect(() => {
    // Load the file using the relative path from the public folder
    const filePath = process.env.PUBLIC_URL + "/data/filename.xlsx";
    fetch(filePath)
      .then((response) => response.arrayBuffer()) // Read the file directly
      .then((buffer) => {
        const workbook = XLSX.read(buffer, { type: "array" });

        // Parse specific sheets
        const screensData = XLSX.utils.sheet_to_json(workbook.Sheets["Screens"]);
        const mediaPlayersData = XLSX.utils.sheet_to_json(workbook.Sheets["MediaPlayers"]);
        const mountsData = XLSX.utils.sheet_to_json(workbook.Sheets["Mounts"]);
        const receptaclesData = XLSX.utils.sheet_to_json(workbook.Sheets["Receptacles"]);

        // Dispatch to Redux store
        dispatch(setScreens(screensData));
        dispatch(setMediaPlayers(mediaPlayersData));
        dispatch(setMounts(mountsData));
        dispatch(setReceptacles(receptaclesData));
      });
  }, [dispatch]);

  const handleScreenChange = (screenId) => {
    setSelectedScreen(screenId);
    const screen = screens.find((s) => s.Screen === screenId);
    setScreenDetails(screen);
  };

  return (
    <div>
      <h2>Configuration</h2>

      {/* Screen Dropdown */}
      {screens.length > 0 && (
        <select onChange={(e) => handleScreenChange(e.target.value)}>
          <option value="">Select Screen</option>
          {screens.map((screen) => (
            <option key={screen.Screen} value={screen.Screen}>
              {screen.Screen}
            </option>
          ))}
        </select>
      )}

      {/* Screen Details */}
      {screenDetails && (
        <div>
          <h3>Screen Details</h3>
          <p>Height: {screenDetails.Height}</p>
          <p>Width: {screenDetails.Width}</p>
        </div>
      )}
    </div>
  );
};

export default Configuration;
