import { Button, Title, Paper, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

export default function ProfilePage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Paper maw={600} mx="auto" mt="lg" p="md" withBorder>
      <Title order={2} ta="center" mb="sm">Profile</Title>
      <Text ta="center" mb="lg">Here will be profile form (next step)</Text>
      <Button color="red" onClick={handleLogout}>Logout</Button>
    </Paper>
  );
}
