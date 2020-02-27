import jeash_geom_Vector3D from "../../jeash/geom/Vector3D";


declare namespace altern.ray {

interface IRaycastImpl {
intersectRay(origin: jeash_geom_Vector3D, direction: jeash_geom_Vector3D, output: jeash_geom_Vector3D): jeash_geom_Vector3D;

}

}

export default IRaycastImpl;