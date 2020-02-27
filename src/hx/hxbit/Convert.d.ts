import Std from "./../Std";
import Type from "./../Type";
import haxe_ds_IntMap from "./../haxe/ds/IntMap";
import haxe_ds_StringMap from "./../haxe/ds/StringMap";
import haxe_ds_ObjectMap from "./../haxe/ds/ObjectMap";
import haxe__$Int64__$_$_$Int64 from "./../haxe/_Int64/___Int64";
import js__$Boot_HaxeError from "./../js/_Boot/HaxeError";
import hxbit_ConvertField from "./../hxbit/ConvertField";

declare namespace hxbit {

export class Convert {

	constructor(ourSchema:any, schema:any);
	read:any;
	write:any;
	toString():any;
	static sameType(a:any, b:any):any;
	static getDefault(t:any):any;


}

}

export default hxbit.Convert;