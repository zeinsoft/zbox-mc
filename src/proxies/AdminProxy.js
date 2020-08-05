import Proxy from './Proxy';

class AdminProxy extends Proxy {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('api/admins', parameters);
  }

}

export default AdminProxy;
