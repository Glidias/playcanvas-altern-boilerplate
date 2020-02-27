import altern_culling_CullingPlane from "../../altern/culling/CullingPlane";
import altern_geom_Wrapper from "./../../altern/geom/Wrapper";
import util_geom_Vec3 from "./../../util/geom/Vec3";
import altern_geom_Vertex from "./../../altern/geom/Vertex";
import altern_geom_Face from "./../../altern/geom/Face";

declare namespace altern.geom {

class ClipMacros {
constructor();
static DUMMY_VECTOR: util_geom_Vec3;
static transformId: number;
static computeMeshVerticesLocalOffsets(faceList: altern_geom_Face, camNormal: util_geom_Vec3): void;
static getClippedVerticesForFace(face: altern_geom_Face, normal: util_geom_Vec3, offset: number, tailWrapper: altern_geom_Wrapper, wrapperClone: altern_geom_Wrapper): altern_geom_Wrapper;
static calculateFaceCoordinates2(faceList: altern_geom_Face, faceReference: altern_geom_Face): void;
static calculateFaceCoordinates(faceList: altern_geom_Face, top: util_geom_Vec3, right: util_geom_Vec3, origin: util_geom_Vec3): void;
static updateClipFace(face: altern_geom_Face, normal: util_geom_Vec3, offset: number): void;
static newPositiveClipFace(face: altern_geom_Face, normal: util_geom_Vec3, offset: number): altern_geom_Face;
static getOverlapClipFace(clipperFace: altern_geom_Face, face: altern_geom_Face): altern_geom_Face;
static clipWithPlaneList(planeList: altern_culling_CullingPlane, disposableFace: altern_geom_Face, clipMask?: number): altern_geom_Face;

}

}

export default altern.geom.ClipMacros;