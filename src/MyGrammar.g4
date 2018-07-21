grammar MyGrammar;
myStartRule:   (expr NEWLINE)* ;
expr:   expr (MUL|DIV) expr
    |   expr (ADD|SUB) expr
    |   INT
    |   LPAREN expr RPAREN
    ;
NEWLINE : [\r\n]+ ;
INT     : [0-9]+ ;
MUL : '*' ;
DIV : '/' ;
ADD : '+' ;
SUB : '-' ;
LPAREN : '(' ;
RPAREN : ')' ;