import altern_geom_Wrapper from "../../altern/geom/Wrapper";
import altern_geom_Vertex from "../../altern/geom/Vertex";


declare namespace altern.geom {

class Wrapper {
constructor();
next: altern_geom_Wrapper;
vertex: altern_geom_Vertex;
static collector: altern_geom_Wrapper;
static create(): altern_geom_Wrapper;

}

}

export default altern.geom.Wrapper;