const {ExprParser} = require( './ExprParser');
const {ExprLexer} = require('./ExprLexer');
const {ExprListener} = require('./ExprListener');
const {ExprVisitor} = require('./ExprVisitor');
const {CommonTokenStream, FileStream} = require('antlr4');
const program = require('commander');
const antlr = require('antlr4');
const {inspect} = require('util');

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
//console.log(tree.toStringTree());

class TestExprListener extends ExprListener {
    enterProg(ctx) {
        console.log('enterProg');
    }

    enterAssign(ctx) {
        console.log('enterAssign');
    }
}

class TestExprVisitor extends ExprVisitor {
    visitAssign(ctx) {
        super.visitAssign(ctx);
    }
    visitInt(ctx) {
        console.log(ctx.INT().getText());
    }
}

let walker = new antlr.tree.ParseTreeWalker();
let listener = new TestExprListener();
let visitor = new TestExprVisitor();

//walker.walk(listener, tree);
visitor.visit(tree);