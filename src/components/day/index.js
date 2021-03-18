import { EmptyState, TaskList } from '../';
import {
	areSameDate,
	getDateString,
	getDayOfWeekString,
	getYearMonthDayString,
	isAfterToday,
	isBeforeToday,
	isYesterday,
} from '../../dates/';
import { classnames } from '../../utils/';
import './index.scss';
import rocket from './rocket.png';

const Day = ({
	date,
	tasks,
	dispatch,
}) => {
	/**
	 * Split tasks into two arrays, one for completed tasks and the other for
	 * remaining tasks. Index `0` hold the completed tasks, index `1` holds the
	 * remaining tasks.
	 */
	const [completedTasks, remainingTasks] = tasks.reduce((tasks, task) => {
		task.complete
			? tasks[0].push(task)
			: tasks[1].push(task);

		return tasks;
	}, [[], []]);

	const hasTasks = tasks.length > 0;
	const isToday = areSameDate(new Date(), date);
	const isPast = isToday ? false : isBeforeToday(date);
	const isFuture = isToday || isPast ? false : isAfterToday(date);
	const yearMonthDayString = getYearMonthDayString(date);

	return (
		<div className={ classnames(
			'c-day',
			isPast ? 'is-past' : '',
			isToday ? 'is-today' : '',
			isFuture ? 'is-future' : '',
		) }>
			<div className="c-day__header">
				<h2 className="c-day__title">
					{ getDayOfWeekString(date) }
				</h2>
				<time
					datatime={ yearMonthDayString }
					className="c-day__date"
				>
					{ getDateString(date) }
				</time>
				{ isToday && hasTasks && remainingTasks.length === 0 && (
					<EmptyState>
						<div className="c-empty-state--rocket-icon">
							<img
								src={ rocket }
								alt="rocket illustration"
								width="30"
								height="30"
							/>
						</div>
						You’ve completed everything for the day!
					</EmptyState>
				) }
			</div>
			<div className="c-day__list">
				{ isPast && !hasTasks && isYesterday(date) && (
					<EmptyState
						style={ {
							marginTop: '40px',
						} }
					>
						Tasks you complete today<br/>will show up here tomorrow.
					</EmptyState>
				) }
				<TaskList
					isToday={ isToday }
					date={ yearMonthDayString }
					completedTasks={ completedTasks }
					remainingTasks={ remainingTasks }
					showAddButton={ !isPast }
					dispatch={ dispatch }
				/>
			</div>
		</div>
	);
};

export default Day;
