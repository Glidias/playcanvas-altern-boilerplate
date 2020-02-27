import jeash_geom_Matrix from "../../jeash/geom/Matrix";
import jeash_geom_Point from "./../../jeash/geom/Point";

declare namespace jeash.geom {

class Matrix {
constructor(in_a: number, in_b?: number, in_c?: number, in_d?: number, in_tx?: number, in_ty?: number);
a: number;
b: number;
c: number;
d: number;
tx: number;
ty: number;
copyFrom(src: jeash_geom_Matrix): void;
clone(): jeash_geom_Matrix;
concat(m: jeash_geom_Matrix): void;
createBox(scaleX: number, scaleY: number, rotation?: number, tx?: number, ty?: number): void;
createGradientBox(in_width: number, in_height: number, rotation?: number, in_tx?: number, in_ty?: number): void;
deltaTransformPoint(point: jeash_geom_Point): jeash_geom_Point;
identity(): void;
invert(): jeash_geom_Matrix;
mult(m: jeash_geom_Matrix): jeash_geom_Matrix;
rotate(inTheta: number): void;
scale(inSX: number, inSY: number): void;
setRotation(inTheta: number, inScale?: number): void;
setTo(a: number, b: number, c: number, d: number, tx: number, ty: number): void;
transformPoint(inPos: jeash_geom_Point): jeash_geom_Point;
translate(inDX: number, inDY: number): void;
toString(): string;

}

}

export default jeash.geom.Matrix;