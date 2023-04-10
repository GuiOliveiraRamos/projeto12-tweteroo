import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const usuario = [];
const tweets = [];

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;

  if (!username || !avatar) {
    return res.status(400).send("Todos os campos são obrigatórios");
  }

  if (typeof username !== string || typeof avatar !== string){
    return res.status(400).send("Os valores de username e avatar devem ser strings!")
  }

  usuario.push({ username, avatar });
  res.send("Cadastrado com sucesso");
});

app.post("/tweets", (req, res) => {
  const { username, tweet } = req.body;
  const verificarUsuario = usuario.find((u) => u.username === username);
  if (!verificarUsuario) {
    res.send("UNAUTHORIZED");
  }

  if (!username || !tweet) {
    return res.status(400).send("Todos os campos são obrigatórios");
  }

  if (typeof username !== string || typeof tweet !== string){
    return res.status(400).send("Os valores de username e avatar devem ser strings!")
  }

  tweets.push({ username, tweet });
  res.send("OK");
});

app.get("/tweets", (req, res) => {
  if (tweets.length === 0) {
    res.send([]);
  }

  const limitedTweets = tweets.slice(0, 10);

  const userInfos = limitedTweets.map((tweet) => ({
    username: tweet.username,
    tweet: tweet.tweet,
    avatar: usuario.find((u) => u.username === tweet.username).avatar,
  }));

  res.send(userInfos);
});

const PORT = 5000;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
