import Head from 'next/head';

export default function HeadBlock({title, description, url, keywords, image, customStyles, canonical}) {

    return (
        <Head>
            <title>{title}</title>
            {customStyles === 'roslindale' && <link rel="stylesheet" href="/customStyles/roslindale.css"/>}

            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="robots" content="index, follow" />
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="language" content="English" />
            <meta name="author" content="Mandy Michael" />

            <meta property="og:title" content={title} />
            <meta property="og:site_name" content='Text Lab' />
            <meta property="og:url" content={url} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="article" />
            <meta property="og:image" content={image} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta property="twitter:domain" content="variablefonts.dev" />
            <meta property="twitter:url" content={url} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={`https://textlab.dev${image}`} />

            <link rel="icon" href="/favicon.ico" />
            <link rel="canonical" href={canonical} />


        </Head> 
    )
}