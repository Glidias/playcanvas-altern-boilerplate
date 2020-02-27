import components_Transform3D from "../../components/Transform3D";
import jeash_geom_Vector3D from "../../jeash/geom/Vector3D";


declare namespace util.geom {

class GeomUtil {
protected constructor();
static transformVertices(vertices: number[], t: components_Transform3D, len?: number): void;
static boundIntersectSphere(sphere: jeash_geom_Vector3D, minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number): boolean;
static boundIntersectRay(origin: jeash_geom_Vector3D, direction: jeash_geom_Vector3D, minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number, result: jeash_geom_Vector3D): boolean;
static intersectRayTri(result: jeash_geom_Vector3D, ox: number, oy: number, oz: number, dx: number, dy: number, dz: number, ax: number, ay: number, az: number, bx: number, by: number, bz: number, cx: number, cy: number, cz: number): boolean;

}

}

export default util.geom.GeomUtil;