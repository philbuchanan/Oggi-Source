import { ToDo } from '../';
import {
	areSameDate,
	getDateString,
	getDayString,
	getDatetime,
	isPast,
} from '../../dates/';
import { classnames } from '../../utils/';
import './index.scss';

const Day = ({
	date,
	todos,
}) => {
	const today = new Date();

	return (
		<div className={ classnames(
			'c-day',
			isPast(date) ? 'is-past' : '',
			areSameDate(today, date) ? 'is-today' : '',
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
							<ToDo
								key={ `todo-${ todo.id }` }
								value={ todo.value }
								isComplete={ todo.complete }
								onChangeValue={ (value) => console.log(value) }
								onToggleComplete={ () => console.log('toggle complte') }
								onDelete={ () => console.log('delete') }
								onMoveToTomorrow={ () => console.log('move') }
							/>
						);
					}) }
					<ToDo
						newItem={ true }
						onChangeValue={ (value) => console.log(value) }
					/>
				</ul>
			</div>
		</div>
	);
};

export default Day;
