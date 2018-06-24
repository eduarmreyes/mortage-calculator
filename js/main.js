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
		// add text to created element
		var empty_message = document.createTextNode(this.errorMessage);
		empty_tag.appendChild(empty_message);

		var the_input = document.getElementById(this.id);
		the_input.classList.add(this.inputErrorClass);

		the_input.parentNode.appendChild(empty_tag);
	};

	// todo: create class Calculator to calculate the mortage result
	var calculator = document.getElementById('calculator');

	calculator.addEventListener('submit', function(e) {
		e.preventDefault();
		if (!validate_form()) {
			console.log('form is not valid');
			return false;
		}

		// calculate results
		console.log('calculating results');
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