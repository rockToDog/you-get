import { download, getFile, safetyParse } from "@/util";

const getXiGuaVideoInfo = async () => {
  const res = await fetch(window.location.href);
  const str = await res.text();
  const data = safetyParse(
    str
      .match(/window?._SSR_HYDRATED_DATA=([\d\D]+?)<\/script>/)[1]
      .replaceAll("undefined", "null")
  );
  const videoResource =
    data?.anyVideo?.gidInformation?.packerData?.video?.videoResource ||
    data?.anyVideo?.gidInformation?.packerData?.videoResource;
  const videoList = Object.values(videoResource?.normal?.video_list ?? {}).sort(
    (a, b) => b?.vheight - a?.vheight
  );
  const video = videoList?.[0];
  return {
    url: atob(video.main_url, "base64"),
    fileName: `download.${video.vtype || "mp4"}`,
  };
};

export default async () => {
  const url = await getXiGuaVideoInfo();
  const file = await getFile(url.url);
  download(file, "download.mp4");
};
