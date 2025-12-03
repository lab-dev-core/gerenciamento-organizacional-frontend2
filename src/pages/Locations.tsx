import { useState, useEffect } from "react";
import { DataTable } from "@/components/DataTable";
import { Box, Loader, Text, Alert, Title } from "@mantine/core";
import { locationsApi } from "@/api/api";

interface LocationData {
  id: number;
  name?: string;
  city?: string;
  state?: string;
  coordinatorName?: string;
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

export default function Locations() {
  const [locations, setLocations] = useState<TableRowData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLocations() {
      try {
        setLoading(true);
        setError(null);
        const data = await locationsApi.getAll() as LocationData[];
        
        const mappedData: TableRowData[] = data.map((location) => ({
          id: location.id,
          name: location.name || "N/A",
          username: location.coordinatorName || location.coordinator || "N/A",
          papel: location.roleName || "N/A",
          etapa: `${location.city || ""}, ${location.state || ""}`.replace(/^, |, $/g, "") || "N/A",
          local: location.name || "N/A",
          tempo: location.userCount ? `${location.userCount} usuários` : "N/A",
        }));
        
        setLocations(mappedData);
      } catch (err: any) {
        setError(err.message || "Erro ao carregar locais de missão");
      } finally {
        setLoading(false);
      }
    }

    fetchLocations();
  }, []);

  if (loading) {
    return (
      <Box>
        <Title order={2} mb="md">Locais de Missão</Title>
        <Box ta="center" py="xl">
          <Loader size="lg" />
          <Text mt="md">Carregando locais de missão...</Text>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Title order={2} mb="md">Locais de Missão</Title>
        <Alert color="red" title="Erro">
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Title order={2} mb="md">Locais de Missão</Title>
      <DataTable data={locations} />
    </Box>
  );
}

