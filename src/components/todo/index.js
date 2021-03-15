import { useState } from 'react';
import {
	isAfterToday,
	isBeforeToday,
} from '../../dates/';
import {
	ContentEditable,
	IconButton,
} from '../';
import { classnames } from '../../utils';
import './index.scss';

const Todo = ({
	todo,
	dispatch,
}) => {
	const [isFocused, setIsFocused] = useState(false);

	const todoDate = new Date(`${ todo.date }T00:00:00`);

	return (
		<li
			className={ classnames(
				'c-to-do__item',
				todo.complete ? 'is-complete' : '',
				isFocused ? 'is-focused' : ''
			) }
		>
			<ContentEditable
				className="c-to-do__edit"
				value={ todo.value }
				onChangeFocus={ (state) => setIsFocused(state) }
				onSave={ (value) => dispatch({
					type: 'update',
					id: todo.id,
					value: value,
				}) }
				onEsc={ (ref) => ref.current.innerText = todo.value }
			/>
			{ !isBeforeToday(todoDate) && (
				<div className="c-to-do__actions">
					<IconButton
						label={ todo.complete ? 'Mark imcomplete' : 'Mark complete' }
						icon="checkmark"
						onClick={ () => dispatch({
							type: 'toggleComplete',
							id: todo.id,
						}) }
						onFocus={ () => setIsFocused(true) }
						onBlur={ () => setIsFocused(false) }
					/>
					<IconButton
						label="Delete"
						icon="trash"
						onClick={ () => {
							if (confirm(`Delete “${ todo.value }”?`)) {
								dispatch({
									type: 'remove',
									id: todo.id,
								});
							}
						} }
						onFocus={ () => setIsFocused(true) }
						onBlur={ () => setIsFocused(false) }
					/>
					{ isAfterToday(todoDate) ? (
						<IconButton
							label="Move to today"
							icon="moveLeft"
							onClick={ () => dispatch({
								type: 'moveToDate',
								id: todo.id,
								date: new Date(todoDate.getTime() - 864e5),
							}) }
							onFocus={ () => setIsFocused(true) }
							onBlur={ () => setIsFocused(false) }
						/>
					) : (
						<IconButton
							label="Move to tomorrow"
							icon="moveRight"
							onClick={ () => dispatch({
								type: 'moveToDate',
								id: todo.id,
								date: new Date(todoDate.getTime() + 864e5),
							}) }
							onFocus={ () => setIsFocused(true) }
							onBlur={ () => setIsFocused(false) }
						/>
					) }
				</div>
			) }
		</li>
	);
};

export default Todo;
