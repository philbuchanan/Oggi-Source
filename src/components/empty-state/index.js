import './index.scss';
import rocket from './rocket.png';

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
				{ showIcon && (
					<div className="c-empty-state__icon">
						<img
							src={ rocket }
							alt="rocket illustration"
							width="30"
							height="30"
						/>
					</div>
				) }
				{ children }
			</div>
		</div>
	);
};

export default EmptyState;
