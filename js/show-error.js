(function() {
	window.errorHandler = function(status, statusText) {
		switch (status) {
			case 400: 
				console.log('Неверный запрос' + ' ' + status);
				break;
			case  401: 
				console.log('Пользователь не авторизован' + ' ' + status);
				break;
			case 404: 
				console.log('Ничего не найдено' + ' ' + status);
				break;
			default:
				console.log('Статус ответа: ' + status + ' ' + statusText);
		}
	}
})();