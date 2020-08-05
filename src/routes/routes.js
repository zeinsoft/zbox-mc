import DefaultLayout from '../components/Pages/Layout/DefaultLayout.vue';
import NotFound from '../components/GeneralViews/NotFoundPage.vue';

const Overview = () => import('src/components/Pages/Views/Status/Overview.vue');
const ScoreOverview = () => import('src/components/Pages/Views/Status/ScoreOverview.vue');
const CheckOverview = () => import('src/components/Pages/Views/Status/CheckOverview.vue');

const PolicySetting = () => import('src/components/Pages/Views/Policy/PolicySetting.vue');
const InspectItem = () => import('src/components/Pages/Views/Policy/InspectItem.vue');
const InspectItemRegistration = () => import('src/components/Pages/Views/Policy/InspectItemRegistration.vue');

const Organization = () => import('src/components/Pages/Views/Organization/Organization.vue');
const UserRegistration = () => import('src/components/Pages/Views/Organization/UserRegistration.vue');

const UserManagement = () => import('src/components/Pages/Views/Setting/UserManagement.vue');
const UserManagementRegistration = () => import('src/components/Pages/Views/Setting/UserManagementRegistration.vue');
const Management = () => import('src/components/Pages/Views/Setting/Management.vue');
const ManagementDetail = () => import('src/components/Pages/Views/Setting/ManagementDetail.vue');
const Notice = () => import('src/components/Pages/Views/Setting/Notice.vue');
const Program = () => import('src/components/Pages/Views/Setting/Program.vue');

import Login from 'src/components/Pages/Views/Home/Login.vue';

let loginPage = {
  path: '/login',
  name: 'Login',
  component: Login
};

/**
 * 보안현황
 * @type {{path: string, component: *, children: *[], name: string}}
 */
let securityStatus = {
  path: '/status',
  name: 'Status',
  component: DefaultLayout,
  children: [
    {
      path: 'overview',
      name: 'StatusOverview',
      mata: {
        auth: true,
      },
      component: Overview
    },
    {
      path: 'score',
      name: 'ScoreOverview',
      mata: {
        auth: true,
      },
      component: ScoreOverview
    }
    ,
    {
      path: 'check',
      name: 'CheckOverview',
      mata: {
        auth: true,
      },
      component: CheckOverview
    }
  ]
};

/**
 * 보안운영
 * @type {{path: string, component: *, children: *[], name: string}}
 */
let securityOperation = {
  path: '/operation',
  name: 'Operation',
  component: DefaultLayout,
  redirect: '/operation/inspect-item',
  children: [
    {
      path: 'policy',
      name: 'Policy',
      mata: {
        auth: true,
      },
      component: PolicySetting
    },
    {
      path: 'inspect-item',
      name: 'InspectItem',
      mata: {
        auth: true,
      },
      component: InspectItem
    },
    {
      path: 'inspect-item/registration/:inspectItemId',
      name: "InspectItemRegistration",
      meta: {
        auth: true,
      },
      component: InspectItemRegistration
    },
  ]
};

/**
 * 환경설정
 * @type {{path: string, component: *, children: *[], name: string}}
 */
let setting = {
  path: '/setting',
  name: 'Setting',
  component: DefaultLayout,
  children: [
    {
      path: 'user',
      name: 'User',
      mata: {
        auth: true,
      },
      component: UserManagement
    },
    {
      path: 'user/registration',
      name: "UserManagementRegistration",
      meta: {
        auth: true,
      },
      component: UserManagementRegistration
    },
    {
      path: 'management',
      name: 'Management',
      mata: {
        auth: true,
      },
      component: Management
    },
    {
      path: 'management/:configId',
      name: 'ManagementDetail',
      mata: {
        auth: true,
      },
      component: ManagementDetail
    },
    {
      path: 'notice',
      name: 'Notice',
      mata: {
        auth: true,
      },
      component: Notice
    },
    {
      path: 'program',
      name: 'Program',
      meta: {
        auth: true,
      },
      component: Program
    }
  ]
};

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    redirect: '/status/overview',
    children: [
      {
        path: 'organization',
        name: 'Organization',
        component: Organization
      },
      {
        path: 'organization/registration',
        name: "UserRegistration",
        meta: {
          auth: true,
        },
        component: UserRegistration
      },
    ]
  },
  securityStatus,
  securityOperation,
  setting,
  loginPage,
  {path: '*', component: NotFound}
];

export default routes
