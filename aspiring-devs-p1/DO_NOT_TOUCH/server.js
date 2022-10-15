const Database = require("better-sqlite3"),
  db = new Database("마라탕.db"),
  { randomUUID } = require("crypto"),
  http = require("http");
function seed() {
  console.log("Seeding. Please wait");
  const e = [
    db.prepare(
      "CREATE TABLE IF NOT EXISTS user (\n    id varchar(255) PRIMARY KEY NOT NULL,\n    username varchar(255) UNIQUE NOT NULL,\n    password varchar(255) NOT NULL)"
    ),
    db.prepare(
      "CREATE TABLE IF NOT EXISTS story (\n    id varchar(255) PRIMARY KEY NOT NULL,\n    story_content TEXT DEFAULT '',\n    story_title varchar(255) NOT NULL)"
    ),
    db.prepare(
      "CREATE TABLE IF NOT EXISTS user_story (\n    user_id varchar(255) NOT NULL,\n    story_id varchar(255) NOT NULL,\n    FOREIGN KEY (user_id) REFERENCES user(id),\n    FOREIGN KEY (story_id) REFERENCES story(id),\n    CONSTRAINT user_to_story UNIQUE (user_id, story_id))"
    ),
  ];
  db.transaction((e) => {
    for (const t of e) t.run();
  })(e);
  const t = db.prepare(
      "INSERT OR IGNORE INTO user (id, username, password)\nVALUES(?, ?, ?)"
    ),
    s = db.prepare(
      "INSERT OR IGNORE INTO story (id, story_content, story_title)\nVALUES(?, ?, ?)"
    ),
    r = "test-user-id",
    i = "test-story-id",
    n = db.prepare(
      "INSERT OR IGNORE INTO user_story (user_id, story_id) VALUES (?, ?)"
    );
  db.transaction(() => {
    t.run(r, "test-user", "test"),
      s.run(
        i,
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce suscipit malesuada leo in interdum. Donec lorem ligula, tincidunt ut mi eget, placerat consequat quam. Cras ultrices, mauris ultricies tincidunt scelerisque, urna urna accumsan risus, eget maximus massa elit eget nibh. Nulla ante libero, sollicitudin sed facilisis nec, blandit sit amet odio. Aenean ipsum est, cursus non nisl et, imperdiet eleifend tortor. Integer sollicitudin, arcu et vulputate accumsan, neque sem luctus nulla, vitae sagittis nibh lacus nec dolor. Integer eget nunc sit amet quam finibus lobortis vitae id lorem. Integer tincidunt nisl et lorem dictum consectetur. Nulla sed sem vitae nisl faucibus placerat. Sed luctus leo tortor, sed bibendum tortor fermentum non. Donec a quam lorem.\n\nPellentesque interdum laoreet ligula, sit amet facilisis tortor congue in. Vivamus feugiat scelerisque lectus, porta volutpat augue imperdiet et. Mauris tellus arcu, lobortis vel porta ut, placerat eu ipsum. Vivamus vel odio scelerisque nibh ullamcorper ultrices eu quis turpis. Vestibulum fringilla ultrices molestie. Vivamus eget placerat libero. Sed varius elementum metus in rutrum. Nulla placerat nisi ut elit vehicula tristique. Fusce ut est id magna elementum egestas eget id justo. Donec hendrerit est nec leo ultricies cursus. Donec placerat ligula eros, ac porttitor massa consequat lacinia. Phasellus et ornare ex.\n\nIn a est vel lorem sollicitudin dapibus ut eget nisl. Sed enim metus, ultrices a hendrerit ut, sodales nec lacus. Duis non diam ligula. Proin tincidunt lorem non vehicula condimentum. Ut vel ligula sed felis venenatis maximus quis eu justo. Maecenas vitae porttitor purus. Donec convallis sem eget fringilla laoreet. Suspendisse luctus nulla odio. Mauris condimentum aliquet mi quis efficitur. Pellentesque feugiat elit quam, quis semper leo blandit ut.\n\nNunc id ipsum ut odio dictum convallis. In ultricies eros in ligula consequat, vel vehicula odio varius. Integer libero nulla, sagittis vitae dui vel, scelerisque fermentum dolor. Nullam blandit venenatis turpis. Aenean imperdiet quam ac interdum cursus. Mauris venenatis lobortis blandit. Morbi et mi sed ex blandit cursus. Donec vel tellus nec lorem elementum malesuada vel tempus lacus. Maecenas convallis, nunc vel accumsan lobortis, ex dolor tempus nulla, a volutpat est massa nec elit. Donec id lectus eu ante elementum maximus bibendum quis lacus. Maecenas et leo scelerisque, faucibus sem nec, tempus dui. Maecenas egestas in lacus eu consequat. Integer ut fermentum augue, at commodo lectus. Phasellus pretium elementum tellus at mollis.\n\nNunc vitae gravida diam. Sed metus libero, ultrices nec vestibulum non, commodo a diam. Sed efficitur, arcu eu convallis consequat, dui risus ornare velit, vehicula efficitur orci velit a elit. Quisque pharetra malesuada ante, eu placerat justo aliquam eget. Sed a eleifend erat, at accumsan turpis. Suspendisse euismod nisl vitae lacus ornare, sit amet ornare elit scelerisque. Donec nec sollicitudin nisl. Proin tempor porta lectus, vitae fermentum lectus lacinia ut.",
        "Lorem Ipsum"
      );
    try {
      n.run(r, i);
    } catch (e) {
      console.log("Already seeded?");
    }
  })();
}
function select(e, t, s) {
  const r = Object.keys(s).reduce(
    (e, t) => (e ? e + `, ${t} = ?` : `WHERE ${t} = ?`),
    ""
  );
  return db
    .prepare(`SELECT ${e.join(", ")} FROM ${t} ${r}`)
    .all(Object.values(s));
}
function insert(e, t, s) {
  const r = t
    .reduce((e, t) => {
      const s = "(" + Array(t.length).fill("?").join(", ") + ")";
      return e.push(s), e;
    }, [])
    .join(", ");
  return db
    .prepare(`INSERT OR IGNORE INTO ${s} (${e.join(", ")}) VALUES ${r}`)
    .run(t.flat());
}
function update(e, t, s) {
  const r = Object.keys(e)
    .reduce((e, t) => {
      const s = `${t} = ?`;
      return e.push(s), e;
    }, [])
    .join(", ");
  return db
    .prepare(`UPDATE ${t} SET ${r} WHERE id = ?`)
    .run([...Object.values(e), s]);
}
function deleeete(e, t) {
  db
    .prepare("DELETE FROM user_story WHERE user_id = ? OR story_id = ?")
    .run(t, t),
    db.prepare(`DELETE FROM ${e} WHERE id = ?`).run(t);
}
console.log("Seeder Complete!"), console.log("Starting Server");
const checkAuth = (e, t) => {
    const s = select(["*"], "user", { username: e });
    return s.length > 0 && (s[0].password = t) ? s[0].id : "";
  },
  server = http.createServer((e, t) => {
    if (
      (console.log("Someone is making a request to " + e.url),
      "POST" === e.method && "/story" === e.url)
    ) {
      let s = [];
      e.on("data", (e) => {
        s.push(e);
      }),
        e.on("end", () => {
          const r = e.headers.authorization;
          let i;
          if (r) {
            const [e, t] = r.trim().split(" ");
            e && t && (i = checkAuth(e, t));
          }
          const n = JSON.parse(Buffer.concat(s).toString());
          if (((s = []), i && n.story_title && n.story_content)) {
            const e = randomUUID();
            try {
              insert(
                ["id, story_title", "story_content"],
                [[e, n.story_title, n.story_content]],
                "story"
              ),
                insert(["user_id", "story_id"], [[i, e]], "user_story");
              const s = JSON.stringify({ message: "CREATED", story_id: e });
              t.writeHead(201, _makeHeaders(s)).end(s);
            } catch (e) {
              const s = e.toString();
              t.writeHead(400, _makeHeaders(s)).end(s);
            }
          }
        });
    } else if ("PUT" === e.method && e.url?.startsWith("/story/")) {
      const s = e.url.replace("/story/", "");
      let r = [];
      e.on("data", (e) => {
        r.push(e);
      }),
        e.on("end", () => {
          const i = e.headers.authorization;
          let n;
          if (i) {
            const [e, t] = i.trim().split(" ");
            e && t && (n = checkAuth(e, t));
          }
          const a = JSON.parse(Buffer.concat(r).toString());
          if (((r = []), n && s && (a.story_title || a.story_content)))
            try {
              update(
                {
                  ...(a.story_title ? { story_title: a.story_title } : {}),
                  ...(a.story_content
                    ? { story_content: a.story_content }
                    : {}),
                },
                "story",
                s
              );
              const e = JSON.stringify({ message: "UPDATED", story_id: s });
              t.writeHead(200, _makeHeaders(e)).end(e);
            } catch (e) {
              const s = e.toString();
              t.writeHead(400, _makeHeaders(s)).end(s);
            }
        });
    } else if ("DELETE" === e.method && e.url?.startsWith("/story/")) {
      const s = e.url.replace("/story/", ""),
        r = e.headers.authorization;
      let i;
      if (r) {
        const [e, t] = r.trim().split(" ");
        e && t && (i = checkAuth(e, t));
      }
      if (i) {
        const e = select(["id"], "story", { id: s })[0];
        select(["user_id"], "user_story", { story_id: e.id })[0]?.user_id === i
          ? (deleeete("story", s),
            t.writeHead(200, _makeHeaders("DELETED")).end("DELETED"))
          : t.writeHead(401, _makeHeaders("UNAUTHORIZED")).end("UNAUTHORIZED");
      }
    } else if ("GET" === e.method && e.url)
      if (e.url.startsWith("/story")) {
        const s = e.url.replace("/story", "").replace("/", "");
        if (s.length) {
          const e = select(["*"], "story", { id: s })[0];
          if (e) {
            const s = JSON.stringify(e);
            t.writeHead(200, _makeHeaders(s)).end(s);
          } else
            t.writeHead(404, _makeHeaders("NOT FOUND", "text")).end(
              "NOT FOUND"
            );
        } else {
          const e = select(["*"], "story", {});
          if (e.length > 0) {
            const s = JSON.stringify(e);
            t.writeHead(200, _makeHeaders(s)).end(s);
          } else
            t.writeHead(204, _makeHeaders("NO CONTENT", "text")).end(
              "NO CONTENT"
            );
        }
      } else if (e.url.startsWith("/user_stories")) {
        const s = e.url?.replace("/user_stories", "").replace("/", "");
        if (s.length) {
          const e = select(["id"], "user", { username: s })[0]?.id;
          if (e) {
            const s = select(["story_id"], "user_story", { user_id: e });
            if (s.length > 0) {
              const e = s
                  .map((e) => select(["*"], "story", { id: e.story_id }))
                  .flat(),
                r = JSON.stringify(e);
              t.writeHead(200, _makeHeaders(r)).end(r);
            } else
              t.writeHead(204, _makeHeaders("NO CONTENT", "text")).end(
                "NO CONTENT"
              );
          } else
            t.writeHead(404, _makeHeaders("USER DOES NOT EXIST", "text")).end(
              "USER DOES NOT EXIST"
            );
        } else
          t.writeHead(400, _makeHeaders("NO USER ID", "text")).end(
            "NO USER ID"
          );
      } else
        t.writeHead(404, _makeHeaders("NOT FOUND", "text")).end("NOT FOUND");
    else
      e.url && ["/user_stories", "/story"].every((t) => !e.url.startsWith(t))
        ? t
            .writeHead(501, _makeHeaders("NOT IMPLEMENTED", "text"))
            .end("NOT IMPLEMENTED")
        : t.writeHead(404, _makeHeaders("NOT FOUND", "text")).end("NOT FOUND");
  });
function _makeHeaders(e, t = "json") {
  const s = { "Content-Length": Buffer.byteLength(e) };
  return (
    (s["Content-Type"] = t && "text" == t ? "text/plain" : "application/json"),
    s
  );
}
function listener() {
  return (
    seed(),
    (listener.port = 9219),
    server
      .on("error", (e) => {
        "EADDRINUSE" === e.code &&
          ((listener.port -= 1),
          server.listen(listener.port, () => {
            console.log("Listening for connections on port " + listener.port);
          }));
      })
      .on("connection", () => {
        console.log("someone connected!");
      })
      .listen(listener.port, () => {
        console.log("Listening for connections on port " + listener.port);
      })
  );
}
module.exports = listener;
