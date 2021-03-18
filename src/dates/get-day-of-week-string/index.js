import {
	daysOfWeek,
	isToday,
	isTomorrow,
	isYesterday,
} from '../';

const getDayOfWeekString = (date, useRelative = true) => {
	if (typeof date.getMonth !== 'function') {
		return '';
	}

	if (useRelative) {
		if (isToday(date)) {
			return 'Today';
		}
		else if (isYesterday(date)) {
			return 'Yesterday';
		}
		else if (isTomorrow(date)) {
			return 'Tomorrow';
		}
	}

	return daysOfWeek[date.getDay()];
};

export default getDayOfWeekString;
