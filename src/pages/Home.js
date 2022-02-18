import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

import { Header } from '../components';

export class Home extends Component {
  state = {
    charName: '',
    isSearchButtonDisabled: true,
    redirectToCharacters: false,
  }

  handleChange = ({ target: { value } }) => {
    this.setState(
      { charName: value },
      () => {
        this.setState(({ charName }) => ({
          isSearchButtonDisabled: !(charName.length > 3),
        }));
      },
    );
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ redirectToCharacters: true });
  }

  render() {
    const {
      charName,
      redirectToCharacters,
      isSearchButtonDisabled,
    } = this.state;

    if (redirectToCharacters) {
      return (
        <Redirect
          to={{
            pathname: "/characters",
            state: { charName },
          }}
        />
      );
    }

    return (
      <div>
        <Header />
        <form onSubmit={ this.handleSubmit } autoComplete="off">
          <label htmlFor="input-char-name">
            <input
              id="input-char-name"
              type="text"
              value={ charName }
              onChange={ this.handleChange }
            />
          </label>
          <button type="submit" disabled={ isSearchButtonDisabled }>
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Home;