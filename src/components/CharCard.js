import React, { Component } from 'react'

export class CharCard extends Component {
  render() {
    const {
      name,
      status,
      species,
      gender,
      origin: { name: originName },
      image,
    } = this.props;

    return (
      <div className="container-char-card">
        <img src={ image } alt={ name } />
        <p>{ `Nome: ${name}` }</p>
        <p>{ `Status: ${status}` }</p>
        <p>{ `Espécie: ${species}` }</p>
        <p>{ `Gênero: ${gender}` }</p>
        <p>{ `Origem: ${originName}` }</p>
      </div>
    );
  }
}

export default CharCard;
