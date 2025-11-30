import { Global } from "@emotion/react";
import { useMantineTheme, useMantineColorScheme } from "@mantine/core";

export function GlobalStyles() {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  return (
    <Global
      styles={{
        body: {
          color:
            colorScheme === "dark"
              ? theme.colors.gray[3]
              : theme.colors.gray[8],
          backgroundColor:
            colorScheme === "dark"
              ? theme.colors.dark[7]
              : theme.colors.gray[0],
          fontFamily: theme.fontFamily,
        },
      }}
    />
  );
}
