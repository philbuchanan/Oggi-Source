import './index.scss';

const EmptyState = ({
	showIcon = false,
	children,
	...props
}) => {
	return (
		<div
			className="c-empty-state"
			{ ...props }
		>
			<div className="c-empty-state__content">
				{ children }
			</div>
		</div>
	);
};

export default EmptyState;
