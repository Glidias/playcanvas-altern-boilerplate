
import util_geom_IAABB from "./../util/geom/IAABB";

declare namespace components {

class BoundBox implements util_geom_IAABB {
constructor();
minX: number;
minY: number;
minZ: number;
maxX: number;
maxY: number;
maxZ: number;

}

}

export default components.BoundBox;