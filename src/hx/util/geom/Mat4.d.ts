import util_geom_Mat4 from "../../util/geom/Mat4";
import util_geom_Vec3 from "../../util/geom/Vec3";
import util_geom_Mat3 from "../../util/geom/Mat3";
import util_geom_IMat4 from "./../../util/geom/IMat4";

declare namespace util.geom {

class Mat4 implements util_geom_IMat4 {
constructor(a: number, b?: number, c?: number, d?: number, e?: number, f?: number, g?: number, h?: number, i?: number, j?: number, k?: number, l?: number);
a: number;
b: number;
c: number;
d: number;
e: number;
f: number;
g: number;
h: number;
i: number;
j: number;
k: number;
l: number;
identity(): void;
determinant(): number;
invert(): void;
invert_with_determinant(det: number): void;
append(m: util_geom_Mat4): void;
prepend(m: util_geom_Mat4): void;
add(m: util_geom_Mat4): void;
subtract(m: util_geom_Mat4): void;
transformPoint(vin: util_geom_Vec3, vout: util_geom_Vec3): void;
transformPointTransposed(vin: util_geom_Vec3, vout: util_geom_Vec3): void;
transformPoints(arrin: util_geom_Vec3[], arrout: util_geom_Vec3[]): void;
transformPointsN(arrin: util_geom_Vec3[], arrout: util_geom_Vec3[], len: number): void;
transformPointsTransposed(arrin: util_geom_Vec3[], arrout: util_geom_Vec3[]): void;
transformPointsTransposedN(arrin: util_geom_Vec3[], arrout: util_geom_Vec3[], len: number): void;
getAxis(idx: number, axis: util_geom_Vec3): void;
setAxes(xAxis: util_geom_Vec3, yAxis: util_geom_Vec3, zAxis: util_geom_Vec3, pos: util_geom_Vec3): void;
transformVector(vin: util_geom_Vec3, vout: util_geom_Vec3): void;
transformVectorTransposed(vin: util_geom_Vec3, vout: util_geom_Vec3): void;
copy(m: util_geom_Mat4): void;
copy3(m: util_geom_Mat3): void;
getEulerAngles(angles: util_geom_Vec3): void;
setPosition(pos: util_geom_Vec3): void;
setPositionXYZ(x: number, y: number, z: number): void;
clone(): util_geom_Mat4;
toString(): string;
setRotation(rx: number, ry: number, rz: number): void;
setFromAxisAngle(axis: util_geom_Vec3, angle: number): void;
static IDENTITY: util_geom_Mat4;

}

}

export default util.geom.Mat4;