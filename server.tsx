
import {React, ReactDOMServer, createApp} from "./dep.ts";
import ReactApp from "./ReactApp.tsx"

let colors = ["#ffffff"]

const app = createApp();
app.get("/", async (req) => {
  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "text/html; charset=UTF-8",
    }),
    body: ReactDOMServer.renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>servest</title>
        </head>
        <body>
          <ReactApp colors={colors}/>
        </body>
      </html>,
    ),
  });
});

app.post("/", async (req) => {
  const bodyForm  = await req.formData();
  colors.push(bodyForm.value("color"))
  console.log(colors)
})
app.listen({ port: 8888 });