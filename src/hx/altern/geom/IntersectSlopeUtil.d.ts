
import jeash_geom_Vector3D from "./../../jeash/geom/Vector3D";

declare namespace altern.geom {

class IntersectSlopeUtil {
constructor();
startPt: jeash_geom_Vector3D;
endPt: jeash_geom_Vector3D;
pt2: jeash_geom_Vector3D;
pt1: jeash_geom_Vector3D;
pt3: jeash_geom_Vector3D;
velocity: jeash_geom_Vector3D;
startPosition: jeash_geom_Vector3D;
intersectSides: number[];
intersectTimes: Float32Array;
intersectZ: Float32Array;
gradient: number;
_unitDist: number;
sqDistBetween2DVector(a: jeash_geom_Vector3D, b: jeash_geom_Vector3D): number;
rBetween2DVec(a: jeash_geom_Vector3D, b: jeash_geom_Vector3D, c: jeash_geom_Vector3D): number;
setupRay(origin: jeash_geom_Vector3D, direction: jeash_geom_Vector3D): void;
getTriSlopeTrajTime(direction: jeash_geom_Vector3D, gravity: number, strength: number): number;
setupTri(ax: number, ay: number, az: number, bx: number, by: number, bz: number, cx: number, cy: number, cz: number): void;
getTrajHeightAtTime(velocity: jeash_geom_Vector3D, gravity: number, t: number): number;
getTrajHeightAtTime2(direction: jeash_geom_Vector3D, gravity: number, strength: number, t: number): number;
getGradHeightAtTime(t: number): number;
getFlatTrajTime(direction: jeash_geom_Vector3D, gravity: number, strength: number, grad?: number): number;
getTriIntersections(): number;
IsIntersecting(a: jeash_geom_Vector3D, b: jeash_geom_Vector3D, c: jeash_geom_Vector3D, d: jeash_geom_Vector3D): boolean;
static readonly RESULT_NONE: number;
static readonly RESULT_SLOPE: number;
static readonly RESULT_WALL: number;
static readonly RESULT_COLLINEAR: number;
static readonly RESULT_COLLINEAR_VALID: number;
static readonly RESULT_ERROR: number;

}

}

export default altern.geom.IntersectSlopeUtil;