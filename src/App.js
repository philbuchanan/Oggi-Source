import { useEffect, useState, useReducer } from 'react';
import { Day } from './components/';
import {
	areSameDate,
	getShortDateString,
	isBeforeToday,
	isBeforeYesterday,
} from './dates/';
import { useLocalStorage } from './hooks/';
import { uuid } from './utils/';
import './App.scss';

function App() {
	const [today, setToday] = useState(new Date());

	const getDatesTodos = (state, date) => {
		const dateString = getShortDateString(date);

		return state.reduce((todos, todo) => {
			if (dateString === todo.date) {
				todos.push(todo);
			}

			return todos;
		}, []);
	};

	const getDatesTodoCount = (state, date) => {
		return getDatesTodos(state, date).length;
	};

	const todoReducer = (state, action) => {
		switch (action.type) {
			case 'toggleComplete':
				return state.map(todo => todo.id === action.id
					? {...todo, complete: !todo.complete}
					: todo
				);
			case 'add':
				return [...state, {
					id: uuid(),
					value: action.value,
					date: getShortDateString(action.date),
					order: getDatesTodoCount(state, action.date),
					complete: false,
				}];
			case 'update':
				return state.map(todo => todo.id === action.id
					? {...todo, value: action.value}
					: todo
				);
			case 'remove':
				let reorderDate = getShortDateString(action.date);

				return state.reduce((newState, todo) => {
					if (todo.id !== action.id) {
						newState.push(
							todo.date === reorderDate
							&& todo.order > action.order
								? {...todo, order: todo.order - 1}
								: todo
						);
					}

					return newState;
				}, []);
			case 'moveToDate':
				const fromDate = getShortDateString(action.from);
				const toDatesTodoCount = getDatesTodoCount(state, action.to);

				return state.map(todo => {
					if (todo.id === action.id) {
						return {
							...todo,
							date: getShortDateString(action.to),
							order: toDatesTodoCount,
						};
					}
					else if (
						todo.date === fromDate
						&& todo.order > action.order
					) {
						return {
							...todo,
							order: todo.order - 1,
						};
					}

					return todo;
				});
			case 'moveToPosition':
				const moveDirection = action.from - action.to;
				const day = getShortDateString(action.date);

				if (moveDirection === 0) {
					return state;
				}

				return state.reduce((reordered, todo) => {
					let newTodo = {...todo};

					if (todo.date === day) {
						if (action.id === todo.id) {
							newTodo = {...todo, order: action.to};
						}
						else if (
							moveDirection < 0 // negative numbers mean move down
							&& todo.order > action.from
							&& todo.order <= action.to
						) {
							newTodo = {...todo, order: todo.order - 1};
						}
						else if (
							moveDirection > 0 // positive numbers mean move up
							&& todo.order >= action.to
							&& todo.order < action.from
						) {
							newTodo = {...todo, order: todo.order + 1};
						}
					}

					reordered.push(newTodo);

					return reordered;
				}, []);
			case 'replaceState':
				return action.state;
			default:
				return state;
		}
	}

	const [initialState, setTodos] = useLocalStorage('todos', []);
	const [todos, dispatch] = useReducer(todoReducer, initialState);

	useEffect(() => {
		let todoOrderStart = getDatesTodoCount(todos, today);

		const updatedTodos = todos.reduce((newTodos, todo) => {
			const todoDate = new Date(`${ todo.date }T00:00:00`);

			if (isBeforeToday(todoDate)) {
				if (!todo.complete) {
					newTodos.push({
						...todo,
						date: getShortDateString(today),
						order: todoOrderStart,
					});

					todoOrderStart += 1;
				}
				else if (!isBeforeYesterday(todoDate)) {
					newTodos.push(todo);
				}
			}
			else {
				newTodos.push(todo);
			}

			return newTodos;
		}, []);

		dispatch({
			type: 'replaceState',
			state: updatedTodos,
		});

		// Rerun at the end of the day
		const midnight = new Date();
		midnight.setHours(24, 0, 0, 0);

		const endOfDayTimer = setTimeout(() => {
			setToday(new Date());
		}, midnight.getTime() - today.getTime() + 1000);

		return () => {
			clearTimeout(endOfDayTimer);
		}
	}, [getShortDateString(today)]);

	useEffect(() => {
		setTodos(todos);
	}, [JSON.stringify(todos)]);

	const days = [
		new Date(today.getTime() - 864e5),
		today,
		new Date(today.getTime() + 864e5),
	];

	return (
		<div className="c-app">
			{ days.map((day) => {
				return (
					<Day
						key={ `day-${ day.getDate() }` }
						date={ day }
						todos={ getDatesTodos(todos, day) }
						dispatch={ dispatch }
					/>
				);
			}) }
		</div>
	);
}

export default App;
