const isBeforeYesterday = (date) => {
	if (typeof date.getMonth !== 'function') {
		return '';
	}

	const testDate = new Date();
	testDate.setHours(0, 0, 0, 0);
	testDate.setDate(testDate.getDate() - 2);

	return date.getTime() < testDate.getTime();
};

export default isBeforeYesterday;
