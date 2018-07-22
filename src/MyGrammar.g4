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


ID	: [a-zA-Z]+ ;
NEWLINE : [\r\n]+ ;
INT     : [0-9]+ ;
MUL : '*' ;
DIV : '/' ;
ADD : '+' ;
SUB : '-' ;
LPAREN : '(' ;
RPAREN : ')' ;

WS	: [ \t]+ -> skip ;