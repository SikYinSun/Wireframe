import React, { useState, useEffect, useRef } from "react";
import { Stage, Layer, Line, Rect, Text, Arrow } from "react-konva";

const Diagram = () => {
  const [dimensions, setDimensions] = useState({
    width: 300, // Total width of the display
    height: 200, // Total height of the display
    floorLine: 595, // Y-coordinate for the floor line
    screenCenterX: 400, // X-coordinate of the screen's center
    screenCenterY: 300, // Y-coordinate of the screen's center
  });

  const { width, height, floorLine, screenCenterX, screenCenterY } = dimensions;
  const [canvaWidth, setCanvaWidth] = useState(800);
  const [canvaHeight, setCanvaHeight] = useState(600);

  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      // Set canvas width to match the parent div width
      setCanvaWidth(containerRef.current.offsetWidth);
      setCanvaHeight(containerRef.current.offsetHeight);
    }
  }, []); // Run only once when the component mounts

  return (
    <div className="flex items-center justify-center min-h-screen w-3/4">
      {/* Canva size */}
      <Stage width={canvaWidth} height={canvaHeight}> 
        <Layer>
          {/* TV Rectangle */}
          <Rect
            x={(canvaWidth - width) / 2}
            y={(canvaHeight - height) / 2}
            width={width}
            height={height}
            stroke="black"
            strokeWidth={2}
          />
          {/* Box Reactangle */}
          <Rect
            x={(canvaWidth - width) / 2 - 10}
            y={(canvaHeight - height) / 2 - 10}
            width={width + 20}
            height={height + 20}
            stroke="black"
            strokeWidth={1}
          />

          {/* Floor Line */}
          <Line
            points={[0, floorLine, canvaWidth, floorLine]} // Horizontal line
            stroke="black"
            strokeWidth={1}
          />

          {/* Centerlines */}
          <Line
            points={[screenCenterX, 100, screenCenterX, 500]} // Vertical centerline
            stroke="black"
            strokeWidth={1}
            dash={[5, 5]}
          />
          <Line
            points={[100, screenCenterY, 700, screenCenterY]} // Horizontal centerline
            stroke="black"
            strokeWidth={1}
            dash={[5, 5]}
          />

        <Arrow
          points={[100,screenCenterY,700,screenCenterY]}
          stroke="#000"
          fill="#000"
          strokeWidth={1}
          pointerWidth={6}
        />

        <Arrow
          points={[screenCenterY, 700, screenCenterY,100]}
          stroke="#000"
          fill="#000"
          strokeWidth={1}
          pointerWidth={6}
        />



          {/* Text Labels */}
          <Text
            x={5}
            y={floorLine - 100}
            text="Floor Line"
            fontSize={16}
          />


        </Layer>
      </Stage>
    </div>
  );
};

export default Diagram;
