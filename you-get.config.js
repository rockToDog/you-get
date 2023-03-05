export default {
  name: "you-get",
  namespace: "http://tampermonkey.net/",
  version: "0.0.1",
  description: "try to take over the world!",
  author: "You",
  match: [
    "https://www.ixigua.com/*",
    "https://www.bilibili.com/video/*",
    "https://www.douyin.com/*",
    "https://www.kuaishou.com/*",
    "https://www.acfun.cn/v/*",
    "https://www.youtube.com/watch/*",
    "https://v.qq.com/*",
  ],
  grant: "none",
};
