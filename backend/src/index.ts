import Koa from "koa";
import json from "koa-json";
import { router } from "./routes";

const app = new Koa();

let PORT = 3000;

app.use(json());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  return app;
});
