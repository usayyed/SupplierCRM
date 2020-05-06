// LocalStorageService.js
const LocalStorageService = (function(){
    var _service;
    function _getService() {
        if(!_service) {
          _service = this;
          return _service
      }
      return _service
    }

    function _setCredentials(credentials) {
      const date = new Date();
      localStorage.setItem('supplier_library_username', credentials.username);
      localStorage.setItem('supplier_library_password', credentials.password);
      localStorage.setItem('supplier_library_timeout', new Date( date.getTime() + 60 * 60 * 1000 ));
    }
    function _getUsername() {
      return localStorage.getItem('supplier_library_username');
    }
    function _getPassword() {
      return localStorage.getItem('supplier_library_password');
    }
    function _isLoggedIn() {
        return _getUsername() !== null && _getPassword() !== null && _getTimeout() !== null;
    }
    function _clearToken() {
      localStorage.removeItem('supplier_library_username');
      localStorage.removeItem('supplier_library_password');
    }
    function _getTimeout() {
      return localStorage.getItem('supplier_library_timeout');
  }
   return {
      getService : _getService,
      setCredentials : _setCredentials,
      getUsername : _getUsername,
      getPassword : _getPassword,
      clearToken : _clearToken,
      isLoggedIn: _isLoggedIn,
      getTimeout: _getTimeout,
    }
   })();
   export default LocalStorageService;