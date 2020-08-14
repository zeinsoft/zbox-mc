import Proxy from './Proxy';

class TargetProxy extends Proxy {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('v1/targets', parameters);
  }

  getTargetByUUID(uuid, targetType) {
    return this.submit('get', `${this.endpoint}/${uuid}/${targetType}`);
  }

}

export default TargetProxy;
