import haxe_io_Bytes from "./../../haxe/io/Bytes";
import haxe_io_FPHelper from "./../../haxe/io/FPHelper";
import js__$Boot_HaxeError from "./../../js/_Boot/HaxeError";
import haxe_io_Error from "./../../haxe/io/Error";

declare namespace haxe.io {

export class BytesBuffer {

	constructor();
	b:any;
	length:any;
	get_length():any;
	addByte(byte:any):any;
	add(src:any):any;
	addString(v:any):any;
	addInt32(v:any):any;
	addInt64(v:any):any;
	addFloat(v:any):any;
	addDouble(v:any):any;
	addBytes(src:any, pos:any, len:any):any;
	getBytes():any;


}

}

export default haxe.io.BytesBuffer;