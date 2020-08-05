import Proxy from './Proxy';

class ConfigProxy extends Proxy {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('api/config', parameters);
  }

  /**
   * 설정값 조회
   * @param configId
   * @param configTemplateId
   * @returns {Promise}
   */
  findAllConfigValueById(configId, configTemplateId) {
    return this.submit('get', `${this.endpoint}/${configId}/template/${configTemplateId}`);
  }

  /**
   * 설정 + 설정값 저장
   * @param config
   * @returns {Promise}
   */
  updateConfig(config) {
    return this.submit('post', `${this.endpoint}/${config.configId}`, config);
  }

}

export default ConfigProxy;
