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

  const filtered = filter ? filterValues(values, filter) : values;
  return sort ? sortValues(filtered, sort) : filtered;
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

    if (sort === SORT_VALUES_MAP.dateAsc) {
      return sumHourToDate(a.data, a.hora) - sumHourToDate(b.data, b.hora);
    }

    if (sort === SORT_VALUES_MAP.dateDesc) {
      return sumHourToDate(b.data, b.hora) - sumHourToDate(a.data, a.hora);
    }

    if (sort === SORT_VALUES_MAP.category) {
      return a.categoria.label.localeCompare(b.categoria.label);
    }

    if (sort === SORT_VALUES_MAP.type) {
      return a.tipo.label.localeCompare(b.tipo.label);
    }

    if (sort === SORT_VALUES_MAP.currency) {
      return a.moeda.key.localeCompare(b.moeda.key);
    }

    return 0;
  });
}

function sumHourToDate(date, hour) {
  const hours = hour.getHours();
  const minutes = hour.getMinutes();

  const newDate = new Date(date);
  newDate.setHours(hours);
  newDate.setMinutes(minutes);
  return newDate;
}
