import DefaultLayout from '../components/Pages/Layout/DefaultLayout.vue';
import NotFound from '../components/GeneralViews/NotFoundPage.vue';

const Organization = () => import('src/components/Pages/Views/Organization/Organization.vue');
const UserRegistration = () => import('src/components/Pages/Views/Organization/UserRegistration.vue');
const UserView = () => import('src/components/Pages/Views/Organization/UserView.vue');

const TaskList = () => import('src/components/Pages/Views/Task/TaskList.vue');
const TaskRegistration = () => import('src/components/Pages/Views/Task/TaskRegistration.vue');

const ScriptList = () => import('src/components/Pages/Views/Script/ScriptList.vue');
const ScriptRegistration = () => import('@/components/Pages/Views/Script/ScriptRegistration.vue');

const PlayBookList = () => import('src/components/Pages/Views/PlayBook/PlayBookList.vue');
const PlayBookLog = () => import('src/components/Pages/Views/PlayBook/PlayBookLog.vue');
const PlayBookRegistration = () => import('src/components/Pages/Views/PlayBook/PlayBookRegistration.vue');
const PlayBookView = () => import('src/components/Pages/Views/PlayBook/PlayBookView.vue');

const TargetList = () => import('src/components/Pages/Views/Target/TargetList.vue');
const TargetView = () => import('src/components/Pages/Views/Target/TargetView.vue');

import Login from 'src/components/Pages/Views/Home/Login.vue';

import AgentLogin from 'src/components/Pages/Views/Agent/Login.vue';

let agentLoginPage = {
  path: '/agent',
  name: 'AgentLogin',
  component: AgentLogin
};

let loginPage = {
  path: '/login',
  name: 'Login',
  component: Login
};

let tasks = {
  path: '/tasks',
  name: 'Tasks',
  component: DefaultLayout,
  children: [
    {
      path: 'list',
      name: 'TaskList',
      meta: {
        auth: true,
      },
      component: TaskList
    },
    {
      path: 'registration',
      name: "TaskRegistration",
      meta: {
        auth: true,
      },
      component: TaskRegistration
    },
    {
      path: ':uuid',
      name: "TaskEdit",
      meta: {
        auth: true,
      },
      component: TaskRegistration
    },
    {
      path: ':uuid/scripts/:scriptUuid',
      name: "ScriptView",
      meta: {
        auth: true,
      },
      component: ScriptRegistration
    }
  ]
}

let scripts = {
  path: '/scripts',
  name: 'Scripts',
  component: DefaultLayout,
  children: [
    {
      path: 'list',
      name: 'ScriptList',
      meta: {
        auth: true,
      },
      component: ScriptList
    },
    {
      path: 'registration',
      name: "ScriptRegistration",
      meta: {
        auth: true,
      },
      component: ScriptRegistration
    },
    {
      path: ':uuid',
      name: "ScriptEdit",
      meta: {
        auth: true,
      },
      component: ScriptRegistration
    },
  ]
}

let targets = {
  path: '/targets',
  name: 'Targets',
  component: DefaultLayout,
  children: [
    {
      path: 'list',
      name: 'TargetList',
      meta: {
        auth: true,
      },
      component: TargetList
    },
    {
      path: 'registration',
      name: "TargetRegistration",
      meta: {
        auth: true,
      },
      component: TargetView
    },
    {
      path: ':uuid',
      name: "TargetView",
      meta: {
        auth: true,
      },
      component: TargetView
    },

  ]
}

let playbooks = {
  path: '/playbooks',
  name: 'PlayBooks',
  component: DefaultLayout,
  children: [
    {
      path: 'list',
      name: 'PlayBookList',
      meta: {
        auth: true,
      },
      component: PlayBookList
    },
    {
      path: 'registration',
      name: "PlayBookRegistration",
      meta: {
        auth: true,
      },
      component: PlayBookRegistration
    },
    {
      path: ':uuid',
      name: "PlayBookView",
      meta: {
        auth: true,
      },
      component: PlayBookView
    },
    {
      path: ':transactionId/log',
      name: "PlayBookLog",
      meta: {
        auth: true,
      },
      component: PlayBookLog
    },
  ]
}

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    redirect: '/organization',
    children: [
      {
        path: 'organization',
        name: 'Organization',
        meta: {
          auth: true,
        },
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
      {
        path: 'organization/:deptUuid/:userId',
        name: "UserView",
        meta: {
          auth: true,
        },
        component: UserView
      },
    ]
  },
  scripts,
  tasks,
  playbooks,
  targets,
  loginPage,
  agentLoginPage,
  {path: '*', component: NotFound}
];

export default routes
