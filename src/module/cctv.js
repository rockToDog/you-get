import { download, getFile, getFiles } from "@/util";

const getVideoInfo = async () => {
  let data = await fetch(
    `https://vdn.apps.cntv.cn/api/getHttpVideoInfo.do?pid=${window.guid}`
  );
  data = await data.json();
  const urls = data?.video?.[`chapters${data?.video?.validChapterNum}`];
  return { urls, fileName: `${data?.title}.mp4` };
};

export default async () => {
  const { urls, fileName } = await getVideoInfo();
  while (urls.length) {
    const file = await getFile(urls.shift().url);
    download(file, fileName);
  }
};
