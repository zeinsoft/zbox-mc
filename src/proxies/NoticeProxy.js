import Proxy from './Proxy';

class NoticeProxy extends Proxy {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('api/notice', parameters);
  }

}

export default NoticeProxy;
