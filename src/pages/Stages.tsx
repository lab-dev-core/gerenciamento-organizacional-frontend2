import { useState, useEffect } from "react";
import { DataTable } from "@/components/DataTable";
import { Box, Loader, Text, Alert, Title } from "@mantine/core";
import { stagesApi } from "@/api/api";

interface StageData {
  id: number;
  name?: string;
  title?: string;
  description?: string;
  status?: string;
  userId?: number;
  userName?: string;
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

export default function Stages() {
  const [stages, setStages] = useState<TableRowData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStages() {
      try {
        setLoading(true);
        setError(null);
        const data = await stagesApi.getAll() as StageData[];
        
        const mappedData: TableRowData[] = data.map((stage) => ({
          id: stage.id,
          name: stage.name || stage.title || "N/A",
          username: stage.userName || stage.username || "N/A",
          papel: stage.roleName || "N/A",
          etapa: stage.status || stage.stageName || "N/A",
          local: stage.locationName || stage.missionLocationName || "N/A",
          tempo: stage.formattedTime || stage.duration || "N/A",
        }));
        
        setStages(mappedData);
      } catch (err: any) {
        setError(err.message || "Erro ao carregar etapas formativas");
      } finally {
        setLoading(false);
      }
    }

    fetchStages();
  }, []);

  if (loading) {
    return (
      <Box>
        <Title order={2} mb="md">Etapas Formativas</Title>
        <Box ta="center" py="xl">
          <Loader size="lg" />
          <Text mt="md">Carregando etapas formativas...</Text>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Title order={2} mb="md">Etapas Formativas</Title>
        <Alert color="red" title="Erro">
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Title order={2} mb="md">Etapas Formativas</Title>
      <DataTable data={stages} />
    </Box>
  );
}

