import { download, getFiles, getUrlsByM3u8, safetyParse } from "@/util";

const getVideoInfo = async () => {
  const m3u8FileUrl = safetyParse(window.pageInfo.currentVideoInfo.ksPlayJson)
    ?.adaptationSet?.[0]?.representation?.[0]?.url;
  const urls = await getUrlsByM3u8(m3u8FileUrl);
  return urls.map((url) => ({ url }));
};

export default async () => {
  const urls = await getVideoInfo();
  const files = await getFiles(urls);
  download(new Blob(files), "download.mp4");
};
