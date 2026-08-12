import React from 'react';
import AIAgent from './AIAgent';

const AIAgentsContainer: React.FC = () => {
  const agentsConfig = [
    // Top Left - face right (toward globe)
    { index: 0, x: -350, y: -230, rotateY: 75 },
    // Top Right - face left (toward globe)
    { index: 1, x: 350, y: -210, rotateY: -75 },
    // Middle Left - face right (toward globe)
    { index: 2, x: -410, y: 50, rotateY: 80 },
    // Bottom Right - face left (toward globe)
    { index: 4, x: 370, y: 190, rotateY: -70 },
  ];

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10, pointerEvents: 'none', transformStyle: 'preserve-3d', perspective: '1200px' }}>
      {agentsConfig.map((config) => (
        <AIAgent 
          key={config.index}
          index={config.index}
          x={config.x}
          y={config.y}
          rotateY={config.rotateY}
        />
      ))}
    </div>
  );
};

export default AIAgentsContainer;
