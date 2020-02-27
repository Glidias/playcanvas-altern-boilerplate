import js__$Boot_HaxeError from "./../../js/_Boot/HaxeError";
import altern_terrain_QuadSquare from "./../../altern/terrain/QuadSquare";

declare namespace altern.terrain {

export class QuadCornerData {

	constructor();
	Parent:any;
	Square:any;
	ChildIndex:any;
	Level:any;
	xorg:any;
	zorg:any;
	
	clone():any;
	dispose():any;
	
	static BI:any;
	static BLEN:any;
	static create():any;
	static setFixedBufferSize(size:any):any;
	static fillBuffer():any;
	static createRoot(x:any, y:any, size:any):any;
	static clearBuffer():any;
	static isBase2(val:any):any;


}

}

export default altern.terrain.QuadCornerData;