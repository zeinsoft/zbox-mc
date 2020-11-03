import Proxy from './Proxy';

class SensorsProxy extends Proxy {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('v1/sensors', parameters);
  }

  /**
   * 센서 uuid로 OS버전 정보 가져오기
   * @param uuid
   * @returns {Promise}
   */
  getOsVersionsBySensorUUID(uuid) {
    return this.submit('get', `${this.endpoint}/${uuid}/osversions`);
  }

}

export default SensorsProxy;
