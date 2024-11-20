import {  Camera as camera, Cartesian3, Math as CesiumMath, CzmlDataSource, Ellipsoid, Ion, IonResource, Rectangle } from "cesium";
import { useEffect, useRef } from "react";
import { Cesium3DTileset, CesiumComponentRef, Moon, ShadowMap, Viewer } from "resium";
import { Viewer as CesiumViewer, createWorldTerrainAsync } from "cesium";
import Drwons from "./czml/drwons";

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
  camera.DEFAULT_VIEW_RECTANGLE = Rectangle.fromDegrees(34.0, 29.5, 35.5, 34.5);


  
  
const terrainProvider = createWorldTerrainAsync();
    return (
        <Viewer 
        terrainProvider={terrainProvider}
        ref={viewerRef}
        // timeline={false}
        // animation={false}
        navigationHelpButton={false}
        homeButton={false}
        vrButton={false}
        fullscreenButton
        full={full}
        >

        {/* <CameraFlyTo
            duration={6}
            destination={Rectangle.fromDegrees(34.0, 29.5, 35.5, 34.5)}
            // orientation={{
            //   heading: CesiumMath.toRadians(22.0),  // כיוון המצלמה במעלות
            //   pitch: CesiumMath.toRadians(-45.0), // זווית המצלמה כלפי מטה
            //   roll: -0.2                           // סיבוב המצלמה
            // }}
         /> */}

         <Cesium3DTileset  
         show 
         url={IonResource.fromAssetId(96188)}
         />
        <ShadowMap />
        <Drwons />

        {/* <Camera
        defaultMoveAmount={10.0}
        defaultLookAmount={0.005}
        defaultRotateAmount={0.01}
        defaultZoomAmount={5.0}
        maximumZoomFactor={0.1} // Zoom out up to 10,000 kilometers
        // minimumDisableDepthTestDistance={100000} // Zoom in up to 100 kilometers
        
      /> */}

      </Viewer>
    );
};

export default ResiumMap;
