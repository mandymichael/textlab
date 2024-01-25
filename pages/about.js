import Link from 'next/link';
import HeadBlock from "../components/head";
import Generic from "../styles/Generic.module.css"
import TextStyles from '../styles/Text.module.css';
import HomeStyles from '../styles/Home.module.css';
import ContainerStyles from '../styles/Container.module.css';
import PostStyles from '../styles/PostContent.module.css';
import { GoogleAnalytics } from '@next/third-parties/google'

import Header from '../components/header';
import Footer from '../components/footer';

export default function About() { 
    return (
        <div className={Generic.pageContainer}>
            <HeadBlock title="About" description="About Text Lab" url="https://textlab.dev/about" image="/images/metadata/main-og3.jpg" />
            <GoogleAnalytics gaId="G-BKGWYR0HVY" />

            <main className={HomeStyles.main}>
            <Header/>

            <section className={`${ContainerStyles.section} PageHeader`}>
                <div className={` ${ContainerStyles.stacked}`}>
                    <h1 className={TextStyles.heading}>About</h1>
                </div>
            </section>

            <section className={`${PostStyles.container} PostContent`}>
                <p>This project was created by <a href="https://twitter.com/@mandy_kerr" target="_blank">Mandy Michael</a> to showcase the many possibilities and opportunities of text on the web.</p>
                <p>Text, text properties and working with text on the web seems simple, but there are a lot of properties, approaches and best practices to consider to best represent your content. Text Lab
                    aims to highlight modern approaches, new features in web technologies like CSS and Fonts, and teach you how to make the most of what the web has to offer for controlling and displaying text.
                </p>
                <p>Extra special thanks to <Link href="https://petebarr.com/">Pete Barr</Link> for designing the site for me.</p>
            </section>

            </main>
            <Footer />
        </div>
    );
}
