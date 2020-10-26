import Proxy from './Proxy';

class OsVersionProxy extends Proxy {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('v1/osversions', parameters);
  }

}

export default OsVersionProxy;
