

declare namespace de.polygonal.ds.tools {

export class NativeArrayTools {

	static alloc(len:any):any;
	static get(src:any, index:any):any;
	static set(dst:any, index:any, val:any):any;
	static size(a:any):any;
	static toArray(src:any, first:any, len:any, dst:any):any;
	static ofArray(src:any):any;
	static blit(src:any, srcPos:any, dst:any, dstPos:any, n:any):any;
	static copy(src:any):any;
	static zero(dst:any, first?:any, n?:any):any;
	static init(a:any, val:any, first?:any, n?:any):any;
	static nullify(a:any, first?:any, n?:any):any;
	static binarySearchCmp(a:any, val:any, min:any, max:any, cmp:any):any;
	static binarySearchf(a:any, val:any, min:any, max:any):any;
	static binarySearchi(a:any, val:any, min:any, max:any):any;


}

}

export default de.polygonal.ds.tools.NativeArrayTools;