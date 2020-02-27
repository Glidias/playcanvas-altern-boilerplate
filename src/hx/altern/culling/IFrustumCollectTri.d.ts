import altern_culling_CullingPlane from "../../altern/culling/CullingPlane";
import jeash_geom_Vector3D from "../../jeash/geom/Vector3D";


declare namespace altern.culling {

interface IFrustumCollectTri {
collectTrisForFrustum(frustum: altern_culling_CullingPlane, culling: number, frustumCorners: jeash_geom_Vector3D[], vertices: number[], indices: number[]): void;

}

}

export default IFrustumCollectTri;