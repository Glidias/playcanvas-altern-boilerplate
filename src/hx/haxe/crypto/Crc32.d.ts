

declare namespace haxe.crypto {

export class Crc32 {

	constructor();
	crc:any;
	byte(b:any):any;
	update(b:any, pos:any, len:any):any;
	get():any;
	static make(data:any):any;


}

}

export default haxe.crypto.Crc32;