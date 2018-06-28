(function() {

	// Create a new class called Input
	function Input(id) {
		// in the constructor, set the properties this class needs
		this.id = id;
		this.inputErrorClass = 'form--input--error';
		this.errorMessage = 'Mandatory field';
		this.errorMessageClass = 'form--input--error--message';
	}

	Input.prototype.isEmpty= function() {
		// if element is empty
		return document.getElementById(this.id).value === '';
	}

	Input.prototype.cleanErrorMessage = function() {
		var this_input = document.getElementById(this.id);
		// clean input first
		this_input.classList.remove(this.inputErrorClass);

		var errorMessageElement = this_input.parentNode.querySelector('.' + this.errorMessageClass);
		if (errorMessageElement !== null) {
			// remove node element
			errorMessageElement.parentNode.removeChild(errorMessageElement);
		}
	};

	Input.prototype.addErrorMessage = function() {
		this.cleanErrorMessage();
		// create p element
		var empty_tag = document.createElement('p');
		// add class to show error
		empty_tag.classList.add(this.errorMessageClass);
		empty_tag.classList.add('animated');
		empty_tag.classList.add('shake');
		// add text to the created element
		var empty_message = document.createTextNode(this.errorMessage);
		// append text message to the tag just created
		empty_tag.appendChild(empty_message);

		// add error classes to the input
		var the_input = document.getElementById(this.id);
		the_input.classList.add(this.inputErrorClass);
		the_input.classList.add('animated');
		the_input.classList.add('shake');

		the_input.parentNode.appendChild(empty_tag);
	};
	// End Input

	// Calculator class begins
	function Calculator(calculator_results_id) {
		// set all the properties the class needs
		// including a formatter to be used in different parts
		// of the class itself
		this.id = calculator_results_id;
		this.calculator_element = document.getElementById(this.id);

		this.formatter = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 2,
		});

		this.interestRate = 0;
		this.yearsOfMortgage = 0;
		this.loanAmount = 0;
		this.annualTax = 0;

		this.principleAndInterests = 0;
		this.Tax = 0;
		this.Insurance = 0;
	}

	// fn to add class to the class list of an element
	Calculator.prototype.addClassName = function(className) {
		this.calculator_element.classList.add(className);
	};

	// set the interest to the class
	Calculator.prototype.setInterest = function(interestRateID) {
		this.interestRate = this.parseIt(interestRateID);
	};

	// set the years of mortage to the class
	Calculator.prototype.setYearsOfMortgage = function(yearsOfMortgageID) {
		this.yearsOfMortgage = this.parseIt(yearsOfMortgageID);
	};

	// set loan amount to the class
	Calculator.prototype.setLoanAmount = function(loanAmountID) {
		this.loanAmount = this.parseIt(loanAmountID);
	};

	// set annual tax to the class
	Calculator.prototype.setAnnualTax = function(annualTaxID) {
		this.annualTax = this.parseIt(annualTaxID);
	};

	// set annual insurance to the class
	Calculator.prototype.setAnnualInsurance = function(annualInsuranceID) {
		this.annualInsurance = this.parseIt(annualInsuranceID);
	};

	// calculate the principle and interest of the class
	Calculator.prototype.calculatePrincipleAndInterest = function(principleAndInterestsID) {
		var calculator_results_principle_and_interest = document.getElementById(principleAndInterestsID);

		this.principleAndInterests = ((this.interestRate / 100) / 12) * this.loanAmount / (1-Math.pow((1 + ((this.interestRate / 100)/12)), - this.yearsOfMortgage*12));

		this.setTextByElement(calculator_results_principle_and_interest, this.principleAndInterests);
	};

	// calculate the tax
	Calculator.prototype.calculateTax = function(taxID) {
		var calculator_results_tax = document.getElementById(taxID);
		this.Tax = this.annualTax / 12;

		this.setTextByElement(calculator_results_tax, this.Tax);
	};

	// calculate the insurance
	Calculator.prototype.calculateInsurance = function(insuranceID) {
		var calculator_results_insurance = document.getElementById(insuranceID);
		this.Insurance = this.annualInsurance / 12;

		this.setTextByElement(calculator_results_insurance, this.Insurance);
	};

	// sum all previous properties to calculate the total
	Calculator.prototype.calculateTotal = function(totalID) {
		var calculator_results_total = document.getElementById(totalID);
		this.Total = this.principleAndInterests + this.Tax + this.Insurance;

		this.setTextByElement(calculator_results_total, this.Total);
	};

	// to change the text of the button to show recalculate
	Calculator.prototype.changeBtnText = function(text) {
		var calculator_btn = document.getElementById('calculator--button');
		calculator_btn.textContent = text;
	};

	// set text formatted by element and amount
	Calculator.prototype.setTextByElement = function(element, amount) {
		element.innerText = this.formatter.format(amount);
	};

	// retuns a parsedFloat amount
	Calculator.prototype.parseIt = function(id) {
		// the last value, 10, is by default
		// but it's a good practice to use it regardless of that
		return parseFloat(document.getElementById(id).value, 10);
	};

	// get form
	var calculator = document.getElementById('calculator');

	// on submit
	calculator.addEventListener('submit', function(e) {
		e.preventDefault();
		if (!validate_form()) {
			return false;
		}

		// calculate results

		// create formatter first, since it will be used many times
		var calculator_results = new Calculator('calculator-results');
		// set elements calculator needs to work
		calculator_results.setInterest('rate-of-interest');
		calculator_results.setYearsOfMortgage('years-of-mortage');
		calculator_results.setLoanAmount('loan-amount');
		calculator_results.setAnnualTax('annual-tax');
		calculator_results.setAnnualInsurance('annual-insurance');

		// having fun making calcs
		calculator_results.calculatePrincipleAndInterest('calculator-results--principle-and-interest');
		calculator_results.calculateTax('calculator-results--tax');
		calculator_results.calculateInsurance('calculator-results--insurance');
		calculator_results.calculateTotal('calculator-results--total');

		// animate results for the calculator
		calculator_results.addClassName('results--show');
		calculator_results.addClassName('animated');
		calculator_results.addClassName('slideInDown');

		calculator_results.changeBtnText('recalculate');
		// https://caniuse.com/#search=scroll-behavior
		// this one only works on Chrome v.65+, Firefox v.59+ and Chrome 4 Android v.67
		// Safari is a no-no as well as IE, Edge, iOS Safari
		// in a real-case scenario I would use a polyfill found in
		// https://github.com/iamdustan/smoothscroll
		window.scroll({
		  top: 2500, 
		  left: 0, 
		  behavior: 'smooth' 
		});
	});

	var range_years_of_mortage = document.getElementById('years-of-mortage');

	range_years_of_mortage.addEventListener('input', function(e) {
		var text_input = document.getElementById('years-of-mortage--text');
		text_input.value = this.value;
	});

	var years_of_mortage_text = document.getElementById('years-of-mortage--text');

	years_of_mortage_text.addEventListener('input', function(e) {
		var range_input = document.getElementById('years-of-mortage');
		range_input.value = this.value;
	});

	var range_rate_of_interest = document.getElementById('rate-of-interest');

	range_rate_of_interest.addEventListener('input', function(e) {
		var text_input = document.getElementById('rate-of-interest--text');
		text_input.value = this.value;
	});

	var years_of_mortage_text = document.getElementById('rate-of-interest--text');

	years_of_mortage_text.addEventListener('input', function(e) {
		var range_input = document.getElementById('rate-of-interest');
		range_input.value = this.value;
	});

	var validate_form = function() {
		// validate form
		var isFormClear = true;
		var loan_amount = new Input('loan-amount');
		var annual_tax = new Input('annual-tax');
		var annual_insurance = new Input('annual-insurance');

		// clean errors to make sure they're not shown when fields are filled
		loan_amount.cleanErrorMessage();
		annual_tax.cleanErrorMessage();
		annual_insurance.cleanErrorMessage();

		if (loan_amount.isEmpty()) {
			isFormClear = false;
			loan_amount.addErrorMessage();
		}
		if (annual_tax.isEmpty()) {
			isFormClear = false;
			annual_tax.addErrorMessage();
		}
		if (annual_insurance.isEmpty()) {
			isFormClear = false;
			annual_insurance.addErrorMessage();
		}

		return isFormClear;
	};
})();