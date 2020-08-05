import fi from "element-ui/src/locale/lang/fi";

const CommonUtil = {
  install(Vue) {
    /**
     * @return {string}
     */
    Vue.NumberWithCommas = function (x) {
      let parts = filterNumber(x);
      if (parts !== "") {
        parts = parts.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
      } else {
        return parts;
      }
    };

    Vue.FilterNumber = function(n) {
      return filterNumber(n);
    };

    let filterNumber = function (n) {
      return n.split(/ /)[0].replace(/[^\d]/g, '');
    };

    /**
     * 기능 권한 확인
     * @param roleCode
     * @param targetRoles
     * @returns {boolean}
     */
    Vue.checkAuth = function (roleCode, targetRoles) {
      return targetRoles.indexOf(roleCode) >= 0;
    };

    /**
     * 상태병으로 변환
     * @param totalScore
     */
    Vue.getStatus = function (totalScore) {
      let statusName = "";
      if(totalScore >= 90) {
        statusName = "안전";
      } else if(totalScore >= 80) {
        statusName = "관심";
      } else if(totalScore >= 80) {
        statusName = "주의";
      } else if(totalScore >= 80) {
        statusName = "경계";
      } else {
        statusName = "위험";
      }
      return statusName;
    };

    /**
     * 점수대별 색상
     * @param score
     * @returns {string}
     */
    Vue.getScoreColor = function(score) {
      if(score >= 90) {
        return "#007fe0";
      } else if(score >= 80) {
        return "#00bb63";
      } else if(score >= 70) {
        return "#eace00";
      } else if(score >= 60) {
        return "#ff8200";
      } else {
        return "#ff0000";
      }
    };

    /**
     * 최신버전 확인
     * @param latestVersion
     * @param currentVersion
     * @returns {boolean}
     */
    Vue.checkVersion = function (latestVersion, currentVersion) {
      let currentVersionArray = currentVersion.split(".");
      let latestVersionArray = latestVersion.split(".");
      for(let i = 0 ; i < 4 ; i++) {
        if(parseInt(currentVersionArray[i]) < parseInt(latestVersionArray[i])) {
          return false;
        }
      }
      return true;
    };
  }
};

export default CommonUtil
