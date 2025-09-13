import { useEffect } from "react";
import { TextInput, Button, Paper, Title, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { useAuth } from "../../context/useAuth";

interface ProfileData {
  name: string;
  surname: string;
  email: string;
  phone: string;
}

export default function ProfilePage() {
  const { logout } = useAuth();

  const form = useForm<ProfileData>({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      phone: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      phone: (value) =>
        value && !/^\+?\d{7,15}$/.test(value) ? "Invalid phone" : null,
    },
  });

  useEffect(() => {
    const stored = localStorage.getItem("profile");
    if (stored) {
      form.setValues(JSON.parse(stored));
    }
  }, []);

  const handleSubmit = (values: ProfileData) => {
    localStorage.setItem("profile", JSON.stringify(values));
    notifications.show({
      title: "Saved",
      message: "Profile updated successfully",
      color: "green",
    });
  };

  return (
    <Paper maw={600} mx="auto" mt="lg" p="md" withBorder>
      <Title order={2} ta="center" mb="md">
        Profile
      </Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput label="Name" {...form.getInputProps("name")} />
          <TextInput label="Surname" {...form.getInputProps("surname")} />
          <TextInput label="Email" {...form.getInputProps("email")} />
          <TextInput label="Phone" {...form.getInputProps("phone")} />

          <Button type="submit">Save</Button>
          <Button color="red" variant="light" onClick={logout}>
            Logout
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
