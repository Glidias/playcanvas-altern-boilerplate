import Std from "./../../../Std";

declare namespace haxe.ds._Vector {

export class Vector_Impl_ {

	static _new(length:any):any;
	static get(this:any, index:any):any;
	static set(this:any, index:any, val:any):any;
	static length:any;
	static get_length(this:any):any;
	static blit(src:any, srcPos:any, dest:any, destPos:any, len:any):any;
	static toArray(this:any):any;
	static toData(this:any):any;
	static fromData(data:any):any;
	static fromArrayCopy(array:any):any;
	static copy(this:any):any;
	static join(this:any, sep:any):any;
	static map(this:any, f:any):any;
	static sort(this:any, f:any):any;


}

}

export default haxe.ds._Vector.Vector_Impl_;