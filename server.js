const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.get("/influencer/detail/:username", (req, res) => {
      return app.render(req, res, "/influencer/detail", {
        username: req.params.username
      });
    });

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(process.env.PORT || 3100, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${process.env.PORT || 3100}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
