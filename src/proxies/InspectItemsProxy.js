import Proxy from './Proxy';

class InspectItemsProxy extends Proxy {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('api/inspect-items', parameters);
  }

}

export default InspectItemsProxy;
