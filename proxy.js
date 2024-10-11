import express from 'express';
import cors from'cors';
import axios from'axios';

const PORT = 4000;

const app = express();

const URL = "https://serpapi.com/search.json"

const apiKEY =
    "4156a45666f25bc4889481cfeb8325e443538778d1684b92f0200bcb089dd219";

app.use(cors());

app.get('/search', async (req,res) => {

    const {query} = req.query;

    try{
        const response = await axios.get(URL, {
            params: {
              q: query,
              api_key: apiKEY,
              num: 10,
              engine: "google",
              google_dormain: "google.com.br",
              hl: "pt-br",
              gl: "br",
            },
          });
    
          res.json(response.data);

    } catch{
        res
        .stastus(500)
        .json({error: "Ocorreu um erro ao fazer a requisição á API"});
    }
});

app.listen(PORT, () => {
    console.log (`O proxy esta rodandop na porta ${PORT}`) 
});