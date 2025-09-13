import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { TextInput, PasswordInput, Button, Paper, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useAuth } from "../../context/useAuth";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: { username: "", password: "" },
    validate: {
      username: (val) => (val.length < 3 ? "Enter valid username" : null),
      password: (val) => (val.length < 6 ? "Password too short" : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    const success = await login(values.username, values.password);
    setLoading(false);

    if (success) {
      notifications.show({ title: "Success", message: "Logged in!", color: "green" });
      navigate("/profile");
    } else {
      notifications.show({ title: "Error", message: "Invalid credentials", color: "red" });
    }
  };

  return (
    <Paper maw={420} mx="auto" mt="lg" p="md" withBorder>
      <Title order={2} ta="center" mb="md">Login</Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput label="Username" {...form.getInputProps("username")} mb="sm" />
        <PasswordInput label="Password" {...form.getInputProps("password")} mb="sm" />
        <Button type="submit" fullWidth loading={loading}>
          Login
        </Button>
      </form>
    </Paper>
  );
}
