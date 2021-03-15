import { Todo, NewTodo } from '../';
import {
	areSameDate,
	getDateString,
	getDayString,
	getDatetime,
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
	const today = new Date();

	return (
		<div className={ classnames(
			'c-day',
			isBeforeToday(date) ? 'is-past' : '',
			areSameDate(today, date) ? 'is-today' : '',
			isAfterToday(date) ? 'is-future' : '',
		) }>
			<div className="c-day__header">
				<h2 className="c-day__title">
					{ getDayString(date) }
				</h2>
				<time
					datatime={ getDatetime(date) }
					className="c-day__date"
				>
					{ getDateString(date) }
				</time>
			</div>
			<div className="c-day__list">
				<ul className="o-list-bare c-to-do__list">
					{ todos.map((todo) => {
						return (
							<Todo
								key={ `todo-${ todo.id }` }
								todo={ todo }
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
