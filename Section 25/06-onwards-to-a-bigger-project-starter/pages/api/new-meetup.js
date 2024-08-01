import { MongoClient } from "mongodb";

/**
 * aula 477: API routes
 *  Para trabalhar com o back-end dentro de um aplicação Nexxtjs, basta criar uma pasta chamada api, que o Nextjs automaticamente executa todos os arquivos dentro desta pasta no servidor. Assim podemos trabalhar sem nos preocuparmos com problemas de segurança no front-end.
 *  Dentro deste arquivo new-meetup.js, definimos uma função que retornará json e lidará com os requests.
 */
/**
 * aula 478: Working with MongoDB
 *  Pra trabalhar com MongoDB, deve criar conta no site do mongo e criar um cluster. Neste caso será um clustergratuito para aprendizados chamado M0.
 *  Feito isso temos que configuraro usuario para acesso a db e Ip address.
 *
 *  Para acessar o db do app next, temos que instalar o mongodb pelo npm. Então criamos um arquivo que irá fazer as rotinas de back-end e salvar os dados no mongo.
 *  Para isso conferimos se é um Post request, se for o caso, pegamos os dados a serem submetidos no req.body.
 *  Para acessar o cluster MongoDB criado, usamos o comando MongoClient.connect com o urlfornecido com o usuario e senha conforme abaixo.
 *  Para acessar o db dentro do cluster fazemos .bd() conforme abaixo. E para acessar os Collections dentro do db devemos fazer db.collection('nome-do-collection')
 *  Para iserir dado no collection usamos insertOne(data a ser adicionado)
 *
 */

// /api/new-meetup

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const { title, image, address, description } = data;

    const client = await MongoClient.connect(
      "mongodb+srv://augusto-hs-95:k70b0Gyfkinh3TNb@cluster0.hw6iajq.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
    );
    const db = client.db();

    const meetupsCllection = db.collection("meetups");

    const result = await meetupsCllection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "Meetup Inserted!!" });
  }
}

export default handler;
