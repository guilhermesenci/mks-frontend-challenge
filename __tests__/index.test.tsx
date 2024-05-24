import '@testing-library/jest-dom/extend-expect';
import { render, screen, RenderResult } from '@testing-library/react';
import Home from '../pages/index'; // Importe o componente Home

describe('Home', () => {
  let component: RenderResult;

  beforeEach(() => {
    component = render(<Home />);
  });

  it('renders a heading', () => {
    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js with typescript and styled components!/i,
    });

    expect(heading).toBeInTheDocument(); // Agora TypeScript deve reconhecer corretamente

    // Ou você pode usar o expect direto com a função
    expect(screen.getByText(/welcome to next\.js with typescript and styled components!/i)).toBeInTheDocument();
  });
});
