
import util_geom_Vec3 from "./../util/geom/Vec3";

declare namespace components {

class CollisionResult {
constructor();
max_ground_normal_threshold: number;
flags: number;
gotCollision: boolean;
maximum_normal_impulse: number;
maximum_ground_normal: util_geom_Vec3;
get_gotGroundNormal(): boolean;
set_gotGroundNormal(value: boolean): boolean;
static readonly MAX_GROUND_NORMAL_THRESHOLD: number;
static readonly FLAG_MAX_NORMAL_IMPULSE: number;
static readonly FLAG_MAX_GROUND_NORMAL: number;

}

}

export default components.CollisionResult;