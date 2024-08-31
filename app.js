// Select elements
const keys = document.querySelectorAll('.key');
const display_input = document.querySelector('.display .input');
const display_output = document.querySelector('.display .output');
let input = "";

// Add event listeners to keys
for (let key of keys) {
	const value = key.dataset.key;
	key.addEventListener('click', () => {
		if (value == "clear") { // Clear display
			input = "";
			display_input.innerHTML = "";
			display_output.innerHTML = "";
		} else if (value == "backspace") { // Remove last char
			input = input.slice(0, -1);
			display_input.innerHTML = CleanInput(input);
		} else if (value == "=") { // Calculate result
			let result = eval(PerpareInput(input));
			display_output.innerHTML = CleanOutput(result);
		} else if (value == "brackets") { // Add bracket
			if (input.indexOf("(") == -1 || input.lastIndexOf("(") < input.lastIndexOf(")")) {
				input += "(";
			} else {
				input += ")";
			}
			display_input.innerHTML = CleanInput(input);
		} else if (ValidateInput(value)) { // Add input
			input += value;
			display_input.innerHTML = CleanInput(input);
		}
	});
}

// Format input
function CleanInput(input) {
	return input.split("").map(char => {
		if (char == "*") return ` <span class="operator">x</span> `;
		if (char == "/") return ` <span class="operator">÷</span> `;
		if (char == "+") return ` <span class="operator">+</span> `;
		if (char == "-") return ` <span class="operator">-</span> `;
		if (char == "(") return `<span class="brackets">(</span>`;
		if (char == ")") return `<span class="brackets">)</span>`;
		if (char == "%") return `<span class="percent">%</span>`;
		return char;
	}).join("");
}

// Format output
function CleanOutput(output) {
	let [integer, decimal] = output.toString().split(".");
	integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return decimal ? `${integer}.${decimal}` : integer;
}

// Validate input
function ValidateInput(value) {
	const last_input = input.slice(-1);
	const operators = ["+", "-", "*", "/"];
	if (value == "." && last_input == ".") return false;
	if (operators.includes(value) && operators.includes(last_input)) return false;
	return true;
}

// Handle special input
function PerpareInput(input) {
	return input.replace(/%/g, "/100");
}
