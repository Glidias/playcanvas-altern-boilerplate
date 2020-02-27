import util_geom_Geometry from "../../util/geom/Geometry";
import util_geom_Vec3 from "../../util/geom/Vec3";
import js__$Boot_HaxeError from "./../../js/_Boot/HaxeError";
import altern_geom_Vertex from "./../../altern/geom/Vertex";
import altern_geom_Face from "./../../altern/geom/Face";
import altern_geom_Wrapper from "./../../altern/geom/Wrapper";
import haxe_ds_ObjectMap from "./../../haxe/ds/ObjectMap";
import altern_geom_Edge from "./../../altern/geom/Edge";
import altern_culling_CullingPlane from "./../../altern/culling/CullingPlane";

declare namespace altern.geom {

class AMesh {
constructor();
createForm(geometry: util_geom_Geometry, options: number, distanceThreshold?: number, angleThreshold?: number, convexThreshold?: number): void;
checkConvex(): boolean;
createEdges(options: number): void;
destroyForm(): void;
calculatePlanes(position: util_geom_Vec3): void;
static readonly OPTION_CONVEX: number;
static readonly OPTION_CALCULATE_EDGES: number;
static readonly OPTION_WELD_VERTICES: number;
static readonly OPTION_WELD_FACES: number;
static readonly USE_OPTION_OCCLUDER_LEAST_0: number;
static readonly USE_OPTION_OCCLUDER_LEAST_1: number;
static readonly USE_OPTION_OCCLUDER: number;

}

}

export default altern.geom.AMesh;