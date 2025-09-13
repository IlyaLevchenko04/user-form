import { useState } from "react";
import { TextInput, PasswordInput, Button, Paper, Title, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useAuth } from "../../context/useAuth";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../../api/auth";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (value ? null : "Invalid email"),
      password: (value) => (value.length < 6 ? "Password too short" : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    try {
      const res = await loginRequest(values.email, values.password)

      login(res.access_token);

      notifications.show({
        title: "Success",
        message: "You are logged in",
        color: "green",
      });

      navigate("/profile");
    } catch (err) {
      console.log(err)
      notifications.show({
        title: "Error",
        message: "Wrong email or password",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper maw={400} mx="auto" mt="lg" p="md" withBorder>
      <Title order={2} ta="center" mb="md">
        Login
      </Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput label="Email" {...form.getInputProps("email")} />
          <PasswordInput label="Password" {...form.getInputProps("password")} />
          <Button type="submit" loading={loading}>
            Login
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
