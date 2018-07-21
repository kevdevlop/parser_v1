import _ from 'lodash';
import { InputStream, CommonTokenStream } from 'antlr4/index';
import { MyGrammarLexer, MyGrammarParser, MyGrammarVisitor } from './MyGrammar.g4';

// class MyVisitor extends MyGrammarVisitor {

//   visitMyStartRule(ctx) { //... 
//   }

//   //...
// }

//const result = new MyVisitor().visit(parser.myStartRule());
function component() {
  var element = document.createElement('div');
	const input = "8+8\n"; // Load string content
	const lexer = new MyGrammarLexer(new InputStream(input));
	var tokens  = new CommonTokenStream(lexer);
	const parser = new MyGrammarParser(tokens);
	parser.buildParseTrees = true;
	console.log(parser.myStartRule());

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack', input], ' ');

  return element;
}

document.body.appendChild(component());