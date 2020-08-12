import Proxy from './Proxy';

class DeptProxy extends Proxy {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('v1/depts', parameters);
  }

  /**
   * 상위 코드로 리스트 가져오기
   * @returns {Promise}
   */
  deptListByParentDeptCode() {

    return this.submit('get', `${this.endpoint}`);


  }

  /**
   * 부서코드로 사용자 리스트 가져오기
   * @param deptCode
   * @returns {Promise}
   */
  getUsersByDeptCode(deptCode) {
    return this.submit('get', `${this.endpoint}/${deptCode}/users`);
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
