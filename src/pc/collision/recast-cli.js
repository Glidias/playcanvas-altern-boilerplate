var RecastCli = pc.createScript('recastCli');
/*
 * For information on settings:
 *
 * http://digestingduck.blogspot.com/2009/08/recast-settings-uncovered.html
 */

RecastCli.attributes.add('cellSize', { type:'number', default:0 });
RecastCli.attributes.add('cellHeight', { type:'number', default:0 });
RecastCli.attributes.add('agentHeight', { type:'number', default:0, min:0 });
RecastCli.attributes.add('agentRadius', { type:'number', default:0, min:0 });
RecastCli.attributes.add('maxClimb', { type:'number', default:0 });
RecastCli.attributes.add('maxSlope', { type:'number', default:45, min:0, max:90 });
RecastCli.attributes.add('regionMinSize', { type:'number', default:0, min:0 });
RecastCli.attributes.add('regionMergeSize', { type:'number', default:0, min:0 });
RecastCli.attributes.add('edgeMaxLen', { type:'number', default:0, min:0 });
RecastCli.attributes.add('edgeMaxError', { type:'number', default:0, min:0 });
RecastCli.attributes.add('vertsPerPoly', { type:'number', default:0, min:0 });
RecastCli.attributes.add('detailSampleDist', { type:'number', default:0, min:0 });
RecastCli.attributes.add('detailSampleMaxError', { type:'number', default:0, min:0 });


// How certain Recast settings are resolved with Playcanvas entity
RecastCli.prototype.getParams = function() {
    var agentHeight = this.agentHeight;
    var agentRadius = this.agentRadius;
    if (agentHeight<=0) {
        if (this.entity.collision) agentHeight = this.entity.collision.height;
        else {
            console.warn("Could not find Agent height for: "+this.entity.name +". Using default 2");
            agentHeight = 2;
        }
    }
    if (agentRadius<=0) {
        if (this.entity.collision) agentRadius = this.entity.collision.radius;
        else {
            console.warn("could not find Agent radius for: "+this.entity.name+". Using default 0.5");
            agentRadius = 0.5;
        }
    }
    var cellSize = this.cellSize;
    if (cellSize <=0 ) {
        if (cellSize === 0) {
            cellSize = agentRadius / 2;
        }
        else {
            cellSize = agentRadius / -cellSize;
        }
    }
    var cellHeight = this.cellHeight;
    if (cellHeight <= 0) {
        if (cellHeight === 0) {
            cellHeight = cellSize / 2;
        }
        else {
            cellHeight = cellSize / -cellHeight;
        }
    }
    var maxClimb = this.maxClimb;
    if (maxClimb <=0 ) {
        if (maxClimb === 0) {
            maxClimb = 0.25 * agentHeight;
        }
        else {
            maxClimb = -maxClimb * agentHeight;
        }
    }

    var params =  [
       cellSize,
       cellHeight,
       agentHeight,
       agentRadius,
       maxClimb,
       this.maxSlope,
       this.regionMinSize,
       this.regionMergeSize,
       this.edgeMaxLen,
       this.edgeMaxError,
       this.vertsPerPoly,
       this.detailSampleDist,
       this.detailSampleMaxError
    ];
    //console.log(params);
    return params;
};

RecastCli.PARAM_CELLSIZE = 0;
RecastCli.PARAM_CELLHEIGHT = 1;
RecastCli.PARAM_AGENT_HEIGHT = 2;
RecastCli.PARAM_AGENT_RADIUS = 3;
RecastCli.PARAM_MAX_CLIMB = 4;

RecastCli.PARAM_MAX_SLOPE = 5;
RecastCli.PARAM_REGION_MIN_SIZE = 6;
RecastCli.PARAM_REGION_MERGE_SIZE = 7;
RecastCli.PARAM_EDGE_MAX_LEN = 8;
RecastCli.PARAM_EDGE_MAX_ERROR = 9;
RecastCli.PARAM_VERTS_PER_POLY = 10;
RecastCli.PARAM_DETAIL_SAMPLE_DIST = 11;
RecastCli.PARAM_DETAIL_SAMPLE_MAX_ERROR = 12;