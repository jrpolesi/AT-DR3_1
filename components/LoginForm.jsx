import { useState } from "react";
import { TextInput, View } from "react-native";
import { FormField } from "./FormField.jsx";
import { SystemButton } from "./SystemButton.jsx";

const DEFAULT_ERROR = {
  username: null,
  password: null,
};

export function LoginForm({ onSubmit }) {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(DEFAULT_ERROR);

  function handleInputChange(field, value) {
    setFormValues({ ...formValues, [field]: value });
  }

  function handleSubmit() {
    setError(DEFAULT_ERROR);

    const error = validateForm(formValues);
    if (Object.keys(error).length) {
      setError(error);
      return;
    }

    onSubmit(formValues);
  }

  return (
    <View>
      <View>
        <FormField label="Nome de usuário" error={error?.username}>
          <TextInput
            value={formValues.username}
            onChangeText={(text) => handleInputChange("username", text)}
          />
        </FormField>
        <FormField label="Senha" error={error?.password}>
          <TextInput
            secureTextEntry
            value={formValues.password}
            onChangeText={(text) => handleInputChange("password", text)}
          />
        </FormField>
      </View>

      <SystemButton onPress={handleSubmit}>Login</SystemButton>
    </View>
  );
}

function validateForm(formValues) {
  const errors = {};

  if (!formValues.username) {
    errors.username = "Campo obrigatório";
  }

  if (!formValues.password) {
    errors.password = "Campo obrigatório";
  }

  return errors;
}
