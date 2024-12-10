import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  screen: {
    screenSize: '',
    height: '',
    width: '',
    screenDepth: '',
    mediaPlayerDepth: '',
    mountDepth: '',
    boxDepth: '',
    orientation: 'Horizontal',
    wallType: 'Niche',
    floorDistance: 0,
    nicheDepth: 0,
  }
}

const screenSlice = createSlice({
  name: 'screen',
  initialState: initialState,
  reducers: {
    setScreenDetail: (state, action) => {
      state.screen.screenSize = action.payload.screenSize;
      state.screen.height = action.payload.height;
      state.screen.width = action.payload.width;
      state.screen.screenDepth = action.payload.screenDepth;

    },
    setMediaPlayerDetail: (state, action) => {
      state.screen.mediaPlayerDepth = action.payload.mediaPlayerDepth;
    },
    setMountDetail: (state, action) => {
      state.screen.mountDepth = action.payload.mountDepth;
    },
    setReceptacleBoxDetail: (state, action) => {
      state.screen.boxDepth = action.payload.boxDepth;
    },
    setOrientation: (state, action) => {
      state.screen.orientation = action.payload;
    },
    setWallType: (state, action) => {
      state.screen.wallType = action.payload;
    },
    setFloorDistance: (state, action) => {
      state.screen.floorDistance = parseFloat(action.payload);
    },
    setNicheDepth: (state, action) => {
      state.screen.nicheDepth = parseFloat(action.payload);
    },
  },
});

export const {
  setScreenDetail, 
  setMediaPlayerDetail, 
  setMountDetail, 
  setReceptacleBoxDetail, 
  setOrientation, 
  setWallType,
  setFloorDistance,
  setNicheDepth,
} = screenSlice.actions;
export default screenSlice.reducer;