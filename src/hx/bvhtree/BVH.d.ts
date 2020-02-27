export default class BVH {
	constructor (triangles:{x: number,y: number,z: number}[][], maxTrianglesPerNode?: number);
	_rootNode:BVHNode;
	_trianglesArray:Float32Array;
	_bboxArray:number[];	// it's mixed index and floats... should be Float32Array
	intersectRay(rayOrigin:{x:number, y:number, z:number}, rayDirection:{x:number, y:number, z:number}, backfaceCulling:boolean):IntersectionResult[];
}

export type IntersectionResult = {
	triangle:BVHVector3[];
	triangleIndex:number;
	intersectionPoint:{x:number, y:number, z:number};
}

export class BVHVector3 {
	constructor(x?:number, y?:number, z?:number);
	x: number;
	y: number;
	z: number;
	//note: not complete
	//function copy(v:BVHVector3):BVHVector3;
	//function set(x:Float, y:Float, z:Float):BVHVector3;
}


export class BVHNode {

	_extentsMin:{x:number, y:number, z:number};
	_extentsMax:{x:number, y:number, z:number};
	_startIndex:number;
    _endIndex:number;
    _level:number;
	_node0:BVHNode;
	_node1:BVHNode;
	}