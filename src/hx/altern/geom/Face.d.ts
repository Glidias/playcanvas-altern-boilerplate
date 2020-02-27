import altern_geom_Face from "../../altern/geom/Face";
import util_geom_Vec3 from "../../util/geom/Vec3";
import components_Transform3D from "../../components/Transform3D";
import altern_geom_Wrapper from "./../../altern/geom/Wrapper";
import altern_geom_Vertex from "./../../altern/geom/Vertex";

declare namespace altern.geom {

class Face {
constructor();
next: altern_geom_Face;
processNext: altern_geom_Face;
normalX: number;
normalY: number;
normalZ: number;
offset: number;
wrapper: altern_geom_Wrapper;
visible: boolean;
collect(): void;
destroy(): void;
calculateNormal(): void;
calculateBestSequenceAndNormal(): void;
getArea(): number;
overlapsOther2D(face: altern_geom_Face): boolean;
isPointInside2D(centerX: number, centerY: number): boolean;
static collector: altern_geom_Face;
static create(): altern_geom_Face;
static getQuad(pos: util_geom_Vec3, up: util_geom_Vec3, right: util_geom_Vec3, halfWidth: number, halfHeight: number, t: components_Transform3D): altern_geom_Face;
static setupQuad(f: altern_geom_Face, pos: util_geom_Vec3, up: util_geom_Vec3, right: util_geom_Vec3, halfWidth: number, halfHeight: number, t: components_Transform3D): altern_geom_Face;

}

}

export default altern.geom.Face;