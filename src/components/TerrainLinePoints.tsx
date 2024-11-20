import React, { useState, useEffect } from 'react';
import { Entity, PointGraphics, EntityDescription } from 'resium';
import { Color, Cartographic, sampleTerrainMostDetailed, createWorldTerrainAsync, Ellipsoid, Cartesian3, Cesium3DTileset, Ray, IonResource, Cesium3DTileFeature, Viewer } from 'cesium';

interface TerrainLineProps {
  start: { lon: number, lat: number };
  end: { lon: number, lat: number };
  onLineComputed?: (data: Cartesian3[]) => void;
}

export const TerrainLinePoints: React.FC<TerrainLineProps> = ({ start, end, onLineComputed }) => {
  const [points, setPoints] = useState<{ position: Cartesian3; color: Color; height: number; hasLineOfSight: boolean; blockingIndex: number | null }[]>([]);
  const [tileset, setTileset] = useState<Cesium3DTileset | null>(null);

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

      // טוענים את שכבת המבנים
      const loadedTileset = new Cesium3DTileset({
        url: IonResource.fromAssetId(96188),
      });
      setTileset(loadedTileset);

      const positionsArray = interpolatePoints(
        Cartographic.fromDegrees(start.lon, start.lat),
        Cartographic.fromDegrees(end.lon, end.lat),
        100
      );

      const updatedPositions = await sampleTerrainMostDetailed(terrainProvider, positionsArray);
      const cartesianPositions = Ellipsoid.WGS84.cartographicArrayToCartesianArray(updatedPositions);

      // פונקציה לבדוק קו ראיה עם מבנים
      const checkLineOfSightWithBuildings = async (startPos: Cartographic, endPos: Cartographic) => {
        const startHeight = startPos.height;
        const endHeight = endPos.height;
        let hasLineOfSight = true;
        let blockingIndex = null;

        for (let i = 1; i < updatedPositions.length - 1; i++) {
          const pos = updatedPositions[i];
          const expectedHeight = startHeight + (endHeight - startHeight) * i / (updatedPositions.length - 1);

          // בדיקה מול מבנים
          const position = Ellipsoid.WGS84.cartographicToCartesian(pos);
          const ray = new Ray(cartesianPositions[0], Cartesian3.normalize(Cartesian3.subtract(position, cartesianPositions[0], new Cartesian3()), new Cartesian3()));
          let buildingHeight = 0;

          if (tileset) {
            const tiles = tileset._selectedTiles;
            for (let tile of tiles) {
              const featuresLength = tile.content.featuresLength;
              for (let j = 0; j < featuresLength; j++) {
                const feature = tile.content.getFeature(j) as Cesium3DTileFeature;
                const intersection = feature.boundingVolume.intersect(ray);
                if (intersection) {
                  buildingHeight = feature.getProperty('height') || 0;
                  break;
                }
              }
              if (buildingHeight > 0) break;
            }
          }

          if (pos.height < expectedHeight + buildingHeight) {
            hasLineOfSight = false;
            blockingIndex = i;
            break;
          }
        }
        return { hasLineOfSight, blockingIndex };
      };

      const pointsWithColors = await Promise.all(updatedPositions.map(async (pos, index) => {
        const { hasLineOfSight, blockingIndex } = await checkLineOfSightWithBuildings(updatedPositions[0], pos);
        const color = hasLineOfSight ? Color.GREEN : Color.RED;
        return {
          position: cartesianPositions[index],
          color,
          height: Math.round(pos.height), // עיגול הגובה כך שלא יהיו מספרים אחרי הנקודה
          hasLineOfSight,
          blockingIndex
        };
      }));

      setPoints(pointsWithColors);
      onLineComputed && onLineComputed(cartesianPositions);
    };

    loadTerrainData();
  }, [start, end, onLineComputed, tileset]);

  return (
    <>
      {points.map((point, index) => (
        <Entity key={index} position={point.position}>
          <PointGraphics pixelSize={10} color={point.color} />
          <EntityDescription>
            <div style={{color: 'black'}}>
              <h3>Point {index}</h3>
              <p>Height: {point.height} meters</p>
              <p>Has Line of Sight: {point.hasLineOfSight ? 'Yes' : 'No'}</p>
              {point.blockingIndex !== null && (
                <p>Blocking Point Index: {point.blockingIndex}</p>
              )}
            </div>
          </EntityDescription>
        </Entity>
      ))}
    </>
  );
};
