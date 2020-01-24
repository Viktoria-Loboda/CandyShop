'use strict';

(function() {
	const URL = 'https://js.dump.academy/candyshop/data';

	window.load = function(onSuccess, onError) {
		var xhr = new XMLHttpRequest();
		xhr.responseType = 'json';

		xhr.addEventListener('load', function() {
			if (xhr.status === 200) {
				onSuccess(xhr.response);
			} else {
				onError(xhr.status, xhr.statusText);
			}
		});

		xhr.addEventListener('error', function() {
			onError('Произошла ошибка соединения');
		});

		xhr.addEventListener('timeout', function() {
			onError('Запрос превысил время ожидания');
		});

		xhr.timeout = 10000; // 10сек

		xhr.open('GET', URL);
		xhr.send();
	} 
})();