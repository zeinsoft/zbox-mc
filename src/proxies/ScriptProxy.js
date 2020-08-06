import Proxy from './Proxy';

class ScriptProxy extends Proxy {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('v1/scripts', parameters);
  }

}

export default ScriptProxy;
