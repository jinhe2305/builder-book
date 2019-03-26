import React from 'react';
import Head from 'next/head';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import withLayout from '../lib/withLayout';

class Index extends React.Component {
  render() {
    return (
      <div style={{ padding: '10px 45px' }}>
        <Head>
          <title>Notifier component</title>
          <meta
            name="description"
            content="How to show informational messages using Material-UI in a React web app"
          />
        </Head>
        <form>
          <p> What is 2+2? </p>
          <TextField
            type="number"
            label="Type your answer"
            style={{
              font: '15px Muli',
              color: '#222',
              fontWeight: '300',
            }}
          />
          <p />
          <Button
            variant="raised"
            color="primary"
            type="submit"
          >
            Submit
          </Button >
        </form>
      </div >
    );
  }
}

export default withLayout(Index);
