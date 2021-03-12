const areSameDate = (a, b) => {
	if (
		typeof a.getMonth !== 'function'
		|| typeof b.getMonth !== 'function'
	) {
		return false;
	}

	return a.getDate() === b.getDate()
		&& a.getMonth() === b.getMonth()
		&& a.getFullYear() === b.getFullYear();
};

export default areSameDate;
