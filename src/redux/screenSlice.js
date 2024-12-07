import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  screen: {
    height: '',
    width: '',
    mediaPlayerDepth: '',
    mountDepth: '',
    boxDepth: '',
  }
}

const screenSlice = createSlice({
  name: 'screen',
  initialState: initialState,
  reducers: {
    setScreenDetail: (state, action) => {
      state.screen.height = action.payload.height;
      state.screen.width = action.payload.width;
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
  },
});

export const {setScreenDetail, setMediaPlayerDetail, setMountDetail, setReceptacleBoxDetail} = screenSlice.actions;
export default screenSlice.reducer;