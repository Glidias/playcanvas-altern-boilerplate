import util_geom_Vec3 from "../util/geom/Vec3";


declare namespace components {

class Jump {
constructor(timeCooldown: number, jumpSpeed: number);
JUMP_COOLDOWN: number;
enabled: boolean;
update(time: number): void;
attemptJump(velocity: util_geom_Vec3, time: number): boolean;
attemptJumpY(velocity: util_geom_Vec3, time: number): boolean;
static readonly EPSILON: number;

}

}

export default components.Jump;