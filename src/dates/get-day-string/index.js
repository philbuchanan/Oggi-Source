import { daysOfWeek } from '../';

const getDayString = (date) => {
	if (typeof date.getMonth !== 'function') {
		return '';
	}

	return daysOfWeek[date.getDay()];
};

export default getDayString;
