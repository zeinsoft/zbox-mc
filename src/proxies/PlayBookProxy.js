import Proxy from './Proxy';

class PlayBookProxy extends Proxy {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('v1/playbooks', parameters);
  }

  /**
   * 플레이북 실행
   * @param uuid
   * @returns {Promise}
   */
  runPlayBook(uuid) {
    return this.submit('get', `${this.endpoint}/${uuid}/run`);
  }
}

export default PlayBookProxy;
