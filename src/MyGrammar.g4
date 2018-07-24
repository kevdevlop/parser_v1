grammar MyGrammar;

myStartRule: stat+ ;

stat: expr NEWLINE  		#printExpr
	| ID '=' expr NEWLINE 	#Assign
	| NEWLINE				#blank
	| PRINT ID			#PrintId
	;

expr: expr (MUL|DIV) expr			#MulDiv
	| expr (ADD|SUB) expr			#AddSuv
	| LPAREN expr POW expr RPAREN	#Pow
	| LPAREN expr MOD expr RPAREN 	#Mod
	| LPAREN expr FACT RPAREN 		#Fact
	| funciones LPAREN expr RPAREN	#Funcion
	| NUM							#Num
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


PRINT : 'print';
POINT : '.';
POW : '^';
MOD : '%';
PI: 'pi' ;
FACT: '!';

ID	: [a-zA-Z]+([0-9]+)? ;
NEWLINE : [\r\n]+ ;
NUM : ('0' .. '9')+ ('.' ('0' .. '9')+)?;
MUL : '*' ;
DIV : '/' ;
ADD : '+' ;
SUB : '-' ;
LPAREN : '(' ;
RPAREN : ')' ;
SIGN : ('+' | '-');

WS	: [ \t]+ -> skip ;