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
	| fun							#Funcion
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

NUMERO_CIENTIFICO : NUMERO (('E' | 'e') SIGN? NUMERO)?;
SIGN : ('+' | '-');

WS	: [ \t]+ -> skip ;