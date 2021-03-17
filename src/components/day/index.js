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
	const remainingTasks = todos.filter((todo) => !todo.complete).length;
	const isToday = areSameDate(new Date(), date);

	return (
		<div className={ classnames(
			'c-day',
			isBeforeToday(date) ? 'is-past' : '',
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
				{ isToday && todos.length > 0 && remainingTasks === 0 && (
					<EmptyState showIcon={ true }>
						You’ve completed everything for the day!
					</EmptyState>
				) }
			</div>
			<div className="c-day__list">
				<ul className="o-list-bare c-to-do__list">
					{ todos.sort((a, b) => a.order > b.order).map((todo, index) => {
						return (
							<li
								key={ `todo-${ todo.id }` }
								className="c-to-do__list-item"
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
					{ !isBeforeToday(date) && (
						<NewTodo
							date={ date }
							dispatch={ dispatch }
							placeholder={ isToday && todos.length === 0 ? '+ Add some tasks to get your day started…' : '+ Add' }
						/>
					) }
				</ul>
			</div>
		</div>
	);
};

export default Day;
