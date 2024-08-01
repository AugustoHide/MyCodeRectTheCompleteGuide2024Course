import fs from "node:fs";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import { S3 } from "@aws-sdk/client-s3";

/**
 * aula 431: Fetching data by leveraging NextJs
 *  nessa aula, criamos esste aruivo meals.js dentro da pasta lib onde iremos fazer a função que irá pegar imagens do db.
 *  Para pegar o db é so chamar sql(nome do db)
 *  Para pegar os dados do db usamesmo prepare com query
 *      SLECT * FROM meals
 *  que pega todos os items da tabela meals
 *  o .all() pega todos os dados
 *  Se fossse
 *      .run(): iríamos fazer alterações no db
 *
 */
/**
 * aula 436: Loadign meal detail
 *  aqui criamos a função para pegar os dados especificos de um meal. Descobrimos qual meal vai ser procurado através do valos do parametro de url.
 *  Para evitar sql injection, que pode trazer vulnerabilidade para sistema, usamos o método get(param-url-passado)
 */
/**
 * aula 444: Creating slug & sanitine user input
 *  Precisaremos criar o campo slug no db. Para isso importaremos a biblioteca slugify.
 *  Para proteger de ataques, pelo fato de que os instructions foram passados dangerouslySetInnerHTML, ou seja, foram passados como html, o que abre espaço para ataque, com croos site scripting atacks.
 */
/**
 * aula 445:Storing images &...
 *  Para fazer ubmissão de arquivo, nesse caso imagem.
 *    Primeiro tivemos que montar o nome do arquivo, sendo ele composto pela extensão do arquivo, por exemplo .png .jpeg, junto com o titilo do arquivo, que é o meal.slug criado nessa função.
 *   Para salvar arquivo.
 *    Precisamos escrever no endereço da pasta. para isso importamos a biblioteca fs do node e fazemos fs.createWriteStream(caminho da pasta onde será salvo o arquivo de img).
 *    Após isso precisamos fazer um buffer da img que será salva. Fazemos isso através de meal.image.arrayBuffer()
 *    Para salva arq fazemos stream.write para escrever o arquivo.
 *
 *  Para salvar no db, basta usar o prepare, com o script sql abaixo e, em vez de inserir manualmente, o que abre vulnerabilidade para cross scripting e ataques, passamos o nome dos valores com @ e então chamamos com run(objeto com ddados que serão salvos)
 */
const s3 = new S3({
  region: "us-east-2",
});
const db = sql("meals.db");

export async function getMeals() {
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  const bufferedImage = await meal.image.arrayBuffer();

  await s3.putObject({
    Bucket: "augustohide-nextjs-demo-users-image",
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  });

  meal.image = fileName;

  db.prepare(
    `
    INSERT INTO meals
    (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
    `
  ).run(meal);
}
