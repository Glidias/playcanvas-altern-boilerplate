import HxOverrides from "./HxOverrides";
import EReg from "./EReg";
import StringBuf from "./StringBuf";
import Std from "./Std";



export class StringTools {

	static urlEncode(s:any):any;
	static urlDecode(s:any):any;
	static htmlEscape(s:any, quotes?:any):any;
	static htmlUnescape(s:any):any;
	static startsWith(s:any, start:any):any;
	static endsWith(s:any, end:any):any;
	static isSpace(s:any, pos:any):any;
	static ltrim(s:any):any;
	static rtrim(s:any):any;
	static trim(s:any):any;
	static lpad(s:any, c:any, l:any):any;
	static rpad(s:any, c:any, l:any):any;
	static replace(s:any, sub:any, by:any):any;
	static hex(n:any, digits?:any):any;
	static fastCodeAt(s:any, index:any):any;
	static isEof(c:any):any;
	static quoteUnixArg(argument:any):any;
	static winMetaCharacters:any;
	static quoteWinArg(argument:any, escapeMetaCharacters:any):any;


}

export default StringTools;