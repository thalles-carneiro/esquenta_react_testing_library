import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';

import characters from './mocks/characters';
import getCharByName from '../services/charactersAPI';

import App from '../App';
import renderWithRouter from './renderWithRouter';

jest.mock('../services/charactersAPI');

const mockGetCharByName = (data) => {
  getCharByName.mockResolvedValueOnce(data);
};

describe('Testes da página `Characters`', () => {
  it('ao entrar na página `Characters` não aparece nenhuma mensagem enquanto a requisição não finalizar', async () => {
    mockGetCharByName(characters);

    renderWithRouter(<App />);

    const inputCharName = screen.getByRole('textbox');
    const searchButton = screen.getByRole('button', { name: /pesquisar/i });

    userEvent.type(inputCharName, 'summer');
    userEvent.click(searchButton);

    expect(getCharByName).toHaveBeenCalled();
    expect(getCharByName).toHaveBeenCalledWith('summer');
    expect(getCharByName).toHaveBeenCalledTimes(1);

    const notFoundMessage = screen.getByRole('heading', { level: 3, name: '' });
    expect(notFoundMessage).toBeInTheDocument();
  });

  it('ao pesquisar por "rick" a página de `Characters` apresenta a mensagem "Personagem favorito: Rick"', async () => {
    mockGetCharByName(characters);

    renderWithRouter(<App />);

    const inputCharName = screen.getByRole('textbox');
    const searchButton = screen.getByRole('button', { name: /pesquisar/i });

    userEvent.type(inputCharName, 'summer');
    userEvent.click(searchButton);

    expect(getCharByName).toHaveBeenCalled();
    expect(getCharByName).toHaveBeenCalledWith('summer');
    expect(getCharByName).toHaveBeenCalledTimes(1);

    const favoriteCharMessage = await screen.findByText('Personagem favorito: Summer');
    expect(favoriteCharMessage).toBeInTheDocument();
  });

  it('ao pesquisar por um personagem não existente a página de `Characters` apresenta a mensagem "Personagem não foi encontrado, tente novamente!"', async () => {
    mockGetCharByName(null);

    renderWithRouter(<App />);

    const inputCharName = screen.getByRole('textbox');
    const searchButton = screen.getByRole('button', { name: /pesquisar/i });

    userEvent.type(inputCharName, 'xablau');
    userEvent.click(searchButton);

    expect(getCharByName).toHaveBeenCalled();
    expect(getCharByName).toHaveBeenCalledWith('xablau');
    expect(getCharByName).toHaveBeenCalledTimes(1);

    const notFoundMessage = await screen.findByText(/personagem não foi encontrado/i);
    expect(notFoundMessage).toBeInTheDocument();
  });

  it('ao pesquisar por "rick" a página de `Characters` apresenta o número adequado de cards do personagem pesquisado', async () => {
    mockGetCharByName(characters);

    renderWithRouter(<App />);

    const inputCharName = screen.getByRole('textbox');
    const searchButton = screen.getByRole('button', { name: /pesquisar/i });

    userEvent.type(inputCharName, 'rick');
    userEvent.click(searchButton);

    expect(getCharByName).toHaveBeenCalled();
    expect(getCharByName).toHaveBeenCalledWith('rick');
    expect(getCharByName).toHaveBeenCalledTimes(1);

    const allCharactersByNameFound = await screen.findAllByAltText(/rick/i);
    expect(allCharactersByNameFound).toHaveLength(characters.length);
  });

  it('os cards na página de `Characters` apresentam os elementos esperados', async () => {
    mockGetCharByName(characters);

    renderWithRouter(<App />);

    const inputCharName = screen.getByRole('textbox');
    const searchButton = screen.getByRole('button', { name: /pesquisar/i });

    userEvent.type(inputCharName, 'rick');
    userEvent.click(searchButton);

    expect(getCharByName).toHaveBeenCalled();
    expect(getCharByName).toHaveBeenCalledWith('rick');
    expect(getCharByName).toHaveBeenCalledTimes(1);

    const [firstCardImage] = await screen.findAllByAltText(/rick/i);
    expect(firstCardImage).toHaveProperty('src', characters[0].image);

    const [firstCardName] = await screen.findAllByText(/Nome: /);
    expect(firstCardName).toHaveTextContent('Nome: Rick Sanchez');

    const [firstCardStatus] = await screen.findAllByText(/Status: /);
    expect(firstCardStatus).toHaveTextContent('Status: Alive');

    const [firstCardSpecie] = await screen.findAllByText(/Espécie: /);
    expect(firstCardSpecie).toHaveTextContent('Espécie: Human');

    const [firstCardGenre] = await screen.findAllByText(/Gênero: /);
    expect(firstCardGenre).toHaveTextContent('Gênero: Male');

    const [firstCardOrigin] = await screen.findAllByText(/Origem: /);
    expect(firstCardOrigin).toHaveTextContent('Origem: Earth (C-137)');
  });
});
