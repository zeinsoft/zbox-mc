import Proxy from './Proxy';

class MongoProxy extends Proxy {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('mongo/relation', parameters);
  }

  delete(params) {
    return this.submit('delete', `${this.endpoint}`, params);
  }

}

export default MongoProxy;
