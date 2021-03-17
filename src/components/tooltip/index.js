import { useEffect, useState } from 'react';
import { classnames } from '../../utils';
import './index.scss';

const Tooltip = ({
	children,
	text,
	isOpen = false,
	delay = 1000,
}) => {
	const [showTooltip, setShowTooltip] = useState(false);

	useEffect(() => {
		let timer = null;

		if (isOpen) {
			timer = setTimeout(() => {
				setShowTooltip(true);
			}, delay);
		}
		else {
			clearTimeout(timer);
			setShowTooltip(false);
		}

		return () => {
			clearTimeout(timer);
		}
	}, [isOpen]);

	return (
		<div className={ classnames('c-tooltip', showTooltip ? 'is-open' : '') }>
			{ children }
			{ showTooltip && (
				<div className="c-tooltip__popover">
					{ text }
				</div>
			) }
		</div>
	);
};

export default Tooltip;
