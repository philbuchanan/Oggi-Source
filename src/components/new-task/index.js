import { useState } from 'react';
import { ContentEditable } from '../';
import { classnames } from '../../utils';

const NewTask = ({
	date,
	dispatch,
	placeholder = '+ Add',
}) => {
	const [isFocused, setIsFocused] = useState(false);

	return (
		<div
			className={ classnames(
				'c-task',
				isFocused ? 'is-focused' : ''
			) }
		>
			<ContentEditable
				className="c-task__edit"
				onChangeFocus={ (state) => setIsFocused(state) }
				onSave={ (value, ref) => {
					if (value !== '') {
						dispatch({
							type: 'add',
							value: value,
							date: date,
						});

						ref.current.innerText = '';
					}
				} }
				onEsc={ (ref) => ref.current.innerText = '' }
			/>
			<div className="c-task__edit-placeholder">
				{ placeholder }
			</div>
		</div>
	);
};

export default NewTask;
