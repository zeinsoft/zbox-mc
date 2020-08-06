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

}

export default TaskProxy;
