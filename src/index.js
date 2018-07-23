import _ from 'lodash';
import $ from 'jquery'
import 'bootstrap';
import './scss/app.scss';
import { InputStream, CommonTokenStream } from 'antlr4/index';
import { MyGrammarLexer, MyGrammarParser, MyGrammarVisitor } from './MyGrammar.g4';
 
 class MyVisitor extends MyGrammarVisitor {

 	constructor(memoria) {
 		super();
	    this.memoria = memoria
	  }

 	visitMulDiv(ctx){
 		var left = this.visit(ctx.expr(0));
 		var right = this.visit(ctx.expr(1));
 		console.log("visitMulDiv "+"left: "+left + "right: "+right);

 		if (right != null)
            {
                if (ctx.DIV(0) == null)
                {
                    return left * right;

                }

                return left / right;
            }
        return left;
 	}

 	visitAssign(ctx){
 		var id = ctx.ID().getText();
 		var value = this.visit(ctx.expr());
 		this.memoria[id] = value;
 		console.log(this.memoria);
 		return value;
 	}

 	visitPrintExpr(ctx){
 		var value = this.visit(ctx.expr());
		console.log("print "+value);
 		return value;
 	}

 	visitAddSuv(ctx){
 		var left = this.visit(ctx.expr(0));
 		var right = this.visit(ctx.expr(1));
 		console.log("visitAddSuv "+"left: "+left + "right: "+right);
 		if (right != null)
            {
                if (ctx.ADD(0) == null)
                {
                    return left - right;

                }

                return left + right;
            }
        return left;
 	}

 	visitId(ctx){
 		var id = ctx.ID().getText();
 		if ( this.containsKey(this.memoria, id) ) return this.memoria[id];
 		console.log("visitId "+this.memoria);
 		return id;
 	}

 	visitParens(ctx){
 		console.log("visitParens "+ctx.getText());
 		return this.visit(ctx.expr());
 	}

 	visitInt(ctx){
 		console.log("visitInt "+ctx.getText());
 		return parseInt(ctx.INT().getText());
 	}

 	containsKey(array,id) {
 		for (var key in array) {
 			if (key === id) {
 				return true;
 			}
 		}
 		return false;
 	}
 }


document.getElementById("btnAntlr").addEventListener("click", initAntlr);
document.getElementById("btnClear").addEventListener("click", clear);

function initAntlr() {
  	var out = document.getElementById("textOut");
  	const input = document.getElementById("textInput").value;
	var mem = {}
	const lexer = new MyGrammarLexer(new InputStream(input));
	var tokens  = new CommonTokenStream(lexer);
	const parser = new MyGrammarParser(tokens);
	parser.buildParseTrees = true;
	var tree = parser.myStartRule()
	const result = new MyVisitor(mem).visit(tree);
  	out.value = result;
}

function clear() {
	// body...
	document.getElementById("textOut").value = "";
	document.getElementById("textInput").value = "";
}



