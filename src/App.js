import './App.scss';
import { Day } from './components/';
import { areSameDate } from './dates/';


function App() {
	const today = new Date();

	const getDatesToDos = (todos, date) => {
		return todos.reduce((datesTodos, todo) => {
			if (areSameDate(date, todo.date)) {
				datesTodos.push(todo);
			}

			return datesTodos;
		}, []);
	};

	let todos = [
		{
			id: 1,
			date: new Date(today.getTime() - 864e5),
			value: 'Call mom',
			complete: true,
		},
		{
			id: 2,
			date: new Date(),
			value: 'Call dad',
			complete: false,
		},
		{
			id: 3,
			date: new Date(),
			value: 'Get groceries for the following week, like milk',
			complete: false,
		},
	];

	const days = [
		new Date(today.getTime() - 864e5),
		today,
		new Date(today.getTime() + 864e5),
		new Date(today.getTime() + (864e5 * 2)),
		new Date(today.getTime() + (864e5 * 3)),
	];

	return (
		<div className="c-app">
			{ days.map((day) => {
				return (
					<Day
						key={ `day-${ day.getDate() }` }
						date={ day }
						todos={ getDatesToDos(todos, day) }
					/>
				);
			}) }
		</div>
	);
}

export default App;
