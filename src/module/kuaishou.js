import { download, getFile } from "@/util";

const getKuaishouVideoInfo = () => {
  const urls = [...document.querySelectorAll("video")].map((i) => i.src);
  return {
    url: urls[0],
    fileName: `download.mp4`,
  };
};

export default async () => {
  const url = await getKuaishouVideoInfo();
  const file = await getFile(url.url);
  download(file, url.fileName);
};
