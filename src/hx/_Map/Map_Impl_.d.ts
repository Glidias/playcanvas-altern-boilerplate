import haxe_ds_StringMap from "./../haxe/ds/StringMap";
import haxe_ds_IntMap from "./../haxe/ds/IntMap";
import haxe_ds_EnumValueMap from "./../haxe/ds/EnumValueMap";
import haxe_ds_ObjectMap from "./../haxe/ds/ObjectMap";

declare namespace _Map {

export class Map_Impl_ {

	static set(this:any, key:any, value:any):any;
	static get(this:any, key:any):any;
	static exists(this:any, key:any):any;
	static remove(this:any, key:any):any;
	static keys(this:any):any;
	static iterator(this:any):any;
	static toString(this:any):any;
	static arrayWrite(this:any, k:any, v:any):any;
	static toStringMap(t:any):any;
	static toIntMap(t:any):any;
	static toEnumValueMapMap(t:any):any;
	static toObjectMap(t:any):any;
	static fromStringMap(map:any):any;
	static fromIntMap(map:any):any;
	static fromObjectMap(map:any):any;


}

}

export default _Map.Map_Impl_;