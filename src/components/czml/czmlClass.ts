
import { CzmlItem, CzmlDocument, Position, Path, CzmlPath, Interval, Model  } from "./czmlTypes";


export class CzmlBuilder {
    private czml: CzmlItem[] = [];
  

    constructor(
        name: string = "Default Document",
        clockInterval: Interval = "2024-01-01T00:00:00Z/2024-01-01T01:00:00Z",
        currentTime: string = "2024-01-01T00:00:00Z",
        multiplier: number = 1
      ) {
        // יצירת מסמך כברירת מחדל
        const document: CzmlDocument = {
          id: "document",
          name: name,
          version: "1.0",
          clock: {
            interval: clockInterval,
            currentTime: currentTime,
            multiplier: multiplier,
          },
        };
        this.czml.push(document);
      }
    
      // עריכת המסמך הקיים
      editDocument(name?: string, clockInterval?: Interval, currentTime?: string, multiplier?: number): void {
        const document = this.czml.find(item => item.id === "document") as CzmlDocument | undefined;
    
        if (!document) {
          throw new Error("מסמך לא נמצא. לא ניתן לערוך אותו.");
        }
    
        if (name !== undefined) document.name = name;
        if (clockInterval !== undefined) document.clock.interval = clockInterval;
        if (currentTime !== undefined) document.clock.currentTime = currentTime;
        if (multiplier !== undefined) document.clock.multiplier = multiplier;
      }
  
    // הוספת נתיב
    addPath(
        id: string,
        name?: string,
        availability?: Interval,
        position?: Position,
        pathOptions?: Partial<Path>,
        modelOptions?: Partial<Model>
      ): void {
        const path: CzmlPath = {
            id,
            name,
            availability,
            position,
        };
      
        if (pathOptions) {
            path.path = {
              material: pathOptions.material || {
                polylineOutline: {
                  color: { rgba: [255, 255, 255, 255] },
                  outlineColor: { rgba: [255, 255, 255, 255] },
                  outlineWidth: 1,
                },
              },
              width: pathOptions.width ?? 1,
              leadTime: pathOptions.leadTime ?? 10,
              trailTime: pathOptions.trailTime ?? 100,
              resolution: pathOptions.resolution ?? 5,
            };
          }
        
          // טיפול בערכי modelOptions (אם נשלחו)
          if (modelOptions) {
            path.model = {
              gltf: modelOptions.gltf || "",
              scale: modelOptions.scale ?? 1,
              minimumPixelSize: modelOptions.minimumPixelSize ?? 1,
              maximumPixelSize: modelOptions.maximumPixelSize ?? 10,
            };
          }
      
        this.czml.push(path);
      }

      editPath(
        id: string,
        updates: Partial<Omit<CzmlPath, "id">>
      ): void {
        const path = this.czml.find(item => item.id === id) as CzmlPath | undefined;
    
        if (!path) {
          throw new Error(`נתיב עם מזהה ${id} לא נמצא.`);
        }
    
        if (updates.name !== undefined) path.name = updates.name;
        if (updates.availability !== undefined) path.availability = updates.availability;
        if (updates.position !== undefined) path.position = updates.position;
        if (updates.path !== undefined) path.path = { ...path.path, ...updates.path };
        if (updates.model !== undefined) path.model = { ...path.model, ...updates.model };
      }

      // מחיקת נתיב
  removePath(id: string): void {
    const index = this.czml.findIndex(item => item.id === id);

    if (index === -1) {
      throw new Error(`נתיב עם מזהה ${id} לא נמצא.`);
    }

    this.czml.splice(index, 1);
  }
  
    // קבלת ה-CZML המלא
    getCzml(): CzmlItem[] {
      return this.czml;
    }
  }

  // קבלת הפורמט המלא
// const czmlOutput = czmlBuilder.getCzml();