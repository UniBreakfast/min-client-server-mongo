const db_login = 'min-user';
const db_password = 'TLe9V7ko2GdQRDBi';
const db_name = 'min_db';
const db_collection = 'min_col';

const { MongoClient, ServerApiVersion } = require('mongodb');
const { createServer } = require('http');

connectToDB().then(runServer);

async function connectToDB() {
  const uri = `mongodb+srv://${db_login}:${db_password}@cluster0.x0yir.gcp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster`;

  const client = new MongoClient(uri, {
    serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true, }
  });

  await client.connect();

  return client.db(db_name).collection(db_collection);
}

function runServer(collection) {
  createServer(
    /* request handler */async (request, response) => {
      const items = await collection.find().toArray();

      const html = /* html */`<ul>${ items.map(buildItem).join('') }</ul>`;

      response.writeHead(200, { 'Content-Type': 'text/html' }).end(html);
    }
  ).listen(8080, () => console.log('http://localhost:8080'));
}

function buildItem({ _id, letter }) {
  return `<li data-id="${_id}">${letter}</li>`;
}
