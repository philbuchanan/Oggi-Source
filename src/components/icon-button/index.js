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
	const [showTooltip, setShowTooltip] = useState(false);

	const focusChange = (value) => {
		setShowTooltip(value);
		onFocusChange(value);
	};

	let Icon = null;

	switch(icon) {
		case 'checkmark':
			Icon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
				<path fillRule="evenodd" d="M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM0 8a8 8 0 1116 0A8 8 0 010 8zm11.78-1.72a.75.75 0 00-1.06-1.06L6.75 9.19 5.28 7.72a.75.75 0 00-1.06 1.06l2 2a.75.75 0 001.06 0l4.5-4.5z"></path>
			</svg>;
			break;
		case 'trash':
			Icon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
				<path fillRule="evenodd" d="M6.5 1.75a.25.25 0 01.25-.25h2.5a.25.25 0 01.25.25V3h-3V1.75zm4.5 0V3h2.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H5V1.75C5 .784 5.784 0 6.75 0h2.5C10.216 0 11 .784 11 1.75zM4.496 6.675a.75.75 0 10-1.492.15l.66 6.6A1.75 1.75 0 005.405 15h5.19c.9 0 1.652-.681 1.741-1.576l.66-6.6a.75.75 0 00-1.492-.149l-.66 6.6a.25.25 0 01-.249.225h-5.19a.25.25 0 01-.249-.225l-.66-6.6z"></path>
			</svg>;
			break;
		case 'arrowUp':
			Icon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
				<path fillRule="evenodd" d="M3.47 7.78a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 0l4.25 4.25a.75.75 0 01-1.06 1.06L9 4.81v7.44a.75.75 0 01-1.5 0V4.81L4.53 7.78a.75.75 0 01-1.06 0z"></path>
			</svg>;
			break;
		case 'arrowDown':
			Icon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
				<path fillRule="evenodd" d="M13.03 8.22a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06 0L3.47 9.28a.75.75 0 011.06-1.06l2.97 2.97V3.75a.75.75 0 011.5 0v7.44l2.97-2.97a.75.75 0 011.06 0z"></path>
			</svg>;
			break;
		case 'arrowLeft':
			Icon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
				<path fillRule="evenodd" d="M7.78 12.53a.75.75 0 01-1.06 0L2.47 8.28a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 1.06L4.81 7h7.44a.75.75 0 010 1.5H4.81l2.97 2.97a.75.75 0 010 1.06z"></path>
			</svg>
			break;
		case 'arrowRight':
			Icon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
				<path fillRule="evenodd" d="M8.22 2.97a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06l2.97-2.97H3.75a.75.75 0 010-1.5h7.44L8.22 4.03a.75.75 0 010-1.06z"></path>
			</svg>
			break;
	}

	return (
		<Tooltip
			text={ label }
			isOpen={ showTooltip }
		>
			<button
				className="c-icon-button"
				onClick={ onClick }
				onMouseEnter={ () => setShowTooltip(true) }
				onMouseLeave={ () => setShowTooltip(false) }
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
