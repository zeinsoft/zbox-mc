import Proxy from './Proxy';

class TaskProxy extends Proxy {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('v1/tasks', parameters);
  }

  /**
   * Task에 포함된 script 리스트
   * @param uuid
   * @returns {Promise}
   */
  getScriptByTargetUUID(uuid) {
    return this.submit('get', `${this.endpoint}/${uuid}/scripts`);
  }

  /**
   * Task에 포함된 osversions 리스트
   * @param uuid
   * @returns {Promise}
   */
  getOsVersionsByTargetUUID(uuid) {
    return this.submit('get', `${this.endpoint}/${uuid}/osversions`);
  }

}

export default TaskProxy;
