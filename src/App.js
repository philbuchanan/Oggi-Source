import { useEffect, useReducer } from 'react';
import { Day } from './components/';
import { areSameDate, getShortDateString } from './dates/';
import { useLocalStorage } from './hooks/';
import { uuid } from './utils/';
import './App.scss';

function App() {
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
					complete: false,
				}];
			case 'update':
				return state.map(todo => todo.id === action.id
					? {...todo, value: action.value}
					: todo
				);
			case 'remove':
				return state.filter(todo => todo.id !== action.id);
			case 'moveToDate':
				return state.map(todo => todo.id === action.id
					? {...todo, date: getShortDateString(action.date)}
					: todo
				);
			default:
				return state;
		}
	}

	const [initialState, setTodos] = useLocalStorage('todos', []);
	const [todos, dispatch] = useReducer(todoReducer, initialState);


	useEffect(() => {
		setTodos(todos);
	}, [JSON.stringify(todos)]);

	const getDatesTodos = (todos, date) => {
		const dateString = getShortDateString(date);

		return todos.reduce((datesTodos, todo) => {
			if (dateString === todo.date) {
				datesTodos.push(todo);
			}

			return datesTodos;
		}, []);
	};

	const today = new Date();
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
