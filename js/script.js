let state = {
    numbers: {},
};

const initialState = {
    numbers: {
        firstNumber: null,
        secondNumber: null
    },
    operator: null,
    result: 0,
    startedCalculating: false
};

const $displayChain = $("#displayChain");
const $displayResult = $("#displayResult");

const $btnAC = $("#btnAC");
const $btnCE = $("#btnCE");
const $btnEquals = $("#btnEquals");

const $btnAdd = $("#btnAdd");
const $btnSubtract = $("#btnSubtract");
const $btnMultiply = $("#btnMultiply");
const $btnDivide = $("#btnDivide");

const $btn0 = $("#btn0");
const $btn1 = $("#btn1");
const $btn2 = $("#btn2");
const $btn3 = $("#btn3");
const $btn4 = $("#btn4");
const $btn5 = $("#btn5");
const $btn6 = $("#btn6");
const $btn7 = $("#btn7");
const $btn8 = $("#btn8");
const $btn9 = $("#btn9");
const $btnPeriod = $("#btnPeriod");

const setInitialState = () => state = {...initialState};

const setNumber = number => {
    !state.startedCalculating ?
        state.numbers.firstNumber = number
        :
        state.numbers.secondNumber = number
};

const setOperator = operator => {
    state.operator = operator;
    state.startedCalculating = true
};

const calculate = (operator) => {

    let result;

    switch (operator) {
        case "add":
            result = state.numbers.firstNumber + state.numbers.secondNumber;
            break;
        case "subtract":
            result = state.numbers.firstNumber - state.numbers.secondNumber;
            break;
        case "multiply":
            result = state.numbers.firstNumber * state.numbers.secondNumber;
            break;
        case "divide":
            result = state.numbers.firstNumber / state.numbers.secondNumber;
            break
    }

    state.result = result

};

const getResult = () => {

    calculate(state.operator);
    console.log(state.result);
    //render result
    setInitialState()

};

$btn0.on("click", () => setNumber(0));
$btn1.on("click", () => setNumber(1));
$btn2.on("click", () => setNumber(2));
$btn3.on("click", () => setNumber(3));
$btn4.on("click", () => setNumber(4));
$btn5.on("click", () => setNumber(5));
$btn6.on("click", () => setNumber(6));
$btn7.on("click", () => setNumber(7));
$btn8.on("click", () => setNumber(8));
$btn9.on("click", () => setNumber(9));

$btnAdd.on("click", () => setOperator("add"));
$btnSubtract.on("click", () => setOperator("subtract"));
$btnMultiply.on("click", () => setOperator("multiply"));
$btnDivide.on("click", () => setOperator("divide"));

$btnCE.on("click", setInitialState);
$btnEquals.on("click", getResult);