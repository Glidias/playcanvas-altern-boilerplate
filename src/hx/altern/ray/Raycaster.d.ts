import altern_ray_IRaycastImpl from "../../altern/ray/IRaycastImpl";
import altern_ray_Raycaster from "../../altern/ray/Raycaster";
import jeash_geom_Vector3D from "./../../jeash/geom/Vector3D";

declare namespace altern.ray {

class Raycaster {
constructor(source: altern_ray_IRaycastImpl);
source: altern_ray_IRaycastImpl;
setTarget(source: altern_ray_IRaycastImpl): altern_ray_Raycaster;
position(x: number, y: number, z: number): altern_ray_Raycaster;
direction(x: number, y: number, z: number): altern_ray_Raycaster;
positionAndDirection(x: number, y: number, z: number, dx: number, dy: number, dz: number): altern_ray_Raycaster;
setIgnoreDistance(dist: number): void;
gotHit(): jeash_geom_Vector3D;

}

}

export default altern.ray.Raycaster;