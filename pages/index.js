import Head from 'next/head';
import Header from '../components/Header';
import GenreNav from '../components/GenreNav';
import Results from '../components/Results';
import requests from '../utils/requests';

export default function Home({ results }) {
  return (
    <div>
      <Head>
        <title>Hulu 2.0</title>
        <meta name="description" content="Mobile-first UI Replica of HULU" />
      </Head>
      <Header />
      <GenreNav />
      <Results results={results} />
    </div>
  );
}

// Fetch third-party API (themoviedb.org) data using SSR
export async function getServerSideProps(context) {
  const genre = context.query.genre;
  const endpoint = `https://api.themoviedb.org/3${
    requests[genre]?.url || requests.fetchTrending.url
  }`;
  const request = await fetch(endpoint).then((res) => res.json());

  return {
    props: {
      results: request.results,
    },
  };
}
