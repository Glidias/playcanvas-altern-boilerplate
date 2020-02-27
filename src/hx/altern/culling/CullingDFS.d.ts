import altern_collisions_CollisionBoundNode from "../../altern/collisions/CollisionBoundNode";
import components_Transform3D from "../../components/Transform3D";
import components_BoundBox from "./../../components/BoundBox";

declare namespace altern.culling {

class CullingDFS {
constructor();
initialCulling: number;
checkBoundBox: (arg0: components_BoundBox, arg1: number, arg2: altern_collisions_CollisionBoundNode) => number;
checkChild: (arg0: altern_collisions_CollisionBoundNode, arg1: number) => boolean;
processWorldToLocal: (arg0: components_Transform3D, arg1: altern_collisions_CollisionBoundNode) => void;
processLocalToWorld: (arg0: components_Transform3D, arg1: altern_collisions_CollisionBoundNode) => void;
processChild: (arg0: altern_collisions_CollisionBoundNode, arg1: number) => boolean;
purge(): void;
start(): boolean;

}

}

export default altern.culling.CullingDFS;