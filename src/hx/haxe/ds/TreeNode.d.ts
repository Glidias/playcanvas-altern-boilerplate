import Std from "./../../Std";

declare namespace haxe.ds {

export class TreeNode {

	constructor(l:any, k:any, v:any, r:any, h?:any);
	left:any;
	right:any;
	key:any;
	value:any;
	_height:any;
	toString():any;


}

}

export default haxe.ds.TreeNode;