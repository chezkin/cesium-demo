import {  Cartesian3, Color, ScreenSpaceEventType } from "cesium";
import { FC, useState } from "react";
import { Entity, ScreenSpaceEvent, ScreenSpaceEventHandler, useCesium } from "resium";

const MapEvents: FC = () => {
    const [points, setPoints] = useState<Cartesian3[]>([]);
    const [distance, setDistance] = useState<number | null>(null);
    const cesiumViewer = useCesium()
    const viewer = cesiumViewer.viewer
  
    const handleClick = (movement: any ) => {
      console.log({movement});
      
      const cartesian = viewer?.scene.camera.pickEllipsoid(movement.position);
      if (cartesian) {
        setPoints([...points, cartesian]);
        if (points.length === 1) {
          const newDistance = Cartesian3.distance(points[0], cartesian);
          setDistance(newDistance);
        }
      }
    };
  
  return (
    <>
    <ScreenSpaceEventHandler >
        <ScreenSpaceEvent  
            action={handleClick} 
            type={ScreenSpaceEventType.LEFT_CLICK} 
        />
    </ScreenSpaceEventHandler>

    {points.map((point, index) => (
    <Entity
      key={index}
      position={point}
      point={{ pixelSize: 10, color: Color.RED }}
    />
  ))}
  {distance && <Entity 
      position={Cartesian3.midpoint(points[0], points[1], new Cartesian3())}
      label={{ text: `Distance: ${distance.toFixed(2)} meters`, font: '14pt sans-serif', fillColor: Color.YELLOW }} />}
    </>
  )
}

export default MapEvents;