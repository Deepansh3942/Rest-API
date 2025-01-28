const express = require("express");
const fs = require("fs");

const users = require("./rough_data.json");

const app = express();
const PORT = 1020;

// Middleware - Plugin
app.use(express.urlencoded({ extended: false }));

//ROUTES

// fetch all users
app.get("/users", (req, res) => {
  const html = `
<ul>
${users.map((user) => `<li>${user.first_name}</li>`).join(" ")}
</ul>
`;
  res.send(html);
});

// fetch all users
app.get("/api/users", (req, res) => {
  return res.json(users);
});

app
  .route("/api/users/:id")
  // fetch user with an ID
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })

  // edit the user with ID
  .patch((req, res) => {
    return res.json({ status: "pending" });
  })

  // to delete an existing user with id
  .delete((req, res) => {
    return res.json({ status: "pending" });
  });

// create new user
app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./rough_data.json", json.stringify(users), (err, data) => {
    return res.json({ status: "success", id: users.length });
  });
});

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
