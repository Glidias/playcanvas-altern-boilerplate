
import util_geom_Vec3 from "./../util/geom/Vec3";

declare namespace components {

class Ellipsoid extends util_geom_Vec3 {
constructor(x: number, y?: number, z?: number);

}

}

export default components.Ellipsoid;