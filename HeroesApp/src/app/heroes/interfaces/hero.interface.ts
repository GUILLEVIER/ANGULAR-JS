export interface Hero {
  _id: string;
  superhero: string;
  publisher: Publisher;
  alter_ego: string;
  first_appearance: string;
  characters: string;
  alt_img?: string;
}

export enum Publisher {
  DCComics = 'DC Comics',
  MarvelComics = 'Marvel Comics',
}

export interface GetHeroesService {
  message: string;
  CodeResult: string;
  heroes: [Hero];
}

export interface GetHeroService {
  message: string;
  CodeResult: string;
  heroe: Hero;
}
