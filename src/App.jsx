import React, { Component } from 'react';
import './App.scss';

import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';

class App extends Component {
	constructor() {
		super();
		this.state = {
			defaultArr: ['1', '2', '3', '4', '5'],
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

	isValidInput = (wholeInput, input, prevInput) => {
		if (
			wholeInput.startsWith(',') ||
			wholeInput.startsWith('-') ||
			wholeInput.endsWith(',') ||
			wholeInput.endsWith('-')
		) {
			return false;
		}
		for (let i = 0; i < 10; i++) {
			if (i.toString() === input) return true;
		}
		if (
			(input === ',' && prevInput !== ',') ||
			(input === '-' && prevInput !== '-') ||
			this.state.input.length === 0
		) {
			return true;
		}
		return false;
	};

	verifyDuplicate = (number, duplicateArr, uniqueInputArr) => {
		// console.log({ number });
		// let duplicateArr = this.state.duplicateArr;
		let defaultArr = this.state.defaultArr;
		// let inputArr = [];
		// let uniqueInputArr = [];
		if (Array.isArray(number)) {
			for (let i = parseInt(number[0]); i <= parseInt(number[1]); i++) {
				i = i.toString();
				if (defaultArr.includes(i)) {
					duplicateArr.push(i);
				} else if (!uniqueInputArr.includes(i)) {
					uniqueInputArr.push(i);
				}
			}
		} else if (defaultArr.includes(number)) {
			duplicateArr.push(number);
		} else if (!uniqueInputArr.includes(number)) {
			uniqueInputArr.push(number);
		}
		console.log([duplicateArr, uniqueInputArr]);
		return [duplicateArr, uniqueInputArr];
	};

	onChangeHandler = (e) => {
		let input = e.target.value;
		this.setState({ input });
		if (this.isValidInput(input, input[input.length - 1], input[input.length - 2])) {
			this.setState({ error: false });
			let inputArr = input.split(',');
			console.log({ inputArr });
			let duplicateArr = [];
			let uniqueInputArr = [];
			for (let i = 0; i < inputArr.length; i++) {
				// let duplicateArr = [];
				// let uniqueInputArr = [];
				// let abc = [];
				if (inputArr[i].includes('-')) {
					let rangeInput = inputArr[i].split('-');
					if (rangeInput.length === 2 && parseInt(rangeInput[0]) < parseInt(rangeInput[1])) {
						let arr = this.verifyDuplicate(rangeInput, duplicateArr, uniqueInputArr);
						duplicateArr.push(...arr[0]);
						uniqueInputArr.push(...arr[1]);
					} else {
						let error = true;
						this.setState({ error });
					}
				} else {
					let arr = this.verifyDuplicate(inputArr[i], duplicateArr, uniqueInputArr);
					duplicateArr.push(...arr[0]);
					uniqueInputArr.push(...arr[1]);
				}
			}
			duplicateArr = [...new Set(duplicateArr)];
			uniqueInputArr = [...new Set(uniqueInputArr)];
			console.log({ duplicateArr, uniqueInputArr });
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
		// console.log(this.state);
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
