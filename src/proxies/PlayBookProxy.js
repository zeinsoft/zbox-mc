import Proxy from './Proxy';

class PlayBookProxy extends Proxy {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('v1/playbooks', parameters);
  }

}

export default PlayBookProxy;
