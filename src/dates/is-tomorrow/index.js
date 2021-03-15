import { areSameDate } from '../';

const isTomorrow = (date) => {
	if (typeof date.getMonth !== 'function') {
		return '';
	}

	const tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);

	return areSameDate(date, tomorrow);
};

export default isTomorrow;
