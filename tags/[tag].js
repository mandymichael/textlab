import Head from 'next/head';
import TextStyles from '../../styles/Text.module.css';
import HomeStyles from '../../styles/Home.module.css';
import ContainerStyles from '../../styles/Container.module.css';
import Generic from '../../styles/Generic.module.css';

import { getSortedPostsData } from '../../lib/posts';
import Header from '../../components/header';
import Footer from '../../components/footer';
import PostList from '../../components/postList';

export default function Home({ articles, tag }) {


  return (
    <div className={Generic.pageContainer}>
      <Head>
        <title>Text Lab</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GoogleAnalytics gaId="G-BKGWYR0HVY" />

      <main className={HomeStyles.main} >
        <Header/>
       <section className={`${ContainerStyles.section} PageHeader`}>
            <div className={`${ContainerStyles.wrapper} ${ContainerStyles.stacked}`}>
                <p className={TextStyles.metaDataText}>{articles.length} Posts</p>
                <h1 className={TextStyles.heading}>{`Posts tagged '${tag}'`}</h1>
            </div>
        </section>

        <PostList posts={articles} title={`Tag: ${tag}`} tagType="all" postType="list" /> 
      </main>
      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  const postTags = getSortedPostsData().map(({ tags }) => tags).flat();
  const tagList = [...new Set(postTags)].filter(Boolean);
  const paths = tagList.map(x => ({params: {tag: x}}));

   return {
    paths: [...paths],
    fallback: false,
  };
}

export async function getStaticProps({params}) {
  
  const postData = getSortedPostsData();


  const articles = getSortedPostsData().filter((post) => {
    const listOfArticles = post.tags && post.tags.includes(params.tag);
      return listOfArticles;
    }
  )  

  return {
    props: {
      postData,
      articles,
      tag: params.tag
    },
  };
}