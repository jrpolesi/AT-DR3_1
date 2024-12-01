import { useMemo, useState } from "react";
import { ActivityIndicator, TextInput, View } from "react-native";
import ModalSelector from "react-native-modal-selector";
import { useGetExchangeRateForDate } from "../hooks/useGetExchangeRateForDate";
import { useGetMoedas } from "../hooks/useGetMoedas";
import { DateTimePickerInput } from "./DateTimePickerInput";
import { FormField } from "./FormField";
import { SwitchInput } from "./SwitchInput";
import { SystemButton } from "./SystemButton";

const CATEGORY_OPTIONS = [
  { label: "Alimentação", key: "alimentacao" },
  { label: "Transporte", key: "transporte" },
  { label: "Lazer", key: "lazer" },
  { label: "Saúde", key: "saude" },
  { label: "Educação", key: "educacao" },
  { label: "Outros", key: "outros" },
];

const DEFAULT_ERRORS = {
  description: null,
  value: null,
  date: null,
  hour: null,
  category: null,
  type: null,
  currency: null,
};

const DEFAULT_FORM_VALUES = {
  description: "",
  value: null,
  date: null,
  hour: null,
  category: null,
  type: null,
  currency: null,
};

export function TransacaoForm({ onSubmit, defaultValue }) {
  const [formValues, setFormValues] = useState(
    defaultValue ?? DEFAULT_FORM_VALUES
  );

  const [error, setError] = useState(DEFAULT_ERRORS);

  const { data: currencies, isLoading: currenciesIsLoading } = useGetMoedas();

  const { data: exchangeRate, isLoading: exchangeRateIsLoading } =
    useGetExchangeRateForDate({
      currency: formValues.currency?.key,
      date: formValues.date,
    });

  function handleInputChange(field, value) {
    setFormValues({ ...formValues, [field]: value });
  }

  function handleSubmit() {
    setError(DEFAULT_ERRORS);
    const errors = validateForm(formValues);

    if (Object.keys(errors).length) {
      setError(errors);
      return;
    }

    const BRL = formValues.value.original * exchangeRate?.cotacaoCompra;

    onSubmit({
      ...formValues,
      value: {
        ...formValues.value,
        BRL,
      },
      type: formValues?.type ?? {
        label: "Receita",
        key: "income",
      },
    });
  }

  const currenciesOptions = useMemo(
    () =>
      currencies?.value?.map((currency) => ({
        label: currency.nomeFormatado,
        key: currency.simbolo,
      })),
    [currencies]
  );

  if (currenciesIsLoading) {
    return <ActivityIndicator />;
  }

  return (
    <View>
      <View>
        <FormField label="Descrição" error={error?.description}>
          <TextInput
            value={formValues.description}
            onChangeText={(text) => handleInputChange("description", text)}
          />
        </FormField>

        <FormField label="Valor" error={error?.value}>
          <TextInput
            value={formValues.value?.original?.toString()}
            onChangeText={(text) =>
              handleInputChange("value", {
                original: parseFloat(text),
              })
            }
            keyboardType="numeric"
          />
        </FormField>

        <View>
          <FormField label="Data" error={error?.date}>
            <DateTimePickerInput
              label="Data"
              mode="date"
              value={formValues.date}
              maximumDate={new Date()}
              onConfirm={(date) => handleInputChange("date", date)}
            />
          </FormField>

          <FormField label="Hora" error={error?.hour}>
            <DateTimePickerInput
              label="Hora"
              mode="time"
              value={formValues.hour}
              onConfirm={(hour) => handleInputChange("hour", hour)}
            />
          </FormField>
        </View>

        <FormField label="Categoria" error={error?.category}>
          <ModalSelector
            data={CATEGORY_OPTIONS}
            initValue={formValues.category?.label ?? "Selecione a categoria"}
            onChange={(option) => handleInputChange("category", option)}
          />
        </FormField>

        <FormField label="Moeda" error={error?.currency}>
          <ModalSelector
            data={currenciesOptions}
            initValue={formValues.currency?.label ?? "Selecione a moeda"}
            onChange={(option) => handleInputChange("currency", option)}
            cancelText="Cancelar"
          />
        </FormField>

        <FormField label="Tipo" error={error?.type}>
          <SwitchInput
            leftLabel="Receita"
            rightLabel="Despesa"
            value={isIncome(formValues.type) ? true : false}
            onValueChange={(value) => {
              const typeValue = {
                label: value ? "Receita" : "Despesa",
                key: value ? "income" : "expense",
              };

              handleInputChange("type", typeValue);
            }}
          />
        </FormField>
      </View>

      <SystemButton
        onPress={handleSubmit}
        isLoading={exchangeRateIsLoading}
        disabled={exchangeRateIsLoading}
      >
        Salvar
      </SystemButton>
    </View>
  );
}

function isIncome(type) {
  return type?.key === "income";
}

function validateForm(values) {
  const errors = {};

  if (!values?.description) {
    errors.description = "Campo obrigatório";
  }

  if (!values?.value.original) {
    errors.value = "Campo obrigatório";
  }

  if (!values?.date) {
    errors.date = "Campo obrigatório";
  }

  if (!values?.hour) {
    errors.hour = "Campo obrigatório";
  }

  if (!values?.category.key) {
    errors.category = "Campo obrigatório";
  }

  if (!values?.currency.key) {
    errors.currency = "Campo obrigatório";
  }

  return errors;
}