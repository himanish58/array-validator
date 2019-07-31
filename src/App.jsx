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
			},
			submitButton: {
				background: '#0000ff',
				color: '#ffffff'
			},
			disabledSubmitButton: {
				background: '#cfcfcf'
			},
			clearButton: {
				background: '#ffffff',
				color: '#0000ff',
				border: '1px solid #0000ff'
			}
		};
	}

	isValidInput = (wholeInput, currentInput, prevInput) => {
		if (
			wholeInput.startsWith(',') ||
			wholeInput.startsWith('-') ||
			wholeInput.endsWith(',') ||
			wholeInput.endsWith('-')
		) {
			return false;
		}
		for (let i = 0; i < 10; i++) {
			if (i.toString() === currentInput) return true;
		}
		if (
			(currentInput === ',' && prevInput !== ',') ||
			(currentInput === '-' && prevInput !== '-') ||
			wholeInput.length === 0
		) {
			return true;
		}
		return false;
	};

	verifyDuplicate = (number, duplicateArr, uniqueInputArr) => {
		let defaultArr = this.state.defaultArr;
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
		return [duplicateArr, uniqueInputArr];
	};

	onChangeHandler = (e) => {
		let input = e.target.value;
		if (!input.length) {
			this.clearClickHandler();
			return;
		}
		if (this.isValidInput(input, input[input.length - 1], input[input.length - 2])) {
			this.setState({ error: false });
			let inputArr = input.split(',');
			let duplicateArr = [];
			let uniqueInputArr = [];
			for (let i = 0; i < inputArr.length; i++) {
				if (isNaN(inputArr[i]) && !inputArr[i].includes('-')) {
					let error = true;
					this.setState({ error, input });
					return;
				}
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
			this.setState({ duplicateArr, uniqueInputArr, input });
		} else {
			let error = true;
			this.setState({ error, input });
		}
	};

	submitClickHandler = () => {
		let { defaultArr, uniqueInputArr } = this.state;
		defaultArr.push(...uniqueInputArr);
		this.setState({ defaultArr }, () => {
			this.clearClickHandler();
		});
	};

	clearClickHandler = () => {
		let input = '';
		let duplicateArr = [];
		let uniqueInputArr = [];
		let error = false;
		this.setState({ input, duplicateArr, uniqueInputArr, error });
	};

	render() {
		let { input, error, duplicateArr, defaultArr } = this.state;
		let disableSubmit = error || !input.length;
		return (
			<div className="app">
				<h1>Array Validator</h1>
				<div className="sub-heading">
					Please enter numbers seperated by commas. No characters allowed except 0-9, space, '-' , ','
				</div>
				<TextField
					style={this.styles.textField}
					label="Enter Number"
					onChange={this.onChangeHandler}
					value={this.state.input}
					error={this.state.error}
				/>
				{this.state.error && <div className="error">*Input format is wrong</div>}
				<div className="buttons">
					<Button
						style={disableSubmit ? this.styles.disabledSubmitButton : this.styles.submitButton}
						disabled={disableSubmit}
						onClick={this.submitClickHandler}
					>
						Submit
					</Button>
					<Button style={this.styles.clearButton} onClick={this.clearClickHandler}>
						Clear
					</Button>
				</div>
				{!!duplicateArr.length && (
					<div className="duplicate">{`Duplicate Number(s) is/are ${duplicateArr}`}</div>
				)}
				<div className="default">{`Default Numbers are ${defaultArr}`}</div>
			</div>
		);
	}
}

export default App;
