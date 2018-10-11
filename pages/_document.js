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
          <title>Igfluencer.id</title>
          <meta
            name="description"
            content="Find the perfect influencer for your business"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta property="og:url" content="https://www.duajarimanis.com" />
          <meta property="og:site_name" content="Duajarimanis" />
          <meta property="og:title" content="Create Wedding Website" />
          <meta property="og:description" content="Create Wedding Website" />
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
