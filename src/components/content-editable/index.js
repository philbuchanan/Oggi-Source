import { useRef } from 'react';

const ContentEditable = ({
	value,
	onSave,
	onChangeFocus,
	onEsc,
	...props
}) => {
	const editableRef = useRef(null);

	const onSaveValue = (event) => {
		const value = event.target.innerText.trim();

		if (value !== '') {
			onSave(value, editableRef);
		}
	}

	return (
		<div
			ref={ editableRef }
			contentEditable={ true }
			suppressContentEditableWarning={ true }
			onFocus={ () => onChangeFocus(true) }
			onBlur={ (event) => {
				onChangeFocus(false);
				onSaveValue(event);
			} }
			onKeyDown={ (event) => {
				if (event.keyCode === 13) { // Enter key
					event.preventDefault();
					onSaveValue(event);
				}
				else if (event.keyCode === 27) { // Esc key
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
