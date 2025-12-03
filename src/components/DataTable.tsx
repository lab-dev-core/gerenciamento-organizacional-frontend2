import { useState, useEffect } from "react";
import {
  Avatar,
  Group,
  ScrollArea,
  Table,
  Text,
  TextInput,
  UnstyledButton,
  Center,
  useMantineTheme,
  useMantineColorScheme,
} from "@mantine/core";
import { ChevronDown, ChevronsUpDown, ChevronUp, Search } from "lucide-react";

interface RowData {
  id: number;
  name: string;
  username: string;
  papel: string;
  etapa: string;
  local: string;
  tempo: string;
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort: () => void;
  minWidth?: string;
  align?: "left" | "center" | "right";
}

interface ThWithHoverProps extends ThProps {
  hoverColor?: string;
}

function Th({ children, reversed, sorted, onSort, minWidth, align = "left", hoverColor }: ThWithHoverProps) {
  const Icon = sorted ? (reversed ? ChevronUp : ChevronDown) : ChevronsUpDown;

  return (
    <Table.Th style={{ minWidth, textAlign: align, padding: 0 }}>
      <UnstyledButton
        onClick={onSort}
        style={{
          width: "100%",
          padding: "6px 12px",
          borderRadius: 6,
          transition: "background-color 0.2s",
        }}
        onMouseEnter={(e) => {
          if (hoverColor) {
            e.currentTarget.style.backgroundColor = hoverColor;
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
        }}
      >
        <Group 
          justify={align === "center" ? "center" : "space-between"} 
          gap="xs"
          wrap="nowrap"
        >
          <Text fw={500} fz="sm">
            {children}
          </Text>

          <Icon size={16} style={{ flexShrink: 0 }} />
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();

  return data.filter((item: any) =>
    ["name", "username", "papel", "etapa", "local", "tempo"].some((key) => 
      String(item[key] || "").toLowerCase().includes(query)
    )
  );
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) return filterData(data, payload.search);

  return filterData(
    [...data].sort((a, b) =>
      payload.reversed
        ? b[sortBy]!.localeCompare(a[sortBy]!)
        : a[sortBy]!.localeCompare(b[sortBy]!)
    ),
    payload.search
  );
}

interface DataTableProps {
  data: RowData[];
}

export function DataTable({ data }: DataTableProps) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState<RowData[]>(data);
  const [sortBy, setSorting] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  
  const headerBgColor = colorScheme === "dark" 
    ? theme.colors.dark[6] 
    : theme.colors.gray[0];
  
  const headerHoverColor = colorScheme === "dark"
    ? theme.colors.dark[5]
    : theme.colors.gray[2];
  
  const rowHoverColor = colorScheme === "dark"
    ? theme.colors.dark[7]
    : theme.colors.gray[1];

  useEffect(() => {
    setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search }));
  }, [data, sortBy, reverseSortDirection, search]);

  const handleSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;

    setReverseSortDirection(reversed);
    setSorting(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;

    setSearch(value);
    setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  const rows = sortedData.map((item) => (
    <Table.Tr 
      key={item.id}
      style={{
        transition: "background-color 0.2s",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = rowHoverColor;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
      }}
    >
      <Table.Td style={{ minWidth: "200px" }}>
        <Group gap="sm">
          <Avatar size={26} radius={26} color="primary">
            {item.name.charAt(0).toUpperCase()}
          </Avatar>
          <Text size="sm" fw={500}>
            {item.name}
          </Text>
        </Group>
      </Table.Td>

      <Table.Td style={{ minWidth: "120px" }}>{item.username}</Table.Td>
      <Table.Td style={{ minWidth: "120px", textAlign: "center" }}>{item.papel}</Table.Td>
      <Table.Td style={{ minWidth: "180px", textAlign: "center" }}>{item.etapa}</Table.Td>
      <Table.Td style={{ minWidth: "150px", textAlign: "center" }}>{item.local}</Table.Td>
      <Table.Td style={{ minWidth: "120px", textAlign: "center" }}>{item.tempo}</Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea>
      <TextInput
        placeholder="Pesquisar"
        mb="md"
        value={search}
        onChange={handleSearchChange}
        leftSection={<Search size={16} />}
        w="250px"
      />

      <Table verticalSpacing="sm">
        <Table.Thead style={{ backgroundColor: headerBgColor }}>
          <Table.Tr>
            <Th
              sorted={sortBy === "name"}
              reversed={reverseSortDirection}
              onSort={() => handleSorting("name")}
              minWidth="200px"
              align="left"
              hoverColor={headerHoverColor}
            >
              Nome
            </Th>

            <Th
              sorted={sortBy === "username"}
              reversed={reverseSortDirection}
              onSort={() => handleSorting("username")}
              minWidth="120px"
              align="left"
              hoverColor={headerHoverColor}
            >
              Usuário
            </Th>

            <Th
              sorted={sortBy === "papel"}
              reversed={reverseSortDirection}
              onSort={() => handleSorting("papel")}
              minWidth="120px"
              align="center"
              hoverColor={headerHoverColor}
            >
              Papel
            </Th>

            <Th
              sorted={sortBy === "etapa"}
              reversed={reverseSortDirection}
              onSort={() => handleSorting("etapa")}
              minWidth="180px"
              align="center"
              hoverColor={headerHoverColor}
            >
              Etapa
            </Th>

            <Th
              sorted={sortBy === "local"}
              reversed={reverseSortDirection}
              onSort={() => handleSorting("local")}
              minWidth="150px"
              align="center"
              hoverColor={headerHoverColor}
            >
              Local
            </Th>

            <Th
              sorted={sortBy === "tempo"}
              reversed={reverseSortDirection}
              onSort={() => handleSorting("tempo")}
              minWidth="120px"
              align="center"
              hoverColor={headerHoverColor}
            >
              Tempo
            </Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td colSpan={6}>
                <Text fw={500} ta="center">
                  Nada encontrado
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}


