import axios from 'axios';
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api';

const getByName = async (name) => {
	const res = await axios.get(`${baseUrl}/name/${name}`).catch(() => {
		return { found: false };
	});

	if (res.status !== 200) {
		return { found: false };
	}

	const parsedCountry = {
		found: true,
		data: {
			name: res.data.name.common,
			capital: res.data.capital[0],
			population: res.data.population,
			flag: res.data.flags.png,
		},
	};

	return parsedCountry;
};

export default { getByName };
