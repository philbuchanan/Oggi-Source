import { classnames } from '../../utils';
import './index.scss';

const Tooltip = ({
	children,
	text,
	isOpen = false,
}) => {
	return (
		<div className={ classnames('c-tooltip', isOpen ? 'is-open' : '') }>
			{ children }
			{ isOpen && (
				<div className="c-tooltip__popover">
					{ text }
				</div>
			) }
		</div>
	);
};

export default Tooltip;
