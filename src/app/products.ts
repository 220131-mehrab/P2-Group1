export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

export const products = [
  {
    id: 1,
    name: 'Square Dancing (for nerds):\nWatch this square get down!',
    price: 1,
    description: 'Square Game'
  },

  { id: 2,
    name: 'A sample stage without collisions',
    price: 2,
    description: 'MegaMan Stage'
  },

  { id: 3,
    name: 'Simple. Click a tile, not a mine.',
    price: 3,
    description: 'Minesweeper'
  }
  ];
