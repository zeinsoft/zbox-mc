import Proxy from './Proxy';

class StatusProxy extends Proxy {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('api/status', parameters);
  }

  /**
   * 전체현황 요약
   * @returns {Promise}
   */
  getTotalStatus() {
    return this.submit('get', `${this.endpoint}/total-status`);
  }

  /**
   * 점수대별 분류 현황
   * @returns {Promise}
   */
  getScoreDistributionStatus() {
    return this.submit('get', `${this.endpoint}/score-distribution-status`);
  }

  /**
   * 일별 통합점수 추이
   * @returns {Promise}
   */
  getDailyTotalScoreStatus() {
    return this.submit('get', `${this.endpoint}/daily-total-score-status`);
  }

  /**
   * 카테고리별 현황
   * @returns {Promise}
   */
  getCategoryTotalScoreStatus() {
    return this.submit('get', `${this.endpoint}/category-total-score-status`);
  }

}

export default StatusProxy;
