const isPast = (date) => {
	if (typeof date.getMonth !== 'function') {
		return false;
	}

	let now = new Date();

	now.setHours(0, 0, 0, 0);

	return date < now;
};

export default isPast;
