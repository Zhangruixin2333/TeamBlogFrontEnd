export default [
  { path: '/', icon: 'SmileOutlined', name: '欢迎', redirect: '/welcome' },
  { path: '/user', layout: false, routes: [{ path: '/user/login', component: './User/Login' }] },
  { path: '/account/detail', component: './Account' },
  {
    path: '/blog',
    icon: 'FileMarkdownOutlined',
    name: '博文',
    routes: [
      { path: '/blog', redirect: '/blog/upload' },
      { path: '/blog/upload', name: '发布', component: './UserBlog/Upload' },
      { path: '/blog/view', name: '预览', component: './UserBlog/View' },
      { path: '/blog/detail', name: '详情', component: './UserBlog/Detail' },
    ],
  },
  { path: '/welcome', icon: 'smile', component: './Welcome' },
  {
    path: '/admin',
    icon: 'crown',
    access: 'canAdmin',
    name: '管理页',
    routes: [
      { path: '/admin', redirect: '/admin/sub-page' },
      { path: '/admin/sub-page', name: '管理', component: './Admin' },
    ],
  },
  { icon: 'table', name: '查询表格', path: '/list', component: './TableList' },
  { path: '*', layout: false, component: './404' },
];
