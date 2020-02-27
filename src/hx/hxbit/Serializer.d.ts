import haxe_ds_ObjectMap from "./../haxe/ds/ObjectMap";
import haxe_io_BytesBuffer from "./../haxe/io/BytesBuffer";
import haxe_ds_IntMap from "./../haxe/ds/IntMap";
import haxe_io_FPHelper from "./../haxe/io/FPHelper";
import Lambda from "./../Lambda";
import haxe_io_Bytes from "./../haxe/io/Bytes";
import js__$Boot_HaxeError from "./../js/_Boot/HaxeError";
import haxe_io_Error from "./../haxe/io/Error";
import Type from "./../Type";
import Reflect from "./../Reflect";
import Std from "./../Std";
import js_Boot from "./../js/Boot";
import hxbit_Serializable from "./../hxbit/Serializable";
import hxbit_Schema from "./../hxbit/Schema";
import haxe_ds_StringMap from "./../haxe/ds/StringMap";
import hxbit_Convert from "./../hxbit/Convert";
import haxe_rtti_Meta from "./../haxe/rtti/Meta";
import haxe_ds_EnumValueMap from "./../haxe/ds/EnumValueMap";

declare namespace hxbit {

export class Serializer {

	constructor();
	refs:any;
	remapIds:any;
	remapObjs:any;
	newObjects:any;
	out:any;
	input:any;
	inPos:any;
	usedClasses:any;
	convert:any;
	mapIndexes:any;
	knownStructs:any;
	set_remapIds(b:any):any;
	get_remapIds():any;
	remap(s:any):any;
	begin():any;
	end():any;
	setInput(data:any, pos:any):any;
	serialize(s:any):any;
	unserialize(data:any, c:any, startPos?:any):any;
	getByte():any;
	addByte(v:any):any;
	addInt(v:any):any;
	addInt32(v:any):any;
	addInt64(v:any):any;
	addFloat(v:any):any;
	addDouble(v:any):any;
	addBool(v:any):any;
	addArray(a:any, f:any):any;
	addVector(a:any, f:any):any;
	getArray(f:any):any;
	getVector(f:any):any;
	addMap(a:any, fk:any, ft:any):any;
	getBool():any;
	getInt():any;
	skip(size:any):any;
	getInt32():any;
	getInt64():any;
	getDouble():any;
	getFloat():any;
	addString(s:any):any;
	addBytes(b:any):any;
	addBytesSub(b:any, pos:any, len:any):any;
	getString():any;
	getBytes():any;
	getDynamic():any;
	addDynamic(v:any):any;
	addCLID(clid:any):any;
	getCLID():any;
	addStruct(s:any):any;
	getStruct():any;
	addObjRef(s:any):any;
	getObjRef():any;
	addAnyRef(s:any):any;
	addKnownRef(s:any):any;
	getAnyRef():any;
	getRef(c:any, clidx:any):any;
	getKnownRef(c:any):any;
	beginSave():any;
	endSave(savePosition?:any):any;
	beginLoad(bytes:any, position?:any):any;
	endLoad():any;
	convertRef(i:any, c:any):any;
	isNullable(t:any):any;
	convertValue(v:any, from:any, to:any):any;
	readValue(t:any):any;
	writeValue(v:any, t:any):any;
	static UID:any;
	static SEQ:any;
	static SEQ_BITS:any;
	static SEQ_MASK:any;
	static resetCounters():any;
	static allocUID():any;
	static CLASSES:any;
	static CL_BYID:any;
	static CLIDS:any;
	static registerClass(c:any):any;
	static hash(name:any):any;
	static initClassIDS():any;
	static isClassFinal(index:any):any;


}

}

export default hxbit.Serializer;