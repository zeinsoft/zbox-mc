import Proxy from './Proxy';

class DeptProxy extends Proxy {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('api/depts', parameters);
  }

  /**
   * 로그인 사용자 정보 가져오기
   * @returns {Promise}
   */
  deptListByParentDeptCode(parentDeptCode) {
    return this.find(parentDeptCode);
  }

  /**
   * 해당 부서 계층리스트
   * @param deptCode
   * @returns {Promise}
   */
  getDeptPathList(deptCode) {
    return this.submit('get', `${this.endpoint}/path/${deptCode}`);
  }
}

export default DeptProxy;
