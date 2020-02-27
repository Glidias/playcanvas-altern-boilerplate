import systems_collisions_CollisionEvent from "../../systems/collisions/CollisionEvent";
import jeash_geom_Vector3D from "../../jeash/geom/Vector3D";
import util_geom_Vec3 from "./../../util/geom/Vec3";

declare namespace systems.collisions {

class CollisionEvent {
constructor();
pos: util_geom_Vec3;
offset: number;
normal: util_geom_Vec3;
t: number;
geomtype: number;
dest: util_geom_Vec3;
next: systems_collisions_CollisionEvent;
getNumEvents(): number;
write(pos: util_geom_Vec3, normal: util_geom_Vec3, offset: number, t: number, dest: util_geom_Vec3, geomtype: number): void;
calcFallbackPosition(radiusX: number, radiusY: number, radiusZ: number, resultPosition: util_geom_Vec3): void;
dispose(): void;
static readonly GEOMTYPE_POINT: number;
static readonly GEOMTYPE_EDGE: number;
static readonly GEOMTYPE_POLYGON: number;
static readonly GEOMTYPE_THING: number;
static readonly TOLERANCE_POLYGON_OVERLAP: number;
static readonly TOLERANCE_BACKWARDS_T: number;
static readonly TOLERANCE_TRANSVERSE_DISPLACEMENT: number;
static readonly TOLERANCE_QUADRATIC_DISCRIMINANT: number;
static COLLECTOR: systems_collisions_CollisionEvent;
static Get(collision: util_geom_Vec3, normal: util_geom_Vec3, offset: number, t: number, dest: util_geom_Vec3, geomtype: number): systems_collisions_CollisionEvent;
static GetAs3(pos: jeash_geom_Vector3D, normal: jeash_geom_Vector3D, offset: number, t: number, dest: jeash_geom_Vector3D, geomtype: number): systems_collisions_CollisionEvent;
static get(pos: util_geom_Vec3, normal: util_geom_Vec3, offset: number, t: number, dest: util_geom_Vec3, geomtype: number): systems_collisions_CollisionEvent;
static getGeomTypeString(type: number): string;

}

}

export default systems.collisions.CollisionEvent;