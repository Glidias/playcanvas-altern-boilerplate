import util_geom_Vec3 from "../../util/geom/Vec3";


declare namespace components.controller {

class SurfaceMovement {
constructor();
WALK_SPEED: number;
WALKBACK_SPEED: number;
STRAFE_SPEED: number;
walk_state: number;
strafe_state: number;
friction: number;
resetAllStates(): void;
setWalkSpeeds(forwardSpeed: number, backspeed?: number): void;
setStrafeSpeed(val: number): void;
setAllSpeeds(val: number): void;
respond_move_forward(): void;
respond_move_back(): void;
respond_move_stop(): void;
respond_strafe_left(): void;
respond_strafe_right(): void;
respond_strafe_stop(): void;
static readonly WALK_FORWARD: number;
static readonly WALK_STOP: number;
static readonly WALK_BACK: number;
static readonly STRAFE_LEFT: number;
static readonly STRAFE_STOP: number;
static readonly STRAFE_RIGHT: number;
static readonly STOP_VELOCITY_SQ_LENGTH: number;
static updateWith(time: number, rotation: util_geom_Vec3, velocity: util_geom_Vec3, walkState: number, strafeState: number, forwardVec: util_geom_Vec3, rightVec: util_geom_Vec3, WALK_SPEED: number, WALKBACK_SPEED: number, STRAFE_SPEED: number, friction?: number, ground_normal?: util_geom_Vec3): void;

}

}

export default components.controller.SurfaceMovement;