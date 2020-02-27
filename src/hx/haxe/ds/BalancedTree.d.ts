import js__$Boot_HaxeError from "./../../js/_Boot/HaxeError";
import js_Boot from "./../../js/Boot";
import HxOverrides from "./../../HxOverrides";
import haxe_ds_TreeNode from "./../../haxe/ds/TreeNode";
import Reflect from "./../../Reflect";

declare namespace haxe.ds {

export class BalancedTree {

	constructor();
	root:any;
	set(key:any, value:any):any;
	get(key:any):any;
	remove(key:any):any;
	exists(key:any):any;
	iterator():any;
	keys():any;
	setLoop(k:any, v:any, node:any):any;
	removeLoop(k:any, node:any):any;
	iteratorLoop(node:any, acc:any):any;
	keysLoop(node:any, acc:any):any;
	merge(t1:any, t2:any):any;
	minBinding(t:any):any;
	removeMinBinding(t:any):any;
	balance(l:any, k:any, v:any, r:any):any;
	compare(k1:any, k2:any):any;
	toString():any;


}

}

export default haxe.ds.BalancedTree;