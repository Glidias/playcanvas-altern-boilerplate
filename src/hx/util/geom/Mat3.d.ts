import util_geom_Mat3 from "../../util/geom/Mat3";
import util_geom_Vec3 from "../../util/geom/Vec3";
import util_geom_IMat3 from "./../../util/geom/IMat3";

declare namespace util.geom {

class Mat3 implements util_geom_IMat3 {
constructor(a: number, b?: number, c?: number, e?: number, f?: number, g?: number, i?: number, j?: number, k?: number);
a: number;
b: number;
c: number;
e: number;
f: number;
g: number;
i: number;
j: number;
k: number;
determinant(): number;
identity(): void;
clone(): util_geom_Mat3;
transformVector(vin: util_geom_Vec3, vout: util_geom_Vec3): void;
transformVectorTransposed(vin: util_geom_Vec3, vout: util_geom_Vec3): void;
transformVec3To3D(vin: util_geom_Vec3, vout: util_geom_Vec3): void;
invert(): void;
invert_with_determinant(det: number): void;
append(m: util_geom_Mat3): void;
prepend(m: util_geom_Mat3): void;
prependTransposed(m: util_geom_Mat3): void;
add(m: util_geom_Mat3): void;
subtract(m: util_geom_Mat3): void;
transpose(): void;
toSkewSymmetric(v: util_geom_Vec3): void;
copyFrom(m: util_geom_Mat3): void;
writeToEulerAngles(angles: util_geom_Vec3): void;
setRotation(rx: number, ry: number, rz: number): void;
setFromAxisAngle(axis: util_geom_Vec3, angle: number): void;
toString(): string;
static IDENTITY: util_geom_Mat3;
static ZERO: util_geom_Mat3;

}

}

export default util.geom.Mat3;