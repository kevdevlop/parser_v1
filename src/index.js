import _ from 'lodash';
import $ from 'jquery'
import 'bootstrap';
import './scss/app.scss';
import { InputStream, CommonTokenStream } from 'antlr4/index';
import { MyGrammarLexer, MyGrammarParser, MyGrammarVisitor } from './MyGrammar.g4';
 
 class MyVisitor extends MyGrammarVisitor {

 	constructor(memoria) {
 		super();
	    this.memoria = memoria
	  }

 	visitMulDiv(ctx){
 		var left = this.visit(ctx.expr(0));
 		var right = this.visit(ctx.expr(1));
 		console.log("visitMulDiv "+"left: "+left + "right: "+right);

 		if (right != null)
            {
                if (ctx.DIV(0) == null)
                {
                    return left * right;

                }

                return left / right;
            }
        return left;
 	}

 	visitAssign(ctx){
 		var id = ctx.ID().getText();
 		var value = this.visit(ctx.expr());
 		this.memoria[id] = value;
 		console.log(this.memoria);
 		return value;
 	}

 	visitPrintExpr(ctx){
 		var value = this.visit(ctx.expr());
		console.log("print "+value);
 		return value;
 	}

 	visitAddSuv(ctx){
 		var left = this.visit(ctx.expr(0));
 		var right = this.visit(ctx.expr(1));
 		console.log("visitAddSuv "+"left: "+left + "right: "+right);
 		if (right != null)
            {
                if (ctx.ADD(0) == null)
                {
                    return left - right;

                }

                return left + right;
            }
        return left;
 	}

 	visitId(ctx){
 		var id = ctx.ID().getText();
 		if ( this.containsKey(this.memoria, id) ) return this.memoria[id];
 		console.log("visitId "+this.memoria);
 		return id;
 	}

 	visitParens(ctx){
 		console.log("visitParens "+ctx.getText());
 		return this.visit(ctx.expr());
 	}

 	visitInt(ctx){
 		console.log("visitInt "+ctx.getText());
 		return parseInt(ctx.INT().getText());
 	}

    visitPi(ctx){
        console.log("visitInt "+ctx.getText());
        return 3.14159265358979323846;
    }

    visitPow(ctx){
        var left = this.visit(ctx.expr(0));
        var right = this. visit(ctx.expr(1));
        console.log("visitPow "+"left: "+left + "right: "+right);

        if (right != null) {
            return Math.pow(left, right);
        }
        return left;
    }

    visitMod(ctx){
        var left = this.visit(ctx.expr(0));
        var right = this. visit(ctx.expr(1));
        console.log("visitPow "+"left: "+left + "right: "+right);

        if (right != null) {
            return left % right;
        }
        return left;
    }

    visitFact(ctx) {
        var left = this.visit(ctx.expr(0));
        var total = 1;
        var i=1; 
        for (i=1; i<=left; i++) {
            total = total * i; 
        }
        return total; 
    }

    visitFuncion(ctx){
        var type = this.getStrinToFunciones(ctx.getText());
        console.log("visitFuncion "+type);
        switch (type)
            {
                case "cos":
                    console.log("cos");
                    return Math.cos(this.visit(ctx.expr()));

                case "sin":
                    console.log("sin");
                    return Math.sin(this.visit(ctx.expr()));

                case "tan":
                    console.log("tan");
                    return Math.tan(this.visit(ctx.expr()));

                case "acos":
                    console.log("acos");
                    return Math.acos(this.visit(ctx.expr()));

                case "asin":
                    console.log("asin");
                    return Math.asin(this.visit(ctx.expr()));

                case "atan":
                    console.log("atan");
                    return Math.atan(this.visit(ctx.expr()));

                case "ln":
                    console.log("ln");
                    return Math.log(this.visit(ctx.expr()));

                case "log":
                    console.log("log");
                    return Math.log(this.visit(ctx.expr()));

                case "sqrt":
                    console.log("raiz");
                    return Math.sqrt(this.visit(ctx.expr()));
            }

        return this.visit(ctx.expr());
    }

 	containsKey(array,id) {
 		for (var key in array) {
 			if (key === id) {
 				return true;
 			}
 		}
 		return false;
 	}

    getStrinToFunciones(string){
        var i=0;
        var salida = ""
        while(string[i] != '('){
            salida += string[i];
            i++;
        }
        return salida;
    }
 }


document.getElementById("btnAntlr").addEventListener("click", initAntlr);
document.getElementById("btnClear").addEventListener("click", clear);

function initAntlr() {
  	var out = document.getElementById("textOut");
  	const input = document.getElementById("textInput").value;
	var mem = {}
	const lexer = new MyGrammarLexer(new InputStream(input));
	var tokens  = new CommonTokenStream(lexer);
	const parser = new MyGrammarParser(tokens);
	parser.buildParseTrees = true;
	var tree = parser.myStartRule()
	const result = new MyVisitor(mem).visit(tree);
  	out.value = result;
}

function clear() {
	// body...
	document.getElementById("textOut").value = "";
	document.getElementById("textInput").value = "";
}



