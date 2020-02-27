import altern_terrain_HeightMapInfo from "../../altern/terrain/HeightMapInfo";
import altern_terrain_QuadTreePage from "../../altern/terrain/QuadTreePage";
import altern_terrain_QuadChunkCornerData from "./../../altern/terrain/QuadChunkCornerData";
import js__$Boot_HaxeError from "./../../js/_Boot/HaxeError";

declare namespace altern.terrain {

class QuadTreePage extends altern_terrain_QuadChunkCornerData {
constructor();
requirements: number;
heightMap: altern_terrain_HeightMapInfo;
uvTileSize: number;
static isBase2(val: number): boolean;
static create(x: number, y: number, size: number): altern_terrain_QuadTreePage;

}

}

export default altern.terrain.QuadTreePage;