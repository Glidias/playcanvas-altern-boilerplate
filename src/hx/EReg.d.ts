import js__$Boot_HaxeError from "./js/_Boot/HaxeError";
import HxOverrides from "./HxOverrides";
import Std from "./Std";



export class EReg {

	constructor(r:any, opt:any);
	r:any;
	match(s:any):any;
	matched(n:any):any;
	matchedLeft():any;
	matchedRight():any;
	matchedPos():any;
	matchSub(s:any, pos:any, len?:any):any;
	split(s:any):any;
	replace(s:any, by:any):any;
	map(s:any, f:any):any;


}

export default EReg;