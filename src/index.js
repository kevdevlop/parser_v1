import _ from 'lodash';
import $ from 'jquery'
import 'bootstrap';
import './scss/app.scss';
import { InputStream, CommonTokenStream } from 'antlr4/index';
import { MyGrammarLexer, MyGrammarParser, MyGrammarVisitor } from './MyGrammar.g4';
// class MyVisitor extends MyGrammarVisitor {

//   visitMyStartRule(ctx) { //... 
//   }

//   //...
// }
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
	console.log(tree);
  // Lodash, currently included via a script, is required for this line to work
  out.value = input;
  
}



