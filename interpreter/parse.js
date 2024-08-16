export {parse}
import * as Primitives from "../shapes/primitives.js"
import {Text} from "../shapes/text.js"
import {Pixel} from "../shapes/pixel.js"

import keywords from "./keywords.js"

const allowedVariableNameRegex = /[a-zA-Z_][0-9a-zA-Z_]*/;
const reservedKeywords = keywords.reduce((allNames, keyword) => allNames.concat(keyword.names), []);

var line_number;
var environment;

function evalExpression(string) {
    let result = Number(string);

    if (!isNaN(result))
        return result;

    try {
        result = math.evaluate(string);
    } catch(e) {
        throw new Error(`Math Error: cannot evaluate expression "${string}" (line ${line_number}):\n${e.message}`);
    }

    return result;
}

function isNumericArg(keyword, index) {
    // exclude the keyword itself right away
    if (index === 0)
        return false;

    let keywordProperties = keywords.find(x => x.names.includes(keyword));
    if (!keywordProperties) {
        throw new Error(`Syntax error: unrecognized keyword "${keyword}" (line ${line_number})`);
    }

    if (keywordProperties.numericArgs &&
        keywordProperties.numericArgs.includes(index))
        return true;
    else 
        return false;
}

function convertNumericStrings(command) {
    let keyword = command[0].toLowerCase();

    return command.map((s, i) => {
        if (!isNumericArg(keyword, i))
            return s;
        return evalExpression(s);
    });
}

// commands can have an extra parameter at the end, as a treat ehrm I mean, as a comment
// for instance (from PIXELS.DEF): "asterisk, 75, -100, -100, 3, 36, gratuitus use of meaningless decoration;"
function checkParams(command) {
    let keyword = command[0].toLowerCase();
    let keywordProperties = keywords.find(x => x.names.includes(keyword));

    let minArity = keywordProperties.arity;
    let maxArity = (keywordProperties.noComment) ?
        (minArity) :
        (minArity+1);

    if (command.length-1 < minArity) {
        throw new Error(`Syntax error: not enough parameters given (line ${line_number})\ncommand "${keyword}" requires at least ${minArity}, have ${command.length-1}`);
    }
    if (command.length-1 > maxArity) {
        throw new Error(`Syntax error: too many parameters given (line ${line_number})\ncommand "${keyword}" requires at most ${maxArity}, have ${command.length-1}`);
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
    console.log(command);
    checkParams(command);

    let keyword = command[0].toLowerCase();
    switch(keyword) {

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
            let c = [command[1], command[2], command[3]];

            pixel.setDockPosition(c);
            break;
        }

        // dot primitives
        case "dot": {
            let c = [command[1], command[2], command[3]];
            
            pixel.Add(new Primitives.Dot(c));
            break;
        }
        case "sphere": {
            let c = [command[1], command[2], command[3]];
            let radius = command[4];
            let ratio = command[5];
            let step = command[6];

            pixel.Add(new Primitives.DotSphere(c, radius, ratio, step));
            break;
        }
        case "dotted ellipse": {
            let c = [command[1], command[2], command[3]];
            let width = command[4];
            let height = command[5];
            let plane = getOrientation(command[6]);
            let step = command[7];

            pixel.Add(new Primitives.DotEllipse(c, width, height, plane, step));
            break;
        }

        // pixel primitives
        case "star":
        case "asterisk": {
            let c = [command[1], command[2], command[3]];
            let radius = command[4];
            let step = command[5];

            pixel.Add(new Primitives.Asterisk(c, radius, step));
            break;
        }
        case "line": {
            let start = [command[1], command[2], command[3]];
            let end = [command[4], command[5], command[6]];

            pixel.Add(new Primitives.Line(start, end));
            break;
        }
        case "rectangle": {
            let c = [command[1], command[2], command[3]];
            let width = command[4];
            let height = command[5];
            let plane = getOrientation(command[6]);

            pixel.Add(new Primitives.Rectangle(c, width, height, plane));
            break;
        }
        case "solidbox":
        case "box": {
            let c = [command[1], command[2], command[3]];
            let hx = command[4];
            let hy = command[5];
            let hz = command[6];

            pixel.Add(new Primitives.Box(c, hx, hy, hz));
            break;
        }
        case "grid": {
            let c = [command[1], command[2], command[3]];
            let width = command[4];
            let height = command[5];
            let steps = command[6];
            let plane = getOrientation(command[7]);

            pixel.Add(new Primitives.Grid(c, width, height, steps, plane));
            break;
        }
        case "ellipse": {
            let c = [command[1], command[2], command[3]];
            let width = command[4];
            let height = command[5];
            let plane = getOrientation(command[6]);
            let step = command[7];

            pixel.Add(new Primitives.Ellipse(c, width, height, plane, step));
            break;
        }
        case "spiral": {
            let c = [command[1], command[2], command[3]];
            let increment = command[4];
            let plane = getOrientation(command[5]);
            let step = command[6];

            pixel.Add(new Primitives.Spiral(c, increment, plane, step));
            break;
        }
        case "wave": {
            let c = [command[1], command[2], command[3]];
            let scale = command[4];
            let amplitude = command[5];
            let plane = getOrientation(command[6]);
            let step = command[7];

            pixel.Add(new Primitives.Wave(c, scale, amplitude, plane, step));
            break;
        }
        case "column": {
            let c = [command[1], command[2], command[3]];
            let base_radius = command[4];
            let top_radius = command[5];
            let height = command[6];
            let step = command[7];

            pixel.Add(new Primitives.Column(c, base_radius, top_radius, height, step));
            break;
        }
        case "gridsphere": {
            let c = [command[1], command[2], command[3]];
            let radius = command[4];
            let ratio = command[5];
            let step = command[6];

            pixel.Add(new Primitives.GridSphere(c, radius, ratio, step));
            break;
        }
        case "donut":
        case "torus": {
            let c = [command[1], command[2], command[3]];
            let radius = command[4];
            let section = command[5];
            let plane = getOrientation(command[6]);
            let step = command[7];

            pixel.Add(new Primitives.Torus(c, radius, section, plane, step));
            break;
        }
        case "text": {
            let c = [command[1], command[2], command[3]];
            let scale_x = command[4];
            let scale_y = command[5];
            let alpha = command[6];
            let beta = command[7];
            let str = command[8].toString();

            pixel.Add(new Text(str, c, scale_x, scale_y, alpha, beta));
            break;
        }

        // purely non-standard keywords:
        case "name": {
            let c = command[1];

            pixel.setName(c);
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
    let nameSet = false;
    let seedSet = false;
    let authorSet = false;

    for (const line of code) {
        line_number = code.line_number;
        if (line.length === 0) {
            continue;
        }
        let command = line
            .replace(";", "")
            .split(" ")
            .filter(s=>s.length>0);
        
        let keyword = command[0].toLowerCase();
        command = convertNumericStrings(command);

        switch(keyword) {
            case "name": {
                if (command[1] !== "=") {
                    throw new Error(`Syntax error: expected "=" after keyword "name" (line ${code.line_number})`);
                }
                if (nameSet) {
                    throw new Error(`Syntax error: redeclaration of author (line ${code.line_number})`);
                }
                nameSet = true;

                // the argument of "name" should allow whitespace, so we insert it back in
                command = ["name", command.slice(2).join(' ')];
                applyCommand(pixel, command);
                continue;
            }
            case "author": {
                if (command[1] !== "=") {
                    throw new Error(`Syntax error: expected "=" after keyword "author" (line ${code.line_number})`);
                }
                if (authorSet) {
                    throw new Error(`Syntax error: redeclaration of author (line ${code.line_number})`);
                }
                authorSet = true;
                command = ["author", command[2]];
                applyCommand(pixel,command);
                continue;
            }
            case "seed": {
                if (command[1] !== "=") {
                    throw new Error(`Syntax error: expected "=" after keyword "seed" (line ${code.line_number})`);
                }
                if (seedSet) {
                    throw new Error(`Syntax error: redeclaration of seed (line ${code.line_number})`);
                }
                seedSet = true;
                let arg = evalExpression(command[2]);
                if (isNaN(arg)) {
                    throw new Error(`Syntax error: keyword "${keyword}" expects a number as argument (line ${code.line_number})`);
                }
                command = ["seed", arg];
                applyCommand(pixel,command);
                continue;
            }
            case "define": {
                if (checkIfAllowedVariableName(command[1])) {
                    environment[command[1]] = command[2];
                }
                break;
            }
            case "type":
            case "model": {
                let arg = evalExpression(command[1]);
                if (isNaN(arg)) {
                    throw new Error(`Syntax error: keyword "${keyword}" expects a number as argument (line ${code.line_number})`);
                }
                (keyword==="model") ?
                    pixel.setModel(arg) :
                    pixel.setType(arg);
                
                return pixel;
            }
            default: {
                throw new Error(`Syntax error: missing "type" or "model" declaration (line ${code.line_number})`);
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
            line = line.replaceAll(variable, environment[variable]);
        }

        let command = line
            .replace(";", "")
            .split(",")
            .map(s => {
                    if (s[0]===" ") {
                        s = s.slice(1);     // remove leading whitespace
                    }
                    return s;
                });
        
        let keyword = command[0].toLowerCase();
        
        // the following commands should only appear in the Header
        switch(keyword) {
            case "seed":
            case "author":
            case "define":
            case "type":
            case "model": {
                throw new Error(`Syntax error: declaration of ${command[0]} inside definition body (line ${line_number})`);
            }
        }

        if (!reservedKeywords.includes(keyword)){
            throw new Error(`Syntax error: unrecognized keyword "${keyword}" (line ${line_number})`);
        }

        // allow commas in the last argument of "text" command
        if (keyword === "text" && command.length > 8) {
            for (let i=9; i<command.length; i++) {
                command[8] += ","+command[i];
            }
            command = command.slice(0,9);
        }

        command = convertNumericStrings(command);

        console.log(command);
        if (applyCommand(pixel, command)) {
            return pixel;
        }
    }
    throw new Error(`Syntax error: missing endpixel declaration (line ${line_number})`);
}

function parse(txt, env=defaultEnvironment) {
    environment = env;
    let pixel = new Pixel();
    let code = new CodeIterator(txt);

    pixel = parseHeader(code, pixel);
    pixel = parseBody(code, pixel);

    return pixel;
}