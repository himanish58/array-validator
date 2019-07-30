import React, { Component } from 'react';
import './App.scss';

import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';

class App extends Component {
	constructor() {
		super();
		this.state = {
			defaultArr: ['1', '2', '3', '4'],
			error: false,
			disableButton: true,
			input: '',
			inputArr: [],
			uniqueInputArr: [],
			duplicateArr: []
		};
		this.styles = {
			textField: {
				width: '40%'
			}
		};
	}

	isValidInput = (input, prevInput) => {
		for (let i = 0; i < 10; i++) {
			if (i.toString() === input) return true;
		}
		if ((input === ',' && prevInput !== ',') || (input === '-' && prevInput !== '-')) return true;
		return false;
	};

	verifyDuplicate = (number) => {
		console.log({ number });
		let duplicateArr = [];
		let defaultArr = [];
		let inputArr = [];
		let uniqueInputArr = [];
		if (Array.isArray(number)) {
			for (let i = number[0]; i <= number[1]; i++) {
				if (defaultArr.includes(i) && !duplicateArr.includes(i)) {
					duplicateArr.push(i);
				} else {
					inputArr.push(i);
				}
			}
		} else if (defaultArr.includes(number) && !duplicateArr.includes(number)) {
			duplicateArr.push(number);
		} else if (!duplicateArr.includes(number) && !uniqueInputArr.includes(number)) {
			uniqueInputArr.push(number);
		}
		this.setState({ duplicateArr, inputArr, uniqueInputArr });
	};

	onChangeHandler = (e) => {
		let input = e.target.value;
		this.setState({ input });
		if (input.endsWith(',') || input.endsWith('-')) {
			input = input.slice(0, input.length - 1);
		}
		if (input.length && this.isValidInput(input[input.length - 1], input[input.length - 2])) {
			let inputArr = input.split(',');
			console.log(inputArr);
			for (let i = 0; i < inputArr.length; i++) {
				if (inputArr[i].includes('-')) {
					let rangeInput = inputArr[i].split('-');
					if (rangeInput.length === 2 && rangeInput[0] < rangeInput[1]) {
						this.verifyDuplicate(rangeInput);
					} else {
						let error = true;
						this.setState({ error });
					}
				} else {
					this.verifyDuplicate(inputArr[i]);
				}
			}
		} else {
			let error = true;
			this.setState({ error });
		}
	};

	clearClickHandler = () => {
		let input = '';
		this.setState({ input });
	};

	render() {
		console.log(this.state);
		return (
			<div className="app">
				<h1>Array Validator</h1>
				<p>Please enter numbers seperated by commas</p>
				<TextField
					style={this.styles.textField}
					label="Enter Number"
					onChange={this.onChangeHandler}
					value={this.state.input}
					error={this.state.error}
				/>
				<div className="buttons">
					<Button disabled={this.state.error || this.state.disableButton}>Submit</Button>
					<Button onClick={this.clearClickHandler}>Clear</Button>
				</div>
				<div>Array : {`${this.state.defaultArr}`}</div>
			</div>
		);
	}
}

export default App;
