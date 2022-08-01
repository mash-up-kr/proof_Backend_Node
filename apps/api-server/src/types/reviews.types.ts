export enum Weather {
	Rainy = 'Rainy',
	Snowy = 'Snowys',
	Sunny = 'Sunny',
	Cloudy = 'Cloudy',
}

export enum Time {
	Evenving = 'Evening',
	Noon = 'Noon',
	Midnight = 'Midnight',
	Dawn = 'Dawn',
}

export enum Companion {
	Alone = 'Alone',
	Friends = 'Friends',
	Lover = 'Lover',
	Gather = 'Gather',
}

export enum Mood { // 혼자서든 그 외든 '어떤 분위기로 마셨나요' 에 해당하는 모든 답변
	Funny = 'Funny',
	Serious = 'Serious',
	Romantic = 'Romantic',
	Crazy = 'Crazy',
	Gloomy = 'Gloomy',
	Celebratory = 'Celebratory', // 축하하는, 셀프 선물
	Delight = 'Delight',
	Enjoy = 'Enjoy',
}

export enum Taste {
	Fruity = 'Fruity', // 상큼달달한 과일
	Woody = 'Woody', // 묵직한 나무
	Noroong = 'Noroong', // 구수한 누룽지
	Creamy = 'Creamy', // 부드러운 우유
	Earthy = 'Earthy', // 쿰쿰함 흙냄새
	Flower = 'Flower', // 향긋한 꽃
	Austere = 'Austere', // 씁쓸한 인생
	Chilli = 'Chilli', // 매운 칠리
	Unknown = 'Unknown', // 잘 모르겠어요
}

export enum Pairing {
	Grilled = 'Grilled', // 구이류
	Fried = 'Fried', // 튀김/전
	Cheeze = 'Cheeze', // 치즈
	Salad = 'Salad', // 샐러드
	Fruits = 'Fruits', // 과일
	Soup = 'Soup', // 국물/스프
	AppetizersSnacks = 'AppetizersSnacks', // 디저트
	Pasta = 'Pasta', // 면류
}
