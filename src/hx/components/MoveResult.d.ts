import components_Ellipsoid from "../components/Ellipsoid";
import components_Pos from "../components/Pos";
import util_geom_Vec3 from "./../util/geom/Vec3";
import systems_collisions_CollisionEvent from "./../systems/collisions/CollisionEvent";

declare namespace components {

class MoveResult extends util_geom_Vec3 {
constructor();
collisions: systems_collisions_CollisionEvent;
preventDefault: boolean;
init(): void;
disposeCollisions(): void;
setIntegrationNewVelAtCollideTime(resultPos: util_geom_Vec3, resultVel: util_geom_Vec3, ellip: components_Ellipsoid, t: number): void;
initIntegration(startPos: components_Pos, resultPos: util_geom_Vec3, resultVel: util_geom_Vec3, ellip: components_Ellipsoid): void;
findNearestCollisionEvent(fromTime: number): systems_collisions_CollisionEvent;
truncateCollisionEvents(afterTime: number): void;
addCollisionEvent(e: systems_collisions_CollisionEvent): void;

}

}

export default components.MoveResult;