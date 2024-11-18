import React from 'react';
import { Stage, Layer, Circle, Line, Group, Rect } from 'react-konva';

interface BasketballCourtProps {
  type: 'full' | 'half';
  width: number;
  height: number;
  children: React.ReactNode;
}

const BasketballCourt: React.FC<BasketballCourtProps> = ({ type, width, height, children }) => {
  // FIBA regulation court ratio is 28m x 15m (1.87:1)
  const COURT_RATIO = 1.87;
  const courtColor = '#E3A664'; // Wooden court color
  const lineColor = '#FFFFFF'; // White lines
  const paintColor = '#F4804F'; // Orange paint area
  const lineWidth = 2;

  // Calculate dimensions maintaining aspect ratio
  const padding = 20;
  let courtWidth = width - (padding * 2);
  let courtHeight = courtWidth / COURT_RATIO;

  // If calculated height is too tall, constrain by height instead
  if (courtHeight > height - padding * 2) {
    courtHeight = height - (padding * 2);
    courtWidth = courtHeight * COURT_RATIO;
  }

  // For half court, adjust the width
  if (type === 'half') {
    courtWidth = courtWidth / 2;
  }

  // Center the court in the available space
  const xOffset = (width - courtWidth) / 2;
  const yOffset = (height - courtHeight) / 2;

  // Calculate proportional dimensions
  const centerX = courtWidth / 2;
  const centerY = courtHeight / 2;
  const keyWidth = courtWidth * 0.19; // FIBA key is 5.8m in 28m court
  const keyHeight = courtHeight * 0.32; // FIBA key is 4.9m in 15m court
  const threePointRadius = Math.min(courtWidth * 0.4, courtHeight * 0.75);
  const centerCircleRadius = courtWidth * 0.06;
  const restrictedAreaRadius = keyWidth * 0.32;
  const backboardWidth = keyWidth * 0.3;
  const rimRadius = backboardWidth * 0.2;

  // Create wood pattern effect
  const woodPattern = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    canvas.width = 100;
    canvas.height = 100;
    
    ctx.fillStyle = courtColor;
    ctx.fillRect(0, 0, 100, 100);
    
    // Add wood grain effect
    for (let i = 0; i < 20; i++) {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(180, 130, 80, ${Math.random() * 0.1})`;
      ctx.lineWidth = 1;
      ctx.moveTo(0, i * 5);
      ctx.lineTo(100, i * 5 + Math.random() * 10);
      ctx.stroke();
    }

    return canvas;
  };

  return (
    <Stage width={width} height={height}>
      <Layer>
        {/* Court background with wood pattern */}
        <Rect
          x={xOffset}
          y={yOffset}
          width={courtWidth}
          height={courtHeight}
          fillPatternImage={woodPattern()}
          stroke={lineColor}
          strokeWidth={lineWidth * 2}
        />

        {/* Paint areas */}
        <Rect
          x={xOffset + (type === 'half' ? centerX - keyWidth / 2 : courtWidth - keyWidth)}
          y={yOffset + courtHeight - keyHeight}
          width={keyWidth}
          height={keyHeight}
          fill={paintColor}
          opacity={0.6}
        />

        {type === 'full' && (
          <>
            {/* Center circle */}
            <Circle
              x={xOffset + centerX}
              y={yOffset + centerY}
              radius={centerCircleRadius}
              stroke={lineColor}
              strokeWidth={lineWidth}
            />

            {/* Center line */}
            <Line
              points={[
                xOffset + centerX,
                yOffset,
                xOffset + centerX,
                yOffset + courtHeight
              ]}
              stroke={lineColor}
              strokeWidth={lineWidth}
            />
          </>
        )}

        {/* Three-point line */}
        <Arc
          x={xOffset + (type === 'half' ? centerX : courtWidth)}
          y={yOffset + courtHeight}
          angle={180}
          radius={threePointRadius}
          stroke={lineColor}
          strokeWidth={lineWidth}
        />

        {/* Key/Paint */}
        <Group>
          <Rect
            x={xOffset + (type === 'half' ? centerX - keyWidth / 2 : courtWidth - keyWidth)}
            y={yOffset + courtHeight - keyHeight}
            width={keyWidth}
            height={keyHeight}
            stroke={lineColor}
            strokeWidth={lineWidth}
          />

          {/* Key marks */}
          {[0.15, 0.30, 0.45, 0.60, 0.75].map((ratio, i) => (
            <React.Fragment key={i}>
              <Line
                points={[
                  xOffset + (type === 'half' ? centerX - keyWidth / 2 : courtWidth - keyWidth),
                  yOffset + courtHeight - keyHeight * ratio,
                  xOffset + (type === 'half' ? centerX - keyWidth / 2 + keyWidth * 0.15 : courtWidth - keyWidth * 0.85),
                  yOffset + courtHeight - keyHeight * ratio
                ]}
                stroke={lineColor}
                strokeWidth={lineWidth}
              />
              <Line
                points={[
                  xOffset + (type === 'half' ? centerX + keyWidth / 2 - keyWidth * 0.15 : courtWidth - keyWidth * 0.15),
                  yOffset + courtHeight - keyHeight * ratio,
                  xOffset + (type === 'half' ? centerX + keyWidth / 2 : courtWidth),
                  yOffset + courtHeight - keyHeight * ratio
                ]}
                stroke={lineColor}
                strokeWidth={lineWidth}
              />
            </React.Fragment>
          ))}
        </Group>

        {/* Restricted area */}
        <Arc
          x={xOffset + (type === 'half' ? centerX : courtWidth)}
          y={yOffset + courtHeight - restrictedAreaRadius}
          angle={180}
          radius={restrictedAreaRadius}
          stroke={lineColor}
          strokeWidth={lineWidth}
        />

        {/* Backboard */}
        <Line
          points={[
            xOffset + (type === 'half' ? centerX - backboardWidth / 2 : courtWidth - backboardWidth / 2),
            yOffset + courtHeight - keyHeight * 0.05,
            xOffset + (type === 'half' ? centerX + backboardWidth / 2 : courtWidth + backboardWidth / 2),
            yOffset + courtHeight - keyHeight * 0.05
          ]}
          stroke={lineColor}
          strokeWidth={lineWidth * 2}
        />

        {/* Rim */}
        <Circle
          x={xOffset + (type === 'half' ? centerX : courtWidth)}
          y={yOffset + courtHeight - keyHeight * 0.05}
          radius={rimRadius}
          stroke={lineColor}
          strokeWidth={lineWidth}
        />

        {children}
      </Layer>
    </Stage>
  );
};

// Helper component for drawing arcs
const Arc: React.FC<{
  x: number;
  y: number;
  angle: number;
  radius: number;
  stroke: string;
  strokeWidth: number;
}> = ({ x, y, angle, radius, stroke, strokeWidth }) => {
  const points = [];
  const steps = 32;
  for (let i = 0; i <= steps; i++) {
    const theta = (i / steps) * (angle * Math.PI) / 180;
    points.push(
      x + radius * Math.cos(theta),
      y - radius * Math.sin(theta)
    );
  }
  return (
    <Line
      points={points}
      stroke={stroke}
      strokeWidth={strokeWidth}
    />
  );
};

export default BasketballCourt;