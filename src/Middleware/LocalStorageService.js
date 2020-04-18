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
      localStorage.setItem('supplier_library_username', credentials.username);
      localStorage.setItem('supplier_library_password', credentials.password);
    }
    function _getUsername() {
      return localStorage.getItem('supplier_library_username');
    }
    function _getPassword() {
      return localStorage.getItem('supplier_library_password');
    }
    function _isLoggedIn() {
        return _getUsername() !== null && _getPassword() !== null;
    }
    function _clearToken() {
      localStorage.removeItem('supplier_library_username');
      localStorage.removeItem('supplier_library_password');
    }
   return {
      getService : _getService,
      setCredentials : _setCredentials,
      getUsername : _getUsername,
      getPassword : _getPassword,
      clearToken : _clearToken,
      isLoggedIn: _isLoggedIn,
    }
   })();
   export default LocalStorageService;