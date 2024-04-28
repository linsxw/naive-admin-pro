import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/login',
    method: 'post',
    response: () => ({
      code: 200,
      data: {
        accessToken: 'naive-admin-token-demo',
      },
    }),
  },
  {
    url: '/api/getInfo',
    method: 'get',
    response() {
      return {
        code: 200,
        data: {
          username: 'admin',
          avatar: 'https://q1.qlogo.cn/g?b=qq&nk=804636497&s=640',
          permissions: ['*'],
          roles: ['admin'],
        },
      }
    },
  },
  {
    url: '/api/logout',
    method: 'post',
    response: () => ({
      code: 200,
      data: 'success',
    }),
  },
  {
    url: '/api/getMenus',
    method: 'get',
    response() {
      return {
        code: 200,
        data: [
          {
            name: 'System',
            path: '/system',
            hidden: false,
            redirect: 'noRedirect',
            component: 'Layout',
            alwaysShow: true,
            meta: {
              title: '系统管理',
              icon: 'system',
              noCache: false,
              link: null,
              orderNo: 21,
            },
            children: [
              {
                name: 'User',
                path: 'user',
                hidden: false,
                component: 'system/user/index',
                meta: {
                  title: '用户管理',
                  icon: 'user',
                  noCache: false,
                  link: null,
                },
              },
              {
                name: 'Role',
                path: 'role',
                hidden: false,
                component: 'system/role/index',
                meta: {
                  title: '角色管理',
                  icon: 'user',
                  noCache: false,
                  link: null,
                },
              },
              {
                name: 'Menu',
                path: 'menu',
                hidden: false,
                component: 'system/menu/index',
                meta: {
                  title: '菜单管理',
                  icon: 'treeTable',
                  noCache: false,
                  link: null,
                },
              },
              {
                name: 'Dept',
                path: 'dept',
                hidden: false,
                component: 'system/dept/index',
                meta: {
                  title: '部门管理',
                  icon: 'treeTable',
                  noCache: false,
                  link: null,
                },
              },
              {
                name: 'Post',
                path: 'post',
                hidden: false,
                component: 'system/post/index',
                meta: {
                  title: '岗位管理',
                  icon: 'user',
                  noCache: false,
                  link: null,
                },
              },
              {
                name: 'Dict',
                path: 'dict',
                hidden: false,
                component: 'system/dict/index',
                meta: {
                  title: '字典管理',
                  icon: 'user',
                  noCache: false,
                  link: null,
                },
              },
            ],
          },
        ],
      }
    },
  },
] as MockMethod[]
