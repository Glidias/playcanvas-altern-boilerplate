import haxe_IMap from "./../../haxe/IMap";
import HxOverrides from "./../../HxOverrides";
import haxe_ds__$StringMap_StringMapIterator from "./../../haxe/ds/_StringMap/StringMapIterator";
import Std from "./../../Std";

declare namespace haxe.ds {

export class StringMap {

	constructor();
	
	
	isReserved(key:any):any;
	set(key:any, value:any):any;
	get(key:any):any;
	exists(key:any):any;
	setReserved(key:any, value:any):any;
	getReserved(key:any):any;
	existsReserved(key:any):any;
	remove(key:any):any;
	keys():any;
	arrayKeys():any;
	iterator():any;
	toString():any;


}

}

export default haxe.ds.StringMap;