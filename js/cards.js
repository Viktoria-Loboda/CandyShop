var GOODS__NAMES = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие', 'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка', 'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа', 'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет', 'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное', 'Острый язычок'];
var GOODS__IMG = ['img/cards/gum-cedar.jpg', 'img/cards/gum-chile.jpg', 'img/cards/gum-eggplant.jpg', 'img/cards/gum-mustard.jpg', 'img/cards/gum-portwine.jpg', 'img/cards/gum-wasabi.jpg', 'img/cards/ice-cucumber.jpg', 'img/cards/ice-eggplant.jpg','img/cards/ice-garlic.jpg', 'img/cards/ice-italian.jpg', 'img/cards/ice-mushroom.jpg', 'img/cards/ice-pig.jpg','img/cards/marmalade-beer.jpg', 'img/cards/marmalade-caviar.jpg','img/cards/marmalade-corn.jpg', 'img/cards/marmalade-new-year.jpg', 'img/cards/marmalade-sour.jpg', 'img/cards/marshmallow-bacon.jpg', 'img/cards/marshmallow-beer.jpg', 'img/cards/marshmallow-shrimp.jpg', 'img/cards/marshmallow-spicy.jpg',
'img/cards/marshmallow-wine.jpg', 'img/cards/soda-bacon.jpg', 'img/cards/soda-celery.jpg', 'img/cards/soda-cob.jpg', 'img/cards/soda-garlic.jpg', 'img/cards/soda-peanut-grapes.jpg', 'img/cards/soda-russian.jpg'];
var GOODS__CONTENT__ITEM = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца', 'ароматизатор дуба идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор', 'консервант: сорбат калия', 'посолочная смесь: соль, нитрит натрия', 'ксилит', 'карбамид', 'вилларибо', 'виллабаджо'];
var GOODS__COUNT = 26;

/*функция для получения элемента массива*/
function getRandomElement(arr) {
  var index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

/*функция для получения числа*/
function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*функция для получения строки содержание*/
function getRandomStroke(arr) {
	var strokeLength = getRandomInteger(4, 10);
	var content = '';

	for (var i = 0; i < strokeLength; i++) {
		var stroke = getRandomInteger(0, arr.length);

		if (i !== (strokeLength-1)) {
			content += arr[stroke] + ', ';
		} else {
			content += arr[stroke] + '.';
		}
	}

	return content;
}

function generationObject(countObjects) {
	var object = [];

	for(var i = 0; i < countObjects; i++) {
		object[i] = {
			name: getRandomElement(GOODS__NAMES),
			picture: getRandomElement(GOODS__IMG),
			amount: getRandomInteger(0, 20), // количество
			price: getRandomInteger(100, 1500),
			weigth: getRandomInteger(30, 300),
			rating: {
				value: getRandomInteger(1, 5),
				number: getRandomInteger(10, 900)
			},
			nutritionFacts: {
				sugar: getRandomInteger(0, 1),
				energy: getRandomInteger(70, 500),
				contents: getRandomStroke(GOODS__CONTENT__ITEM)
			}
		}
	}

	return object;
}

let cardObject = generationObject(GOODS__COUNT);

//------
document.querySelector('.catalog__cards').classList.remove('catalog__cards--load');
document.querySelector('.catalog__load').classList.add('visually-hidden');

//-------
var cardTemplate = document.querySelector('#card').content.querySelector('.catalog__card');

function createCard(arr) {
	var cardElement = cardTemplate.cloneNode(true);

	cardElement.querySelector('.card__title').textContent = arr[i].name;
	cardElement.querySelector('.card__img').src = arr[i].picture;
	cardElement.querySelector('.card__img').alt = arr[i].name;
	cardElement.querySelector('.card__price').textContent = arr[i].price;

	var cardCurrency = document.createElement('span');
	cardCurrency.classList.add('card__currency');
	cardCurrency.textContent = "₽";

	var cardWeight = document.createElement('span');
	cardWeight.classList.add('card__weight');
	cardWeight.textContent = '/ ' + arr[i].weigth + ' Г';

	cardElement.querySelector('.card__price').appendChild(cardCurrency);
	cardElement.querySelector('.card__price').appendChild(cardWeight);

	if (arr[i].amount === 0) {
		cardElement.classList.add('card--soon');
	} else if ((arr[i].amount > 1) && (arr[i].amount < 5)) {
		cardElement.classList.add('card--little');
	} else if (arr[i].amount > 5) {
		cardElement.classList.add('card--in-stock');
	}

	var startRating = cardElement.querySelector('.stars__rating');
	if (arr[i].rating.value === 1) {
		startRating.classList.add('stars__rating--one');
	} else if (arr[i].rating.value === 2) {
		startRating.classList.add('stars__rating--two');
	} else if (arr[i].rating.value === 3) {
		startRating.classList.add('stars__rating--three');
	} else if (arr[i].rating.value === 4) {
		startRating.classList.add('stars__rating--four');
	} else {
		startRating.classList.add('stars__rating--five');
	}

	cardElement.querySelector('.star__count').textContent = '(' + arr[i].rating.number + ')';

	if (arr[i].nutritionFacts.sugar === 0) {
		cardElement.querySelector('.card__characteristic').textContent = 'Без сахара';
	} else {
		cardElement.querySelector('.card__characteristic').textContent = 'Содержит сахар';
	}

	cardElement.querySelector('.card__composition-list').textContent = arr[i].nutritionFacts.contents;

	return cardElement;
}


var fragment = document.createDocumentFragment();

for (var i = 0; i < GOODS__COUNT; i++) {
	var obj = createCard(cardObject, i);

	fragment.appendChild(obj); 
}

document.querySelector('.catalog__cards').appendChild(fragment);
//--------------

// function generateCardOrderObject(countObjects) {
// 	var orderCard = [];

// 	for (var i = 0; i < countObjects; i++) {
// 		orderCard[i] = {
// 			name: cardObject[i].name,
// 			picture: cardObject[i].picture,
// 			price: cardObject[i].price 
// 		}
// 	}

// 	return orderCard;
// }

// var cardOrderObject = generateCardOrderObject(GOODS__COUNT);

// var cardOrderTemplate = document.querySelector('#card-order').content.querySelector('.card-order');

// function createOrderCard(arr, i) {
// 	var cardElement = cardOrderTemplate.cloneNode(true);

// 	cardElement.querySelector('.card-order__title').textContent = arr[i].name;
// 	cardElement.querySelector('.card-order__img').src = arr[i].picture;
// 	cardElement.querySelector('.card-order__img').alt = arr[i].name;
// 	cardElement.querySelector('.card-order__img').textContent = arr[i].price;

// 	return cardElement;
// }

// var fragmentOrder = document.createDocumentFragment();

// for (var i = 0; i < GOODS__COUNT; i++) {
// 	var cardObj = createOrderCard(cardOrderObject, i);

// 	fragmentOrder.appendChild(cardObj); 
// }

// document.querySelector('.goods__cards').appendChild(fragmentOrder);


/*!!!!----- рефакторинг кода*/

/*Удалите у блока goods__cards класс goods__cards--empty и скройте при этом блок goods__card-empty.*/

document.querySelector('.goods__cards').classList.remove('good__cards--empty');
document.querySelector('.goods__card-empty').classList.add('visually-hidden');


/*!!!!----- рефакторинг кода*/

/*-----------------------------------------------------------4-ый урок---------------------------------------------------------------*/

var bntFavorite = document.querySelector('.card__btn-favorite');

bntFavorite.addEventListener('click', function() {
	this.classList.toggle('card__btn-favorite--selected');
});

//------------------------------

// clone = пустой объект + все свойства user
let cloneCardOrder = Object.assign({}, cardObject);


var cardOrderTemplate = document.querySelector('#card-order').content.querySelector('.card-order');

function createOrderCard(arr, i) {
	var cardElement = cardOrderTemplate.cloneNode(true);

	cardElement.querySelector('.card-order__title').textContent = arr[i].name;
	cardElement.querySelector('.card-order__img').src = arr[i].picture;
	cardElement.querySelector('.card-order__img').alt = arr[i].name;
	cardElement.querySelector('.card-order__img').textContent = arr[i].price;

	return cardElement;
}

var buttons = document.querySelectorAll('.catalog__card .card__btn');

var addedCardsInOrder = [];

function buttonClickHandler(element, index) {

	var indexs = index;

	element.addEventListener('click', function(evt) {
		if (addedCardsInOrder.indexOf(indexs) === -1) {
			document.querySelector('.goods__cards').appendChild(createOrderCard(cloneCardOrder, indexs));
			addedCardsInOrder.push(indexs);
		} else {
			console.log('нажато второй раз');
			/*увеличить количество при второрм нажатии*/

			var start = document.querySelector('.card-order__count').value;
			var numb = parseInt(start);
			numb += 1;

			document.querySelector('.card-order__count').value = numb;
		}
	})
}

for (var l=0; l < buttons.length; l++) {
	buttonClickHandler(buttons[l], l);
}


/*как проверить был нажат или нет этот элемент:

1. по индексу?,
1.1 создать массив добавленнных
1.2 проверять его после каждого клика
1.3 есть (изменять цифру)
1.4 нет добавлять
2. можно будет сделать паттерн наблюдатель*/