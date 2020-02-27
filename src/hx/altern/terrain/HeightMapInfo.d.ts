import altern_terrain_HeightMapInfo from "../../altern/terrain/HeightMapInfo";
import haxe_io_Bytes from "../../haxe/io/Bytes";
import js__$Boot_HaxeError from "./../../js/_Boot/HaxeError";

declare namespace altern.terrain {

class HeightMapInfo {
constructor();
Data: Int32Array;
XOrigin: number;
ZOrigin: number;
XSize: number;
ZSize: number;
RowWidth: number;
Scale: number;
getData(ix: number, iz: number): number;
fillDataWithValue(val: number): void;
setFixed(val: boolean): void;
BoxFilterHeightMap(smoothEdges: boolean): void;
Sample(x: number, z: number): number;
SampleInd(xi: number, zi: number): number;
clone(): altern_terrain_HeightMapInfo;
flatten(val: number): void;
slopeAlongXY(val: number, multiplier?: number): void;
slopeAlongY(val: number): void;
slopeAltAlongY(val: number): void;
randomise(val: number): void;
copyData(xStart: number, yStart: number, width: number, height: number, hm: altern_terrain_HeightMapInfo, destX?: number, destY?: number): void;
setFromBytes(bytes: haxe_io_Bytes, heightMult: number, patchesAcross: number, heightMin?: number, tileSize?: number): void;
setFlat(numTilesAcross: number, tileSize?: number): void;
reset(): void;
paddEdgeDataValues(): void;
static isBase2(val: number): boolean;
static createFlat(patchesAcross: number, tileSize?: number): altern_terrain_HeightMapInfo;
static createFromBytes(x: number, y: number, bytes: haxe_io_Bytes, heightMult: number, patchesAcross: number, heightMin?: number, tileSize?: number): altern_terrain_HeightMapInfo;

}

}

export default altern.terrain.HeightMapInfo;