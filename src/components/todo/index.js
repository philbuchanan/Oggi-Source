import { classnames } from '../../utils';
import './index.scss';

const ToDo = ({
	value,
	isComplete,
	onChangeValue,
	onToggleComplete,
	onDelete,
	onMoveToTomorrow,
	newItem,
}) => {
	return (
		<li
			className={ classnames('c-to-do__item', isComplete ? 'is-complete' : '') }
			tabIndex="0"
		>
			<div
				className="c-to-do__edit"
				contentEditable={ true }
				suppressContentEditableWarning={ true }
				onBlur={ (event) => onChangeValue(event.target.innerText.trim()) }
				onKeyDown={ (event) => {
					if (event.keyCode === 13) {
						event.preventDefault();
						onChangeValue(event.target.innerText.trim());
					}
				} }
			>
				{ value }
			</div>
			{ !newItem && (
				<div className="c-to-do__actions">
					<button
						onClick={ onToggleComplete }
					>
						<span className="u-sr-only">
							Toggle Complete
						</span>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
							<path d="M17.28 9.28a.75.75 0 00-1.06-1.06l-5.97 5.97-2.47-2.47a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l6.5-6.5z"></path>
							<path fillRule="evenodd" d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM2.5 12a9.5 9.5 0 1119 0 9.5 9.5 0 01-19 0z"></path>
						</svg>
					</button>
					<button
						onClick={ onDelete }
					>
						<span className="u-sr-only">
							Delete
						</span>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
							<path fillRule="evenodd" d="M16 1.75V3h5.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H8V1.75C8 .784 8.784 0 9.75 0h4.5C15.216 0 16 .784 16 1.75zm-6.5 0a.25.25 0 01.25-.25h4.5a.25.25 0 01.25.25V3h-5V1.75z"></path>
							<path d="M4.997 6.178a.75.75 0 10-1.493.144L4.916 20.92a1.75 1.75 0 001.742 1.58h10.684a1.75 1.75 0 001.742-1.581l1.413-14.597a.75.75 0 00-1.494-.144l-1.412 14.596a.25.25 0 01-.249.226H6.658a.25.25 0 01-.249-.226L4.997 6.178z"></path>
							<path d="M9.206 7.501a.75.75 0 01.793.705l.5 8.5A.75.75 0 119 16.794l-.5-8.5a.75.75 0 01.705-.793zm6.293.793A.75.75 0 1014 8.206l-.5 8.5a.75.75 0 001.498.088l.5-8.5z"></path>
						</svg>
					</button>
					<button
						onClick={ onMoveToTomorrow }
					>
						<span className="u-sr-only">
							Move
						</span>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
							<path d="M22 4.25a.75.75 0 00-1.5 0v15a.75.75 0 001.5 0v-15zm-9.72 14.28a.75.75 0 11-1.06-1.06l4.97-4.97H1.75a.75.75 0 010-1.5h14.44l-4.97-4.97a.75.75 0 011.06-1.06l6.25 6.25a.75.75 0 010 1.06l-6.25 6.25z"></path>
						</svg>
					</button>
				</div>
			) }
		</li>
	);
};

export default ToDo;
