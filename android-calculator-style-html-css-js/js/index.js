var number1 = 0;
var number2 = 0;
var operator = "";

function writeNumbers(number){
	if(operator == ""){
		number1 += number;
		txtScreen.value += number;
	}
	else{
		number2 += number;
		txtScreen.value += number;
	};
}

function operations(oper){
	if (oper == "!") {
		operator = oper;
		txtScreen.value += oper;

	}else if(oper == "^"){
		operator = oper;
		txtScreen.value = oper;

	}
	 else{
		operator = oper;
		txtScreen.value = "";
	};
}

function calculateResult(){

	var result;

	switch(operator){
		case "÷":
			result = parseFloat(number1) / parseFloat(number2);
			txtScreen.value = result;
			number1 = result;
			number2 = 0;
			operator = "";
			break;

		case "+":
			result = parseFloat(number1) + parseFloat(number2);
			txtScreen.value = result;
			number1 = result;
			number2 = 0;
			operator = "";
			break;

		case "-":
			result = parseFloat(number1) - parseFloat(number2);
			txtScreen.value = result;
			number1 = result;
			number2 = 0;
			operator = "";
			break;

		case "x":
			result = parseFloat(number1) * parseFloat(number2);
			txtScreen.value = result;
			number1 = result;
			number2 = 0;
			operator = "";
			break;

		case "!":
			result = 1;

			if (number1 != "") {

				for (var i = 1; i <= number1; i++) {
				result *= i;
				};

				txtScreen.value = result;
				number1 = result;
				number2 = 0;
				operator = "";
			}else{
				txtScreen.value = "Error. use: number!";
			};		

			break;

		case "^":
			if (number1 != 0 && number2 != 0) {
				
				result = Math.pow(number1, number2);

				txtScreen.value = result;
				number1 = result;
				number2 = 0;
				operator = "";
			}else{
				txtScreen.value = "use: base ^ exponent";
			};

			break;
	} //end of switch
}


function clearEverything() {
	number1 = 0;
	number2 = 0;
	operator = "";
	txtScreen.value = "";
}