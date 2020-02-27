import haxe_IMap from "./../../haxe/IMap";
import HxOverrides from "./../../HxOverrides";
import Std from "./../../Std";

declare namespace haxe.ds {

export class IntMap {

	constructor();
	
	set(key:any, value:any):any;
	get(key:any):any;
	exists(key:any):any;
	remove(key:any):any;
	keys():any;
	iterator():any;
	toString():any;


}

}

export default haxe.ds.IntMap;