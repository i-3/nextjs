import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
// import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { CohereEmbeddings } from '@langchain/cohere';
// import { MemoryVectorStore } from 'langchain/vectorstores/memory';

const embeddings = new CohereEmbeddings({
  model: 'embed-english-v3.0',
});
// const vectorStore = new MemoryVectorStore(embeddings);

export default async function Page_() {
  const loader = new PDFLoader('data/nke-10k-2023.pdf');
  const docs = await loader.load();

  // console.log(docs.length);
  // console.log(docs[0].pageContent.slice(0, 200));
  // console.log(docs[0].metadata);

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const allSplits = await textSplitter.splitDocuments(docs);
  // console.log(allSplits.length);

  const vector1 = await embeddings.embedQuery(allSplits[0].pageContent);
  // const vector2 = await embeddings.embedQuery(allSplits[1].pageContent);

  // console.assert(vector1.length === vector2.length);
  // console.log(`Generated vectors of length ${vector1.length}\n`);
  // console.log(vector1.slice(0, 10));

  // await vectorStore.addDocuments(allSplits);

  // const results1 = await vectorStore.similaritySearch(
  //   'When was Nike incorporated?'
  // );
  // const results2 = await vectorStore.similaritySearchWithScore(
  //   "What was Nike's revenue in 2023?"
  // );
  // const embedding = await embeddings.embedQuery(
  //   "How were Nike's margins impacted in 2023?"
  // );

  // const results3 = await vectorStore.similaritySearchVectorWithScore(
  //   embedding,
  //   1
  // );

  // const retriever = vectorStore.asRetriever({
  //   searchType: 'mmr',
  //   searchKwargs: {
  //     fetchK: 1,
  //   },
  // });

  // let res = await retriever.batch([
  //   'When was Nike incorporated?',
  //   "What was Nike's revenue in 2023?",
  // ]);

  return (
    <>
      <div className=' bg-background flex justify-center items-center'>
        <p className='flex-1 px-2'>{allSplits[0].pageContent}</p>
        <p className='flex-1 px-2'>
          {JSON.stringify(vector1.slice(0, 50), null, 2)}
        </p>
      </div>
    </>
  );
}
