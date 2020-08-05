import Proxy from './Proxy';

class SensorsProxy extends Proxy {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('api/sensors', parameters);
  }

}

export default SensorsProxy;
