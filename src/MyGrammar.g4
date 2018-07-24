grammar MyGrammar;

myStartRule: stat+ ;

stat: expr NEWLINE  		#printExpr
	| ID '=' expr NEWLINE 	#Assign
	| NEWLINE				#blank
	;

expr: expr (MUL|DIV) expr			#MulDiv
	| expr (ADD|SUB) expr			#AddSuv
	| LPAREN expr POW expr RPAREN	#Pow
	| LPAREN expr MOD expr RPAREN 	#Mod
	| LPAREN expr FACT RPAREN 		#Fact
	| funciones LPAREN expr RPAREN	#Funcion
	| INT							#int
	| ID							#id
	| LPAREN expr RPAREN			#parens
	| PI 							#Pi
	;

fun: funciones LPAREN expr RPAREN;

funciones: 'sin'
	|	'cos'
	|	'tan'
	|	'atan'
	|	'asin'
	|	'acos'
	| 	'ln'
	|	'log'
	| 	'sqrt'
	;


POINT : '.';
POW : '^';
MOD : '%';
PI: 'pi' ;
FACT: '!';

ID	: [a-zA-Z]+ ;
NEWLINE : [\r\n]+ ;
INT     : [0-9]+ ;
NUMERO : INT ('.' ('0' .. '9') +);
MUL : '*' ;
DIV : '/' ;
ADD : '+' ;
SUB : '-' ;
LPAREN : '(' ;
RPAREN : ')' ;

SIGN : ('+' | '-');

WS	: [ \t]+ -> skip ;