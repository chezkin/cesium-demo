import {  Camera as camera, Cartesian3, Math as CesiumMath, Color, Ellipsoid, Ion, IonResource, Matrix4, Rectangle, ShadowMode } from "cesium";
import { useRef, useState } from "react";
import { CameraFlyTo, Cesium3DTileset, CesiumComponentRef, Entity, Moon, PointGraphics, ShadowMap, Viewer, Camera } from "resium";
import { Viewer as CesiumViewer, createWorldTerrainAsync, Cesium3DTileset as cesium3DTileset } from "cesium";
import { TerrainLine } from "./terrainLine";
import { TerrainLinePoints } from "./TerrainLinePoints";

const position = Cartesian3.fromDegrees(35.21371, 31.7683, 100);
const pointGraphics = { pixelSize: 10 };

// שינוי הקריאה ליצירת terrainProvider
// const terrainProvider = createWorldTerrain();
interface Props {
  full?: boolean;
}

const ResiumMap = ({full}: Props) => {
  const viewerRef = useRef<CesiumComponentRef<CesiumViewer>>(null);
  Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4NDI5MTY1My05MzA1LTQzMTAtYmU0Yi05MjFlNzRiYTY4YWYiLCJpZCI6MjI3NjAyLCJpYXQiOjE3MjA2MTExOTh9.OQ4OrT7QkvXeDlk9VXVmfaJ_Ti05nVekB9TG6Rh0nlI';
  // Camera.DEFAULT_VIEW_RECTANGLE = Rectangle.fromDegrees(34.0, 29.5, 35.5, 34.5);
  // const [lineData, setLineData] = useState<Cartesian3[]>([]);


  // const modelMatrix = Matrix4.fromTranslation(new Cartesian3(1215011.23, -4736302.13, 4081603.94));

  const start = { lon: 35.2137, lat: 31.7683 }; // ירושלים
  const end = { lon: 35.4732, lat: 31.5590 }; // ים המלח


  const startTLV = { lon: 34.7818, lat: 32.0853 }; // נקודה ראשונה בתל אביב
  const endTLV = { lon: 34.7850, lat: 32.0800 }; // נקודה שנייה בתל אביב


  const startSEE = { lon: 35.4822, lat: 31.4428 }; // נקודה ראשונה בים המלח
  const endSEE = { lon: 35.4869, lat: 31.4332 }; // נקודה שנייה בים המלח


  const handleLineComputed = (data: Cartesian3[]) => {
    // setLineData(data);
    // console.log({data});
    
  };
  
const terrainProvider = createWorldTerrainAsync();
    return (
        <Viewer 
        terrainProvider={terrainProvider}
        ref={viewerRef}
        timeline={false}
        animation={false}
        navigationHelpButton={false}
        // homeButton={false}
        // vrButton={false}
        fullscreenButton
        full={full}
        >
        <Moon
            show
            ellipsoid={
              new Ellipsoid(
                CesiumMath.LUNAR_RADIUS * 10,
                CesiumMath.LUNAR_RADIUS * 10,
                CesiumMath.LUNAR_RADIUS * 10,
              )
            }
        />
{/* <TerrainLine start={startTLV} end={endTLV} onLineComputed={handleLineComputed}/>
<TerrainLine start={start} end={end} onLineComputed={handleLineComputed}/>
<TerrainLine start={startSEE} end={endSEE} onLineComputed={handleLineComputed}/> */}
{/* <TerrainLinePoints start={startTLV} end={endTLV} onLineComputed={handleLineComputed}/>
<TerrainLinePoints start={start} end={end} onLineComputed={handleLineComputed}/>
<TerrainLinePoints start={startSEE} end={endSEE} onLineComputed={handleLineComputed}/> */}
        <CameraFlyTo
            duration={6}
            destination={Rectangle.fromDegrees(34.0, 29.5, 35.5, 34.5)}
            // orientation={{
            //   heading: CesiumMath.toRadians(22.0),  // כיוון המצלמה במעלות
            //   pitch: CesiumMath.toRadians(-45.0), // זווית המצלמה כלפי מטה
            //   roll: -0.2                           // סיבוב המצלמה
            // }}
         />
         {/* <Entity show position={position}>
         <PointGraphics pixelSize={3} color={Color.CRIMSON} outlineWidth={1} outlineColor={Color.LIGHTCORAL} />
         </Entity> */}
         <Cesium3DTileset 
         debugColorizeTiles 
         show 
         url={IonResource.fromAssetId(96188)}
         />
        <ShadowMap />
        <Camera
        defaultMoveAmount={10.0}
        defaultLookAmount={0.005}
        defaultRotateAmount={0.01}
        defaultZoomAmount={5.0}
        maximumZoomFactor={0.1} // Zoom out up to 10,000 kilometers
        // minimumDisableDepthTestDistance={100000} // Zoom in up to 100 kilometers
        
      />

      </Viewer>
    );
};

export default ResiumMap;
