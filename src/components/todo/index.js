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
	order,
	canMoveUp,
	canMoveDown,
	isComplete,
	dispatch,
}) => {
	const [isFocused, setIsFocused] = useState(false);

	return (
		<div
			className={ classnames(
				'c-to-do__item',
				`is-order-${ order + 1 }`,
				isComplete ? 'is-complete' : '',
				isFocused ? 'is-focused' : ''
			) }
		>
			<ContentEditable
				className="c-to-do__edit"
				value={ value }
				disabled={ isBeforeToday(date) }
				onChangeFocus={ (state) => setIsFocused(state) }
				onSave={ (value) => {
					if (value === '') {
						dispatch({
							type: 'remove',
							id: id,
							date: date,
							order: order,
						});
					}
					else {
						dispatch({
							type: 'update',
							id: id,
							value: value.trim(),
						});
					}
				} }
				onEsc={ (ref) => ref.current.innerText = value }
			/>
			{ !isBeforeToday(date) && (
				<div className="c-to-do__actions">
					<IconButton
						label={ isComplete ? 'Mark incomplete' : 'Mark complete' }
						icon="checkmark"
						onClick={ () => dispatch({
							type: 'toggleComplete',
							id: id,
						}) }
						onFocusChange={ (value) => setIsFocused(value) }
					/>
					<IconButton
						label="Delete"
						icon="trash"
						onClick={ () => {
							if (confirm(`Delete “${ value }”?`)) {
								dispatch({
									type: 'remove',
									id: id,
									date: date,
									order: order,
								});
							}
						} }
						onFocusChange={ (value) => setIsFocused(value) }
					/>
					<IconButton
						label="Move Up"
						icon="arrowUp"
						disabled={ canMoveUp ? null : true }
						onClick={ () => dispatch({
							type: 'moveToPosition',
							id: id,
							date: date,
							from: order,
							to: order - 1,
						}) }
						onFocusChange={ (value) => setIsFocused(value) }
					/>
					<IconButton
						label="Move Down"
						icon="arrowDown"
						disabled={ canMoveDown ? null : true }
						onClick={ () => dispatch({
							type: 'moveToPosition',
							id: id,
							date: date,
							from: order,
							to: order + 1,
						}) }
						onFocusChange={ (value) => setIsFocused(value) }
					/>
					{ isAfterToday(date) ? (
						<IconButton
							label="Move to today"
							icon="arrowLeft"
							onClick={ () => dispatch({
								type: 'moveToDate',
								id: id,
								order: order,
								from: date,
								to: new Date(date.getTime() - 864e5),
							}) }
							onFocusChange={ (value) => setIsFocused(value) }
						/>
					) : (
						<IconButton
							label="Move to tomorrow"
							icon="arrowRight"
							onClick={ () => dispatch({
								type: 'moveToDate',
								id: id,
								order: order,
								from: date,
								to: new Date(date.getTime() + 864e5),
							}) }
							onFocusChange={ (value) => setIsFocused(value) }
						/>
					) }
				</div>
			) }
		</div>
	);
};

export default Todo;
