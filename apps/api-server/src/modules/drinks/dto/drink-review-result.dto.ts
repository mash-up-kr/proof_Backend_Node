export class DrinkReviewResultDto {
	hasReview: boolean;
	weather: DrinkReviewResultWeatherDto;
	time: DrinkReviewResultTimeDto;
	companion: DrinkReviewResultCompanionDto;
	mood: DrinkReviewResultMoodDto;
	spot: DrinkReviewResultSpotDto;
	isHeavy: DrinkReviewResultIsHeavyDto;
	isBitter: DrinkReviewResultIsBitterDto;
	isStrong: DrinkReviewResultIsStrongDto;
	isBurning: DrinkReviewResultIsBurningDto;
	taste: DrinkReviewResultTasteDto;
	pairing: DrinkReviewResultPairingDto;
}
export class DrinkReviewResultWeatherDto {
	Rainy: number;
	Snowy: number;
	Sunny: number;
	Cloudy: number;
}

export class DrinkReviewResultTimeDto {
	Evening: number;
	Noon: number;
	Midnight: number;
	Dawn: number;
}

export class DrinkReviewResultCompanionDto {
	Alone: number;
	Friends: number;
	Lover: number;
	Gather: number;
}

export class DrinkReviewResultMoodDto {
	Funny: number;
	Serious: number;
	Romantic: number;
	Crazy: number;
	Gloomy: number;
	Celebratory: number;
	Delight: number;
	Enjoy: number;
}

export class DrinkReviewResultSpotDto {
	'1': number;
	'2': number;
	'3': number;
}

export class DrinkReviewResultIsHeavyDto {
	Light: number;
	Heavy: number;
}

export class DrinkReviewResultIsBitterDto {
	Sweet: number;
	Bitter: number;
}

export class DrinkReviewResultIsStrongDto {
	Mild: number;
	Strong: number;
}

export class DrinkReviewResultIsBurningDto {
	Smooth: number;
	Burning: number;
}

export class DrinkReviewResultTasteDto {
	Fruity: number;
	Woody: number;
	Noroong: number;
	Creamy: number;
	Earthy: number;
	Flower: number;
	Austere: number;
	Chilli: number;
	Unknown: number;
}

export class DrinkReviewResultPairingDto {
	Grilled: number;
	Fried: number;
	Cheeze: number;
	Salad: number;
	Fruits: number;
	Soup: number;
	AppetizersSnacks: number;
	Pasta: number;
}
