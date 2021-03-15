const isBeforeToday = (date) => {
	if (date && typeof date.getMonth !== 'function') {
		return false;
	}

	let now = new Date();

	now.setHours(0, 0, 0, 0);

	return date < now;
};

export default isBeforeToday;
