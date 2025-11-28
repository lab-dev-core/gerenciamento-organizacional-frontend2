import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Button,
  Card,
  Center,
  Stack,
  Flex,
  Text,
} from "@mantine/core";
import { BookOpen } from "lucide-react";
import { authApi, setToken } from "@/api/api";
import { setUser } from "@/api/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },

    validate: {
      username: (value) =>
        value.trim().length === 0 ? "Informe o usuário" : null,
      password: (value) =>
        value.trim().length === 0 ? "Informe a senha" : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    console.log("Login enviado:", values);

    try {
      const response = await authApi.login(values.username, values.password);
      setToken(response.token);
      setUser({
        id: response.id,
        username: response.username,
        name: response.name,
        role: response.role,
      });
      navigate("/Home");
    } catch (err) {
      setError("Credenciais inválidas. Por favor, tente novamente.")
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <Center style={{ height: "100vh" }}>
      <Card padding="xl" withBorder style={{ width: 380 }}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack align="center" gap="xs">
            <Flex
              justify="center"
              align="center"
              style={{
                width: 70,
                height: 70,
                borderRadius: "50%",
                background: "#1d2d5c",
              }}
            >
              <BookOpen size={32} color="white" />
            </Flex>

            <Text fw={600} size="lg" mt="sm">
              Sistema Formativo
            </Text>

            <Text size="sm" c="dimmed" mb="md">
              Bem-vindo! Entre com sua conta.
            </Text>
          </Stack>

          <Stack>
            <Text size="sm" fw={500} mt="md">
              Usuário
            </Text>
            <TextInput placeholder="Nome" {...form.getInputProps("username")} />

            <Text size="sm" fw={500} mt="md">
              Senha
            </Text>
            <PasswordInput
              placeholder="••••••••"
              {...form.getInputProps("password")}
            />

            <Button
              loading={isLoading}
              fullWidth
              mt="lg"
              size="md"
              type="submit"
              style={{ background: "#1d2d5c" }}
            >
              Entrar
            </Button>
          </Stack>
        </form>
      </Card>
    </Center>
  );
}
