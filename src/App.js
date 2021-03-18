import { useEffect, useState, useReducer } from 'react';
import { Day } from './components/';
import {
	areSameDate,
	getYearMonthDayString,
	isBeforeToday,
	isBeforeYesterday,
} from './dates/';
import { useLocalStorage } from './hooks/';
import { uuid } from './utils/';
import './App.scss';

function App() {
	const [today, setToday] = useState(new Date());

	const getDatesTasks = (state, date) => {
		const dateString = typeof date === 'string'
			? date : getYearMonthDayString(date);

		return state.reduce((tasks, task) => {
			if (dateString === task.date) {
				tasks.push(task);
			}

			return tasks;
		}, []);
	};

	const getDatesTaskCount = (tasks, date) => {
		return getDatesTasks(tasks, date).length;
	};

	const taskReducer = (state, action) => {
		switch (action.type) {
			case 'toggleComplete':
				return state.map(task => task.id === action.id
					? {...task, complete: !task.complete}
					: task
				);
			case 'add':
				return [...state, {
					id: uuid(),
					value: action.value,
					date: action.date,
					order: getDatesTaskCount(state, action.date),
					complete: false,
				}];
			case 'update':
				return state.map(task => task.id === action.id
					? {...task, value: action.value}
					: task
				);
			case 'remove':
				return state.reduce((newState, task) => {
					if (task.id !== action.id) {
						newState.push(
							task.date === action.date
							&& task.order > action.order
								? {...task, order: task.order - 1}
								: task
						);
					}

					return newState;
				}, []);
			case 'moveToDate':
				return state.map(task => {
					if (task.id === action.id) {
						return {
							...task,
							date: action.to,
							order: getDatesTaskCount(state, action.to),
						};
					}
					else if (
						task.date === action.from
						&& task.order > action.order
					) {
						return {
							...task,
							order: task.order - 1,
						};
					}

					return task;
				});
			case 'moveToPosition':
				const moveDirection = action.from - action.to;

				if (moveDirection === 0) {
					return state;
				}

				return state.reduce((reordered, task) => {
					let newTask = null;

					if (task.date === action.date) {
						if (action.id === task.id) {
							newTask = {...task, order: action.to};
						}
						else if (
							moveDirection < 0 // negative numbers mean move down
							&& task.order > action.from
							&& task.order <= action.to
						) {
							newTask = {...task, order: task.order - 1};
						}
						else if (
							moveDirection > 0 // positive numbers mean move up
							&& task.order >= action.to
							&& task.order < action.from
						) {
							newTask = {...task, order: task.order + 1};
						}
					}

					reordered.push(newTask ? newTask : task);

					return reordered;
				}, []);
			case 'replaceState':
				return action.state;
			default:
				return state;
		}
	}

	const [initialState, setTasks] = useLocalStorage('tasks', []);
	const [tasks, dispatch] = useReducer(taskReducer, initialState);

	useEffect(() => {
		let taskOrderStart = getDatesTaskCount(tasks, today);

		const updatedTasks = tasks.reduce((newTasks, task) => {
			const taskDate = new Date(`${ task.date }T00:00:00`);

			if (isBeforeToday(taskDate)) {
				if (!task.complete) {
					newTasks.push({
						...task,
						date: getYearMonthDayString(today),
						order: taskOrderStart,
					});

					taskOrderStart += 1;
				}
				else if (!isBeforeYesterday(taskDate)) {
					newTasks.push(task);
				}
			}
			else {
				newTasks.push(task);
			}

			return newTasks;
		}, []);

		dispatch({
			type: 'replaceState',
			state: updatedTasks,
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
	}, [getYearMonthDayString(today)]);

	useEffect(() => {
		setTasks(tasks.sort((a, b) => a.order > b.order));
	}, [JSON.stringify(tasks)]);

	return (
		<div className="c-app">
			{ [
				new Date(today.getTime() - 864e5),
				today,
				new Date(today.getTime() + 864e5),
			].map((day) =>
				<Day
					key={ `day-${ day.getDate() }` }
					date={ day }
					tasks={ getDatesTasks(tasks, day) }
					dispatch={ dispatch }
				/>
			) }
		</div>
	);
}

export default App;
