// checked
import '@styles/globals.css';

import Nav from '@components/Nav';
import Provider from '@components/Provider';

export const metadata = {
  title: 'enPromptipedia',
  // title: 'PromptThis',
  // title: 'Promptopia'
  description: 'A place to discover and share AI prompts.',
};

const RootLayout = ({ children }) => (
  <html lang="en">
    {/* <body> */}
    <body suppressHydrationWarning={true}>
      <Provider>
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">
          <Nav />
          {children}
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
