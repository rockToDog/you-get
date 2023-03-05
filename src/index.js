import module from "@/module";

const youget = () => {
  const handler = Object.entries(module).find(([key, fn]) =>
    window.location.host.toLocaleLowerCase().includes(key)
  )?.[1];
  if (handler) {
    handler();
  } else {
    console.log("not support");
  }
};

youget.toString = () => {
  youget();
  return 1;
};

window.you = 1;
window.get = youget;
window.youget = youget;
