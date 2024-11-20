import { useState, useEffect } from 'react';
import { Entity, PolylineGraphics } from 'resium';
import { Color, Cartographic, sampleTerrainMostDetailed, createWorldTerrainAsync, Ellipsoid, Cartesian3 } from 'cesium';

export const TerrainLine = ({ start, end, onLineComputed }) => {
  const [groundPositions, setGroundPositions] = useState<Cartesian3[]>([]);
  const [airPositions, setAirPositions] = useState<Cartesian3[]>([]);
  const [lineColor, setLineColor] = useState<Color>(Color.BLUE);

  useEffect(() => {
    const loadTerrainData = async () => {
      const terrainProvider = await createWorldTerrainAsync();

      const interpolatePoints = (start: Cartographic, end: Cartographic, numPoints: number) => {
        const points = [];
        for (let i = 0; i <= numPoints; i++) {
          const longitude = start.longitude + (end.longitude - start.longitude) * i / numPoints;
          const latitude = start.latitude + (end.latitude - start.latitude) * i / numPoints;
          points.push(new Cartographic(longitude, latitude));
        }
        return points;
      };

      const roundHeight = (height: number, decimals: number) => {
        const factor = Math.pow(10, decimals);
        return Math.round(height * factor) / factor;
      };

      const positionsArray = interpolatePoints(
        Cartographic.fromDegrees(start.lon, start.lat),
        Cartographic.fromDegrees(end.lon, end.lat),
        100
      );

      const updatedPositions = await sampleTerrainMostDetailed(terrainProvider, positionsArray);
      updatedPositions.forEach(pos => {
        pos.height = roundHeight(pos.height, 0);
      });

      const cartesianPositions = Ellipsoid.WGS84.cartographicArrayToCartesianArray(updatedPositions);
      setGroundPositions(cartesianPositions);
      onLineComputed && onLineComputed(cartesianPositions);

      const airCartesianPositions = updatedPositions.map(pos => {
        return Ellipsoid.WGS84.cartographicToCartesian(new Cartographic(pos.longitude, pos.latitude, pos.height + 100));
      });
      setAirPositions(airCartesianPositions);

      let hasLineOfSight = true;
      const startHeight = updatedPositions[0].height;
      const endHeight = updatedPositions[updatedPositions.length - 1].height;
      for (let i = 1; i < updatedPositions.length - 1; i++) {
        const pos = updatedPositions[i];
        const expectedHeight = startHeight + (endHeight - startHeight) * i / (updatedPositions.length - 1);
        
        console.log(`Index: ${i}, Pos Height: ${pos.height}, Expected Height: ${expectedHeight}, Pos Height + 100: ${pos.height + 100}`);
        
        if (pos.height < expectedHeight) {
          hasLineOfSight = false;
          break;
        }
      }

      console.log(`Has Line of Sight: ${hasLineOfSight}`);
      setLineColor(hasLineOfSight ? Color.GREEN : Color.RED);
    };

    loadTerrainData();
  }, [start, end, onLineComputed]);

  return (
    <>
      <Entity>
        <PolylineGraphics
          positions={groundPositions}
          width={5}
          material={Color.RED}
          clampToGround={true}
        />
      </Entity>
      <Entity>
        <PolylineGraphics
          positions={airPositions}
          width={5}
          material={lineColor}
        />
      </Entity>
    </>
  );
};
