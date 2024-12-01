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
      value.description.toLowerCase().includes(filter.toLowerCase()) ||
      value.category.toLowerCase().includes(filter.toLowerCase()) ||
      value.type.toLowerCase().includes(filter.toLowerCase())
  );
}

function sortValues(values, sort) {
  if (sort === SORT_VALUES_MAP.none) {
    return values;
  }

  return [...values].sort((a, b) => {
    if (sort === SORT_VALUES_MAP.description) {
      return a.description.localeCompare(b.description);
    }

    if (sort === SORT_VALUES_MAP.valueAsc) {
      return a.value.BRL - b.value.BRL;
    }

    if (sort === SORT_VALUES_MAP.valueDesc) {
      return b.value.BRL - a.value.BRL;
    }

    if (sort === SORT_VALUES_MAP.dateAsc) {
      return a.date - b.date;
    }

    if (sort === SORT_VALUES_MAP.dateDesc) {
      return b.date - a.date;
    }

    if (sort === SORT_VALUES_MAP.category) {
      return a.category.localeCompare(b.category.label);
    }

    if (sort === SORT_VALUES_MAP.type) {
      return a.type.localeCompare(b.type.label);
    }

    if (sort === SORT_VALUES_MAP.currency) {
      return a.currency.localeCompare(b.currency.label);
    }

    return 0;
  });
}
