grammar MyGrammar;

myStartRule: stat+ ;

stat: expr NEWLINE
	| ID '=' expr NEWLINE
	| NEWLINE
	;

expr: expr (POR|DIV) expr
	| expr (MAS|MENOS) expr
	| NUMERO
	| ID
	| '(' expr ')'
	| expr2
	;

expr2: funTrig;

funTrig: opciones LPAREN expr RPAREN;

opciones: SIN
	| COS
	| TAN
	| LN
	| LOG
	| RAIZ
	;

ID	: [a-zA-Z]+ ;
NUMERO: [0-9]+  ['.' ['0' .. '9']+]? ;

MAS: '+' ;
MENOS: '-' ;
POR: '*' ;
DIV: '/' ;

SIN : 'sin';
COS : 'cos' ;
TAN : 'tan' ;
LN 	: 'ln' ;
LOG : 'log' ;
RAIZ: 'sqrt';
POT : 'pow' ;
PI: 'pi' ;

LPAREN : '(' ;
RPAREN : ')' ;

NEWLINE: '\r'? '\n' ;
WS	: [ \t]+ -> skip ;

