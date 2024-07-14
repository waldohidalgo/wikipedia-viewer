export async function getURLRandom() {
  const urlWikiRandomAPI =
    "https://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&prop=info&format=json";

  const response = await fetch(urlWikiRandomAPI, {
    cache: "no-store",
  });
  const data = await response.json();
  const pageId = Object.keys(data.query.pages)[0];
  const urlWikiPage = `https://en.wikipedia.org/w/index.php?curid=${pageId}`;

  return urlWikiPage;
}

export default async function RandomSection() {
  let urlWikiPage;
  try {
    urlWikiPage = await getURLRandom();
  } catch (error) {
    return <div className="text-center">Error: {error.message}</div>;
  }
  return (
    <div className="text-center p-2">
      <a href={urlWikiPage} target="_blank" rel="noreferrer noopener">
        <button className="bg-green-500 hover:bg-green-300 text-white font-bold py-2 px-4 rounded">
          Click here to display a random Wikipedia page.
        </button>
      </a>
    </div>
  );
}
