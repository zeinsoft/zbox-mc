import Proxy from './Proxy';

class CommonCodeProxy extends Proxy {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('api/common-code', parameters);
  }

  /**
   * 코드값 조회
   * @param categoryId
   * @param code
   * @returns {Promise}
   */
  getCommonCodeByCategoryIdAndCode(categoryId, code) {
    return this.submit('get', `${this.endpoint}/${categoryId}/${code}`);
  }
}

export default CommonCodeProxy;
