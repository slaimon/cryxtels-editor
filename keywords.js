export default [
        {
            "names":["endpixel"],
            "arity": 0,
            "isScalable": false,
            "separator": ","
        },
        {
            "names":["detail"],
            "arity": 0,
            "isScalable": false,
            "separator": ","
        },
        {
            "names":["type"],
            "arity": 1,
            "args": ["typeNumber"],
            "isScalable":false,
            "numericArgs":[1],
            "separator":" "
        },
        {
            "names":["model"],
            "arity": 1,
            "args": ["modelNumber"],
            "numericArgs":[1],
            "isScalable":false,
            "separator":" "
        },
        {
            "names":["seed"],
            "arity": 1,
            "args": ["seed"],
            "isScalable":false,
            "numericArgs":[1],
            "separator":"="
        },
        {
            "names":["author"],
            "arity": 1,
            "args": ["author"],
            "isScalable":false,
            "separator":"="
        },
        {
            "names":["total mass"],
            "arity":1,
            "args": ["mass"],
            "isScalable":false,
            "numericArgs":[1],
            "separator":","
        },
        {
            "names":["dot"],
            "arity": 3,
            "args": ["x","y","z"],
            "isScalable":true,
            "scalableArgs": [1,2,3],
            "numericArgs":[1,2,3],
            "separator":","
        },
        {
            "names":["dock"],
            "arity": 5,
            "args": ["x","y","z","size-x","size-y"],
            "isScalable":true,
            "scalableArgs":[1,2,3],
            "numericArgs":[1,2,3,4,5],
            "separator":","
        },
        {
            "names":["asterisk", "star"],
            "arity": 5,
            "args": ["x","y","z","radius","step"],
            "isScalable":true,
            "scalableArgs":[1,2,3],
            "numericArgs":[1,2,3,4,5],
            "separator":","
        },
        {
            "names":["line"],
            "arity": 6,
            "args": ["start_x","start_y","start_z","end_x","end_y","end_z"],
            "isScalable":true,
            "scalableArgs":[1,2,3,4,5,6],
            "numericArgs":[1,2,3,4,5,6],
            "separator":","
        },
        {
            "names":["rectangle"],
            "arity": 6,
            "args": ["x","y","z","width","height","plane"],
            "isScalable":true,
            "scalableArgs":[1,2,3,4,5],
            "numericArgs":[1,2,3,4,5,6],
            "hasOrientation":true,
            "orientation":6,
            "separator":","
        },
        {
            "names":["box"],
            "arity": 6,
            "args": ["x","y","z","width","height","depth"],
            "isScalable":true,
            "scalableArgs":[1,2,3,4,5,6],
            "numericArgs":[1,2,3,4,5,6],
            "separator":","
        },
        {
            "names":["grid"],
            "arity": 7,
            "args": ["x","y","z","width","height","steps","plane"],
            "isScalable":true,
            "scalableArgs":[1,2,3,4,5],
            "numericArgs":[1,2,3,4,5,6,7],
            "hasOrientation":true,
            "orientation":7,
            "separator":","
        },
        {
            "names":["dotted ellipse", "dotellipse"],
            "arity": 7,
            "args": ["x","y","z","width","height","plane","step"],
            "isScalable":true,
            "scalableArgs":[1,2,3,4,5],
            "numericArgs":[1,2,3,4,5,6,7],
            "hasOrientation":true,
            "orientation":6,
            "separator":","
        },
        {
            "names":["ellipse"],
            "arity": 7,
            "args": ["x","y","z","width","height","plane","step"],
            "isScalable":true,
            "scalableArgs":[1,2,3,4,5],
            "numericArgs":[1,2,3,4,5,6,7],
            "hasOrientation":true,
            "orientation":6,
            "separator":","
        },
        {
            "names":["spiral"],
            "arity": 6,
            "args": ["x","y","z","increment","plane","step"],
            "isScalable":true,
            "scalableArgs":[1,2,3,4],
            "numericArgs":[1,2,3,4,5,6],
            "hasOrientation":true,
            "orientation":6,
            "separator":","
        },
        {
            "names":["wave"],
            "arity": 6,
            "args": ["x","y","z","scale","amplitude", "plane","step"],
            "isScalable":true,
            "scalableArgs":[1,2,3,4,5],
            "numericArgs":[1,2,3,4,5,6,7],
            "hasOrientation":true,
            "orientation":6,
            "separator":","
        },
        {
            "names":["column"],
            "arity":7,
            "args":["x","y","z","base_radius","tip_radius","height","step"],
            "isScalable":true,
            "scalableArgs":[1,2,3,4,5,6],
            "numericArgs":[1,2,3,4,5,6,7],
            "separator":","
        },
        {
            "names":["sphere","dotsphere"],
            "arity":6,
            "args":["x","y","z","radius","aspect_ratio","step"],
            "isScalable":true,
            "scalableArgs":[1,2,3,4],
            "numericArgs":[1,2,3,4,5,6],
            "separator":","
        },
        {
            "names":["gridsphere"],
            "arity":6,
            "args":["x","y","z","radius","aspect_ratio","step"],
            "isScalable":true,
            "scalableArgs":[1,2,3,4],
            "numericArgs":[1,2,3,4,5,6],
            "separator":","
        },
        {
            "names":["donut","torus"],
            "arity":6,
            "args":["x","y","z","radius","section","plane","step"],
            "isScalable":true,
            "scalableArgs":[1,2,3,4,5],
            "numericArgs":[1,2,3,4,5,6,7],
            "separator":","
        },
        {
            "names":["text"],
            "arity":8,
            "args":["x","y","z","x-scale","y-scale","angle-a","angle-b","string"],
            "isScalable":true,
            "scalableArgs":[1,2,3,4,5],
            "numericArgs":[1,2,3,4,5,6,7],
            "separator":",",
            "noComment":true
        },
        {
            "names":["collision"],
            "arity":6,
            "args":["x","y","z","width","height","depth"],
            "isScalable":true,
            "scalableArgs":[1,2,3,4,5,6],
            "numericArgs":[1,2,3,4,5,6],
            "deprecated":true,
            "separator":","
        },
        {
            "names":["collision high"],
            "arity":6,
            "args":["x","y","z","width","height","depth"],
            "isScalable":true,
            "scalableArgs":[1,2,3,4,5,6],
            "numericArgs":[1,2,3,4,5,6],
            "separator":","
        },
        {
            "names":["solid block"],
            "arity":6,
            "args":["x","y","z","width","height","depth"],
            "isScalable":true,
            "scalableArgs":[1,2,3,4,5,6],
            "numericArgs":[1,2,3,4,5,6],
            "separator":","
        },
        {
            "names":["forbidden"],
            "arity":6,
            "args":["x","y","z","width","height","depth"],
            "isScalable":true,
            "scalableArgs":[1,2,3,4,5,6],
            "numericArgs":[1,2,3,4,5,6],
            "separator":","
        },
        {
            "names":["collision"],
            "arity":6,
            "args":["x","y","z","width","height","depth"],
            "isScalable":true,
            "scalableArgs":[1,2,3,4,5,6],
            "numericArgs":[1,2,3,4,5,6],
            "separator":","
        }
    ]