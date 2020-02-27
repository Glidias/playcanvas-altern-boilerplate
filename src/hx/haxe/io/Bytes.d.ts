import haxe_io_Bytes from "../../haxe/io/Bytes";
import haxe__Int64____Int64 from "../../haxe//Int64////Int64";
import js__$Boot_HaxeError from "./../../js/_Boot/HaxeError";
import haxe_io_Error from "./../../haxe/io/Error";
import haxe__$Int64__$_$_$Int64 from "./../../haxe/_Int64/___Int64";
import HxOverrides from "./../../HxOverrides";

declare namespace haxe.io {

class Bytes {
protected constructor(data: ArrayBuffer);
readonly length: number;
get(pos: number): number;
set(pos: number, v: number): void;
blit(pos: number, src: haxe_io_Bytes, srcpos: number, len: number): void;
fill(pos: number, len: number, value: number): void;
sub(pos: number, len: number): haxe_io_Bytes;
compare(other: haxe_io_Bytes): number;
getDouble(pos: number): number;
getFloat(pos: number): number;
setDouble(pos: number, v: number): void;
setFloat(pos: number, v: number): void;
getUInt16(pos: number): number;
setUInt16(pos: number, v: number): void;
getInt32(pos: number): number;
setInt32(pos: number, v: number): void;
getInt64(pos: number): haxe__Int64____Int64;
setInt64(pos: number, v: haxe__Int64____Int64): void;
getString(pos: number, len: number): string;
readString(pos: number, len: number): string;
toString(): string;
toHex(): string;
getData(): ArrayBuffer;
static alloc(length: number): haxe_io_Bytes;
static ofString(s: string): haxe_io_Bytes;
static ofData(b: ArrayBuffer): haxe_io_Bytes;
static fastGet(b: ArrayBuffer, pos: number): number;

}

}

export default haxe.io.Bytes;