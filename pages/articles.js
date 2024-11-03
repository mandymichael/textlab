import TextStyles from "../styles/Text.module.css";
import HomeStyles from "../styles/Home.module.css";
import TagList from "../components/tagList";
import ContainerStyles from "../styles/Container.module.css";
import Generic from "../styles/Generic.module.css";
import ListPageStyles from "../styles/ListPage.module.css";

import { getSortedPostsData } from "../lib/posts";
import Header from "../components/header";
import Footer from "../components/footer";
import FeaturedPost from "../components/featuredPost";
import PostList from "../components/postList";
import HeadBlock from "../components/head";
import { GoogleAnalytics } from "@next/third-parties/google";

export default function Home({ articles, featuredList, displayList }) {
  const tags = [...new Set(articles.map(({ tags }) => tags).flat())];

  return (
    <div className={Generic.pageContainer}>
      <style global jsx>{`
        @font-face {
          font-family: Roslindale;
          src: url(./fonts/RoslindaleDisplay-Bold-subset.woff2);
          weight: 700;
          font-display: swap;
        }

        @font-face {
          font-family: "Times Fallback";
          src: local("Times New Roman");
          size-adjust: 114%;
          ascent-override: 84%;
        }

        @font-face {
          font-family: Roboto;
          src: url(./fonts/RobotoFlex-SubsetSlicedExtra.woff2);
          weight: 100 1000;
          width: 25 151;
          font-display: optional;
        }

        h1 {
          font-family: Roslindale, "Times Fallback", serif;
        }

        body {
          font-family: Roboto, Arial, sans-serif;
        }
      `}</style>
      <HeadBlock
        title="Articles about text"
        description="Articles about text, text properties, performance, usage, demos and explanations"
        url="https://textlab.dev/articles"
        keywords="Text lab, articles, font demos, fonts"
        image="/images/metadata/main-og2.jpg"
      />
      <GoogleAnalytics gaId="G-BKGWYR0HVY" />

      <main className={HomeStyles.main}>
        <Header />

        <section className={`${ContainerStyles.section} PageHeader`}>
          <div
            className={`${ContainerStyles.wrapper} ${ContainerStyles.stacked}`}
          >
            <p className={TextStyles.metaDataText}>{articles.length} Posts</p>
            <h1 className={TextStyles.heading}>Articles</h1>
          </div>

          <div
            className={`${ContainerStyles.doubleBorderContainer} ${ListPageStyles.tagGroup}`}
          >
            <details className={ListPageStyles.tagDetails}>
              <summary className={`${ListPageStyles.tagDetailsSummary}`}>
                Tags
              </summary>
              <TagList tags={tags} noSlice={true} />
            </details>
          </div>
        </section>

        {featuredList.length > 0 && (
          <FeaturedPost featuredPost={featuredList} />
        )}
        <PostList
          posts={displayList}
          title="Articles"
          tagType="all"
          postType="article"
        />
      </main>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const articles = getSortedPostsData().filter((post) => {
    const lists = post.tags && post.tags.includes("article");
    return lists;
  });

  const displayList = articles.filter((post) => {
    const lists = post.tags && !post.tags.includes("featured");
    return lists;
  });

  const featuredList = articles
    .filter((post) => {
      const lists = post.tags && post.tags.includes("featured");
      return lists;
    })
    .slice(0, 1);

  return {
    props: {
      displayList,
      articles,
      featuredList,
    },
  };
}
