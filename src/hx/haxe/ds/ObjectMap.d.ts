import haxe_IMap from "./../../haxe/IMap";
import HxOverrides from "./../../HxOverrides";
import Std from "./../../Std";

declare namespace haxe.ds {

export class ObjectMap {

	constructor();
	
	set(key:any, value:any):any;
	get(key:any):any;
	exists(key:any):any;
	remove(key:any):any;
	keys():any;
	iterator():any;
	toString():any;
	static count:any;
	static assignId(obj:any):any;
	static getId(obj:any):any;


}

}

export default haxe.ds.ObjectMap;