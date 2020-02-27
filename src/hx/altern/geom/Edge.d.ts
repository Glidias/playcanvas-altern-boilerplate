import altern_geom_Edge from "../../altern/geom/Edge";
import altern_geom_Vertex from "../../altern/geom/Vertex";
import altern_geom_Face from "../../altern/geom/Face";


declare namespace altern.geom {

class Edge {
constructor();
next: altern_geom_Edge;
a: altern_geom_Vertex;
b: altern_geom_Vertex;
left: altern_geom_Face;
right: altern_geom_Face;

}

}

export default altern.geom.Edge;