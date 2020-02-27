
import util_geom_Vec3 from "./../util/geom/Vec3";

declare namespace components {

class Pos extends util_geom_Vec3 {
constructor(x: number, y?: number, z?: number);

}

}

export default components.Pos;