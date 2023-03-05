export const download = async (blob, fileName) => {
  let link = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.download = `${fileName}`;
  a.href = link;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(link);
};

export const safetyParse = (str) => {
  try {
    return JSON.parse(str);
  } catch (error) {
    return null;
  }
};

export const getFile = async (url) => {
  const res = await fetch(url);
  const reader = res.body.getReader();
  const contentLength = +res.headers.get("Content-Length");
  if (!contentLength) {
    const data = await res.arrayBuffer();
    return new Uint8Array(data);
  }

  let receivedLength = 0;
  let chunks = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    chunks.push(value);
    receivedLength += value.length;
    console.log(
      `fileSize: ${contentLength} %c downloaded ${receivedLength}`,
      "background: #222; color: #bada55"
    );
  }

  // const config = getConfig(CONFIG);
  // if (config?.merge === false) {
  return new Blob(chunks);
  // }

  // let chunksAll = new Uint8Array(receivedLength);
  // let position = 0;
  // for (let chunk of chunks) {
  //   chunksAll.set(chunk, position);
  //   position += chunk.length;
  // }
  // return chunksAll;
};

export const getUrlsByM3u8 = async (url) => {
  const urlObj = new URL(url);
  urlObj.pathname = urlObj.pathname.split("/").slice(0, -1).join("/");
  urlObj.search = "";
  const base = urlObj.toString();
  const res = await fetch(url);
  const data = await res.text();
  return data
    .split("\n")
    .filter((i) => !!i && !i.startsWith("#"))
    .map((i) => (i.startsWith("/") ? `${base}${i}` : `${base}/${i}`));
};

export const getFiles = (urls, max = 8) => {
  let connections = 0;
  let files = [];
  urls = urls.map((i, index) => ({
    ...i,
    index,
  }));

  return new Promise((resolve, reject) => {
    const getSingleFile = async ({ url, index, ...rest }) => {
      if (connections < max) {
        try {
          connections = connections + 1;
          const data = await getFile(url);
          connections = connections - 1;
          files[index] = data;
          if (urls?.length) {
            getSingleFile(urls.shift());
          } else {
            resolve(files);
          }
        } catch (error) {
          console.log(error);
          urls.push({
            url,
            index,
            ...rest,
          });
        }
      }
    };

    new Array(max).fill(0).forEach((i) => {
      getSingleFile(urls.shift());
    });
  });
};
