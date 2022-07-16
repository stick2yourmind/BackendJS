
import {React, ReactDOMServer, createApp} from "./dep.ts";
import ReactApp from "./ReactApp.tsx"

const colors:Array<string> = []

const app = createApp();
app.get("/", async (req) => {
  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "text/html; charset=UTF-8",
    }),
    body: ReactDOMServer.renderToString(
      <html style={{backgroundColor: "black"}}>
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
  const newColor = bodyForm.value("color")
  if (newColor)
    colors.push(newColor)
  console.log(colors)
  req.redirect("/")
})
app.listen({ port: 8888 });