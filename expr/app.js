const {ExprParser} = require( './ExprParser.js');
const {ExprLexer} = require('./ExprLexer.js');
const {CommonTokenStream, FileStream} = require('antlr4');
const program = require('commander');

program
    .version('0.1.0')
    .option('-f, --file [value]', 'input file')
    .parse(process.argv);

if (program.file == null)
    program.help();    

const input = new FileStream(program.file);
const lexer = new ExprLexer(input);
const tokens = new CommonTokenStream(lexer);
const parser = new ExprParser(tokens);

let tree = parser.prog();
console.log(tree.toStringTree());