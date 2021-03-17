import {
	EmptyState,
	Todo,
	NewTodo
} from '../';
import {
	areSameDate,
	getDateString,
	getDayString,
	getShortDateString,
	isAfterToday,
	isBeforeToday,
} from '../../dates/';
import { classnames } from '../../utils/';
import './index.scss';

const Day = ({
	date,
	todos,
	dispatch,
}) => {
	const sortedTodos = todos.sort((a, b) => a.order > b.order);
	const completedTasks = sortedTodos.filter((todo) => todo.complete);
	const remainingTasks = sortedTodos.filter((todo) => !todo.complete);
	const isToday = areSameDate(new Date(), date);
	const isPast = isBeforeToday(date);

	return (
		<div className={ classnames(
			'c-day',
			isPast ? 'is-past' : '',
			isToday ? 'is-today' : '',
			isAfterToday(date) ? 'is-future' : '',
		) }>
			<div className="c-day__header">
				<h2 className="c-day__title">
					{ getDayString(date) }
				</h2>
				<time
					datatime={ getShortDateString(date) }
					className="c-day__date"
				>
					{ getDateString(date) }
				</time>
				{ isToday && todos.length > 0 && remainingTasks.length === 0 && (
					<EmptyState showIcon={ true }>
						You’ve completed everything for the day!
					</EmptyState>
				) }
			</div>
			<div className="c-day__list">
				{ isPast && todos.length === 0 && (
					<EmptyState
						style={ {
							marginTop: '40px',
						} }
					>
						Tasks you complete today<br/>will show up here tomorrow.
					</EmptyState>
				) }
				<ul className="o-list-bare c-to-do__list">
					{ remainingTasks.map((todo, index) => {
						return (
							<li
								key={ `todo-${ todo.id }` }
								className="c-day__list-item"
							>
								<Todo
									id={ todo.id }
									value={ todo.value }
									date={ date }
									order={ todo.order }
									canMoveUp={ todo.order > 0 }
									canMoveDown={ todo.order < todos.length - 1 }
									isComplete={ todo.complete }
									dispatch={ dispatch }
								/>
							</li>
						);
					}) }
					{ !isPast && (
						<li className="c-day__list-item is-new">
							<NewTodo
								date={ date }
								dispatch={ dispatch }
								placeholder={ isToday && todos.length === 0 ? '+ Add some tasks to get your day started…' : '+ Add' }
							/>
						</li>
					) }
					{ completedTasks.map((todo, index) => {
						return (
							<li
								key={ `todo-${ todo.id }` }
								className={ classnames('c-day__list-item', !isPast && index === 0 ? 'has-separator' : '') }
							>
								<Todo
									id={ todo.id }
									value={ todo.value }
									date={ date }
									order={ todo.order }
									canMoveUp={ todo.order > 0 }
									canMoveDown={ todo.order < todos.length - 1 }
									isComplete={ todo.complete }
									dispatch={ dispatch }
								/>
							</li>
						);
					}) }
				</ul>
			</div>
		</div>
	);
};

export default Day;
