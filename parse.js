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

var line_number;
var environment;

// commands can have an extra parameter at the end, as a treat ehrm I mean, as a comment
// for instance (from PIXELS.DEF): "asterisk, 75, -100, -100, 3, 36, gratuitus use of meaningless decoration;"
function checkParams(params, minArity, maxArity=minArity+1) {
    if (params.length-1 < minArity) {
        throw new Error(`Syntax error: not enough parameters given (line ${line_number})\ncommand "${params[0]}" requires at least ${minArity}, have ${params.length-1}`);
    }
    if (params.length-1 > maxArity) {
        throw new Error(`Syntax error: too many parameters given (line ${line_number})\ncommand "${params[0]}" requires at most ${maxArity}, have ${params.length-1}`);
    }
    for (let i=0; i<params.length; i++) {
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

        // these commands should only appear in the preamble
        case "seed":
        case "type":
        case "model": {
            throw new Error(`Syntax error: declaration of ${command[0]} inside definition body (line ${line_number})`);
        }

        // unimplemented commands
        case "detail":
        case "associated file":
        case "total mass": {
            break;
        }

        case "author": {
            pixel.setAuthor(command[1]);
            break;
        }

        case "dock": {
            checkParams(command, 5);
            let c = [command[1], command[2], command[3]];

            pixel.setDockPosition(c);
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
            checkParams(command, 8, 8);
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
        // case "dock":
        case "collision":
        case "collision high":
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

class CodeIterator {
    constructor(text) {
        this.lines = text.split("\n");
        this.line_number = 1;
    }

    rewind (n) {
        this.line_number -= n;
    }

    next () {
        if (this.line_number > this.lines.length) {
            return {done:true};
        } else {
            this.line_number++;
            return {
                done:false,
                value: this.lines[this.line_number-2]
            };
        }
    }

    [Symbol.iterator]() {
        return this;
    }
}

// the Header is the part where commands like "SEED", "AUTHOR" and "TYPE" or "MODEL" are found
function parseHeader(code, pixel) {
    let seedSet = false;
    let authorSet = false;

    for (const line of code) {
        line_number = code.line_number;
        if (line.length === 0) {
            continue;
        }
        let command = line
            .replace(/[\s;]/g, "")
            .split("=");
        
        switch(command[0].toLowerCase()) {
            case "author": {
                if (authorSet) {
                    throw new Error(`Syntax error: redeclaration of author (line ${code.line_number})`)
                }
                authorSet = true;
                applyCommand(pixel,command);
                continue;
            }
            case "seed": {
                if (seedSet) {
                    throw new Error(`Syntax error: redeclaration of seed (line ${code.line_number})`)
                }
                seedSet = true;
                applyCommand(pixel,command);
                continue;
            }
            case "define": {
                if (checkIfAllowedVariableName(command[1])) {
                    environment[command[1]] = command[2];
                    continue;
                }
            }
            default: {
                let found;
                if (found = command[0].match(/type(?<typeNumber>[0-9]+)/i)) {
                    pixel.setType(Number(found.typeNumber));
                    return pixel;
                }
                else if (found = command[0].match(/model(?<typeNumber>[0-9]+)/i)) {
                    pixel.setModel(Number(found.typeNumber));
                    return pixel;
                }
                else {
                    // throw new error if we're being pedantic ("missing endpixel declaration")
                    code.rewind(1);
                    return pixel;
                }
            }
        }
    }
}

function parseBody(code, pixel) {
    for (let line of code) {
        line_number = code.line_number;
        if (line.length === 0) {
            continue;
        }

        // perform macro expansion
        for (let variable in environment) {
            line = line.replace(variable, environment[variable]);
        }

        let command = line
            .replace(";", "")
            .split(",")
            .map(s => {
                    if (s[0]===" ") {
                        s = s.slice(1);             // remove leading whitespace
                    }
                    return s;
                });
        
        // allow commas in the last argument of "text" command
        let skipConversion = false
        if (command[0] === "text" && command.length > 8) {
            skipConversion = true;
            for (let i=9; i<command.length; i++) {
                command[8] += ","+command[i];
            }
            command = command.slice(0,9);
        }
        // convert digit strings into numbers, spare the text field
        command = command.map((s, i) => {
            if (skipConversion && i>8)
                return s;
            let x = Number(s);
            return (isNaN(x)) ? (s) : (x);
        });

        console.log(command);
        if (applyCommand(pixel, command)) {
            return pixel;
        }
    }
    throw new Error(`Syntax error: missing endpixel declaration (line ${line_number})`);
}

function parse(txt, env={}) {
    environment = env;
    let pixel = new Pixel();
    let code = new CodeIterator(txt);

    pixel = parseHeader(code, pixel);
    pixel = parseBody(code, pixel);

    return pixel;
}