import React, { useState, useEffect, useRef } from "react";
import { Stage, Layer, Line, Rect, Text, Arrow, Group, Circle } from "react-konva";
import { useSelector } from "react-redux";

const Diagram = () => {
  const [dimensions, setDimensions] = useState({width: 300, height: 200});
  const [canvasSize, setCanvasSize] = useState({width: 800, height: 600,});
  const containerRef = useRef(null);
  const screen = useSelector((state) => state.screen.screen);
  const nicheDimensions = screen.orientation === "Horizontal" ? 
  {
    height: screen.screenSize ? screen.screenSize < 55 ? screen.height + 1.5 : screen.height + 2 : "" ,
    width: screen.screenSize ? screen.screenSize < 55 ? screen.width + 1.5 : screen.width + 2 : "",
  } : 
  {
    height: screen.screenSize ? screen.screenSize < 55 ? screen.width + 1.5 : screen.width + 2 : "",
    width: screen.screenSize ? screen.screenSize < 55 ? screen.height + 1.5 : screen.height + 2 : "",
  };
  const tvSize = screen.orientation === "Horizontal" ? 
  {
    height: screen.height ? screen.height : "" ,
    width: screen.width ? screen.width :  "",
  } : 
  {
    height: screen.width ? screen.width : "",
    width: screen.height ? screen.height : "",
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

  const tvDimensions = screen.orientation === "Vertical" ? 
  { width: dimensions.height, height: dimensions.width } : 
  { width: dimensions.width, height: dimensions.height };

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
              x={screenCenterX - tvDimensions.width / 2}
              y={screenCenterY - tvDimensions.height / 2}
              width={tvDimensions.width}
              height={tvDimensions.height}
              stroke="black"
              strokeWidth={2}
            />
            {/* Box Reactangle */}
            <Rect
              x={screenCenterX - tvDimensions.width / 2 - 10}
              y={screenCenterY - tvDimensions.height / 2 - 10}
              width={tvDimensions.width + 20}
              height={tvDimensions.height + 20}
              stroke="black"
              strokeWidth={1}
            />
            {/* Dotted box */}
            <Rect
              x={screenCenterX - tvDimensions.width / 2 + 15}
              y={screenCenterY - tvDimensions.height / 2 + 15}
              width={tvDimensions.width - 25}
              height={tvDimensions.height - 25}
              stroke="black"
              strokeWidth={1}
              dash={[5, 5]}
            />
          </Group>

          {/* Floor Line */}
          <Group>
            <Rect
              x={screenCenterX - tvDimensions.width / 2 - 150}
              y={screenCenterY + 100}
              width={55}
              height={25}
              stroke="black"
              strokeWidth={1}
            />
            <Text x={screenCenterX - tvDimensions.width / 2 - 128} y={screenCenterY + 108} text={screen.floorDistance ? `${screen.floorDistance}"` : ""} fontSize={12} />
            <Line
              points={[0, floorLineY, canvaWidth, floorLineY]} 
              stroke="black"
              strokeWidth={1}
            />
            <Arrow
              points={[screenCenterX - tvDimensions.width / 2 - 80, screenCenterY + 10, screenCenterX - tvDimensions.width / 2 - 80, floorLineY - 10]}
              stroke="#000"
              fill="#000"
              strokeWidth={1}
              pointerWidth={4}
            />
            <Arrow
              points={[screenCenterX - tvDimensions.width / 2 - 80, floorLineY - 10, screenCenterX - tvDimensions.width / 2 - 80, screenCenterY + 10]}
              stroke="#000"
              fill="#000"
              strokeWidth={1}
              pointerWidth={4}
            />
            <Text x={screenCenterX - tvDimensions.width / 2 - 150} y={floorLineY - 100} text="Floor Line" fontSize={12} />
          </Group>

          {/* Left Box */}
          <Group>
            <Line
              points={[screenCenterX - tvDimensions.width / 2 - 40, screenCenterY - tvDimensions.height / 2 - 10, screenCenterX - tvDimensions.width / 2 - 15, screenCenterY - tvDimensions.height / 2 - 10]} 
              stroke="black"
              strokeWidth={1}
            />
            <Line
              points={[screenCenterX - tvDimensions.width / 2 - 40, screenCenterY + tvDimensions.height / 2 + 10, screenCenterX - tvDimensions.width / 2 - 15, screenCenterY + tvDimensions.height / 2 + 10]} 
              stroke="black"
              strokeWidth={1}
            />
            <Arrow
              points={[screenCenterX - tvDimensions.width / 2 - 40, screenCenterY - tvDimensions.height / 2 - 5, screenCenterX - tvDimensions.width / 2 - 40, screenCenterY + tvDimensions.height / 2 + 5]}
              stroke="#000"
              fill="#000"
              strokeWidth={1}
              pointerWidth={4}
            />
            <Arrow
              points={[screenCenterX - tvDimensions.width / 2 - 40, screenCenterY + tvDimensions.height / 2 + 5, screenCenterX - tvDimensions.width / 2 - 40, screenCenterY - tvDimensions.height / 2 - 5]}
              stroke="#000"
              fill="#000"
              strokeWidth={1}
              pointerWidth={4}
            />
            <Rect
              x={screenCenterX - tvDimensions.width / 2 - 100}
              y={screenCenterY - 68}
              width={55}
              height={25}
              stroke="black"
              strokeWidth={1}
            />
            <Text x={screenCenterX - tvDimensions.width / 2 - 90} y={screenCenterY - 60} text={nicheDimensions.height ? `${nicheDimensions.height}"` : ""} fontSize={12} />  
          </Group>
          {/* Bottom Box */}
          <Group>
            <Line
              points={[screenCenterX - tvDimensions.width / 2 - 10, screenCenterY + tvDimensions.height / 2 + 40, screenCenterX - tvDimensions.width / 2 - 10, screenCenterY + tvDimensions.height / 2 + 15]} 
              stroke="black"
              strokeWidth={1}
            />
             <Line
              points={[screenCenterX + tvDimensions.width / 2 + 10, screenCenterY + tvDimensions.height / 2 + 40, screenCenterX + tvDimensions.width / 2 + 10, screenCenterY + tvDimensions.height / 2 + 15]} 
              stroke="black"
              strokeWidth={1}
            />
            <Arrow
              points={[screenCenterX - tvDimensions.width / 2 - 5, screenCenterY + tvDimensions.height / 2 + 45, screenCenterX + tvDimensions.width / 2 + 5, screenCenterY + tvDimensions.height / 2 + 45]}
              stroke="#000"
              fill="#000"
              strokeWidth={1}
              pointerWidth={4}
            />
            <Arrow
              points={[screenCenterX + tvDimensions.width / 2 + 5, screenCenterY + tvDimensions.height / 2 + 45, screenCenterX - tvDimensions.width / 2 - 5, screenCenterY + tvDimensions.height / 2 + 45]}
              stroke="#000"
              fill="#000"
              strokeWidth={1}
              pointerWidth={4}
            />
            <Rect
              x={screenCenterX - tvDimensions.width / 2 + 40}
              y={screenCenterY + tvDimensions.height / 2 + 50}
              width={55}
              height={25}
              stroke="black"
              strokeWidth={1}
            />
            <Text x={screenCenterX - tvDimensions.width / 2 + 50} y={screenCenterY + tvDimensions.height / 2 + 58} text={nicheDimensions.width ? `${nicheDimensions.width}"` : ""} fontSize={12} />  
          </Group>
          {/* Top Box */}
          <Group>
            <Line
              points={[screenCenterX - tvDimensions.width / 2 - 10, screenCenterY - tvDimensions.height / 2 - 40, screenCenterX - tvDimensions.width / 2 - 10, screenCenterY - tvDimensions.height / 2 - 15]} 
              stroke="black"
              strokeWidth={1}
            />
           <Line
              points={[screenCenterX + tvDimensions.width / 2 + 10, screenCenterY - tvDimensions.height / 2 - 40, screenCenterX + tvDimensions.width / 2 + 10, screenCenterY - tvDimensions.height / 2 - 15]} 
              stroke="black"
              strokeWidth={1}
            />
           <Arrow
              points={[screenCenterX - tvDimensions.width / 2 - 5, screenCenterY - tvDimensions.height / 2 - 45, screenCenterX + tvDimensions.width / 2 + 5, screenCenterY - tvDimensions.height / 2 - 45]}
              stroke="#000"
              fill="#000"
              strokeWidth={1}
              pointerWidth={4}
            />
            <Arrow
              points={[screenCenterX + tvDimensions.width / 2 + 5, screenCenterY - tvDimensions.height / 2 - 45, screenCenterX - tvDimensions.width / 2 - 5, screenCenterY - tvDimensions.height / 2 - 45]}
              stroke="#000"
              fill="#000"
              strokeWidth={1}
              pointerWidth={4}
            />
            <Rect
              x={screenCenterX - tvDimensions.width / 2 + 40}
              y={screenCenterY - tvDimensions.height / 2 - 80}
              width={55}
              height={25}
              stroke="black"
              strokeWidth={1}
            />
            <Text x={screenCenterX - tvDimensions.width / 2 + 50} y={screenCenterY - tvDimensions.height / 2 - 70} text={tvSize.width ? `${tvSize.width}"` : ""} fontSize={12} />  
          </Group>
          {/* Right Box */}
          <Group>
            <Line
              points={[screenCenterX + tvDimensions.width / 2 + 40, screenCenterY - tvDimensions.height / 2 - 10, screenCenterX + tvDimensions.width / 2 + 15, screenCenterY - tvDimensions.height / 2 - 10]} 
              stroke="black"
              strokeWidth={1}
            />
            <Line
              points={[screenCenterX + tvDimensions.width / 2 + 40, screenCenterY + tvDimensions.height / 2 + 10, screenCenterX + tvDimensions.width / 2 + 15, screenCenterY + tvDimensions.height / 2 + 10]} 
              stroke="black"
              strokeWidth={1}
            />
            <Arrow
              points={[screenCenterX + tvDimensions.width / 2 + 40, screenCenterY - tvDimensions.height / 2 - 5, screenCenterX + tvDimensions.width / 2 + 40, screenCenterY + tvDimensions.height / 2 + 5]}
              stroke="#000"
              fill="#000"
              strokeWidth={1}
              pointerWidth={4}
            />
            <Arrow
              points={[screenCenterX + tvDimensions.width / 2 + 40, screenCenterY + tvDimensions.height / 2 + 5, screenCenterX + tvDimensions.width / 2 + 40, screenCenterY - tvDimensions.height / 2 - 5]}
              stroke="#000"
              fill="#000"
              strokeWidth={1}
              pointerWidth={4}
            />
            <Rect
              x={screenCenterX + tvDimensions.width / 2 + 45}
              y={screenCenterY - 68}
              width={55}
              height={25}
              stroke="black"
              strokeWidth={1}
            />
            <Text x={screenCenterX + tvDimensions.width / 2 + 55} y={screenCenterY - 60} text={tvSize.height ? `${tvSize.height}"` : ""} fontSize={12} />  
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
              x={screen.orientation === "Horizontal" ? screenCenterX + tvDimensions.width / 2 - 178 : screenCenterX + tvDimensions.width / 2 - 130 }
              y={screen.orientation === "Horizontal" ? screenCenterY + tvDimensions.height / 2 - 65 : screenCenterY + tvDimensions.height / 2 - 110 }
              width={screen.orientation === "Horizontal" ? tvDimensions.width - 245 : tvDimensions.height - 245}
              height={screen.orientation === "Horizontal" ? tvDimensions.height - 160 : tvDimensions.width - 160}
              stroke="black"
              strokeWidth={1}
              dash={[5, 5]}
            />
            <Rect
              x={screen.orientation === "Horizontal" ? screenCenterX + tvDimensions.width / 2 - 168 : screenCenterX + tvDimensions.width / 2 - 120}
              y={screen.orientation === "Horizontal" ? screenCenterY + tvDimensions.height / 2 - 55 : screenCenterY + tvDimensions.height / 2 - 100}
              width={screen.orientation === "Horizontal" ? tvDimensions.width - 265 : tvDimensions.height - 265}
              height={screen.orientation === "Horizontal" ? tvDimensions.height - 180 : tvDimensions.width - 180}
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
            points={[screenCenterX, screenCenterY, screenCenterX + 100, screenCenterY - tvDimensions.height / 2 - 125, screenCenterX + tvDimensions.width / 2 + 35, screenCenterY - tvDimensions.height / 2 - 125 ]} 
            stroke="black"
            strokeWidth={1}
          />
          <Text x={screenCenterX + tvDimensions.width / 2 + 35} y={screenCenterY - tvDimensions.height / 2 - 130} text="Intended Screen Position" fontSize={12} />  

          <Line
            points={[screenCenterX + 10, screenCenterY + 50, screenCenterX + 120, screenCenterY - tvDimensions.height / 2 - 85, screenCenterX + tvDimensions.width / 2 + 35, screenCenterY - tvDimensions.height / 2 - 85 ]} 
            stroke="black"
            strokeWidth={1}
          />
          <Text x={screenCenterX + tvDimensions.width / 2 + 35} y={screenCenterY - tvDimensions.height / 2 - 90} text="Install recessed receptacle box" fontSize={12} />  


        </Layer>
      </Stage>
    </div>
  );
};

export default Diagram;
