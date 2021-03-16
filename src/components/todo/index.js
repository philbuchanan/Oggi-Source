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
	id,
	value,
	date,
	isComplete,
	dispatch,
}) => {
	const [isFocused, setIsFocused] = useState(false);

	return (
		<li
			className={ classnames(
				'c-to-do__item',
				isComplete ? 'is-complete' : '',
				isFocused ? 'is-focused' : ''
			) }
		>
			<ContentEditable
				className="c-to-do__edit"
				value={ value }
				disabled={ isBeforeToday(date) }
				onChangeFocus={ (state) => setIsFocused(state) }
				onSave={ (value) => dispatch({
					type: 'update',
					id: id,
					value: value,
				}) }
				onEsc={ (ref) => ref.current.innerText = value }
			/>
			{ !isBeforeToday(date) && (
				<div className="c-to-do__actions">
					<IconButton
						label={ isComplete ? 'Mark imcomplete' : 'Mark complete' }
						icon="checkmark"
						onClick={ () => dispatch({
							type: 'toggleComplete',
							id: id,
						}) }
						onFocus={ () => setIsFocused(true) }
						onBlur={ () => setIsFocused(false) }
					/>
					<IconButton
						label="Delete"
						icon="trash"
						onClick={ () => {
							if (confirm(`Delete “${ value }”?`)) {
								dispatch({
									type: 'remove',
									id: id,
								});
							}
						} }
						onFocus={ () => setIsFocused(true) }
						onBlur={ () => setIsFocused(false) }
					/>
					{ isAfterToday(date) ? (
						<IconButton
							label="Move to today"
							icon="moveLeft"
							onClick={ () => dispatch({
								type: 'moveToDate',
								id: id,
								date: new Date(date.getTime() - 864e5),
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
								id: id,
								date: new Date(date.getTime() + 864e5),
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
