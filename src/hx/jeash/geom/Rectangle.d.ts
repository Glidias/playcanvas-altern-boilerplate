import jeash_geom_Rectangle from "../../jeash/geom/Rectangle";
import jeash_geom_Matrix from "../../jeash/geom/Matrix";
import jeash_geom_Point from "./../../jeash/geom/Point";

declare namespace jeash.geom {

class Rectangle {
constructor(inX: number, inY?: number, inWidth?: number, inHeight?: number);
x: number;
y: number;
width: number;
height: number;
get_left(): number;
set_left(l: number): number;
get_right(): number;
set_right(r: number): number;
get_top(): number;
set_top(t: number): number;
get_bottom(): number;
set_bottom(b: number): number;
get_topLeft(): jeash_geom_Point;
set_topLeft(p: jeash_geom_Point): jeash_geom_Point;
get_size(): jeash_geom_Point;
set_size(p: jeash_geom_Point): jeash_geom_Point;
get_bottomRight(): jeash_geom_Point;
set_bottomRight(p: jeash_geom_Point): jeash_geom_Point;
clone(): jeash_geom_Rectangle;
contains(inX: number, inY: number): boolean;
containsPoint(point: jeash_geom_Point): boolean;
containsRect(rect: jeash_geom_Rectangle): boolean;
equals(toCompare: jeash_geom_Rectangle): boolean;
inflate(dx: number, dy: number): void;
inflatePoint(point: jeash_geom_Point): void;
intersection(toIntersect: jeash_geom_Rectangle): jeash_geom_Rectangle;
intersects(toIntersect: jeash_geom_Rectangle): boolean;
union(toUnion: jeash_geom_Rectangle): jeash_geom_Rectangle;
isEmpty(): boolean;
offset(dx: number, dy: number): void;
offsetPoint(point: jeash_geom_Point): void;
setEmpty(): void;
transform(m: jeash_geom_Matrix): jeash_geom_Rectangle;
extendBounds(r: jeash_geom_Rectangle): void;

}

}

export default jeash.geom.Rectangle;