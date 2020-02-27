import de_polygonal_ds_tools_Shuffle from "./../../../../de/polygonal/ds/tools/Shuffle";

declare namespace de.polygonal.ds.tools {

export class ArrayTools {

	static alloc(len:any):any;
	static trim(a:any, len:any):any;
	static swap(array:any, a:any, b:any):any;
	static getFront(array:any, index:any):any;
	static init(a:any, val:any, first?:any, n?:any):any;
	static blit(src:any, srcPos:any, dst:any, dstPos:any, n:any):any;
	static iter(src:any, f:any, n?:any):any;
	static forEach(src:any, f:any):any;
	static binarySearchCmp(a:any, x:any, min:any, max:any, comparator:any):any;
	static binarySearchf(a:any, x:any, min:any, max:any):any;
	static binarySearchi(a:any, x:any, min:any, max:any):any;
	static shuffle(a:any, rvals?:any):any;
	static sortRange(a:any, cmp:any, useInsertionSort:any, first:any, n:any):any;
	static quickPerm(n:any):any;
	static equals(a:any, b:any):any;
	static split(a:any, n:any, k:any):any;
	static pairwise(input:any, visit:any):any;
	static bruteforce(input:any, visit:any):any;
	static _quickSort(a:any, first:any, n:any, cmp:any):any;


}

}

export default de.polygonal.ds.tools.ArrayTools;