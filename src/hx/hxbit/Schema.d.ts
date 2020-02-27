import hxbit_Serializable from "./../hxbit/Serializable";
import hxbit_Serializer from "./../hxbit/Serializer";
import haxe_crypto_Crc32 from "./../haxe/crypto/Crc32";
import haxe_io_Bytes from "./../haxe/io/Bytes";
import hxbit_enumSer_hxbit_$PropTypeDesc from "./../hxbit/enumSer/hxbit_PropTypeDesc";
import hxbit_PropTypeDesc from "./../hxbit/PropTypeDesc";

declare namespace hxbit {

export class Schema {

	constructor();
	checkSum:any;
	isFinal:any;
	fieldsNames:any;
	fieldsTypes:any;
	get_checkSum():any;
	__uid:any;
	getCLID():any;
	serialize(__ctx:any):any;
	getSerializeSchema():any;
	unserializeInit():any;
	unserialize(__ctx:any):any;
	static __clid:any;


}

}

export default hxbit.Schema;