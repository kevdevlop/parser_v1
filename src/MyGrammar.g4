grammar MyGrammar;

myStartRule: stat+ ;

stat: expr NEWLINE  		#printExpr
	| ID '=' expr NEWLINE 	#Assign
	| NEWLINE				#blank
	;

expr: expr (MUL|DIV) expr 	#MulDiv
	| expr (ADD|SUB) expr 	#AddSuv
	| INT					#int
	| ID					#id
	| LPAREN expr RPAREN	#parens
	;



POINT : '.';
POW : '^';

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

SIN : 'sin';
COS : 'cos' ;
TAN : 'tan' ;
LN 	: 'ln' ;
LOG : 'log' ;
RAIZ: 'sqrt';
PI: 'pi' ;

NUMERO_CIENTIFICO : NUMERO (('E' | 'e') SIGN? NUMERO)?;
SIGN : ('+' | '-');

WS	: [ \t]+ -> skip ; 