import components_BoundBox from "./../../../../components/BoundBox";

declare namespace altern.collisions.dbvt._AbstractAABB {

export class AbstractAABB_Impl_ {

	static minX:any;
	static get_minX(this:any):any;
	static minY:any;
	static get_minY(this:any):any;
	static minZ:any;
	static get_minZ(this:any):any;
	static maxX:any;
	static get_maxX(this:any):any;
	static maxY:any;
	static get_maxY(this:any):any;
	static maxZ:any;
	static get_maxZ(this:any):any;
	static _new(minX?:any, maxX?:any, minY?:any, maxY?:any, minZ?:any, maxZ?:any):any;
	static init(this:any, minX?:any, maxX?:any, minY?:any, maxY?:any, minZ?:any, maxZ?:any):any;
	static combine(this:any, aabb1:any, aabb2:any):any;
	static matchWith(this:any, aabb:any):any;
	static surfaceArea(this:any):any;
	static intersectsWithPoint(this:any, x:any, y:any, z:any):any;


}

}

export default altern.collisions.dbvt._AbstractAABB.AbstractAABB_Impl_;