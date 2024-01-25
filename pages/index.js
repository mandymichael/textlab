import HomeHeader from '../styles/HomeHeader.module.css';
import HomeStyles from '../styles/Home.module.css';
import Generic from '../styles/Generic.module.css';

import { getSortedPostsData } from '../lib/posts';
import Header from '../components/header';
import Footer from '../components/footer';
import PostList from '../components/postList';
import FeaturedPost from '../components/featuredPost';
import HeadBlock from '../components/head.js';

const description="Articles about text, text properties, accessibility, performance, usage, demos and explanations" 
const keywords ='Text lab, text properties, css, mandy michael'

export default function Home({ recentPosts, articles, featuredPost }) {
  return (
    <div className={Generic.pageContainer}>

      <HeadBlock 
        title="Text Lab" 
        description={description}
        url="https://textlab.dev"
        keywords={keywords}
        image="/images/metadata/main-og3.jpg"
      />

      <main className={HomeStyles.main} >
        <Header/>
        <section className={HomeHeader.container}>
          <h1 className={HomeHeader.pageHeading}>
            Text Lab
          </h1>
          <p className={HomeHeader.pageHeadingSubtitle}>Working with text on the web</p>

          <h2 className={HomeHeader.intro}>A collection of fun experiments, effects, examples and stuff I have learned as a developer about working with text on the web.</h2>
          <p className={HomeHeader.creator}>Made by <a href="https://mandy.dev" target="_blank">Mandy Michael</a> supported by <a href="https://www.instagram.com/adognamedjello" target="_blank">Jello</a>.</p>
          <p className={HomeHeader.volume}><span className={HomeHeader.volumeText}>Vol</span><span className={HomeHeader.volumeNum}>1.0</span></p>
        </section>

        {featuredPost.length > 0 && <FeaturedPost featuredPost={featuredPost} /> }

        {recentPosts.length > 0 && <PostList posts={recentPosts} title="Recent Posts" tagType="parent" />}
        {/* {articles.length > 0 && <PostList posts={articles} title="Articles" columns={4} postType="article" showMore="true" />} */}

        
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();

  const featuredPost = getSortedPostsData().filter((post) => {
    const lists = post.tags && post.tags.includes('featured');
      return lists;
    }
  ).slice(0,1);

  const recentPosts = getSortedPostsData().filter((post) => {
    const recent =  post.id !== featuredPost[0].id;
      return recent;
    }
  ).slice(0,3);

  const articles = getSortedPostsData().filter((post) => {
      const listOfArticles = post.tags && post.tags.includes('article') && post.id !== featuredPost[0].id;
      return listOfArticles;
    }
  ).slice(0,4);
  

  return {
    props: {
      allPostsData,
      recentPosts,
      articles,
      featuredPost
    },
  };
}