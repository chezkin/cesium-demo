import { useEffect, useState } from "react";
import { CzmlBuilder } from "./czmlClass";
import { CzmlItem, CzmlPath, Interval } from "./czmlTypes";


interface CzmlProps {
  nameDocument?: string;
  interval?: Interval;
  currentTime?: string;
  multiplier?: number;
}

const czmlBuilder = new CzmlBuilder();

const useCzml = ({ 
  nameDocument: nameDocumentProps = "My Document",
  interval: IntervalProps = "2024-01-01T00:00:00Z/2024-01-01T01:00:00Z",
  currentTime: currentTimeProps = "2024-01-01T00:00:00Z",
  multiplier: multiplierProps = 10
 }: CzmlProps) => {

  const [czmlItems, setCzmlItems] = useState<CzmlItem[]>([]);
  const [nameDocument, setMameDocument] = useState<string>(nameDocumentProps);
  const [interval, setInterval] = useState<Interval>(IntervalProps);
  const [currentTime, setCurrentTime] = useState<string>(currentTimeProps);
  const [multiplier, setMultiplier] = useState<number>(multiplierProps);



  useEffect(() => {
    
    czmlBuilder.editDocument(
      nameDocument, // שם המסמך
      interval, // אינטרוול זמן
      currentTime, // הזמן הנוכחי
      multiplier // מהירות השעון
    );
    const czmlItems = czmlBuilder.getCzml();
    setCzmlItems(czmlItems);

    console.log("CZML לאחר הוספת נתיב:", czmlBuilder.getCzml());
  }, [nameDocument, interval, currentTime, multiplier])
  

const addPath = (path: CzmlPath) => {
  const { id, name, availability, position, path: pathOptions, model: modelOptions } = path;
  czmlBuilder.addPath(id, name, availability, position, pathOptions, modelOptions);
  const czmlItems = czmlBuilder.getCzml();
  setCzmlItems(czmlItems);
}

    return {
      czmlItems,
      setMameDocument,
      setInterval,
      setCurrentTime,
      setMultiplier,
      addPath,
    }
};

export default useCzml;