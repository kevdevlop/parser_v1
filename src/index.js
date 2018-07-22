import _ from 'lodash';
import $ from 'jquery'
import 'bootstrap';
import './scss/app.scss';
import { InputStream, CommonTokenStream } from 'antlr4/index';
import { MyGrammarLexer, MyGrammarParser, MyGrammarVisitor } from './MyGrammar.g4';
 
 class MyVisitor extends MyGrammarVisitor {
 	

 	visitMulDiv(ctx){
 		// left = visit(ctx.expr(0));
 		// right = visit(ctx.expr(1));
 		// console.log(left+" "+right);
 		// if (ctx.op.getType() == '*') {
 		// 	return left * right;
 		// }
 		// return left / right;
 		console.log("visitMulDiv"+this.visit(ctx.expr(1)));
 		return true;
 	}

 	visitAssign(ctx){
 		console.log("visitAssign"+ctx.getText());
 		return true;
 	}

 	visitprintExpr(ctx){
		console.log("print"+ctx.getText());
 		return true;
 	}

 	visitAddSuv(ctx){
 		console.log("visitAddSuv"+ctx.getText());
 		return true;
 	}

 	visitId(ctx){
 		console.log("visitId"+ctx.getText());
 		return true;
 	}

 	visitParens(cxt){
 		console.log("visitParens"+ctx.getText());
 		return true;
 	}

 	visitInt(ctx){
 		console.log("visitInt"+ctx.getText());
 		return true;
 	}

  //...
 }
document.getElementById("btnAntlr").addEventListener("click", initAntlr);
//const result = new MyVisitor().visit(parser.myStartRule());
function initAntlr() {
  var out = document.getElementById("textOut");
  const input = document.getElementById("textInput").value; // Load string content
	
	const lexer = new MyGrammarLexer(new InputStream(input));
	var tokens  = new CommonTokenStream(lexer);
	const parser = new MyGrammarParser(tokens);
	parser.buildParseTrees = true;
	var tree = parser.myStartRule()
	const result = new MyVisitor().visit(tree);
  // Lodash, currently included via a script, is required for this line to work
  out.value = result;
  
}



