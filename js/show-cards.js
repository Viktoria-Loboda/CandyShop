(function () {
	var successHandler = function(data) {
		hideText();
		showCards(data);
	}

	/*скрытие текста собщающего о загрузке данных*/
	var hideText =  function() {
		document.querySelector('.catalog__cards').classList.remove('catalog__cards--load');
		document.querySelector('.catalog__load').classList.add('visually-hidden');
	}

	var showCards = function(data) {
		var fragment = document.createDocumentFragment();

		for (var i=0; i < data.length; i++) {
			fragment.appendChild(createCard(data[i]));
		}

		document.querySelector('.catalog__cards').appendChild(fragment);
	}

	/*создание картотчки товара*/
	var cardTemplate = document.querySelector('#card').content.querySelector('.catalog__card');

	var createCard = function(data) {
		var element = cardTemplate.cloneNode(true);

		checkDataCorrect(data); 

		element.classList.add(getAmount(data));
		element.querySelector('.stars__rating').classList.add(getRating(data));

		element.querySelector('.card__title').textContent = data.name;
		element.querySelector('.card__img').src = 'img/cards/' + data.picture;
		element.querySelector('.card__img').alt = data.name;
		element.querySelector('.card__price').innerHTML = data.price + '<span class="card__currency">₽</span><span class="card__weight"> /' + data.weight + 'Г</span></span>';
		element.querySelector('.star__count').textContent = '(' + data.rating.number + ')';
		element.querySelector('.card__characteristic').textContent = getSugarContent(data); 
		element.querySelector('.card__composition-list').textContent = data.nutritionFacts.contents;

		return element;
	}

	var getAmount = function(data) {
		if (data.amount === 0) { return 'card--soon' };
		if (data.amount > 5) { return 'card--in-stock' };
		if ((data.amount > 1) && (data.amount < 5)) { return 'card--little' };
	}

	var getRating = function(data) {
		if (data.rating.value === 1) { return 'stars__rating--one' };
		if (data.rating.value === 2) { return 'stars__rating--two' };
		if (data.rating.value === 3) { return 'stars__rating--three' };
		if (data.rating.value === 4) { return 'stars__rating--four' };
		if (data.rating.value === 5) { return 'stars__rating--five' };
	}

	var getSugarContent = function(data) {
		if (data.nutritionFacts.sugar === false) { 
			return 'Без сахара' 
		} else {
			return 'Содержит сахар';
		}
	}

	/*проверка корректности полученных данных*/
	var checkDataCorrect = function(data) {
		if (data.price === 0) {
			return data.price = 57;
		}

		/*сделать более большую проверку с уведомлениями и удалением этих данных или  заменой*/
	}

	window.load(successHandler, window.errorHandler);
})();