const fs = require("fs");
const matchAll = require("match-all");

/**
 * This will output out a typed propert declaration version of all files generated  with hxgenjs (first), and then some files marked with @:expose
 * for hxtsdgen (afterwards) will help replace.
 */
// Configurations
const REF_FILE = "ArenaHaxeJS.d.ts"; // The main file to reference for all @:expose classes to
const STRIP_COMMENTS = true; // for now dont change this! Need to strip comments for this script to work.
const BASE_PATH = './_from_haxe/'; // From where this script is located for source path of REF_FILE (at root of project)
const OUTPUT_PATH = "./src/hx/"; // From where this script is located (at root of project) to update haxe classes definitions alongside their JS files

// Let's do it!
const REGEX_DECLARE_TYPE = /:\s*([^,:;\n\s()]+)/gi; // colon: type
const REGEX_DOTTED_PACKAGE_PATH = /(?:[\w]+\.)+[\w]+/g;
const REGEX_EXPORT_DOTTED_PATH = /export default ((?:[\w]+\.)+[\w]+);/;

function stripComments(cont) {
    return cont.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, "");
}
let contents = fs.readFileSync(BASE_PATH + REF_FILE, "utf8");
if (STRIP_COMMENTS) {
    contents = stripComments(contents);
}

let matches = matchAll(contents, /export namespace ([^\n\s]*)*\s*{\s*\n([^}]*)/gi); //(/export namespace.*\s*{\s*\n([^}]*)/g).exec(contents); //\s*\n\s*}

let row;
let count = 0;
let nameSpaceHash = {};
while( row = matches.nextRaw()) {
    //console.log(nameSpace);
    //console.log(matches);
    count++;
    let nameSpace = row[1];
    let classArr = nameSpaceHash[nameSpace];
    if (!classArr) {
        nameSpaceHash[nameSpace] = classArr = [];
    }
    let match = row[2];
    if (!STRIP_COMMENTS) {
        match = stripComments(match);
    }
    let splitIndex = match.indexOf("{");
    let header = match.slice(0, splitIndex);
    match = match.slice(splitIndex + 1);

    header = header.split("export").pop();
    header = header.trim();
    match = match.trim();

    let declarations = match;

    declarations = declarations.split(";").map((m)=>{
       m = m.trim();
       return m.split(".").join("_");
    });
    //declarations = declarations.join(";\n");

    let declarationTypes = matchAll(declarations, REGEX_DECLARE_TYPE).toArray();

    declarationTypes = new Set(declarationTypes.filter((s)=>s.indexOf("_")>=0).map((m)=>m.replace("[]", "")));
   let matches =  header.match(REGEX_DOTTED_PACKAGE_PATH);
   if (matches) {
    matches.forEach( (v) => {
            v = v.trim();
            v= v.split(".").join("_");
            declarationTypes.add(v);
        });
    }
    let className = header.split(/\s+/)[1];
    let isInterface = header.indexOf("interface ") >= 0;

    header = header.split(".").join("_");

    classArr.push({name: className, head:header, dec:declarations, decTypes: declarationTypes, isInterface:isInterface });
   // console.log(header);
   // console.log(declarationTypes);
}

for (let ns in nameSpaceHash) {
    let classArr = nameSpaceHash[ns];
    let dotSplit = ns.split(".");
    let dotSplitPrefix = dotSplit.map((d, index) => "../").join("");
    let fileDir = dotSplit.join("/") + "/";
    classArr.forEach((cls)=> {
        //console.log('********** ' + fileDir + cls.name + ".d.ts");
        let classFileCont = fs.readFileSync(BASE_PATH + fileDir + cls.name + ".d.ts", "utf8");
        let existingImports = new Set(matchAll(classFileCont, /import ([^\s]+) from /g).toArray());
        /**
         * @type Set
         */
        let extraImports = [];
        let decTypes = cls.decTypes;
        decTypes.forEach((d)=> {
            if (!existingImports.has(d)) extraImports.push("import "+d + ' from "'+(dotSplitPrefix + d.split("_").join("/"))+'"' + ";");
        });

        extraImports = extraImports.join("\n");
        //console.log(classFileCont);
        /*
        let classFileStruct = matchAll(classFileCont, /(export (?:class|interface) [^]+){\s*\n([^}]*)/);
        row = classFileStruct.nextRaw();
        console.log(row[1] + '*********');
        console.log(row[2]);
        */

        classFileCont = classFileCont.replace(/(export (?:class|interface) [^]+){\s*\n([^}]*)/, cls.head + " {\n" + cls.dec.join(";\n") + "\n");
        if (cls.isInterface) { // typescript can't export namespaced interfaces correctly?
           // /*
            classFileCont = classFileCont.replace(REGEX_EXPORT_DOTTED_PATH, (str) => {
                return "export default " + str.split(".").pop();
            });
         //   */
          // classFileCont = classFileCont.replace("interface ", "class ");
          // classFileCont = classFileCont.replace("extends ", "implements ");
        }
        let output = extraImports + "\n" + classFileCont;


        let outputFilePath = OUTPUT_PATH + fileDir + cls.name + ".d.ts";
        fs.writeFileSync(outputFilePath, output, {encoding: "utf8"} );
        console.log("written file... "+ outputFilePath);
        //if (!existingImports.has())


    });
}

