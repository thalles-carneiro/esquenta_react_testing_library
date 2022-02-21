import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testes da página `Home`', () => {
  it('a página contém o título "Rick and Morty"', () => {
    renderWithRouter(<App />);

    const title = screen.getByRole('heading', { level: 2, name: 'Rick and Morty' });
    expect(title).toBeInTheDocument();
  });

  it('a página contém o subtítulo "Qual o seu personagem favorito? 🤔"', () => {
    renderWithRouter(<App />);

    const subtitle = screen.getByText(/qual o seu personagem favorito/i);
    expect(subtitle).toBeInTheDocument();
  });

  it('a página contém o formulário de pesquisa por personagem favorito', () => {
    renderWithRouter(<App />);

    const inputCharName = screen.getByRole('textbox');
    const searchButton = screen.getByRole('button', { name: 'Pesquisar' });

    expect(inputCharName).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  it('o campo de pesquisa por personagem favorito deve refletir o que a pessoa usuária digitar', () => {
    renderWithRouter(<App />);

    const inputCharName = screen.getByRole('textbox');
    expect(inputCharName).toHaveValue('');

    userEvent.type(inputCharName, 'rick');
    expect(inputCharName).toHaveValue('rick');

    userEvent.clear(inputCharName);
    userEvent.type(inputCharName, 'summer');
    expect(inputCharName).toHaveValue('summer');
  });

  it('o botão de pesquisar deve estar habilitado apenas quando o campo de pesquisa estiver preenchido com uma palavra acima de 3', () => {
    renderWithRouter(<App />);

    const inputCharName = screen.getByRole('textbox');
    const searchButton = screen.getByRole('button', { name: 'Pesquisar' });

    expect(searchButton).toBeDisabled();

    userEvent.type(inputCharName, 'rick');

    expect(searchButton).toBeEnabled();

    userEvent.clear(inputCharName);
    userEvent.type(inputCharName, 'ri');

    expect(searchButton).toBeDisabled();
  });

  it('ao preencher o campo de pesquisa por personagem favorito com "rick" e clicar no botão de pesquisar a pessoa usuária deve ser redirecionada para a página `Characters`', () => {
    const { history } = renderWithRouter(<App />);

    const inputCharName = screen.getByRole('textbox');
    const searchButton = screen.getByRole('button', { name: /pesquisar/i });

    userEvent.type(inputCharName, 'rick');
    userEvent.click(searchButton);

    expect(screen.queryByText('Rick and Morty')).toBeNull();
    expect(history.location.pathname).toBe('/characters');
  });
});
