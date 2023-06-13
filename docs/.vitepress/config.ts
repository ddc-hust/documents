/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  title: "叮咚澈的快乐学习时光",
  description: " ",
  lastUpdated: true,
  base: "/documents/",
  // lang: 'zh-CN',,
  head: [["link", { rel: "icon", type: "image/png", href: "pure-logo.svg" }]],
  themeConfig: {
    sidebarDepth: 2,
    logo: "/pure-logo.svg",
    nav: [
      { text: "首页", link: "/" },
      {
        text: "基础",
        link: "/frontend/javascript",
      },
      {
        text: "Vue",
        link: "/vue/vue",

      }, {
        text: "React",
        link: "/react/README",

      },
      {
        text: "算法",
        link: "/algorithm/leetcode",
      },
      {
        text: "手写题",
        link: "/手写题",
      },
      {
        text: "大杂烩",
        link: "/大杂烩-前端学习笔记",
      },
      {
        text: "文章",
        link: "/blog/actions",
      },
      {
        text: "关于我",
        items: [

        ],
      },
    ],
    sidebar: {
      displayAllHeaders: true,
      sidebarDepth: 2,
      "/frontend/": [
        {
          isGroup: true,
          items: [
            {

              text: "javascript",
              link: "/frontend/javascript",
            },
            {
              text: "css",
              link: "/frontend/css",
            },
            {
              text: "less",
              link: "/frontend/less",
            },
            {
              text: "http",
              link: "/frontend/http",
            },

            {
              text: "浏览器",
              link: "/frontend/browser",
            },
            {
              text: "node",
              link: "/frontend/nodejs",
            },


          ],
        },
      ],
      "/vue/": [
        {
          isGroup: true,
          items: [
            {
              text: "Vue",
              link: "/vue/vue",
            }
          ],
        },
      ],
      "/react/": [
        {
          isGroup: true,
          text: "react",
          items: [
          ],
        },
      ],
      "/algorithm/": [
        {
          sidebarDepth: 2,
          isGroup: true,
          items: [
            {
              sidebarDepth: 2,
              displayAllHeaders: true,
              text: "LeetCode",
              link: "/algorithm/leetcode"
            },

          ],
        },
      ],

      "/blog/": [
        {
          isGroup: true,
          text: "博客",
          items: [
          ],
        },
      ],
    },
    socialLinks: [{ icon: "github", link: "https://github.com/ddc-hust/documents" }],
  },
  slide: {
    // "/frontend/": [
    //   {
    //     isGroup: true,
    //     text: "大前端",
    //     children: [
    //       "/frontend/javascript.md",
    //       "/frontend/browser.md",
    //       "/frontend/nodejs.md",
    //       "/frontend/http.md",
    //     ],
    //   },
    // ],
    // "/vue/": [
    //   {
    //     isGroup: true,
    //     text: "vue",
    //     children: ["/vue/next-tick.md", "/vue/keep-alive.md"],
    //   },
    // ],
    // "/react/": [
    //   {
    //     isGroup: true,
    //     text: "react",
    //     children: ["/react/hook.md", "/react/fiber.md"],
    //   },
    // ],
    // "/algorithm/": [
    //   {
    //     isGroup: true,
    //     text: "算法",
    //     children: ["/algorithm/data-struct.md", "/algorithm/sort.md"],
    //   },
    // ],
    // "/blog/": [
    //   {
    //     isGroup: true,
    //     text: "blog",
    //     children: [
    //       "/blog/actions.md",
    //       "/blog/nodejs-cache.md",
    //       "/blog/next-tick.md",
    //       "/blog/element-validate.md",
    //       "/blog/functional.md",
    //       "/blog/bit-operation.md",
    //       "/blog/vue2-interview.md",
    //       "/blog/vue3-interview.md",
    //     ],
    //   },
    // ],
  },
};

export default config;
