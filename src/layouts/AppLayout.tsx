import {
  AppShell,
  Group,
  NavLink,
  Text,
  Box,
  useMantineTheme,
  Avatar,
  Stack,
  Menu,
  Button,
  Switch,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type { ReactNode } from "react";
import {
  BookOpen,
  Home,
  MoonStar,
  Sun,
  Trash,
  User,
  GraduationCap,
  Briefcase,
  MapPin,
} from "lucide-react";
import { logout } from "@/api/auth";
import { Outlet } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { useThemeSwitch } from "@/theme/ThemeProvider";


export default function AppLayout() {
  const theme = useMantineTheme();
  const { colorScheme, switchTheme } = useThemeSwitch();
  const location = useLocation();
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
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between" w="100%">
          <Group></Group>

          <Menu
            transitionProps={{ transition: "fade-down", duration: 150 }}
            offset={15}
          >
            <Menu.Target>
              <Button size="md" variant="subtle" color="text">
                <Group>
                  <Stack gap={0} align="end">
                    <Text fw={450} size="md">
                      Administrador
                    </Text>
                    <Text fw={400} size="xs">
                      Administrador
                    </Text>
                  </Stack>
                  <Avatar
                    name={"Kadu França"}
                    radius="xl"
                    size="md"
                    bg={theme.colors.primary[6]}
                    color="white"
                  />
                </Group>
              </Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Conta</Menu.Label>
              <Menu.Item>
                <Switch
                  checked={colorScheme === "dark"}
                  onChange={() => switchTheme()}
                  onLabel={<Sun size={16} />}
                  offLabel={<MoonStar size={16} />}
                />
              </Menu.Item>
              <Menu.Item leftSection={<User size={14} />}>
                <Text size="sm">Meu Perfil</Text>
              </Menu.Item>
              <Menu.Item
                leftSection={<Trash size={14} color="red" />}
                onClick={logout}
              >
                <Text size="sm" c="red">
                  Sair
                </Text>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Box mb="xl">
          <Group align="center">
            <BookOpen size={24} color={theme.colors.primary[6]} />
            <Text size="lg" fw={700}>
              Sistema formativo
            </Text>
          </Group>
        </Box>
        <NavLink
          component={Link}
          to="/"
          label="Dashboard"
          leftSection={<Home size={18} />}
          active={location.pathname === "/"}
          variant="filled"
        />

        <NavLink
          component={Link}
          to="/users"
          label="Usuários"
          leftSection={<User size={18} />}
          active={location.pathname === "/users"}
          variant="filled"
        />

        <NavLink
          component={Link}
          to="/stages"
          label="Etapas Formativas"
          leftSection={<GraduationCap size={18} />}
          active={location.pathname === "/stages"}
          variant="filled"
        />

        <NavLink
          component={Link}
          to="/roles"
          label="Cargos"
          leftSection={<Briefcase size={18} />}
          active={location.pathname === "/roles"}
          variant="filled"
        />

        <NavLink
          component={Link}
          to="/locations"
          label="Locais de Missão"
          leftSection={<MapPin size={18} />}
          active={location.pathname === "/locations"}
          variant="filled"
        />

        {/*
<NavLink
  component={Link}
  to="/documents"
  label="Documentos"
  leftSection={<Users size={18} />}
  active={location.pathname.startsWith("/documents")}
  variant="filled"
/>
 
<NavLink
  component={Link}
  to="/library"
  label="Biblioteca"
  leftSection={<Users size={18} />}
  active={location.pathname.startsWith("/library")}
  variant="filled"
/>

<NavLink
  component={Link}
  to="/search"
  label="Buscar"
  leftSection={<Users size={18} />}
  active={location.pathname.startsWith("/search")}
  variant="filled"
/>

<NavLink
  component={Link}
  to="/progress"
  label="Buscar"
  leftSection={<Users size={18} />}
  active={location.pathname.startsWith("/progress")}
  variant="filled"
/>

<NavLink
  component={Link}
  to="/stages"
  label="Minhas etapas"
  leftSection={<Users size={18} />}
  active={location.pathname.startsWith("/stages")}
  variant="filled"
/>


<NavLink
  component={Link}
  to="/locations"
  label="Locais"
  leftSection={<Users size={18} />}
  active={location.pathname.startsWith("/locations")}
  variant="filled"
/>

<NavLink
  component={Link}
  to="/categories"
  label="Categorias"
  leftSection={<Users size={18} />}
  active={location.pathname.startsWith("/categories")}
  variant="filled"
/>

<NavLink
  component={Link}
  to="/roles"
  label="Papéis"
  leftSection={<Users size={18} />}
  active={location.pathname.startsWith("/roles")}
  variant="filled"
/>


<NavLink
  component={Link}
  to="/settings"
  label="Configurações"
  leftSection={<Users size={18} />}
  active={location.pathname.startsWith("/settings")}
  variant="filled"
/> */}
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
