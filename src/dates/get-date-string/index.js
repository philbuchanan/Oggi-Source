import { monthsOfYear } from '../';

const getDateString = (date) => {
	if (typeof date.getMonth !== 'function') {
		return '';
	}

	return `${ monthsOfYear[date.getMonth()] } ${ date.getDate() }, ${ date.getFullYear() }`;
};

export default getDateString;
