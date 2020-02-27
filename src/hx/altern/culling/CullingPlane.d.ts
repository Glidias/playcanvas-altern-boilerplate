import altern_culling_CullingPlane from "../../altern/culling/CullingPlane";


declare namespace altern.culling {

class CullingPlane {
constructor();
x: number;
y: number;
z: number;
offset: number;
next: altern_culling_CullingPlane;
static collector: altern_culling_CullingPlane;
static create(): altern_culling_CullingPlane;

}

}

export default altern.culling.CullingPlane;