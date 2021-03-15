import { areSameDate } from '../';

const isToday = (date) => {
	if (typeof date.getMonth !== 'function') {
		return '';
	}

	const today = new Date();

	return areSameDate(date, today);
};

export default isToday;
