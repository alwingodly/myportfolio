import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import './RandomWorm.css';

const RandomWorm = () => {
  const [creatures, setCreatures] = useState([]);
  const creatureIdCounter = useRef(0);
  const animationFrameId = useRef(null);
  const windowSize = useRef({ width: window.innerWidth, height: window.innerHeight });

  const messages = useMemo(() => [
    "Don't step on me! 😠",
    "I'm fast! 💨",
    "Back off! 💢",
    "Leave me alone!",
    "That hurt! 😡",
    "Watch it!",
    "Stop that!",
    "Seriously?! 😤"
  ], []);

  // Update window size on resize with debounce
  useEffect(() => {
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        windowSize.current = { width: window.innerWidth, height: window.innerHeight };
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  const spawnCreature = useCallback(() => {
    const delay = 15000 + Math.random() * 25000;
    
    setTimeout(() => {
      const segmentCount = 30 + Math.floor(Math.random() * 20);
      const segments = [];
      
      const edge = Math.floor(Math.random() * 4);
      let startX, startY, angle;
      
      const { width, height } = windowSize.current;
      
      if (edge === 0) {
        startX = -100;
        startY = Math.random() * height;
        angle = (Math.random() - 0.5) * Math.PI / 3;
      } else if (edge === 1) {
        startX = width + 100;
        startY = Math.random() * height;
        angle = Math.PI + (Math.random() - 0.5) * Math.PI / 3;
      } else if (edge === 2) {
        startX = Math.random() * width;
        startY = -100;
        angle = Math.PI / 2 + (Math.random() - 0.5) * Math.PI / 3;
      } else {
        startX = Math.random() * width;
        startY = height + 100;
        angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI / 3;
      }
      
      for (let i = 0; i < segmentCount; i++) {
        segments.push({
          x: startX - Math.cos(angle) * i * 5,
          y: startY - Math.sin(angle) * i * 5,
          leftLegPhase: Math.random() * Math.PI * 2,
          rightLegPhase: Math.random() * Math.PI * 2
        });
      }
      
      const newCreature = {
        id: creatureIdCounter.current++,
        segments: segments,
        angle: angle,
        speed: 2.2,
        lifetime: 25000 + Math.random() * 15000,
        isTalking: false,
        message: '',
        isExiting: false,
        exitAngle: null
      };
      
      setCreatures(prev => [...prev, newCreature]);
      
      setTimeout(() => {
        setCreatures(prev => prev.map(c => {
          if (c.id === newCreature.id) {
            const headX = c.segments[0].x;
            const headY = c.segments[0].y;
            const { width, height } = windowSize.current;
            
            const distLeft = headX;
            const distRight = width - headX;
            const distTop = headY;
            const distBottom = height - headY;
            
            const minDist = Math.min(distLeft, distRight, distTop, distBottom);
            
            let exitAngle;
            if (minDist === distLeft) exitAngle = Math.PI;
            else if (minDist === distRight) exitAngle = 0;
            else if (minDist === distTop) exitAngle = -Math.PI / 2;
            else exitAngle = Math.PI / 2;
            
            return { ...c, isExiting: true, exitAngle };
          }
          return c;
        }));
        
        setTimeout(() => {
          setCreatures(prev => prev.filter(c => c.id !== newCreature.id));
        }, 10000);
      }, newCreature.lifetime);
      
      spawnCreature();
    }, delay);
  }, []);

  useEffect(() => {
    const initialTimeout = setTimeout(() => {
      spawnCreature();
    }, 5000);

    return () => clearTimeout(initialTimeout);
  }, [spawnCreature]);

  // Optimized animation loop with requestAnimationFrame
  useEffect(() => {
    if (creatures.length === 0) return;

    const animateCreatures = () => {
      setCreatures(prevCreatures => {
        const { width, height } = windowSize.current;
        
        return prevCreatures.map(creature => {
          if (creature.isTalking) {
            const newSegments = creature.segments.map(seg => ({
              ...seg,
              leftLegPhase: seg.leftLegPhase + 0.15,
              rightLegPhase: seg.rightLegPhase + 0.15
            }));
            return { ...creature, segments: newSegments };
          }

          let newAngle = creature.angle;
          
          if (creature.isExiting) {
            const angleDiff = creature.exitAngle - newAngle;
            const normalizedDiff = Math.atan2(Math.sin(angleDiff), Math.cos(angleDiff));
            newAngle += normalizedDiff * 0.1;
          } else {
            newAngle += (Math.random() - 0.5) * 0.08;
            
            const turnPhase = (Date.now() * 0.001 + creature.id) % 4;
            if (turnPhase < 1) {
              newAngle += 0.02;
            } else if (turnPhase < 2) {
              newAngle -= 0.02;
            } else if (turnPhase < 3) {
              newAngle += 0.02;
            } else {
              newAngle -= 0.02;
            }
            
            if (Math.random() < 0.04) {
              newAngle += (Math.random() - 0.5) * 1;
            }
            
            // Optimized collision detection
            const headX = creature.segments[0].x;
            const headY = creature.segments[0].y;
            
            for (let other of prevCreatures) {
              if (other.id === creature.id) continue;
              
              // Only check first few segments for performance
              const checkSegments = Math.min(5, other.segments.length);
              for (let i = 0; i < checkSegments; i++) {
                const seg = other.segments[i];
                const dx = headX - seg.x;
                const dy = headY - seg.y;
                const distSq = dx * dx + dy * dy; // Skip sqrt for performance
                
                if (distSq < 900) { // 30 * 30
                  const avoidAngle = Math.atan2(dy, dx);
                  newAngle = avoidAngle + (Math.random() - 0.5) * Math.PI / 2;
                  break;
                }
              }
            }
          }

          let newHeadX = creature.segments[0].x + Math.cos(newAngle) * creature.speed;
          let newHeadY = creature.segments[0].y + Math.sin(newAngle) * creature.speed;

          const margin = 150;
          if (!creature.isExiting) {
            if (newHeadX < -margin) {
              newAngle = 0;
              newHeadX = -margin;
            }
            if (newHeadX > width + margin) {
              newAngle = Math.PI;
              newHeadX = width + margin;
            }
            if (newHeadY < -margin) {
              newAngle = Math.PI / 2;
              newHeadY = -margin;
            }
            if (newHeadY > height + margin) {
              newAngle = -Math.PI / 2;
              newHeadY = height + margin;
            }
          }

          const newSegments = [];
          newSegments[0] = {
            x: newHeadX,
            y: newHeadY,
            leftLegPhase: creature.segments[0].leftLegPhase + 0.15,
            rightLegPhase: creature.segments[0].rightLegPhase + 0.15
          };

          for (let i = 1; i < creature.segments.length; i++) {
            const prev = newSegments[i - 1];
            const curr = creature.segments[i];
            
            const dx = prev.x - curr.x;
            const dy = prev.y - curr.y;
            const distSq = dx * dx + dy * dy;
            
            const targetDist = 5.5;
            const targetDistSq = targetDist * targetDist;
            
            if (distSq > 1) { // Threshold to avoid division by very small numbers
              const dist = Math.sqrt(distSq);
              newSegments[i] = {
                x: prev.x - (dx / dist) * targetDist,
                y: prev.y - (dy / dist) * targetDist,
                leftLegPhase: curr.leftLegPhase + 0.18,
                rightLegPhase: curr.rightLegPhase + 0.12
              };
            } else {
              newSegments[i] = { ...curr };
            }
          }

          return {
            ...creature,
            segments: newSegments,
            angle: newAngle
          };
        });
      });

      animationFrameId.current = requestAnimationFrame(animateCreatures);
    };

    animateCreatures();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [creatures.length]);

  const handleClick = useCallback((creatureId, e) => {
    e.stopPropagation();
    
    setCreatures(prev => 
      prev.map(creature => {
        if (creature.id === creatureId && !creature.isTalking) {
          const randomMessage = messages[Math.floor(Math.random() * messages.length)];
          
          setTimeout(() => {
            setCreatures(prev2 => 
              prev2.map(c => 
                c.id === creatureId 
                  ? { ...c, isTalking: false, message: '' } 
                  : c
              )
            );
          }, 2000);
          
          return {
            ...creature,
            isTalking: true,
            message: randomMessage
          };
        }
        return creature;
      })
    );
  }, [messages]);

  return (
    <div className="ant-container">
      {creatures.map(creature => {
        const centerX = creature.segments.reduce((sum, seg) => sum + seg.x, 0) / creature.segments.length;
        const centerY = creature.segments.reduce((sum, seg) => sum + seg.y, 0) / creature.segments.length;

        return (
          <React.Fragment key={creature.id}>
            <svg
              className="worm-creature"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                touchAction: 'none' // Mobile optimization
              }}
            >
              <defs>
                <radialGradient id={`bodyGrad-${creature.id}`} cx="40%" cy="35%">
                  <stop offset="0%" stopColor="#7a5a45" />
                  <stop offset="50%" stopColor="#5a3a2e" />
                  <stop offset="100%" stopColor="#3a2519" />
                </radialGradient>
                <linearGradient id={`hornGrad-${creature.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8a6a4a" />
                  <stop offset="50%" stopColor="#b8884a" />
                  <stop offset="100%" stopColor="#6a4a2a" />
                </linearGradient>
              </defs>

              <g 
                style={{ 
                  pointerEvents: 'auto',
                  cursor: 'pointer'
                }}
                onClick={(e) => handleClick(creature.id, e)}
                onTouchStart={(e) => {
                  e.preventDefault();
                  handleClick(creature.id, e);
                }}
              >
                {/* LEGS - Optimized rendering */}
                {creature.segments.map((seg, i) => {
                  if (i === 0 || i === creature.segments.length - 1) return null;
                  
                  const next = creature.segments[i + 1] || seg;
                  const bodyAngle = Math.atan2(next.y - seg.y, next.x - seg.x);
                  
                  const leftPhase = seg.leftLegPhase % (Math.PI * 2);
                  let leftLift = 0;
                  let leftForward = 0;
                  
                  if (leftPhase < Math.PI) {
                    leftLift = Math.sin(leftPhase) * 5;
                    leftForward = (leftPhase / Math.PI) * 0.4;
                  } else {
                    leftForward = 0.4 - ((leftPhase - Math.PI) / Math.PI) * 0.4;
                  }
                  
                  const leftAngle1 = bodyAngle + Math.PI / 2 + leftForward;
                  const leftJoint1X = seg.x + Math.cos(leftAngle1) * 8;
                  const leftJoint1Y = seg.y + Math.sin(leftAngle1) * 8 - leftLift * 0.3;
                  
                  const leftAngle2 = leftAngle1 - 0.6;
                  const leftJoint2X = leftJoint1X + Math.cos(leftAngle2) * 10;
                  const leftJoint2Y = leftJoint1Y + Math.sin(leftAngle2) * 10 - leftLift * 0.5;
                  
                  const leftAngle3 = leftAngle2 - 0.4;
                  const leftTipX = leftJoint2X + Math.cos(leftAngle3) * 9;
                  const leftTipY = leftJoint2Y + Math.sin(leftAngle3) * 9 - leftLift;
                  
                  const rightPhase = seg.rightLegPhase % (Math.PI * 2);
                  let rightLift = 0;
                  let rightForward = 0;
                  
                  if (rightPhase < Math.PI) {
                    rightLift = Math.sin(rightPhase) * 5;
                    rightForward = (rightPhase / Math.PI) * 0.4;
                  } else {
                    rightForward = 0.4 - ((rightPhase - Math.PI) / Math.PI) * 0.4;
                  }
                  
                  const rightAngle1 = bodyAngle - Math.PI / 2 - rightForward;
                  const rightJoint1X = seg.x + Math.cos(rightAngle1) * 8;
                  const rightJoint1Y = seg.y + Math.sin(rightAngle1) * 8 - rightLift * 0.3;
                  
                  const rightAngle2 = rightAngle1 + 0.6;
                  const rightJoint2X = rightJoint1X + Math.cos(rightAngle2) * 10;
                  const rightJoint2Y = rightJoint1Y + Math.sin(rightAngle2) * 10 - rightLift * 0.5;
                  
                  const rightAngle3 = rightAngle2 + 0.4;
                  const rightTipX = rightJoint2X + Math.cos(rightAngle3) * 9;
                  const rightTipY = rightJoint2Y + Math.sin(rightAngle3) * 9 - rightLift;
                  
                  return (
                    <g key={`leg-${i}`}>
                      {/* LEFT LEG */}
                      <line 
                        x1={seg.x} 
                        y1={seg.y} 
                        x2={seg.x + Math.cos(leftAngle1) * 3} 
                        y2={seg.y + Math.sin(leftAngle1) * 3} 
                        stroke="#c49858" 
                        strokeWidth="4.5" 
                        strokeLinecap="round" 
                      />
                      <line 
                        x1={seg.x + Math.cos(leftAngle1) * 3} 
                        y1={seg.y + Math.sin(leftAngle1) * 3} 
                        x2={leftJoint1X} 
                        y2={leftJoint1Y} 
                        stroke="#d4a968" 
                        strokeWidth="3.5" 
                        strokeLinecap="round" 
                      />
                      <line x1={leftJoint1X} y1={leftJoint1Y} x2={leftJoint2X} y2={leftJoint2Y} stroke="#d4a968" strokeWidth="2.5" strokeLinecap="round" />
                      <line x1={leftJoint2X} y1={leftJoint2Y} x2={leftTipX} y2={leftTipY} stroke="#c49858" strokeWidth="1.5" strokeLinecap="round" />
                      <circle cx={leftJoint1X} cy={leftJoint1Y} r="2" fill="#b8884a" />
                      <circle cx={leftJoint2X} cy={leftJoint2Y} r="1.5" fill="#b8884a" />
                      <path
                        d={`M ${leftTipX},${leftTipY}
                            L ${leftTipX + Math.cos(leftAngle3 + 2.8) * 3},${leftTipY + Math.sin(leftAngle3 + 2.8) * 3}
                            L ${leftTipX + Math.cos(leftAngle3 - 2.8) * 3},${leftTipY + Math.sin(leftAngle3 - 2.8) * 3}
                            Z`}
                        fill="#9a7640"
                      />
                      
                      {/* RIGHT LEG */}
                      <line 
                        x1={seg.x} 
                        y1={seg.y} 
                        x2={seg.x + Math.cos(rightAngle1) * 3} 
                        y2={seg.y + Math.sin(rightAngle1) * 3} 
                        stroke="#c49858" 
                        strokeWidth="4.5" 
                        strokeLinecap="round" 
                      />
                      <line 
                        x1={seg.x + Math.cos(rightAngle1) * 3} 
                        y1={seg.y + Math.sin(rightAngle1) * 3} 
                        x2={rightJoint1X} 
                        y2={rightJoint1Y} 
                        stroke="#d4a968" 
                        strokeWidth="3.5" 
                        strokeLinecap="round" 
                      />
                      <line x1={rightJoint1X} y1={rightJoint1Y} x2={rightJoint2X} y2={rightJoint2Y} stroke="#d4a968" strokeWidth="2.5" strokeLinecap="round" />
                      <line x1={rightJoint2X} y1={rightJoint2Y} x2={rightTipX} y2={rightTipY} stroke="#c49858" strokeWidth="1.5" strokeLinecap="round" />
                      <circle cx={rightJoint1X} cy={rightJoint1Y} r="2" fill="#b8884a" />
                      <circle cx={rightJoint2X} cy={rightJoint2Y} r="1.5" fill="#b8884a" />
                      <path
                        d={`M ${rightTipX},${rightTipY}
                            L ${rightTipX + Math.cos(rightAngle3 + 2.8) * 3},${rightTipY + Math.sin(rightAngle3 + 2.8) * 3}
                            L ${rightTipX + Math.cos(rightAngle3 - 2.8) * 3},${rightTipY + Math.sin(rightAngle3 - 2.8) * 3}
                            Z`}
                        fill="#9a7640"
                      />
                    </g>
                  );
                })}

                {/* BODY SEGMENTS */}
                {creature.segments.map((seg, i) => {
                  const isHead = i === 0;
                  const isTail = i === creature.segments.length - 1;
                  const next = creature.segments[i + 1] || seg;
                  const bodyAngle = Math.atan2(next.y - seg.y, next.x - seg.x);
                  const angleDeg = bodyAngle * 180 / Math.PI;
                  
                  const w = isHead ? 8 : isTail ? 6 : 7;
                  const h = isHead ? 10 : isTail ? 8 : 9;
                  
                  return (
                    <g key={`seg-${i}`}>
                      <ellipse
                        cx={seg.x}
                        cy={seg.y + w + 2}
                        rx={w * 1.6}
                        ry={w * 0.4}
                        fill="rgba(0,0,0,0.3)"
                      />
                      
                      <ellipse
                        cx={seg.x}
                        cy={seg.y}
                        rx={w}
                        ry={h}
                        fill={`url(#bodyGrad-${creature.id})`}
                        stroke="#2a1a0d"
                        strokeWidth="1"
                        transform={`rotate(${angleDeg} ${seg.x} ${seg.y})`}
                      />
                      
                      {!isTail && (
                        <line
                          x1={seg.x - w}
                          y1={seg.y + h * 0.8}
                          x2={seg.x + w}
                          y2={seg.y + h * 0.8}
                          stroke="#1a0f08"
                          strokeWidth="1.5"
                          opacity="0.7"
                          transform={`rotate(${angleDeg} ${seg.x} ${seg.y})`}
                        />
                      )}
                      
                      <ellipse
                        cx={seg.x - 2}
                        cy={seg.y - 2.5}
                        rx={w * 0.4}
                        ry={h * 0.3}
                        fill="rgba(160,120,90,0.3)"
                        transform={`rotate(${angleDeg} ${seg.x} ${seg.y})`}
                      />
                      
                      {isHead && (
                        <g>
                          {(() => {
                            const nextSeg = creature.segments[1] || seg;
                            const forwardAngle = Math.atan2(seg.y - nextSeg.y, seg.x - nextSeg.x);
                            
                            return (
                              <>
                                {[0, 1, 2, 3, 4].map(segIdx => {
                                  const baseAngle = forwardAngle - 0.4;
                                  const segAngle = baseAngle - segIdx * 0.08;
                                  const segLen = 8;
                                  
                                  let startX, startY;
                                  if (segIdx === 0) {
                                    startX = seg.x + Math.cos(forwardAngle) * 8;
                                    startY = seg.y + Math.sin(forwardAngle) * 8;
                                  } else {
                                    const prevSegAngle = baseAngle - (segIdx - 1) * 0.08;
                                    startX = seg.x + Math.cos(forwardAngle) * 8 + Math.cos(prevSegAngle) * segLen * segIdx;
                                    startY = seg.y + Math.sin(forwardAngle) * 8 + Math.sin(prevSegAngle) * segLen * segIdx;
                                  }
                                  
                                  const endX = startX + Math.cos(segAngle) * segLen;
                                  const endY = startY + Math.sin(segAngle) * segLen;
                                  
                                  return (
                                    <g key={`horn-left-${segIdx}`}>
                                      <line
                                        x1={startX}
                                        y1={startY}
                                        x2={endX}
                                        y2={endY}
                                        stroke={`url(#hornGrad-${creature.id})`}
                                        strokeWidth={3 - segIdx * 0.4}
                                        strokeLinecap="round"
                                      />
                                      <circle cx={endX} cy={endY} r={1.5 - segIdx * 0.2} fill="#6a4a2a" />
                                    </g>
                                  );
                                })}
                                
                                {[0, 1, 2, 3, 4].map(segIdx => {
                                  const baseAngle = forwardAngle + 0.4;
                                  const segAngle = baseAngle + segIdx * 0.08;
                                  const segLen = 8;
                                  
                                  let startX, startY;
                                  if (segIdx === 0) {
                                    startX = seg.x + Math.cos(forwardAngle) * 8;
                                    startY = seg.y + Math.sin(forwardAngle) * 8;
                                  } else {
                                    const prevSegAngle = baseAngle + (segIdx - 1) * 0.08;
                                    startX = seg.x + Math.cos(forwardAngle) * 8 + Math.cos(prevSegAngle) * segLen * segIdx;
                                    startY = seg.y + Math.sin(forwardAngle) * 8 + Math.sin(prevSegAngle) * segLen * segIdx;
                                  }
                                  
                                  const endX = startX + Math.cos(segAngle) * segLen;
                                  const endY = startY + Math.sin(segAngle) * segLen;
                                  
                                  return (
                                    <g key={`horn-right-${segIdx}`}>
                                      <line
                                        x1={startX}
                                        y1={startY}
                                        x2={endX}
                                        y2={endY}
                                        stroke={`url(#hornGrad-${creature.id})`}
                                        strokeWidth={3 - segIdx * 0.4}
                                        strokeLinecap="round"
                                      />
                                      <circle cx={endX} cy={endY} r={1.5 - segIdx * 0.2} fill="#6a4a2a" />
                                    </g>
                                  );
                                })}
                              </>
                            );
                          })()}
                        </g>
                      )}
                      
                      {isTail && (
                        <g>
                          {(() => {
                            const prevSeg = creature.segments[creature.segments.length - 2] || seg;
                            const backwardAngle = Math.atan2(seg.y - prevSeg.y, seg.x - prevSeg.x);
                            
                            return (
                              <>
                                {[0, 1, 2, 3].map(segIdx => {
                                  const baseAngle = backwardAngle - 0.4;
                                  const segAngle = baseAngle - segIdx * 0.08;
                                  const segLen = 7;
                                  
                                  let startX, startY;
                                  if (segIdx === 0) {
                                    startX = seg.x + Math.cos(backwardAngle) * 5;
                                    startY = seg.y + Math.sin(backwardAngle) * 5;
                                  } else {
                                    const prevSegAngle = baseAngle - (segIdx - 1) * 0.08;
                                    startX = seg.x + Math.cos(backwardAngle) * 5 + Math.cos(prevSegAngle) * segLen * segIdx;
                                    startY = seg.y + Math.sin(backwardAngle) * 5 + Math.sin(prevSegAngle) * segLen * segIdx;
                                  }
                                  
                                  const endX = startX + Math.cos(segAngle) * segLen;
                                  const endY = startY + Math.sin(segAngle) * segLen;
                                  
                                  return (
                                    <g key={`cerc-left-${segIdx}`}>
                                      <line
                                        x1={startX}
                                        y1={startY}
                                        x2={endX}
                                        y2={endY}
                                        stroke="#d4a968"
                                        strokeWidth={2.5 - segIdx * 0.4}
                                        strokeLinecap="round"
                                      />
                                      <circle cx={endX} cy={endY} r={1.2 - segIdx * 0.2} fill="#b8884a" />
                                    </g>
                                  );
                                })}
                                
                                {[0, 1, 2, 3].map(segIdx => {
                                  const baseAngle = backwardAngle + 0.4;
                                  const segAngle = baseAngle + segIdx * 0.08;
                                  const segLen = 7;
                                  
                                  let startX, startY;
                                  if (segIdx === 0) {
                                    startX = seg.x + Math.cos(backwardAngle) * 5;
                                    startY = seg.y + Math.sin(backwardAngle) * 5;
                                  } else {
                                    const prevSegAngle = baseAngle + (segIdx - 1) * 0.08;
                                    startX = seg.x + Math.cos(backwardAngle) * 5 + Math.cos(prevSegAngle) * segLen * segIdx;
                                    startY = seg.y + Math.sin(backwardAngle) * 5 + Math.sin(prevSegAngle) * segLen * segIdx;
                                  }
                                  
                                  const endX = startX + Math.cos(segAngle) * segLen;
                                  const endY = startY + Math.sin(segAngle) * segLen;
                                  
                                  return (
                                    <g key={`cerc-right-${segIdx}`}>
                                      <line
                                        x1={startX}
                                        y1={startY}
                                        x2={endX}
                                        y2={endY}
                                        stroke="#d4a968"
                                        strokeWidth={2.5 - segIdx * 0.4}
                                        strokeLinecap="round"
                                      />
                                      <circle cx={endX} cy={endY} r={1.2 - segIdx * 0.2} fill="#b8884a" />
                                    </g>
                                  );
                                })}
                              </>
                            );
                          })()}
                        </g>
                      )}
                    </g>
                  );
                })}
              </g>
            </svg>

            {creature.isTalking && (
              <div
                className="speech-bubble"
                style={{
                  left: `${centerX}px`,
                  top: `${centerY - 70}px`
                }}
              >
                <div className="speech-bubble-content">
                  {creature.message}
                </div>
                <div className="speech-bubble-tail"></div>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default RandomWorm;