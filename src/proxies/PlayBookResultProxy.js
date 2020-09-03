import Proxy from './Proxy';

class PlayBookResultProxy extends Proxy {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('v1/playbook_results', parameters);
  }
}

export default PlayBookResultProxy;
