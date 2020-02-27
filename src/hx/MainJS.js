// Class: MainJS

var $global = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this

$global.Object.defineProperty(exports, "__esModule", {value: true});

var __map_reserved = {};

// Imports

var $hxClasses = require("./hxClasses_stub").default;
var $import = require("./import_stub").default;
function altern_culling_CullingPlane() {return require("./altern/culling/CullingPlane");}
function altern_terrain_GeometryResult() {return require("./altern/terrain/GeometryResult");}
function altern_terrain_QuadCornerData() {return require("./altern/terrain/QuadCornerData");}
function altern_terrain_TerrainGeomTools() {return require("./altern/terrain/TerrainGeomTools");}
function altern_terrain_TerrainLOD() {return require("./altern/terrain/TerrainLOD");}
function altern_terrain_HeightMapInfo() {return require("./altern/terrain/HeightMapInfo");}
function altern_terrain_TerrainChunkStateList() {return require("./altern/terrain/TerrainChunkStateList");}
function altern_terrain_TerrainChunkState() {return require("./altern/terrain/TerrainChunkState");}
function altern_terrain_QuadChunkCornerData() {return require("./altern/terrain/QuadChunkCornerData");}
function altern_terrain_QuadSquareChunk() {return require("./altern/terrain/QuadSquareChunk");}
function altern_terrain_QuadTreePage() {return require("./altern/terrain/QuadTreePage");}
function altern_geom_IntersectSlopeUtil() {return require("./altern/geom/IntersectSlopeUtil");}
function altern_partition_js_BVHTree() {return require("./altern/partition/js/BVHTree");}
function altern_culling_CullingDFS() {return require("./altern/culling/CullingDFS");}
function altern_culling_DefaultCulling() {return require("./altern/culling/DefaultCulling");}
function util_geom_GeomCollisionSceneUtil() {return require("./util/geom/GeomCollisionSceneUtil");}
function util_geom_GeomUtil() {return require("./util/geom/GeomUtil");}
function altern_ray_Raycaster() {return require("./altern/ray/Raycaster");}
function altern_collisions_dbvt_DBVTProxy() {return require("./altern/collisions/dbvt/DBVTProxy");}
function altern_collisions_dbvt_DBVTNode() {return require("./altern/collisions/dbvt/DBVTNode");}
function altern_collisions_dbvt_DBVT() {return require("./altern/collisions/dbvt/DBVT");}
function altern_ray_IRaycastImpl() {return require("./altern/ray/IRaycastImpl");}
function systems_collisions_ITCollidable() {return require("./systems/collisions/ITCollidable");}
function util_geom_Geometry() {return require("./util/geom/Geometry");}
function components_BoundBox() {return require("./components/BoundBox");}
function components_Transform3D() {return require("./components/Transform3D");}
function util_geom_AABBUtils() {return require("./util/geom/AABBUtils");}
function altern_collisions_CollisionBoundNode() {return require("./altern/collisions/CollisionBoundNode");}
function util_geom_Vec3() {return require("./util/geom/Vec3");}
function jeash_geom_Vector3D() {return require("./jeash/geom/Vector3D");}
function util_LibUtil() {return require("./util/LibUtil");}
function components_Jump() {return require("./components/Jump");}
function components_controller_SurfaceMovement() {return require("./components/controller/SurfaceMovement");}
function components_CollisionResult() {return require("./components/CollisionResult");}
function components_MoveResult() {return require("./components/MoveResult");}
function systems_collisions_CollisionEvent() {return require("./systems/collisions/CollisionEvent");}
function systems_collisions_EllipsoidCollider() {return require("./systems/collisions/EllipsoidCollider");}
function altern_culling_TargetBoardTester() {return require("./altern/culling/TargetBoardTester");}
function altern_geom_AMesh() {return require("./altern/geom/AMesh");}
function altern_geom_ClipMacros() {return require("./altern/geom/ClipMacros");}
function altern_geom_Edge() {return require("./altern/geom/Edge");}
function altern_geom_Face() {return require("./altern/geom/Face");}
function altern_geom_Wrapper() {return require("./altern/geom/Wrapper");}
function altern_geom_Vertex() {return require("./altern/geom/Vertex");}

// Constructor

class MainJS {
	constructor(){}
	static main() {
		var me = MainJS
		me.CullingPlane = (altern_culling_CullingPlane().default)
		me.GeometryResult = (altern_terrain_GeometryResult().default)
		me.QuadCornerData = (altern_terrain_QuadCornerData().default)
		me.TerrainGeomTools = (altern_terrain_TerrainGeomTools().default)
		me.TerrainLOD = (altern_terrain_TerrainLOD().default)
		me.HeightMapInfo = (altern_terrain_HeightMapInfo().default)
		me.TerrainChunkStateList = (altern_terrain_TerrainChunkStateList().default)
		me.TerrainChunkState = (altern_terrain_TerrainChunkState().default)
		me.QuadChunkCornerData = (altern_terrain_QuadChunkCornerData().default)
		me.QuadSquareChunk = (altern_terrain_QuadSquareChunk().default)
		me.QuadTreePage = (altern_terrain_QuadTreePage().default)
		me.IntersectSlopeUtil = (altern_geom_IntersectSlopeUtil().default)
		me.BVHTree = (altern_partition_js_BVHTree().default)
		me.CullingDFS = (altern_culling_CullingDFS().default)
		me.DefaultCulling = (altern_culling_DefaultCulling().default)
		me.CullingPlane = (altern_culling_CullingPlane().default)
		me.GeomCollisionSceneUtil = (util_geom_GeomCollisionSceneUtil().default)
		me.GeomUtil = (util_geom_GeomUtil().default)
		me.Raycaster = (altern_ray_Raycaster().default)
		me.DBVTProxy = (altern_collisions_dbvt_DBVTProxy().default)
		me.DBVTNode = (altern_collisions_dbvt_DBVTNode().default)
		me.DBVT = (altern_collisions_dbvt_DBVT().default)
		me.IRaycastImpl = (altern_ray_IRaycastImpl().default)
		me.ITCollidable = (systems_collisions_ITCollidable().default)
		me.Geometry = (util_geom_Geometry().default)
		me.BoundBox = (components_BoundBox().default)
		me.Transform3D = (components_Transform3D().default)
		me.AABBUtils = (util_geom_AABBUtils().default)
		me.CollisionBoundNode = (altern_collisions_CollisionBoundNode().default)
		me.Vec3 = (util_geom_Vec3().default)
		me.Vector3D = (jeash_geom_Vector3D().default)
		me.LibUtil = (util_LibUtil().default)
		me.Jump = (components_Jump().default)
		me.SurfaceMovement = (components_controller_SurfaceMovement().default)
		me.CollisionResult = (components_CollisionResult().default)
		me.MoveResult = (components_MoveResult().default)
		me.CollisionEvent = (systems_collisions_CollisionEvent().default)
		me.EllipsoidCollider = (systems_collisions_EllipsoidCollider().default)
		me.TargetBoardTester = (altern_culling_TargetBoardTester().default)
		me.AMesh = (altern_geom_AMesh().default)
		me.ClipMacros = (altern_geom_ClipMacros().default)
		me.Edge = (altern_geom_Edge().default)
		me.Face = (altern_geom_Face().default)
		me.Wrapper = (altern_geom_Wrapper().default)
		me.Vertex = (altern_geom_Vertex().default)
	}
}


// Meta

MainJS.__name__ = ["MainJS"];
MainJS.prototype.__class__ = MainJS.prototype.constructor = $hxClasses["MainJS"] = MainJS;

// Init



// Statics



// Export

exports.default = MainJS;