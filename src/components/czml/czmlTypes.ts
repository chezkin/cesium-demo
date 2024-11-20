export type Interval = string; // פורמט ISO 8601
export type ColorRGBA = [number, number, number, number];

export interface Clock {
  interval: Interval;
  currentTime: string;
  multiplier: number;
}

export interface PathMaterial {
  polylineOutline: {
    color: { rgba: ColorRGBA };
    outlineColor?: { rgba: ColorRGBA };
    outlineWidth?: number;
  };
}

export interface Path {
  material?: PathMaterial;
  width?: number;
  leadTime?: number;
  trailTime?: number;
  resolution?: number;
}

export interface Model {
  gltf: string;
  scale?: number;
  minimumPixelSize?: number;
  maximumPixelSize?: number;
}

export interface Position {
  epoch: string;
  cartographicDegrees: number[];
}

export interface CzmlDocument {
  id: "document";
  name: string;
  version: "1.0";
  clock: Clock;
}

export interface CzmlPath {
  id: string;
  name?: string;
  description?: string;
  availability?: Interval;
  path?: Path;
  model?: Model;
  position?: Position;
}

export type CzmlItem = CzmlDocument | CzmlPath;