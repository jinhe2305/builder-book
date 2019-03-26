import React from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import Error from 'next/error';

import EditBookComp from '../../components/admin/EditBook';
import { getBookDetail, editBook } from '../../lib/api/admin';
import withLayout from '../../lib/withLayout';
import withAuth from '../../lib/withAuth';
import notify from '../../lib/notifier';

class EditBook extends React.Component {
  static propTypes = {
    slug: PropTypes.string.isRequired,
  };

  static getInitialProps({ query }) {
    return { slug: query.slug };
  }

  state = {
    error: null,
    book: null,
  };

  async componentDidMount() {
    NProgress.start();

    try {
      const book = await getBookDetail({ slug: this.props.slug });
      this.setState({ book }); // eslint-disable-line
      NProgress.done();
    } catch (err) {
      this.setState({ error: err.message || err.toString() }); // eslint-disable-line
      NProgress.done();
    }
  }

  editBook = async (data) => {
    const { book } = this.state;
    NProgress.start();

    try {
      const editedBook = await editBook({ ...data, id: book._id });
      notify('Saved');
      NProgress.done();
      Router.push(`/admin/book-detail?slug=${editedBook.slug}`, `/admin/book-detail/${editedBook.slug}`);
    } catch (err) {
      notify(err);
      NProgress.done();
    }
  };

  render() {
    const { book, error } = this.state;

    if (error) {
      notify(error);
      return <Error statusCode={500} />;
    }

    if (!book) {
      return null;
    }

    return (
      <div>
        <EditBookComp onSave={this.editBook} book={book} />
      </div>
    );
  }
}

export default withAuth(withLayout(EditBook));
