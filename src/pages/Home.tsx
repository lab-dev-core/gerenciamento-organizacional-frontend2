import { AppShell, NavLink, Burger, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Home as HomeIcon, Users, Settings } from "lucide-react";

export default function Home({ children }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
    layout="alt"
      header={{ height: 60 }}
      navbar={{
        width: 240,
        breakpoint: "sm",
        collapsed: { mobile: false },
      }}
      padding="md"
    >
      {/* HEADER */}
      <AppShell.Header>
        <Group h="100%" px="md">
          <Text fw={600} size="lg">
            Meu SaaS
          </Text>
        </Group>
      </AppShell.Header>

      {/* SIDEBAR */}
      <AppShell.Navbar p="md">
        <NavLink
          label="Dashboard"
          leftSection={<HomeIcon size={18} />}
        />
        <NavLink
          label="Clientes"
          leftSection={<Users size={18} />}
        />
        <NavLink
          label="Configurações"
          leftSection={<Settings size={18} />}
        />
      </AppShell.Navbar>

      {/* CONTEÚDO */}
      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
