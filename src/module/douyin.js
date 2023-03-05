import { download, getFile } from "@/util";

const getDouyinVideoInfo = () => {
  const urls = [...document.querySelectorAll("video source")].map((i) => i.src);
  return {
    url: urls[0],
    fileName: `download.mp4`,
  };
};

export default async () => {
  const url = await getDouyinVideoInfo();
  const file = await getFile(url.url);
  download(file, url.fileName);
};
