import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export class NotFound extends Component {
  render() {
    return (
      <div>
        <h1>Página não encontrada 😢</h1>
        <p>Que tal voltar para a página inicial?</p>
        <Link to="/">Partiu! 🚀</Link>
      </div>
    );
  }
}

export default NotFound;
