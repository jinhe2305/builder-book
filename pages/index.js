import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import Header from '../components/HomeHeader';
import Footer from '../components/HomeFooter';

import {
  styleBigAvatar,
  styleRaisedButton,
  styleHomepageFeature,
  styleH1,
} from '../lib/SharedStyles';
import withLayout from '../lib/withLayout';
import withAuth from '../lib/withAuth';

const styleTeamMember = {
  textAlign: 'center',
  padding: '10px 5%',
};

const Index = ({ user }) => (
  <div>
    <Head>
      <title>Open source (MIT License) web app to publish documentation and books</title>
      <meta
        name="description"
        content="Open source web app built with modern JavaScript stack: React, Material UI, Next, Express, Mongoose, and MongoDB. Integrated with AWS SES, Github, Google OAuth, Stripe, and MailChimp."
      />
    </Head>
    <Header user={user} />
    <div style={{ padding: '10px 8%', fontSize: '15px' }}>
      <Grid container direction="row" justify="space-around" align="flex-start">
        <Grid item sm={12} xs={12} style={{ textAlign: 'center' }}>
          <br />
          <h1 style={styleH1}>Open source app</h1>
          <iframe
            src="https://ghbtns.com/github-btn.html?user=builderbook&repo=builderbook&type=star&count=true&size=large"
            frameBorder="0"
            scrolling="0"
            width="160px"
            height="30px"
            title="Builder Book Github"
          />
          <p>
            Open source web app (MIT License) to publish documentation and books.
            <br />
            Built with React, Material-UI, Next, Express, Mongoose, and MongoDB.
          </p>
          <p style={{ textAlign: 'center' }}>
            <Link
              prefetch
              as="/books/demo-book/introduction"
              href="/public/read-chapter?bookSlug=demo-book&chapterSlug=introduction"
            >
              <Button variant="contained" color="primary" style={styleRaisedButton}>
                Live App
              </Button>
            </Link>
            <a
              href="https://github.com/builderbook/builderbook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="contained" color="secondary" style={styleRaisedButton}>
                Github
              </Button>
            </a>
          </p>
        </Grid>
      </Grid>

      <h1 style={styleH1}>How can you use this app?</h1>
      <Grid container direction="row" justify="space-around" align="flex-start">
        <Grid item sm={6} xs={12} style={styleHomepageFeature}>
          <p>
            <b> As learning material </b>
          </p>
          <p>
            {' '}
            Start with our
            <a
              href="https://github.com/builderbook/builderbook/tree/master/boilerplate"
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}
              boilerplate
            </a>
            {' '}
            or clone the entire project. Customize the code to build your own web app.
          </p>
        </Grid>
        <Grid item sm={6} xs={12} style={styleHomepageFeature}>
          <p>
            <b> To publish documentation or a book </b>
          </p>
          <p>
            Write documentation and books in Markdown. Write with your favorite code editor and sync
            content using Github.
          </p>
        </Grid>
      </Grid>

      <br />

      <h1 style={styleH1}>Features</h1>
      <Grid container direction="row" justify="space-around" align="flex-start">
        <Grid item sm={6} xs={12} style={styleHomepageFeature}>
          <p>
            <b> Modern JavaScript stack </b>
          </p>
          <p>
            Be productive and ship fast with React.js, Material-UI, Next.js, Express.js, Mongoose,
            MongoDB. We keep the app
            <a
              href="https://github.com/builderbook/builderbook/blob/master/package.json"
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}
              dependencies
              {' '}
            </a>
            up-to-date.
          </p>
        </Grid>
        <Grid item sm={6} xs={12} style={styleHomepageFeature}>
          <p>
            <b> Popular third party APIs </b>
          </p>
          <p>
            Google for user authentication, Github for markdown and collaboration, AWS SES for
            transactional emails, MailChimp for newsletters, Stripe for selling.
          </p>
        </Grid>
        <Grid item sm={6} xs={12} style={styleHomepageFeature}>
          <p>
            <b> Blazing fast </b>
          </p>
          <p>
            Best of both worlds: the initial page load is server-side rendered and all subsequent
            loads are client-side rendered. Some pages are prefetched in the background.
          </p>
        </Grid>
        <Grid item sm={6} xs={12} style={styleHomepageFeature}>
          <p>
            <b> Deploy in under 60 seconds </b>
          </p>
          <p>
            We use this app to write, host, and sell
            <a
              href="https://builderbook.org/books/builder-book/introduction"
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}
              our book
            </a>. You are welcome to use this app as a boilerplate.
            <a
              href="https://github.com/builderbook/builderbook#deploy"
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}
              Deploy
            </a>{' '}
            it to your own domain in under 60 seconds using
            <a href="https://zeit.co/now" target="_blank" rel="noopener noreferrer">
              {' '}
              Now
            </a>.
          </p>
        </Grid>
      </Grid>

      <br />

      <h1 style={styleH1}>The Team</h1>
      <div style={{ textAlign: 'center' }}>
        Together, we&apos;ve built
        <a
          href="https://github.com/builderbook/builderbook"
          target="_blank"
          rel="noopener noreferrer"
        >
          {' '}
          Builder Book
        </a>{' '}
        and
        <a href="https://findharbor.com" target="_blank" rel="noopener noreferrer">
          {' '}
          Harbor
        </a>. Stay tuned for
        <a href="https://github.com/async-labs/async-saas" target="_blank" rel="noopener noreferrer">
          {' '}
          Async
        </a>.
      </div>
      <br />
      <Grid container direction="row" justify="space-around" align="flex-start">
        <Grid item sm={4} xs={12} style={styleTeamMember}>
          <Avatar
            src="https://storage.googleapis.com/builderbook/timur-picture.png"
            style={styleBigAvatar}
            alt="Timur Zhiyentayev"
          />
          <p>
            <a href="https://github.com/tima101" target="_blank" rel="noopener noreferrer">
              Timur Zhiyentayev
            </a>
            <br />
            Vancouver, WA
          </p>
          <p>
            Tima is a JavaScript web developer. He likes learning any technology that improves
            end-user experience.
          </p>
        </Grid>
        <Grid item sm={4} xs={12} style={styleTeamMember}>
          <Avatar
            src="https://storage.googleapis.com/builderbook/kelly-picture.png"
            style={styleBigAvatar}
            alt="Kelly Burke"
          />
          <p>
            <a href="https://github.com/klyburke" target="_blank" rel="noopener noreferrer">
              Kelly Burke
            </a>
            <br />
            Vancouver, WA
          </p>
          <p>
            Kelly is a front-end developer. She likes using React, Material Design, and VS editor
            and enjoys solving UX problems.
          </p>
        </Grid>
        <Grid item sm={4} xs={12} style={styleTeamMember}>
          <Avatar
            src="https://storage.googleapis.com/builderbook/delgermurun-picture.png"
            style={styleBigAvatar}
            alt="Delgermurun Purevkhuu"
          />
          <p>
            <a href="https://github.com/delgermurun" target="_blank" rel="noopener noreferrer">
              Delgermurun Purevkhuu
            </a>
            <br />
            Ulaanbaatar, Mongolia
          </p>
          <p>
            Del is a back-end developer. He has built many production-ready web apps with JavaScript
            and Python.
          </p>
        </Grid>
      </Grid>

      <br />
    </div>
    <Footer />
  </div>
);

Index.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }),
};

Index.defaultProps = {
  user: null,
};

export default withAuth(withLayout(Index, { noHeader: true }), { loginRequired: false });
