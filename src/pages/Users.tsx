import { useState, useEffect } from "react";
import { DataTable } from "@/components/DataTable";
import { Box, Loader, Text, Alert, Title } from "@mantine/core";
import { usersApi } from "@/api/api";

interface UserData {
  id: number;
  name: string;
  username: string;
  roleName: string;
  lifeStage: string;
  missionLocationName: string;
  formattedCommunityTime: string | null;
  communityYears: number;
  communityMonths: number;
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

function formatCommunityTime(years: number, months: number): string {
  if (years === 0 && months === 0) return "N/A";
  
  const parts: string[] = [];
  if (years > 0) {
    parts.push(`${years} ${years === 1 ? "ano" : "anos"}`);
  }
  if (months > 0) {
    parts.push(`${months} ${months === 1 ? "mês" : "meses"}`);
  }
  
  return parts.join(" e ") || "N/A";
}

export default function Users() {
  const [users, setUsers] = useState<TableRowData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        setError(null);
        const data = await usersApi.getAll() as UserData[];
        
        const mappedData: TableRowData[] = data.map((user) => ({
          id: user.id,
          name: user.name || "N/A",
          username: user.username || "N/A",
          papel: user.roleName || "N/A",
          etapa: user.lifeStage || "N/A",
          local: user.missionLocationName || "N/A",
          tempo: user.formattedCommunityTime || formatCommunityTime(user.communityYears, user.communityMonths),
        }));
        
        setUsers(mappedData);
      } catch (err: any) {
        setError(err.message || "Erro ao carregar usuários");
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <Box>
        <Title order={2} mb="md">Usuários</Title>
        <Box ta="center" py="xl">
          <Loader size="lg" />
          <Text mt="md">Carregando usuários...</Text>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Title order={2} mb="md">Usuários</Title>
        <Alert color="red" title="Erro">
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Title order={2} mb="md">Usuários</Title>
      <DataTable data={users} />
    </Box>
  );
}