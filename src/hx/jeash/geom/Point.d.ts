import jeash_geom_Point from "../../jeash/geom/Point";


declare namespace jeash.geom {

class Point {
constructor(inX: number, inY?: number);
x: number;
y: number;
add(v: jeash_geom_Point): jeash_geom_Point;
clone(): jeash_geom_Point;
equals(toCompare: jeash_geom_Point): boolean;
get_length(): number;
normalize(thickness: number): void;
offset(dx: number, dy: number): void;
subtract(v: jeash_geom_Point): jeash_geom_Point;
static distance(pt1: jeash_geom_Point, pt2: jeash_geom_Point): number;
static interpolate(pt1: jeash_geom_Point, pt2: jeash_geom_Point, f: number): jeash_geom_Point;
static polar(len: number, angle: number): jeash_geom_Point;

}

}

export default jeash.geom.Point;