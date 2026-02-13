import React, { useEffect, useRef, useState } from 'react';
import './RandomWorm.css';

const RandomWorm = () => {
  const [creatures, setCreatures] = useState([]);
  const creatureIdCounter = useRef(0);

  useEffect(() => {
    const spawnCreature = () => {
      const delay = 15000 + Math.random() * 25000;
      
      setTimeout(() => {
        const segmentCount = 18 + Math.floor(Math.random() * 10);
        const segments = [];
        
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        
        for (let i = 0; i < segmentCount; i++) {
          segments.push({
            x: startX,
            y: startY
          });
        }
        
        const newCreature = {
          id: creatureIdCounter.current++,
          segments: segments,
          angle: Math.random() * Math.PI * 2,
          speed: 0.7 + Math.random() * 0.7,
          turnSpeed: 0.03 + Math.random() * 0.02,
          segmentDistance: 4,
          lifetime: 20000 + Math.random() * 20000,
          color: `hsl(${Math.random() * 40 + 10}, 60%, 35%)`,
          isCurled: false,
          curlProgress: 0,
          curlCenter: { x: 0, y: 0 }
        };
        
        setCreatures(prev => [...prev, newCreature]);
        
        setTimeout(() => {
          setCreatures(prev => prev.filter(c => c.id !== newCreature.id));
        }, newCreature.lifetime);
        
        spawnCreature();
      }, delay);
    };

    setTimeout(() => {
      spawnCreature();
    }, 5000);
  }, []);

  useEffect(() => {
    if (creatures.length === 0) return;

    let animationFrameId;

    const animateCreatures = () => {
      setCreatures(prevCreatures => 
        prevCreatures.map(creature => {
          // If curled up, arrange in spiral
          if (creature.isCurled) {
            const spiralSegments = creature.segments.map((segment, index) => {
              const progress = index / creature.segments.length;
              const spiralAngle = progress * Math.PI * 4; // 2 full rotations
              const spiralRadius = 15 * (1 - progress); // Spiral inward
              
              return {
                x: creature.curlCenter.x + Math.cos(spiralAngle) * spiralRadius,
                y: creature.curlCenter.y + Math.sin(spiralAngle) * spiralRadius
              };
            });
            
            return {
              ...creature,
              segments: spiralSegments
            };
          }

          // Normal movement
          let newAngle = creature.angle + (Math.random() - 0.5) * creature.turnSpeed;
          
          if (Math.random() < 0.02) {
            newAngle += (Math.random() - 0.5) * 0.5;
          }

          const head = creature.segments[0];
          let newHeadX = head.x + Math.cos(newAngle) * creature.speed;
          let newHeadY = head.y + Math.sin(newAngle) * creature.speed;

          if (newHeadX < 20) {
            newAngle = 0;
            newHeadX = 20;
          } else if (newHeadX > window.innerWidth - 20) {
            newAngle = Math.PI;
            newHeadX = window.innerWidth - 20;
          }
          
          if (newHeadY < 20) {
            newAngle = Math.PI / 2;
            newHeadY = 20;
          } else if (newHeadY > window.innerHeight - 20) {
            newAngle = -Math.PI / 2;
            newHeadY = window.innerHeight - 20;
          }

          const newSegments = [{ x: newHeadX, y: newHeadY }];
          
          for (let i = 1; i < creature.segments.length; i++) {
            const prevSegment = newSegments[i - 1];
            const currentSegment = creature.segments[i];
            
            const dx = prevSegment.x - currentSegment.x;
            const dy = prevSegment.y - currentSegment.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance > 0) {
              const ratio = creature.segmentDistance / distance;
              newSegments.push({
                x: prevSegment.x - dx * ratio,
                y: prevSegment.y - dy * ratio
              });
            } else {
              newSegments.push({ ...currentSegment });
            }
          }

          return {
            ...creature,
            segments: newSegments,
            angle: newAngle
          };
        })
      );

      animationFrameId = requestAnimationFrame(animateCreatures);
    };

    animateCreatures();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [creatures.length]);

  // Handle click on worm
  const handleWormClick = (creatureId, clickX, clickY) => {
    setCreatures(prev => 
      prev.map(creature => {
        if (creature.id === creatureId && !creature.isCurled) {
          // Calculate center point for curl
          const centerX = creature.segments.reduce((sum, seg) => sum + seg.x, 0) / creature.segments.length;
          const centerY = creature.segments.reduce((sum, seg) => sum + seg.y, 0) / creature.segments.length;
          
          // Curl up!
          setTimeout(() => {
            setCreatures(prev2 => 
              prev2.map(c => 
                c.id === creatureId 
                  ? { ...c, isCurled: false } 
                  : c
              )
            );
          }, 2000); // Uncurl after 2 seconds
          
          return {
            ...creature,
            isCurled: true,
            curlCenter: { x: centerX, y: centerY }
          };
        }
        return creature;
      })
    );
  };

  return (
    <div className="ant-container">
      {creatures.map(creature => (
        <svg
          key={creature.id}
          className="worm-creature"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none'
          }}
        >
          {/* Clickable overlay for the worm */}
          <g 
            style={{ 
              pointerEvents: 'auto',
              cursor: 'pointer'
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleWormClick(creature.id, e.clientX, e.clientY);
            }}
          >
            {/* Draw connecting lines between segments */}
            {creature.segments.slice(0, -1).map((segment, index) => {
              const nextSegment = creature.segments[index + 1];
              return (
                <line
                  key={`line-${index}`}
                  x1={segment.x}
                  y1={segment.y}
                  x2={nextSegment.x}
                  y2={nextSegment.y}
                  stroke={creature.color}
                  strokeWidth={creature.isCurled ? 6 : 5}
                  strokeLinecap="round"
                  style={{
                    filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))',
                    transition: 'stroke-width 0.3s ease'
                  }}
                />
              );
            })}
            
            {/* Draw body segments */}
            {creature.segments.map((segment, index) => {
              const isHead = index === 0;
              const isTail = index === creature.segments.length - 1;
              const size = isTail ? 3 : creature.isCurled ? 6 : 5;
              
              return (
                <circle
                  key={index}
                  cx={segment.x}
                  cy={segment.y}
                  r={size}
                  fill={creature.color}
                  style={{
                    filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))',
                    transition: 'r 0.3s ease'
                  }}
                />
              );
            })}
            
            {/* Draw eyes on head */}
            {creature.segments[0] && !creature.isCurled && (
              <>
                <circle
                  cx={creature.segments[0].x - 2}
                  cy={creature.segments[0].y - 2}
                  r={1}
                  fill="#000"
                />
                <circle
                  cx={creature.segments[0].x + 2}
                  cy={creature.segments[0].y - 2}
                  r={1}
                  fill="#000"
                />
              </>
            )}
          </g>
          
          {/* Show "curled up" indicator */}
          {creature.isCurled && (
            <>
              {/* Defensive shell effect */}
              <circle
                cx={creature.curlCenter.x}
                cy={creature.curlCenter.y}
                r={20}
                fill="none"
                stroke={creature.color}
                strokeWidth={2}
                opacity={0.3}
                style={{
                  animation: 'defensivePulse 0.5s ease-in-out infinite'
                }}
              />
            </>
          )}
        </svg>
      ))}
    </div>
  );
};

export default RandomWorm;