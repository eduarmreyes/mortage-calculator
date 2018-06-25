(function() {
	function Input(id) {
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
		// add text to created element
		var empty_message = document.createTextNode(this.errorMessage);
		empty_tag.appendChild(empty_message);

		var the_input = document.getElementById(this.id);
		the_input.classList.add(this.inputErrorClass);
		the_input.classList.add('animated');
		the_input.classList.add('shake');

		the_input.parentNode.appendChild(empty_tag);
	};
	// End Input

	function Calculator(calculator_results_id) {
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

	Calculator.prototype.addClassName = function(className) {
		this.calculator_element.classList.add(className);
	};

	Calculator.prototype.setInterest = function(interestRateID) {
		this.interestRate = this.parseIt(interestRateID);
	};

	Calculator.prototype.setYearsOfMortgage = function(yearsOfMortgageID) {
		this.yearsOfMortgage = this.parseIt(yearsOfMortgageID);
	};

	Calculator.prototype.setLoanAmount = function(loanAmountID) {
		this.loanAmount = this.parseIt(loanAmountID);
	};

	Calculator.prototype.setAnnualTax = function(annualTaxID) {
		this.annualTax = this.parseIt(annualTaxID);
	};

	Calculator.prototype.setAnnualInsurance = function(annualInsuranceID) {
		this.annualInsurance = this.parseIt(annualInsuranceID);
	};

	Calculator.prototype.calculatePrincipleAndInterest = function(principleAndInterestsID) {
		var calculator_results_principle_and_interest = document.getElementById(principleAndInterestsID);
		this.principleAndInterests = ((this.interestRate / 100) / 12) * this.loanAmount / (1-Math.pow((1 + ((this.interestRate / 100)/12)), - this.yearsOfMortgage*12));

		this.setTextByElement(calculator_results_principle_and_interest, this.principleAndInterests);
	};

	Calculator.prototype.calculateTax = function(taxID) {
		var calculator_results_tax = document.getElementById(taxID);
		this.Tax = this.annualTax / 12;

		this.setTextByElement(calculator_results_tax, this.Tax);
	};

	Calculator.prototype.calculateInsurance = function(insuranceID) {
		var calculator_results_insurance = document.getElementById(insuranceID);
		this.Insurance = this.annualInsurance / 12;

		this.setTextByElement(calculator_results_insurance, this.Insurance);
	};

	Calculator.prototype.calculateTotal = function(totalID) {
		var calculator_results_total = document.getElementById(totalID);
		this.Total = this.principleAndInterests + this.Tax + this.Insurance;

		this.setTextByElement(calculator_results_total, this.Total);
	};

	Calculator.prototype.setTextByElement = function(element, amount) {
		element.innerText = this.formatter.format(amount);
	};

	Calculator.prototype.parseIt = function(id) {
		return parseFloat(document.getElementById(id).value, 10);
	};

	// todo: create class Calculator to calculate the mortage result
	var calculator = document.getElementById('calculator');

	calculator.addEventListener('submit', function(e) {
		e.preventDefault();
		if (!validate_form()) {
			console.log('form is not valid, stop submission');
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
		// https://caniuse.com/#search=scroll-behavior
		// this one only works on Chrome v.65+, Firefox v.59+ and Chrome 4 Android v.67
		// Safari is a no-no as well as IE, Edge, iOS Safari
		// in a real-case scenario I would use a polyfill found in
		// https://github.com/iamdustan/smoothscroll
		window.scrollBy({ top: 50, left: 0, behavior: 'smooth' });
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