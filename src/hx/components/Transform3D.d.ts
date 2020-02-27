import components_Transform3D from "../components/Transform3D";


declare namespace components {

class Transform3D {
constructor();
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
compose(x: number, y: number, z: number, rotationX: number, rotationY: number, rotationZ: number, scaleX: number, scaleY: number, scaleZ: number): void;
invert(): void;
initFromVector(vector: number[]): void;
append(transform: components_Transform3D): void;
prepend(transform: components_Transform3D): void;
combine(transformA: components_Transform3D, transformB: components_Transform3D): void;
calculateInversion(source: components_Transform3D): void;
copy(source: components_Transform3D): void;

}

}

export default components.Transform3D;