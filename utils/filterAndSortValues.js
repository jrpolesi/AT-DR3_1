export const SORT_VALUES = [
  { key: "none", label: "Nenhum" },
  { key: "description", label: "Descrição" },
  { key: "valueAsc", label: "Valor (Menor)" },
  { key: "valueDesc", label: "Valor (Maior)" },
  { key: "dateAsc", label: "Data (Antiga)" },
  { key: "dateDesc", label: "Data (Recente)" },
  { key: "category", label: "Categoria" },
  { key: "type", label: "Tipo" },
  { key: "currency", label: "Moeda" },
];

export const SORT_VALUES_MAP = SORT_VALUES.reduce((acc, value) => {
  acc[value.key] = value.key;
  return acc;
}, {});

export function filterAndSortValues(values, options) {
  const { filter, sort } = options;

  const filtered = !!filter ? filterValues(values, filter) : values;
  return !!sort ? sortValues(filtered, sort) : filtered;
}

function filterValues(values, filter) {
  return values.filter(
    (value) =>
      value.descricao.toLowerCase().includes(filter.toLowerCase()) ||
      value.categoria.label.toLowerCase().includes(filter.toLowerCase()) ||
      value.tipo.label.toLowerCase().includes(filter.toLowerCase())
  );
}

function sortValues(values, sort) {
  if (sort === SORT_VALUES_MAP.none) {
    return values;
  }

  return [...values].sort((a, b) => {
    if (sort === SORT_VALUES_MAP.description) {
      return a.descricao.localeCompare(b.descricao);
    }

    if (sort === SORT_VALUES_MAP.valueAsc) {
      return a.valor.BRL - b.valor.BRL;
    }

    if (sort === SORT_VALUES_MAP.valueDesc) {
      return b.valor.BRL - a.valor.BRL;
    }

    //  TODO: corrigir a ordenação por data
    if (sort === SORT_VALUES_MAP.dateAsc) {
      return new Date(a.data + " " + a.hora) - new Date(b.data + " " + b.hora);
    }

    if (sort === SORT_VALUES_MAP.dateDesc) {
      return new Date(b.data + " " + b.hora) - new Date(a.data + " " + a.hora);
    }

    if (sort === SORT_VALUES_MAP.category) {
      return a.category.localeCompare(b.categoria.label);
    }

    if (sort === SORT_VALUES_MAP.type) {
      return a.type.localeCompare(b.tipo.label);
    }

    if (sort === SORT_VALUES_MAP.currency) {
      return a.currency.localeCompare(b.moeda.label);
    }

    return 0;
  });
}
