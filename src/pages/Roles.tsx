import { useState, useEffect } from "react";
import { DataTable } from "@/components/DataTable";
import { Box, Loader, Text, Alert, Title } from "@mantine/core";
import { rolesApi } from "@/api/api";

interface RoleData {
  id: number;
  name?: string;
  description?: string;
  [key: string]: any;
}

interface TableRowData {
  id: number;
  name: string;
  username: string;
  papel: string;
  etapa: string;
  local: string;
  tempo: string;
}

export default function Roles() {
  const [roles, setRoles] = useState<TableRowData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRoles() {
      try {
        setLoading(true);
        setError(null);
        const data = await rolesApi.getAll() as RoleData[];
        
        const mappedData: TableRowData[] = data.map((role) => ({
          id: role.id,
          name: role.name || "N/A",
          username: role.userName || role.username || "N/A",
          papel: role.name || "N/A",
          etapa: role.description || "N/A",
          local: role.locationName || "N/A",
          tempo: role.userCount ? `${role.userCount} usuários` : "N/A",
        }));
        
        setRoles(mappedData);
      } catch (err: any) {
        setError(err.message || "Erro ao carregar cargos");
      } finally {
        setLoading(false);
      }
    }

    fetchRoles();
  }, []);

  if (loading) {
    return (
      <Box>
        <Title order={2} mb="md">Cargos</Title>
        <Box ta="center" py="xl">
          <Loader size="lg" />
          <Text mt="md">Carregando cargos...</Text>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Title order={2} mb="md">Cargos</Title>
        <Alert color="red" title="Erro">
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Title order={2} mb="md">Cargos</Title>
      <DataTable data={roles} />
    </Box>
  );
}

