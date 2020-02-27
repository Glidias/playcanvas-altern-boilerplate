import js__$Boot_HaxeError from "./../../js/_Boot/HaxeError";
import Std from "./../../Std";

declare namespace altern.terrain {

export class TerrainChunkStateList {

	constructor();
	head:any;
	tail:any;
	append(entity:any):any;
	appendList(entity:any, lastEntity:any):any;
	validate(msg:any):any;
	getAvailable():any;
	remove(entity:any):any;
	removeAll():any;


}

}

export default altern.terrain.TerrainChunkStateList;