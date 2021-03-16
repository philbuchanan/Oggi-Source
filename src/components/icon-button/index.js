import { useState } from 'react';
import { Tooltip } from '../';
import './index.scss';

const IconButton = ({
	label,
	icon,
	onClick,
	onFocusChange,
	...props
}) => {
	const [isFocused, setIsFocused] = useState(false);

	const focusChange = (value) => {
		setIsFocused(value);
		onFocusChange(value);
	};

	let Icon = null;

	switch(icon) {
		case 'checkmark':
			Icon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
				<path d="M17.28 9.28a.75.75 0 00-1.06-1.06l-5.97 5.97-2.47-2.47a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l6.5-6.5z"></path>
				<path fillRule="evenodd" d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM2.5 12a9.5 9.5 0 1119 0 9.5 9.5 0 01-19 0z"></path>
			</svg>;
			break;
		case 'trash':
			Icon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
				<path fillRule="evenodd" d="M16 1.75V3h5.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H8V1.75C8 .784 8.784 0 9.75 0h4.5C15.216 0 16 .784 16 1.75zm-6.5 0a.25.25 0 01.25-.25h4.5a.25.25 0 01.25.25V3h-5V1.75z"></path>
				<path d="M4.997 6.178a.75.75 0 10-1.493.144L4.916 20.92a1.75 1.75 0 001.742 1.58h10.684a1.75 1.75 0 001.742-1.581l1.413-14.597a.75.75 0 00-1.494-.144l-1.412 14.596a.25.25 0 01-.249.226H6.658a.25.25 0 01-.249-.226L4.997 6.178z"></path>
				<path d="M9.206 7.501a.75.75 0 01.793.705l.5 8.5A.75.75 0 119 16.794l-.5-8.5a.75.75 0 01.705-.793zm6.293.793A.75.75 0 1014 8.206l-.5 8.5a.75.75 0 001.498.088l.5-8.5z"></path>
			</svg>;
			break;
		case 'arrowUp':
			Icon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
			<path fillRule="evenodd" d="M6.47 10.78a.75.75 0 010-1.06l5.25-5.25a.75.75 0 011.06 0l5.25 5.25a.75.75 0 11-1.06 1.06L13 6.81v12.44a.75.75 0 01-1.5 0V6.81l-3.97 3.97a.75.75 0 01-1.06 0z"></path>
			</svg>;
			break;
		case 'arrowDown':
			Icon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
				<path fillRule="evenodd" d="M4.97 13.22a.75.75 0 000 1.06l6.25 6.25a.75.75 0 001.06 0l6.25-6.25a.75.75 0 10-1.06-1.06l-4.97 4.97V3.75a.75.75 0 00-1.5 0v14.44l-4.97-4.97a.75.75 0 00-1.06 0z"></path>
			</svg>;
			break;
		case 'arrowLeft':
			Icon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
				<path fillRule="evenodd" d="M10.78 19.03a.75.75 0 01-1.06 0l-6.25-6.25a.75.75 0 010-1.06l6.25-6.25a.75.75 0 111.06 1.06L5.81 11.5h14.44a.75.75 0 010 1.5H5.81l4.97 4.97a.75.75 0 010 1.06z"></path>
			</svg>
			break;
		case 'arrowRight':
			Icon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
				<path fillRule="evenodd" d="M13.22 19.03a.75.75 0 001.06 0l6.25-6.25a.75.75 0 000-1.06l-6.25-6.25a.75.75 0 10-1.06 1.06l4.97 4.97H3.75a.75.75 0 000 1.5h14.44l-4.97 4.97a.75.75 0 000 1.06z"></path>
			</svg>
			break;
	}

	return (
		<Tooltip
			text={ label }
			isOpen={ isFocused }
		>
			<button
				className="c-icon-button"
				onClick={ onClick }
				onMouseEnter={ () => focusChange(true) }
				onMouseLeave={ () => focusChange(false) }
				onFocus={ () => focusChange(true) }
				onBlur={ () => focusChange(false) }
				{ ...props }
			>
				{ Icon }
			</button>
		</Tooltip>
	);
};

export default IconButton;
