import { Todo, NewTodo } from '../';
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
	return (
		<div className={ classnames(
			'c-day',
			isBeforeToday(date) ? 'is-past' : '',
			areSameDate(new Date(), date) ? 'is-today' : '',
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
			</div>
			<div className="c-day__list">
				<ul className="o-list-bare c-to-do__list">
					{ todos.sort((a, b) => a.order > b.order).map((todo, index) => {
						return (
							<Todo
								key={ `todo-${ todo.id }` }
								id={ todo.id }
								value={ todo.value }
								date={ date }
								order={ todo.order }
								canMoveUp={ todo.order > 0 }
								canMoveDown={ todo.order < todos.length - 1 }
								isComplete={ todo.complete }
								dispatch={ dispatch }
							/>
						);
					}) }
					{ !isBeforeToday(date) && (
						<NewTodo
							date={ date }
							dispatch={ dispatch }
						/>
					) }
				</ul>
			</div>
		</div>
	);
};

export default Day;
