import {
	Task,
	NewTask,
} from '../';
import { classnames } from '../../utils/';
import './index.scss';

const TaskList = ({
	isToday,
	date,
	completedTasks,
	remainingTasks,
	showAddButton = true,
	dispatch,
}) => {
	const taskCount = completedTasks.length + remainingTasks.length;
	const hasTasks = taskCount > 0;

	// Reusable function for both the completed and remaining task lists
	const taskMap = (task, index) => {
		return (
			<li
				key={ `task-${ task.id }` }
				className="c-task-list__item"
			>
				<Task
					id={ task.id }
					value={ task.value }
					date={ task.date }
					order={ task.order }
					canMoveUp={ task.order > 0 }
					canMoveDown={ task.order < remainingTasks.length - 1 }
					isComplete={ task.complete }
					dispatch={ dispatch }
				/>
			</li>
		);
	}

	return (
		<ul className="o-list-bare c-task-list">
			{ remainingTasks.map(taskMap) }
			{ showAddButton && (
				<li className={ classnames(
					'c-task-list__item',
					// If there are completed tasks, show a separator
					completedTasks.length > 0 ? 'has-separator' : ''
				) }>
					<NewTask
						date={ date }
						dispatch={ dispatch }
						placeholder={ isToday && !hasTasks
							? '+ Add some tasks to get your day started…'
							: '+ Add'
						}
					/>
				</li>
			) }
			{ completedTasks.map(taskMap) }
		</ul>
	);
};

export default TaskList;
