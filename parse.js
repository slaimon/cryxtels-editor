export {parse}
import * as Primitives from "./primitives.js"
import {Text} from "./text.js"
import {Pixel} from "./pixel.js"

const allowedVariableNameRegex = /[a-zA-Z_][0-9a-zA-Z_]*/;
const reservedKeywords = [
    "define",
    "seed",
    "author",
    "type",
    "model",
    "endpixel",
    "detail",
    "associated file",
    "total mass",
    "dot",
    "sphere",
    "dotted ellipse",
    "asterisk",
    "line",
    "rectangle",
    "solidbox",
    "box",
    "grid",
    "ellipse",
    "spiral",
    "wave",
    "column",
    "gridsphere",
    "torus",
    "text",
    "dock",
    "collision",
    "collisionhigh",
    "forbidden",
    "endpixel"
]

var line_number = 0;
var environment = {};

// commands can have an extra parameter at the end, as a treat ehrm I mean, as a comment
// for instance (from PIXELS.DEF): "asterisk, 75, -100, -100, 3, 36, gratuitus use of meaningless decoration;"
function checkParams(params, arity) {
    if (params.length-1 < arity) {
        throw new Error(`Syntax error: not enough parameters given (line ${line_number})\ncommand "${params[0]}" requires ${arity}, have ${params.length-1}`);
    }
    if (params.length-1 > arity+1) {
        throw new Error(`Syntax error: too many parameters given (line ${line_number})\ncommand "${params[0]}" requires at most ${arity+1}, have ${params.length-1}`);
    }
    for (let i=0; i<arity; i++) {
        if (params[i] === undefined) {
            throw new Error(`Syntax error: invalid parameter (line ${line_number})`);
        }
    }
}

function checkIfAllowedVariableName(name) {
    if (!name.match(allowedVariableNameRegex)) {
        throw new Error(`Syntax error: invalid variable name "${name}" (line ${line_number})`)
    }
    if (reservedKeywords.includes(name)) {
        throw new Error(`Syntax error: cannot use keyword "${name}" as a variable name (line ${line_number})`)
    }

    return true;
}

function getOrientation(i) {
    switch(i) {
        case 0:
            return "xy";
        case 1:
            return "xz";
        case 2:
            return "yz";
        default:
            throw new Error(`Syntax error: invalid orientation number ${i} (line ${line_number})`);
    }
}

function applyCommand(pixel, command) {
    switch(command[0].toLowerCase()) {

        // unimplemented commands
        case "seed":
        case "type":
        case "model":
        case "detail":
        case "associated file":
        case "total mass": {
            break;
        }

        case "author": {
            if (command[1] !== "=") {
                throw new Error(`Syntax error: unexpected token ${command[1]}, expected '=' (line ${line_number})`);
            }
            pixel.setAuthor(command[2]);
            break;
        }

        // dot primitives
        case "dot": {
            checkParams(command, 3);
            let c = [command[1], command[2], command[3]];
            
            pixel.Add(new Primitives.Dot(c));
            break;
        }
        case "sphere": {
            checkParams(command, 6);
            let c = [command[1], command[2], command[3]];
            let radius = command[4];
            let ratio = command[5];
            let step = command[6];

            pixel.Add(new Primitives.DotSphere(c, radius, ratio, step));
            break;
        }
        case "dotted ellipse": {
            checkParams(command, 7);
            let c = [command[1], command[2], command[3]];
            let width = command[4];
            let height = command[5];
            let plane = getOrientation(command[6]);
            let step = command[7];

            pixel.Add(new Primitives.DotEllipse(c, width, height, plane, step));
            break;
        }

        // pixel primitives
        case "asterisk": {
            checkParams(command, 5);
            let c = [command[1], command[2], command[3]];
            let radius = command[4];
            let step = command[5];

            pixel.Add(new Primitives.Asterisk(c, radius, step));
            break;
        }
        case "line": {
            checkParams(command, 6);
            let start = [command[1], command[2], command[3]];
            let end = [command[4], command[5], command[6]];

            pixel.Add(new Primitives.Line(start, end));
            break;
        }
        case "rectangle": {
            checkParams(command, 6);
            let c = [command[1], command[2], command[3]];
            let width = command[4];
            let height = command[5];
            let plane = getOrientation(command[6]);

            pixel.Add(new Primitives.Rectangle(c, width, height, plane));
            break;
        }
        case "solidbox":
        case "box": {
            checkParams(command, 6);
            let c = [command[1], command[2], command[3]];
            let hx = command[4];
            let hy = command[5];
            let hz = command[6];

            pixel.Add(new Primitives.Box(c, hx, hy, hz));
            break;
        }
        case "grid": {
            checkParams(command, 7);
            let c = [command[1], command[2], command[3]];
            let width = command[4];
            let height = command[5];
            let steps = command[6];
            let plane = getOrientation(command[7]);

            pixel.Add(new Primitives.Grid(c, width, height, steps, plane));
            break;
        }
        case "ellipse": {
            checkParams(command, 7);
            let c = [command[1], command[2], command[3]];
            let width = command[4];
            let height = command[5];
            let plane = getOrientation(command[6]);
            let step = command[7];

            pixel.Add(new Primitives.Ellipse(c, width, height, plane, step));
            break;
        }
        case "spiral": {
            checkParams(command, 6);
            let c = [command[1], command[2], command[3]];
            let increment = command[4];
            let plane = getOrientation(command[5]);
            let step = command[6];

            pixel.Add(new Primitives.Spiral(c, increment, plane, step));
            break;
        }
        case "wave": {
            checkParams(command, 7);
            let c = [command[1], command[2], command[3]];
            let scale = command[4];
            let amplitude = command[5];
            let plane = getOrientation(command[6]);
            let step = command[7];

            pixel.Add(new Primitives.Wave(c, scale, amplitude, plane, step));
            break;
        }
        case "column": {
            checkParams(command, 7);
            let c = [command[1], command[2], command[3]];
            let base_radius = command[4];
            let top_radius = command[5];
            let height = command[6];
            let step = command[7];

            pixel.Add(new Primitives.Column(c, base_radius, top_radius, height, step));
            break;
        }
        case "gridsphere": {
            checkParams(command, 6);
            let c = [command[1], command[2], command[3]];
            let radius = command[4];
            let ratio = command[5];
            let step = command[6];

            pixel.Add(new Primitives.GridSphere(c, radius, ratio, step));
            break;
        }
        case "donut":
        case "torus": {
            checkParams(command, 7);
            let c = [command[1], command[2], command[3]];
            let radius = command[4];
            let section = command[5];
            let plane = getOrientation(command[6]);
            let step = command[7];

            pixel.Add(new Primitives.Torus(c, radius, section, plane, step));
            break;
        }
        case "text": {
            checkParams(command, 8);
            let c = [command[1], command[2], command[3]];
            let scale_x = command[4];
            let scale_y = command[5];
            let alpha = command[6];
            let beta = command[7];
            let str = command[8].toString();

            pixel.Add(new Text(str, c, scale_x, scale_y, alpha, beta));
            break;
        }

        // collision primitives, could be interesting to extend this in the future
        // should add solidbox to these because it creates a collision block AND a pixel
        case "dock":
        case "collision":
        case "collisionhigh":
        case "forbidden": {
            break;
        }

        case "endpixel": {
            return -1;
        }
        default: {
            throw new Error(`unrecognized command: ${command[0]} (line ${line_number})`);
        }
    }

    return 0;
}

function parse(txt) {
    let pixel = new Pixel();

    let lines = txt.split("\n");
    for (let line of lines) {
        line_number++;

        if (line.length === 0) {
            continue;
        }
        
        // these keywords are the only ones that use whitespace as separator
        let command = line
        .replace(/[,;]/g, "")
        .split(" ")
        .filter(x => x.length > 0);
        switch (command[0].toLowerCase()) {
            case "type":
            case "model":
            case "seed":
            case "author": {
                applyCommand(pixel,command);
                continue;
            }
            case "define": {
                if (checkIfAllowedVariableName(command[1])) {
                    environment[command[1]] = command[2];
                    continue;
                }
            }
        }

        // macro expansion
        for (let variable in environment) {
            line = line.replace(variable, environment[variable]);
        }

        // all the other keywords use commas as separator
        command = line
            .replace(";","")
            .split(",")
            .filter(x => x.length > 0)
            .map( s => {
                if (s[0]===" ") {
                    s = s.slice(1);             // remove leading whitespace
                }
                let x = Number(s);
                return (isNaN(x)) ? (s) : (x);  // convert digit strings into numbers
            });
        
            console.log(command);
        if (applyCommand(pixel, command)) {
            return pixel;
        }
    }

    return pixel;
}