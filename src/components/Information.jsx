import React from 'react'
import Dimensions from './Dimensions'
import { useSelector } from "react-redux";

function Information() {

  const info = useSelector((state) => state.screen.screen);
  const screenDimensions = [
    { label: "Height", value: info.height },
    { label: "Width", value: info.width },
    { label: "Floor line", value: info.floorDistance },
  ];
  const nicheDimensions = [
    { label: "Height", value: info.screenSize < 55 ? info.height + 1.5 : info.height + 2 },
    { label: "Width", value: info.screenSize < 55 ? info.width + 1.5 : info.width + 2 },
    { label: "Depth", value: info.screenDepth + Math.max(info.mediaPlayerDepth, info.mountDepth) + info.nicheDepth },
  ];
  
  return (
    <div className='w-1/4 mr-2'>
      <Dimensions title="Screen Diemensions" dimensions={screenDimensions} />
      <Dimensions title="Niche Diemensions" dimensions={nicheDimensions} />
    </div>
  )
}

export default Information