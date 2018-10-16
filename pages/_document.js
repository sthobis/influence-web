import { extractCritical } from "emotion-server";
import Document, { Head, Main, NextScript } from "next/document";

const fa = `/*!
* Font Awesome Free 5.3.1 by @fontawesome - https://fontawesome.com
* License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
*/`;

class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const page = renderPage();
    const styles = extractCritical(page.html);
    return { ...page, ...styles };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta
            name="description"
            content="Find Top Instagram Influencers in Indonesia"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta property="og:url" content="https://igfluencer.id" />
          <meta property="og:site_name" content="igfluencer.id" />
          <meta
            property="og:title"
            content="Find Top Instagram Influencers in Indonesia"
          />
          <meta
            property="og:description"
            content="Find Top Instagram Influencers in Indonesia"
          />
          <link
            rel="icon"
            type="image/png"
            href="/static/images/icon-192x192.png"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Nunito:400,600,700"
            rel="stylesheet"
          />
          <style
            dangerouslySetInnerHTML={{
              __html: fa + this.props.css
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
