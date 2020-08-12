import Proxy from './Proxy';

class MySensorsProxy extends Proxy {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('api/my-sensors', parameters);
  }

}

export default MySensorsProxy;
