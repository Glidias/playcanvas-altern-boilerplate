import util_geom_Geometry from "../../util/geom/Geometry";


declare namespace altern.terrain {

class GeometryResult {
constructor();
geometry: util_geom_Geometry;
indexLookup: Int32Array;
uvSeg: number;
edgeChangeVertexIndex: number;
verticesAcross: number;
patchSize: number;
getIndexAtUV(u: number, v: number): number;
getIndex(x: number, y: number): number;

}

}

export default altern.terrain.GeometryResult;