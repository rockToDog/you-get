import { download, getFiles, getUrlsByM3u8 } from "@/util";

const getVideoInfo = async () => {
  const res = await getUrlsByM3u8(window.html5player.url_hls);
  const quality = res.sort(
    (a, b) => b.match(/hls-([\d]+)/)[1] - a.match(/hls-([\d]+)/)[1]
  )[0];

  const m3u8FileUrl = window.html5player.url_hls.replace("hls.m3u8", quality);
  // const baseUrl = window.html5player.url_hls.replace(/hls.m3u8/, "");

  // const urls = (await getUrlsByM3u8(m3u8FileUrl)).map((i) => `${baseUrl}${i}`);
  const urls = await getUrlsByM3u8(m3u8FileUrl);

  return urls.map((url) => ({
    url,
    fileName: `download.ts`,
  }));
};

export default async () => {
  const urls = await getVideoInfo();
  const files = await getFiles(urls);
  download(new Blob(files), "download.mp4");
};
