import { CzmlDataSource, DataSource } from "cesium";
import { useEffect, useRef, useState } from "react";
import { useCesium } from "resium";
import { CzmlItem } from "./czmlTypes";

type Props = {
  czmlDataSource: CzmlItem[];
  trackedEntityID: string;
};

const useDrwon = ({ czmlDataSource, trackedEntityID }: Props) => {
  const { viewer } = useCesium();
  const [dataSource, setDataSource] = useState<DataSource | undefined>(undefined);


  const trackedEntityRef = useRef<string>(trackedEntityID);


  useEffect(() => {
    if (viewer) {
      (async () => {
        try {
          if (dataSource) {
            viewer.dataSources.remove(dataSource);
          }
          const newDataSource = await viewer.dataSources.add(CzmlDataSource.load(czmlDataSource));
          setDataSource(newDataSource);
        } catch (error) {
          console.error("Error loading CZML:", error);
        }
      })();
    }
  }, [czmlDataSource]);


  useEffect(() => {
    if (viewer && dataSource) {
        trackedEntityRef.current = trackedEntityID; 
        viewer.trackedEntity = dataSource.entities.getById(trackedEntityID);
      
    }
  }, [trackedEntityID, dataSource, viewer]);

  return null;
};

export default useDrwon;
