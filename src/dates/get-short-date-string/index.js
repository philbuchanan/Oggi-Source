const getShortDateString = (date) => {
	if (typeof date.getMonth !== 'function') {
		return '';
	}

	const month = ('0' + (date.getMonth() + 1)).slice(-2);
	const day = ('0' + date.getDate()).slice(-2);

	return `${ date.getFullYear() }-${ month }-${ day }`;
};

export default getShortDateString;
