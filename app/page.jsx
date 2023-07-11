// checked
import Feed from '@components/Feed';

const Home = () => (
  <section className="w-full flex-center flex-col">
    <h1 className="head_text text-center">
      Discover & Share Prompts
      <br className="max-md:hidden" />
      <span className="orange_gradient text-center">AI-Powered Prompts</span>
    </h1>
    <p className="desc text-center">
      enPromptopedia is an open-source AI prompting tool for the modern world to
      discover, create and share creative prompts
    </p>

    <Feed />
  </section>
);

export default Home;
