import { areSameDate } from '../';

const isYesterday = (date) => {
	if (typeof date.getMonth !== 'function') {
		return '';
	}

	const yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);

	return areSameDate(date, yesterday);
};

export default isYesterday;
