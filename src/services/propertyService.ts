import type { Property, PropertyPurpose, PropertyType } from '@/types/property';
import { properties as demoData } from '@/data/properties';

export type SortOption = 'preco-asc' | 'preco-desc' | 'recentes';

export interface PropertyFilters {
  finalidade?: PropertyPurpose | 'todas';
  tipo?: PropertyType | 'todos';
  cidade?: string;
  precoMax?: number;
  quartos?: number;
  busca?: string;
  sort?: SortOption;
}

export interface PropertyService {
  getAll(): Property[];
  getFeatured(): Property[];
  getById(id: string): Property | undefined;
  filter(filters: PropertyFilters): Property[];
}

const localService: PropertyService = {
  getAll: () => demoData,

  getFeatured: () => demoData.filter((p) => p.destaque),

  getById: (id: string) => demoData.find((p) => p.id === id),

  filter: (filters: PropertyFilters): Property[] => {
    let result = demoData.filter((p) => {
      if (filters.finalidade && filters.finalidade !== 'todas') {
        if (p.finalidade !== filters.finalidade) return false;
      }
      if (filters.tipo && filters.tipo !== 'todos') {
        if (p.tipo !== filters.tipo) return false;
      }
      if (filters.cidade && filters.cidade !== '') {
        if (
          !p.localizacao.cidade.toLowerCase().includes(filters.cidade.toLowerCase())
        )
          return false;
      }
      if (filters.precoMax && filters.precoMax > 0) {
        if (p.preco > filters.precoMax) return false;
      }
      if (filters.quartos && filters.quartos > 0) {
        if (p.quartos < filters.quartos) return false;
      }
      if (filters.busca && filters.busca !== '') {
        const q = filters.busca.toLowerCase();
        const haystack = [
          p.titulo,
          p.descricao,
          p.localizacao.cidade,
          p.localizacao.estado,
          p.localizacao.bairro ?? '',
          p.tipo,
        ]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });

    const sort = filters.sort ?? 'recentes';
    if (sort === 'preco-asc') {
      result = [...result].sort((a, b) => a.preco - b.preco);
    } else if (sort === 'preco-desc') {
      result = [...result].sort((a, b) => b.preco - a.preco);
    } else if (sort === 'recentes') {
      result = [...result].sort((a, b) => {
        const aYear = a.anoConstrucao ?? 0;
        const bYear = b.anoConstrucao ?? 0;
        return bYear - aYear;
      });
    }

    return result;
  },
};

export const propertyService: PropertyService = localService;

export const cidades: string[] = [
  ...new Set(demoData.map((p) => p.localizacao.cidade)),
].sort();

export const tiposImovel: { value: PropertyType | 'todos'; label: string }[] = [
  { value: 'todos', label: 'Todos os tipos' },
  { value: 'casa', label: 'Casa' },
  { value: 'apartamento', label: 'Apartamento' },
  { value: 'cobertura', label: 'Cobertura' },
  { value: 'mansao', label: 'Mansão' },
  { value: 'terreno', label: 'Terreno' },
];

export const quartosOpcoes: { value: number; label: string }[] = [
  { value: 0, label: 'Qualquer' },
  { value: 3, label: '3+' },
  { value: 4, label: '4+' },
  { value: 5, label: '5+' },
];

export const sortOpcoes: { value: SortOption; label: string }[] = [
  { value: 'recentes', label: 'Mais recentes' },
  { value: 'preco-asc', label: 'Menor preço' },
  { value: 'preco-desc', label: 'Maior preço' },
];
