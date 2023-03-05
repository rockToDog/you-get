import { download, getFiles, getUrlsByM3u8, safetyParse } from "@/util";

let proxyhttpBody = null;
const monitor = async () => {
  try {
    window.__PLAYER__.pluginMsg.emit = new Proxy(
      window.__PLAYER__.pluginMsg.emit,
      {
        apply: (...args) => {
          if (
            args?.[2]?.[0] === "PROXY_HTTP_START" &&
            args?.[2]?.[1]?.vinfoparam
          ) {
            console.log(args?.[2]?.[1]);
            proxyhttpBody = JSON.stringify(args?.[2]?.[1]);
          }
          return Reflect.apply(...args);
        },
      }
    );
  } catch (error) {
    console.log("monitor error");
  }
};

const getVideoInfo = async () => {
  // let m3u8FileUrl = window.__PLAYER__.url;
  let m3u8FileUrl = null;
  if (!m3u8FileUrl) {
    let res = await fetch("https://vd6.l.qq.com/proxyhttp", {
      method: "post",
      body: proxyhttpBody,
    });

    res = await res.json();

    if (res?.errCode === 0 && res?.vinfo) {
      const data = safetyParse(res?.vinfo);
      const m3u8 = data?.vl?.vi?.sort((a, b) => b.vw - a.vw)?.[0]?.ul;
      if (m3u8) {
        m3u8FileUrl = m3u8.ui[0].url;
      }
    }
  }

  const urls = await getUrlsByM3u8(m3u8FileUrl);
  return urls.map((url) => ({
    url,
    fileName: `download.mp4`,
  }));
};

if (window.location.host === "v.qq.com") {
  monitor();
}

export default async () => {
  const urls = await getVideoInfo();
  const files = await getFiles(urls);
  download(new Blob(files), "download.mp4");
};
