import Proxy from './Proxy';

class SensorProgramProxy extends Proxy {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('api/programs', parameters);
  }

}

export default SensorProgramProxy;
