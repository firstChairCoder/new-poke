interface Ability {
  name: string;
  text: string;
  type: string;
}

interface Attack {
  name: string;
  cost: string[];
  convertedEnergyCost: number;
  damage: string;
  text: string;
}

interface Weakness {
  type: string;
  value: string;
}

interface Legalities {
  unlimited: string;
}

interface Images {
  symbol: string;
  logo: string;
}

interface Set {
  id: string;
  name: string;
  series: string;
  printedTotal: number;
  total: number;
  legalities: Legalities;
  ptcgoCode: string;
  releaseDate: string;
  updatedAt: string;
  images: Images;
}

interface PokemonImages {
  small: string;
  large: string;
}

interface Holofoil {
  low: number;
  mid: number;
  high: number;
  market: number;
  directLow?: any;
}

interface Prices {
  holofoil: Holofoil;
  reverseHolofoil: Holofoil;
}

interface Tcgplayer {
  url: string;
  updatedAt: string;
  prices: Prices;
}

interface CardPrices {
  averageSellPrice: number;
  lowPrice: number;
  trendPrice: number;
  germanProLow: number;
  suggestedPrice: number;
  reverseHoloSell: number;
  reverseHoloLow: number;
  reverseHoloTrend: number;
  lowPriceExPlus: number;
  avg1: number;
  avg7: number;
  avg30: number;
  reverseHoloAvg1: number;
  reverseHoloAvg7: number;
  reverseHoloAvg30: number;
}

interface CardMarket {
  url: string;
  updatedAt: string;
  prices: CardPrices;
}

export interface CardType {
  id: string;
  name: string;
  supertype: string[];
  subtypes: string[];
  level: string;
  hp: string;
  types: string[];
  evolvesFrom: string;
  abilities: Ability[];
  attacks: Attack[];
  weaknesses: Weakness[];
  resistances: Weakness[];
  retreatCost: string;
  convertedRetreatCost: number;
  set: Set;
  number: string;
  artist: string;
  rarity: string;
  nationalPokedexNumbers: number[];
  legalities: Legalities;
  images: PokemonImages;
  tcgplayer: Tcgplayer;
  cardMarket: CardMarket;
  selected: boolean;
}

export interface CardsListType {
  page: number;
  pageSize: number;
  count: number;
  totalCount: number;
  data: CardType[];
}

export interface SelectedCardType {
  cardType: CardType;
  cartCount: number;
}
