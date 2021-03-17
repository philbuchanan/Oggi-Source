import { useState } from 'react';
import { ContentEditable } from '../';
import { classnames } from '../../utils';

const NewTodo = ({
	date,
	dispatch,
}) => {
	const [isFocused, setIsFocused] = useState(false);

	return (
		<div
			className={ classnames(
				'c-to-do__item',
				isFocused ? 'is-focused' : ''
			) }
		>
			<ContentEditable
				className="c-to-do__edit"
				value=""
				onChangeFocus={ (state) => setIsFocused(state) }
				onSave={ (value, ref) => {
					dispatch({
						type: 'add',
						value: value,
						date: date,
					});

					ref.current.innerText = '';
				} }
				onEsc={ (ref) => ref.current.innerText = '' }
			/>
			<div className="c-to-do__edit-placeholder">
				+ Add
			</div>
		</div>
	);
};

export default NewTodo;
