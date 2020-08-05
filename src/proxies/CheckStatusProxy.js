import Proxy from './Proxy';

class CheckStatusProxy extends Proxy {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('api/check-status', parameters);
  }

  /**
   * 보안점검현황 카테고리별
   * @param params
   * @returns {Promise}
   */
  getCheckItemStatusByCategoryId(params) {
    this.setParameters(params);
    return this.submit('get', `${this.endpoint}/items`);
  }

  /**
   * 보안점검현황 센서리스트
   * @param params
   * @returns {Promise}
   */
  getCheckSensorItemStatus(params) {
    this.setParameters(params);
    return this.submit('get', `${this.endpoint}/sensors`);
  }

}

export default CheckStatusProxy;
