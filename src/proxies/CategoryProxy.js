import Proxy from './Proxy';

class CategoryProxy extends Proxy {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('api/categories', parameters);
  }

}

export default CategoryProxy;
