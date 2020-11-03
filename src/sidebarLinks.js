export default [
  {
    name: '조직도',
    icon: 'fa fa-sitemap',
    path: '/organization'
  },
  {
    name: '제품관리',
    icon: 'fa fa-microchip',
    path: '/products'
  },
  {
    name: 'Script',
    icon: 'fa fa-tasks',
    children: [
      {
        name: 'Script 리스트',
        icon: 'fa fa-tasks',
        path: '/scripts/list'
      },
    ]
  },
  {
    name: 'Task',
    icon: 'fa fa-tasks',
    children: [
      {
        name: 'Task 리스트',
        icon: 'fa fa-tasks',
        path: '/tasks/list'
      },
    ]
  },
  {
    name: 'PlayBook',
    icon: 'fa fa-book',
    children: [
      {
        name: 'Target 리스트',
        icon: 'fa fa-book',
        path: '/targets/list'
      },
      {
        name: 'PlayBook 리스트',
        icon: 'fa fa-book',
        path: '/playbooks/list'
      },
    ]
  },
]
