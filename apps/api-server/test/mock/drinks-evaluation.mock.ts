export const mockDrinksEvaluation = {
	hasReview: true,
	weather: {
		Rainy: 2,
		Snowy: 1,
		Sunny: 0,
		Cloudy: 0,
	},
	time: {
		Evening: 2,
		Noon: 1,
		Midnight: 0,
		Dawn: 0,
	},
	companion: {
		Alone: 2,
		Friends: 1,
		Lover: 0,
		Gather: 0,
	},
	mood: {
		Funny: 2,
		Serious: 1,
		Romantic: 0,
		Crazy: 0,
		Gloomy: 0,
		Celebratory: 0,
		Delight: 0,
		Enjoy: 0,
	},
	spot: {
		'1': 2,
		'2': 1,
		'3': 0,
	},
	is_heavy: {
		Light: 1,
		Heavy: 3,
	},
	is_bitter: {
		Sweet: 1,
		Bitter: 3,
	},
	is_strong: {
		Mild: 1,
		Strong: 3,
	},
	is_burning: {
		Smooth: 1,
		Burning: 3,
	},
	taste: {
		Fruity: 2,
		Woody: 1,
		Noroong: 0,
		Creamy: 0,
		Earthy: 0,
		Flower: 0,
		Austere: 0,
		Chilli: 0,
		Unknown: 0,
	},
	pairing: {
		Grilled: 2,
		Fried: 1,
		Cheeze: 0,
		Salad: 0,
		Fruits: 0,
		Soup: 0,
		AppetizersSnacks: 0,
		Pasta: 0,
	},
};

export class MockDrinksEvaluationRepository {
	save = jest.fn().mockResolvedValue(mockDrinksEvaluation);

	async find() {
		return mockDrinksEvaluation;
	}
}
