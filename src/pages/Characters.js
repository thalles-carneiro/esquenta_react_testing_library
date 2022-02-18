import React, { Component } from 'react'

import { CharCard, Navbar } from '../components';
import getCharByName from '../services/charactersAPI';

export class Characters extends Component {
  state = {
    characters: [],
    notFoundMessage: '',
  }

  async componentDidMount() {
    const { location: { state: { charName } } } = this.props;
    const characters = await getCharByName(charName);

    if (!characters) {
      this.setState({
        notFoundMessage: 'Personagem não foi encontrado, tente novamente!',
      });
    } else {
      this.setState({ characters });
    }
  }

  render() {
    const { location: { state: { charName } } } = this.props;
    const { characters, notFoundMessage } = this.state;

    const characterName = `${charName[0].toUpperCase()}${charName.slice(1)}`;

    if (!characters.length) return (
      <div>
        <Navbar />
        <h3>{ notFoundMessage }</h3>
      </div>
    );

    return (
      <div>
        <Navbar />
        <h4>{ `Personagem favorito: ${characterName}` }</h4>
        <div className="container-characters-list">
          {
            characters.map((char) => (
              <CharCard key={ char.id } { ...char } />
            ))
          }
        </div>
      </div>
    );
  }
}

export default Characters;
