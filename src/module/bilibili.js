import { download, getFile } from "@/util";

const getBilibiliVideoInfo = async () => {
  const res = await fetch(window.location.href);
  const str = await res.text();
  const data = JSON.parse(
    str.match(/window.__playinfo__=([\d\D]+?)<\/script>/)[1]
  );
  const dash = data.data.dash;
  const video = dash.video.sort((a, b) => b?.width - a?.width)?.[0];
  const audio = dash.audio[0];

  return [
    {
      url: video.baseUrl,
      fileName: `download.${video?.mimeType?.split("/")?.[1] || "mp4"}`,
    },
    {
      url: audio.baseUrl,
      fileName: `download.${video?.mimeType?.split("/")?.[1] || "mp4"}`,
    },
  ];
};

export default async () => {
  const urls = await getBilibiliVideoInfo();
  while (urls?.length) {
    const { url, fileName } = urls.shift();
    const file = await getFile(url);
    download(file, fileName);
  }
};
