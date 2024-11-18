import React from 'react';
import { Circle, Group, Arrow, Text } from 'react-konva';

interface PlayerMarkerProps {
  player: {
    id: string;
    x: number;
    y: number;
    type: 'offense' | 'defense';
    number: number;
  };
  nextPosition?: { x: number; y: number };
  isAnimating: boolean;
  onDragEnd: (x: number, y: number) => void;
  stageWidth: number;
  stageHeight: number;
}

const PlayerMarker: React.FC<PlayerMarkerProps> = ({
  player,
  nextPosition,
  isAnimating,
  onDragEnd,
  stageWidth,
  stageHeight,
}) => {
  const radius = 20;
  const showMovementIndicator = nextPosition && !isAnimating;

  const x = (player.x / 100) * stageWidth;
  const y = (player.y / 100) * stageHeight;
  const nextX = nextPosition ? (nextPosition.x / 100) * stageWidth : x;
  const nextY = nextPosition ? (nextPosition.y / 100) * stageHeight : y;

  return (
    <Group>
      <Circle
        x={x}
        y={y}
        radius={radius}
        fill={player.type === 'offense' ? '#3B82F6' : '#EF4444'}
        shadowColor="black"
        shadowBlur={5}
        shadowOpacity={0.3}
        draggable={!isAnimating}
        onDragEnd={(e) => {
          const newX = (e.target.x() / stageWidth) * 100;
          const newY = (e.target.y() / stageHeight) * 100;
          onDragEnd(
            Math.max(0, Math.min(100, newX)),
            Math.max(0, Math.min(100, newY))
          );
        }}
      />
      <Text
        x={x - radius / 2}
        y={y - radius / 2}
        width={radius}
        height={radius}
        text={player.number.toString()}
        fill="white"
        fontSize={16}
        fontStyle="bold"
        align="center"
        verticalAlign="middle"
      />

      {showMovementIndicator && (
        <Arrow
          points={[x, y, nextX, nextY]}
          stroke="#9CA3AF"
          strokeWidth={2}
          fill="#9CA3AF"
          opacity={0.5}
          pointerLength={10}
          pointerWidth={10}
        />
      )}
    </Group>
  );
};

export default PlayerMarker;