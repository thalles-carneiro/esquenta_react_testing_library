import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testes da página `NotFound`', () => {
  it('a página não contém o título "Rick and Morty"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/xablau');

    const title = screen.queryByText('Rick and Morty');
    expect(title).toBeNull();
  });

  it('a página contém a mensagem "Página não encontrada 😢"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/xablau');

    const notFoundMessage = screen.getByText(/página não encontrada/i);
    expect(notFoundMessage).toBeInTheDocument();
  });

  it('a página contém um link para retornar para a página inicial `Home`', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/xablau');

    const returnHomeLink = screen.getByRole('link', { name: /partiu/i });
    expect(returnHomeLink).toBeInTheDocument();
  });

  it('ao clicar no link "Partiu! 🚀" a pessoa usuária é redirecionada para a página inicial `Home`', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/xablau');

    const returnHomeLink = screen.getByRole('link', { name: /partiu/i });

    userEvent.click(returnHomeLink);

    expect(history.location.pathname).toBe('/');
  });
});
