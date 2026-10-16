export type PropertyPurpose = 'venda' | 'aluguel';

export type PropertyType =
  | 'casa'
  | 'apartamento'
  | 'cobertura'
  | 'mansao'
  | 'terreno';

export type PropertyStatus = 'disponivel' | 'vendido' | 'alugado';

export interface PropertyLocation {
  cidade: string;
  estado: string;
  bairro?: string;
}

export interface Property {
  id: string;
  titulo: string;
  descricao: string;
  finalidade: PropertyPurpose;
  tipo: PropertyType;
  localizacao: PropertyLocation;
  preco: number;
  precoFormatado: string;
  area: number;
  quartos: number;
  banheiros: number;
  vagas?: number;
  imagens: string[];
  status: PropertyStatus;
  destaque: boolean;
  anoConstrucao?: number;
  amenities?: string[];
}
