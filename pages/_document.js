import { extractCritical } from "emotion-server";
import Document, { Head, Main, NextScript } from "next/document";

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
            href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700"
            rel="stylesheet"
          />
          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
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
