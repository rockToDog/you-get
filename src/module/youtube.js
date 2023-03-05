import { download, getFile, safetyParse } from "@/util";

const getYoutubeVideoInfo = async () => {
  const res = await fetch(window.location.href);
  const str = await res.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(str, "text/html");
  const data = safetyParse(
    doc.body.innerHTML.match(/("formats":)([\d\D]+?}]+?)/)[2]
  );
  const video = data.sort((a, b) => b?.width - a?.width)?.[0];
  return {
    url: video.url,
    fileName: `download.mp4`,
  };
};

export default async () => {
  const url = await getYoutubeVideoInfo();
  const file = await getFile(url.url);
  download(file, url.fileName);
};
