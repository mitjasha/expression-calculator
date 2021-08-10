function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let solution = preprocessing(expr);
    while(solution.length !== 1){     
        solution = brackets(solution);
    }
    return Number(solution.join(''));    
}

function preprocessing(expr){
    newExpr = expr.replace(/\s+/g, '');
    arr = newExpr.match(/[+-/*()]|(-?\d+)/g);
    
    return arr;
}

function brackets(arr){
    if (arr instanceof Number){
        return arr;
    }else{
        let leftBrackets = arr.filter(el => el == "(");
        let rightBrackets = arr.filter(el => el == ")");
        if (leftBrackets.length !== rightBrackets.length){
            throw 'ExpressionError: Brackets must be paired';
        }else{
            if (!arr.includes('(')){
                return solve(arr);
            }else{
                startIndex = arr.lastIndexOf('(');
                lastIndex = arr.slice(startIndex).indexOf(')') + startIndex;
                subArray = arr.slice(startIndex + 1, lastIndex);
                arr.splice(startIndex, (lastIndex - startIndex) + 1, solve(subArray));
                return arr;
            }
        }    
    }    
}

function solve(arr){
    let result;
    while (arr.length != 1){
        if (arr.includes('/')){
            actionIndex = arr.indexOf('/');
            if (arr[actionIndex + 1] != 0){
                result = +arr[actionIndex - 1] / +arr[actionIndex + 1];            
            }else{
                throw 'TypeError: Division by zero.';
            }
            arr.splice(actionIndex - 1, 3, result);
        }else if(arr.includes('*')){
            actionIndex = arr.indexOf('*');
            result = +arr[actionIndex - 1] * +arr[actionIndex + 1];
            arr.splice(actionIndex - 1, 3, result);        
        }else if(arr.includes('-')){
            actionIndex = arr.indexOf('-');
            result = +arr[actionIndex - 1] - +arr[actionIndex + 1];
            arr.splice(actionIndex - 1, 3, result);
        }else if(arr.includes('+')){
            actionIndex = arr.indexOf('+');
            result = +arr[actionIndex - 1] + +arr[actionIndex + 1];
            arr.splice(actionIndex - 1, 3, result);
        }
    }
    return arr;
   
}

module.exports = {
    expressionCalculator
}