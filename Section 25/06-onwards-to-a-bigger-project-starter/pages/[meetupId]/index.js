import Head from "next/head";
import MeetupDetail from "../../components/meetups/meetupDetail";
import { MongoClient, ObjectId } from "mongodb";

/**
 * aula 481: getting details from db
 *  Primeiro precisamos lembrar que estamos usando getStaticProps, o que define o projeto como tendo todas as páginas executadas em tempo de compilação no build.
 *  Logo precisamos adicionar dinanmicamente as path de todos os meetups que temos no db. Para isso fazemos a rotina de acesso ao db do mongo, acessando a conxão com o cliente,await MongoClient.connect, defpois  pegamos o bd dentro do cliente,client.db, e então pegamos a tabela onde estão armaxenados os dados do meetups,  db.collection("meetups"), para então podermos pegarmos os dados do db, filtrando eles para só retornarem os _ids em forma de array, await meetupsCllection.find({}, { _id: 1 }).toArray().
 *  Feito a conexão com db e tendo os dados em mãos precisamos definir os caminhos no retorno da função getStaticPaths. Para isso retornamos um obj com o formato abaixo, para cumprir expecificação do next.
 * 
 * Seguindo isso precisamos pegar os dados de cada caminho definido conforme mostrado nos parágrafos anteriores. Para isso o Nextjs irá chamar a função etStaticProps, para pegar os dados de cada meetup específico e por na tela. Para isso dentro da função getstaticProps, fazemos a mesma rotina de acesso ao db na função getStaticPaths, só que dessa vez filtramos os dados retornado para aparecem dados somente do meetup que está no path atual em que o getStaticProps foi chamado, await meetupsCllection.findOne({_id: new ObjectId(`${meetupId}`). Fazemos new ObjectId pois é um tipo de dado do MongoDB, logo para procurarmos dentro do Mongodb temos que converter para o formato entro dele.
 *  Feito isso precisamos retonar um objeto com os dados do meetup atual pegado do db Fazemos isso com: 
 * {
    props: {
      meetupData: { ...selectedMeetup, _id: selectedMeetup._id.toString() },
    },
  }
 */

function MeetupDetails(props) {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://augusto-hs-95:k70b0Gyfkinh3TNb@cluster0.hw6iajq.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
  );
  const db = client.db();
  const meetupsCllection = db.collection("meetups");
  const meetups = await meetupsCllection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://augusto-hs-95:k70b0Gyfkinh3TNb@cluster0.hw6iajq.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
  );
  const db = client.db();
  const meetupsCllection = db.collection("meetups");
  const selectedMeetup = await meetupsCllection.findOne({
    _id: new ObjectId(`${meetupId}`),
  });
  client.close();

  return {
    props: {
      meetupData: { ...selectedMeetup, _id: selectedMeetup._id.toString() },
    },
  };
}

export default MeetupDetails;
