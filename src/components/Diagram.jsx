import React, { useState, useEffect, useRef } from "react";
import { Stage, Layer, Line, Rect, Text, Arrow, Group, Circle } from "react-konva";
import { useSelector } from "react-redux";

const Diagram = () => {
  const [dimensions, setDimensions] = useState({width: 300, height: 200});
  const [canvasSize, setCanvasSize] = useState({width: 800,height: 600,});
  const containerRef = useRef(null);
  const screen = useSelector((state) => state.screen.screen);
  const nicheDimensions = {
    height: screen.screenSize ? screen.screenSize < 55 ? screen.height + 1.5 : screen.height + 2 : "" ,
    width: screen.screenSize ? screen.screenSize < 55 ? screen.width + 1.5 : screen.width + 2 : "",
};

  // Resize canvas dynamically based on the div container size
  const updateCanvasSize = () => {
    if (containerRef.current) {
      setCanvasSize({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    }
  };

  useEffect(() => {
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, []);

  const { width: tvWidth, height: tvHeight } = dimensions;
  const { width: canvaWidth, height: canvaHeight } = canvasSize;

  // Calculate center 
  const floorLineY = canvaHeight - 50; 
  const screenCenterX = canvaWidth / 2;
  const screenCenterY = canvaHeight / 2;

  return (
    <div ref={containerRef} className="flex items-center justify-center min-h-screen w-3/4 h-fit">
      {/* Canva size */}
      <Stage width={canvaWidth} height={canvaHeight}>
        <Layer>
          <Group>
            {/* TV Rectangle */}
            <Rect
              x={screenCenterX - tvWidth / 2}
              y={screenCenterY - tvHeight / 2}
              width={tvWidth}
              height={tvHeight}
              stroke="black"
              strokeWidth={2}
            />
            {/* Box Reactangle */}
            <Rect
              x={screenCenterX - tvWidth / 2 - 10}
              y={screenCenterY - tvHeight / 2 - 10}
              width={tvWidth + 20}
              height={tvHeight + 20}
              stroke="black"
              strokeWidth={1}
            />
            {/* Dotted box */}
            <Rect
              x={screenCenterX - tvWidth / 2 + 15}
              y={screenCenterY - tvHeight / 2 + 15}
              width={tvWidth - 25}
              height={tvHeight - 25}
              stroke="black"
              strokeWidth={1}
              dash={[5, 5]}
            />
          </Group>

          {/* Floor Line */}
          <Group>
            <Rect
              x={screenCenterX - tvWidth / 2 - 150}
              y={screenCenterY + 100}
              width={55}
              height={25}
              stroke="black"
              strokeWidth={1}
            />
            <Text x={screenCenterX - tvWidth / 2 - 128} y={screenCenterY + 108} text={screen.floorDistance ? `${screen.floorDistance}"` : ""} fontSize={12} />
            <Line
              points={[0, floorLineY, canvaWidth, floorLineY]} 
              stroke="black"
              strokeWidth={1}
            />
            <Arrow
              points={[screenCenterX - tvWidth / 2 - 80, screenCenterY + 10, screenCenterX - tvWidth / 2 - 80, floorLineY - 10]}
              stroke="#000"
              fill="#000"
              strokeWidth={1}
              pointerWidth={4}
            />
            <Arrow
              points={[screenCenterX - tvWidth / 2 - 80, floorLineY - 10, screenCenterX - tvWidth / 2 - 80, screenCenterY + 10]}
              stroke="#000"
              fill="#000"
              strokeWidth={1}
              pointerWidth={4}
            />
            <Text x={screenCenterX - tvWidth / 2 - 150} y={floorLineY - 100} text="Floor Line" fontSize={12} />
          </Group>

          {/* Left Box */}
          <Group>
            <Line
              points={[screenCenterX - tvWidth / 2 - 40, screenCenterY - tvHeight / 2 - 10, screenCenterX - tvWidth / 2 - 15, screenCenterY - tvHeight / 2 - 10]} 
              stroke="black"
              strokeWidth={1}
            />
            <Line
              points={[screenCenterX - tvWidth / 2 - 40, screenCenterY + tvHeight / 2 + 10, screenCenterX - tvWidth / 2 - 15, screenCenterY + tvHeight / 2 + 10]} 
              stroke="black"
              strokeWidth={1}
            />
            <Arrow
              points={[screenCenterX - tvWidth / 2 - 40, screenCenterY - tvHeight / 2 - 5, screenCenterX - tvWidth / 2 - 40, screenCenterY + tvHeight / 2 + 5]}
              stroke="#000"
              fill="#000"
              strokeWidth={1}
              pointerWidth={4}
            />
            <Arrow
              points={[screenCenterX - tvWidth / 2 - 40, screenCenterY + tvHeight / 2 + 5, screenCenterX - tvWidth / 2 - 40, screenCenterY - tvHeight / 2 - 5]}
              stroke="#000"
              fill="#000"
              strokeWidth={1}
              pointerWidth={4}
            />
            <Rect
              x={screenCenterX - tvWidth / 2 - 100}
              y={screenCenterY - 68}
              width={55}
              height={25}
              stroke="black"
              strokeWidth={1}
            />
            <Text x={screenCenterX - tvWidth / 2 - 90} y={screenCenterY - 60} text={nicheDimensions.height ? `${nicheDimensions.height}"` : ""} fontSize={12} />  
          </Group>
          {/* Bottom Box */}
          <Group>
            <Line
              points={[screenCenterX - tvWidth / 2 - 10, screenCenterY + tvHeight / 2 + 40, screenCenterX - tvWidth / 2 - 10, screenCenterY + tvHeight / 2 + 15]} 
              stroke="black"
              strokeWidth={1}
            />
             <Line
              points={[screenCenterX + tvWidth / 2 + 10, screenCenterY + tvHeight / 2 + 40, screenCenterX + tvWidth / 2 + 10, screenCenterY + tvHeight / 2 + 15]} 
              stroke="black"
              strokeWidth={1}
            />
            <Arrow
              points={[screenCenterX - tvWidth / 2 - 5, screenCenterY + tvHeight / 2 + 45, screenCenterX + tvWidth / 2 + 5, screenCenterY + tvHeight / 2 + 45]}
              stroke="#000"
              fill="#000"
              strokeWidth={1}
              pointerWidth={4}
            />
            <Arrow
              points={[screenCenterX + tvWidth / 2 + 5, screenCenterY + tvHeight / 2 + 45, screenCenterX - tvWidth / 2 - 5, screenCenterY + tvHeight / 2 + 45]}
              stroke="#000"
              fill="#000"
              strokeWidth={1}
              pointerWidth={4}
            />
            <Rect
              x={screenCenterX - 80}
              y={screenCenterY + 150}
              width={55}
              height={25}
              stroke="black"
              strokeWidth={1}
            />
            <Text x={screenCenterX - 70} y={screenCenterY + tvHeight / 2 + 58} text={nicheDimensions.width ? `${nicheDimensions.width}"` : ""} fontSize={12} />  
          </Group>
          {/* Top Box */}
          <Group>
            <Line
              points={[screenCenterX - tvWidth / 2 - 10, screenCenterY - tvHeight / 2 - 40, screenCenterX - tvWidth / 2 - 10, screenCenterY - tvHeight / 2 - 15]} 
              stroke="black"
              strokeWidth={1}
            />
           <Line
              points={[screenCenterX + tvWidth / 2 + 10, screenCenterY - tvHeight / 2 - 40, screenCenterX + tvWidth / 2 + 10, screenCenterY - tvHeight / 2 - 15]} 
              stroke="black"
              strokeWidth={1}
            />
           <Arrow
              points={[screenCenterX - tvWidth / 2 - 5, screenCenterY - tvHeight / 2 - 45, screenCenterX + tvWidth / 2 + 5, screenCenterY - tvHeight / 2 - 45]}
              stroke="#000"
              fill="#000"
              strokeWidth={1}
              pointerWidth={4}
            />
            <Arrow
              points={[screenCenterX + tvWidth / 2 + 5, screenCenterY - tvHeight / 2 - 45, screenCenterX - tvWidth / 2 - 5, screenCenterY - tvHeight / 2 - 45]}
              stroke="#000"
              fill="#000"
              strokeWidth={1}
              pointerWidth={4}
            />
            <Rect
              x={screenCenterX - 80}
              y={screenCenterY - 180}
              width={55}
              height={25}
              stroke="black"
              strokeWidth={1}
            />
            <Text x={screenCenterX - 70} y={screenCenterY - tvHeight / 2 - 70} text={screen.width ? `${screen.width}"` : ""} fontSize={12} />  
          </Group>
          {/* Right Box */}
          <Group>
            <Line
              points={[screenCenterX + tvWidth / 2 + 40, screenCenterY - tvHeight / 2 - 10, screenCenterX + tvWidth / 2 + 15, screenCenterY - tvHeight / 2 - 10]} 
              stroke="black"
              strokeWidth={1}
            />
            <Line
              points={[screenCenterX + tvWidth / 2 + 40, screenCenterY + tvHeight / 2 + 10, screenCenterX + tvWidth / 2 + 15, screenCenterY + tvHeight / 2 + 10]} 
              stroke="black"
              strokeWidth={1}
            />
            <Arrow
              points={[screenCenterX + tvWidth / 2 + 40, screenCenterY - tvHeight / 2 - 5, screenCenterX + tvWidth / 2 + 40, screenCenterY + tvHeight / 2 + 5]}
              stroke="#000"
              fill="#000"
              strokeWidth={1}
              pointerWidth={4}
            />
            <Arrow
              points={[screenCenterX + tvWidth / 2 + 40, screenCenterY + tvHeight / 2 + 5, screenCenterX + tvWidth / 2 + 40, screenCenterY - tvHeight / 2 - 5]}
              stroke="#000"
              fill="#000"
              strokeWidth={1}
              pointerWidth={4}
            />
            <Rect
              x={screenCenterX + tvWidth / 2 + 45}
              y={screenCenterY - 68}
              width={55}
              height={25}
              stroke="black"
              strokeWidth={1}
            />
            <Text x={screenCenterX + tvWidth / 2 + 55} y={screenCenterY - 60} text={screen.height ? `${screen.height}"` : ""} fontSize={12} />  
          </Group>

          {/* Centerlines */}
          <Line
            points={[screenCenterX, 100, screenCenterX, canvaHeight - 100]} 
            stroke="black"
            strokeWidth={1}
            dash={[5, 5]}
          />
          <Line
            points={[100, screenCenterY, canvaWidth - 100, screenCenterY]} 
            stroke="black"
            strokeWidth={1}
            dash={[5, 5]}
          />
          <Circle
            x={screenCenterX} 
            y={screenCenterY} 
            radius={2} 
            stroke="black" 
            strokeWidth={2} 
          />

          {/* Center Dotted Box */}
          <Group>
            <Rect
              x={screenCenterX - 28}
              y={screenCenterY + 35}
              width={tvWidth - 245}
              height={tvHeight - 160}
              stroke="black"
              strokeWidth={1}
              dash={[5, 5]}
            />
            <Rect
              x={screenCenterX - 18}
              y={screenCenterY + 45}
              width={tvWidth - 265}
              height={tvHeight - 180}
              stroke="black"
              strokeWidth={1}
              dash={[5, 5]}
            />
            <Circle
              x={screenCenterX + 10}
              y={screenCenterY + 50}
              radius={2}
              stroke="black"
              strokeWidth={2}
            />
          </Group>

          {/* Line & Text for Screen center */}
          <Line
            points={[screenCenterX, screenCenterY, screenCenterX + 100, screenCenterY - tvHeight / 2 - 125, screenCenterX + tvWidth / 2 + 35, screenCenterY - tvHeight / 2 - 125 ]} 
            stroke="black"
            strokeWidth={1}
          />
          <Text x={screenCenterX + tvWidth / 2 + 35} y={screenCenterY - tvHeight / 2 - 130} text="Intended Screen Position" fontSize={12} />  

          <Line
            points={[screenCenterX + 10, screenCenterY + 50, screenCenterX + 120, screenCenterY - tvHeight / 2 - 85, screenCenterX + tvWidth / 2 + 35, screenCenterY - tvHeight / 2 - 85 ]} 
            stroke="black"
            strokeWidth={1}
          />
          <Text x={screenCenterX + tvWidth / 2 + 35} y={screenCenterY - tvHeight / 2 - 90} text="Install recessed receptacle box" fontSize={12} />  


        </Layer>
      </Stage>
    </div>
  );
};

export default Diagram;
