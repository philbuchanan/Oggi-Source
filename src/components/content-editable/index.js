import { useRef } from 'react';

const ContentEditable = ({
	value = '',
	disabled,
	onSave,
	onChangeFocus,
	onEsc,
	...props
}) => {
	const editableRef = useRef(null);

	const onSaveValue = (event) => {
		onSave(event.target.innerText.trim(), editableRef);
	}

	return (
		<div
			ref={ editableRef }
			contentEditable={ disabled ? null : true }
			suppressContentEditableWarning={ disabled ? null : true }
			onFocus={ () => onChangeFocus(true) }
			onBlur={ (event) => {
				onChangeFocus(false);
				onSaveValue(event);
			} }
			onKeyDown={ (event) => {
				if (event.key === 'Enter') { // Enter key
					event.preventDefault();
					onSaveValue(event);
				}
				else if (event.key === 'Escape') { // Esc key
					onEsc(editableRef);
				}
			} }
			onChange={ (event) => setState(event.target.innerHTML) }
			{ ...props }
		>
			{ value }
		</div>
	);
};

export default ContentEditable;
