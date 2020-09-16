import Proxy from './Proxy';

class ProductProxy extends Proxy {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('v1/prods', parameters);
  }

}

export default ProductProxy;
