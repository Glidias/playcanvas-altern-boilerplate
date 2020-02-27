import List from "./List";



export class Lambda {

	static array(it:any):any;
	static list(it:any):any;
	static map(it:any, f:any):any;
	static mapi(it:any, f:any):any;
	static flatten(it:any):any;
	static flatMap(it:any, f:any):any;
	static has(it:any, elt:any):any;
	static exists(it:any, f:any):any;
	static foreach(it:any, f:any):any;
	static iter(it:any, f:any):any;
	static filter(it:any, f:any):any;
	static fold(it:any, f:any, first:any):any;
	static count(it:any, pred?:any):any;
	static empty(it:any):any;
	static indexOf(it:any, v:any):any;
	static find(it:any, f:any):any;
	static concat(a:any, b:any):any;


}

export default Lambda;