
/**
 * @class AuthService
 * */
function AuthService($q, httpService, cacheService, appConstant) {
	
	function saveCredentials(username, passwd, userId) {
		cacheService.save('auth', {
			username: username,
			passwd: passwd,
			userId: userId
		});
	}

	return {
		isLoggedIn: function() {

			var deferred = $q.defer();

			var credentials = this.getCredentials();

			if (credentials.userId) {
				deferred.resolve(credentials.userId || false);
			} else {
				deferred.resolve(false);
			}

			return deferred.promise;
		},

		login: function(username, passwd, isRemember) {

			var deferred = $q.defer();

			if (username && passwd) {

				httpService
					.request('POST', 'anonymous/checkAuthentication', null, {
						username: username,
						password: passwd
					}, false)
					.then(function (res) {
						if (!res.id) {
							deferred.resolve(false);

						} else {

							console.log('appConstant.authSessionLifetime: ', appConstant.authSessionLifetime);

							if (isRemember) {
								cacheService.setLifetime(appConstant.authSessionLifetime);
							}

							saveCredentials(username, passwd, res.id, isRemember);
							deferred.resolve(res.id);
						}
					})
					.catch(function () {
						deferred.resolve(false);
					});
			} else {
				deferred.resolve(false);
			}

			return deferred.promise;
		},

		//TODO server side logout must be required!
		logout: function () {
			var deferred = $q.defer();
			cacheService.delete('auth');
			deferred.resolve(true);
			return deferred.promise;
		},

		getCredentials: function () {

			var authObj = cacheService.get('auth');

			return {
				username: authObj ? authObj.username : null,
				passwd: authObj ? authObj.passwd : null,
				userId: authObj ? authObj.userId : null
			};
		}
	};
}