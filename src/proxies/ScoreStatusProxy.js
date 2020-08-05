import Proxy from './Proxy';

class ScoreStatusProxy extends Proxy {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('api/score-status', parameters);
  }

  /**
   * 통합점수 조회 (날짜, 부서)
   * @param date
   * @param deptCode
   * @param include
   * @returns {Promise}
   */
  getTotalScoreByDeptCodes(date, deptCode, include) {
    this.setParameters({date:date, deptCode:deptCode, subDeptYn: include ? "Y" : "N"});
    return this.submit('get', `${this.endpoint}/total-score-by-dept-codes`);
  }

  /**
   * 카테고리별 점검점수
   * @param date
   * @returns {Promise}
   */
  getCategoryTotalScore(date, deptCode, include) {
    this.setParameters({date:date, deptCode:deptCode, subDeptYn: include ? "Y" : "N"});
    return this.submit('get', `${this.endpoint}/category-total-score`);
  }

  /**
   * 점수 분포
   * @param date
   * @param deptCode
   * @param include
   * @returns {Promise}
   */
  getScoreDistribution(date, deptCode, include, totalScore) {
    this.setParameters({date:date, deptCode:deptCode, subDeptYn: include ? "Y" : "N", totalScore : totalScore});
    return this.submit('get', `${this.endpoint}/score-distribution`);
  }

  /**
   * 보안점수현황 부서별
   * @param params
   * @returns {Promise}
   */
  getScoreStatusByDept(params) {
    this.setParameters(params);
    return this.submit('get', `${this.endpoint}/depts`);
  }

  /**
   * 보안점수현황 사용자별
   * @param params
   * @returns {Promise}
   */
  getScoreStatusByUser(params) {
    this.setParameters(params);
    return this.submit('get', `${this.endpoint}/users`);
  }

  /**
   * 직원의 센서 점수
   * @param params
   * @returns {Promise}
   */
  getSensorTotalScoreByUserIdAndResultDate(params) {
    this.setParameters(params);
    return this.submit('get', `${this.endpoint}/sensor-score`);
  }

  /**
   * 센서의 항목별 결과
   * @param params
   * @returns {Promise}
   */
  getInspectItemResultBySensorId(params) {
    this.setParameters(params);
    return this.submit('get', `${this.endpoint}/inspect-item-result`);
  }

}

export default ScoreStatusProxy;
