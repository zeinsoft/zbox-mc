import Proxy from './Proxy';

class AuthProxy extends Proxy {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('api', parameters);
  }

  /**
   * Method used to login.
   *
   * @param {String} adminId The adminId.
   * @param {String} password The password.
   *
   * @returns {Promise} The result in a promise.
   */
  login({ adminId, password }) {
    const data = {
      adminId,
      password,
    };

    return this.submit('post', `${this.endpoint}/common/login`, data);
  }

  /**
   * public key 조회
   * @returns {Promise}
   */
  publicKey() {
    return this.submit('get', `/${this.endpoint}/common/public-key`);
  }


  /**
   * Method used to register the user.
   *
   * @param {Object} data The register data.
   *
   * @returns {Promise} The result in a promise.
   */
  register(data) {
    return this.submit('post', `${this.endpoint}/register`, data);
  }
}

export default AuthProxy;
