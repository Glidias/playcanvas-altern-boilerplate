import altern_geom_Vertex from "../../altern/geom/Vertex";


declare namespace altern.geom {

class Vertex {
constructor();
next: altern_geom_Vertex;
value: altern_geom_Vertex;
x: number;
y: number;
z: number;
offset: number;
temp: boolean;
cameraX: number;
cameraY: number;
cameraZ: number;
transformId: number;
static collector: altern_geom_Vertex;
static create(): altern_geom_Vertex;

}

}

export default altern.geom.Vertex;