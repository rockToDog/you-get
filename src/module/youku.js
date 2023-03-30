import { download, getFiles, getUrlsByM3u8, safetyParse } from "@/util";

export default async () => {
  // fix fetch http request failed in https pages
  if (!document.querySelector("meta#you-get-youku")) {
    const meta = document.createElement("meta");
    meta.httpEquiv = "Content-Security-Policy";
    meta.content = "upgrade-insecure-requests";
    meta.id = "you-get-youku";
    document.querySelector("head").appendChild(meta);
  }

  const data = window?.videoPlayer?.context?.mediaData?.mediaResource?._model;
  if (data) {
    const m3u8FileUrl = data.streamList.sort((a, b) => b.width - a.width)[0].uri
      .HLS;
    const urls = await getUrlsByM3u8(m3u8FileUrl, (i) => i);
    const files = await getFiles(urls.map((url) => ({ url })));
    download(new Blob(files), `${data.video.title}.ts`);
  }
};
