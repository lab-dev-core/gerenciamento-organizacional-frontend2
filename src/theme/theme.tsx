import { createTheme } from "@mantine/core";

export const theme = createTheme({
  cursorType: "pointer",
  defaultRadius: "md",

  // define o nome da cor principal
  primaryColor: "primary",

  // registra a paleta
  colors: {
    primary: [
      "#e3e7f2",
      "#c7cee5",
      "#aab4d8",
      "#8e9bcb",
      "#7181be",
      "#5568b1",
      "#3a4f94",
      "#1d2d5c", // tom principal
      "#18264a",
      "#121d38",
    ],
  },

  fontFamily: "Inter, Arial",

  components: {
    Card: { defaultProps: { shadow: "xs" } },
    Paper: { defaultProps: { shadow: "xs" } },
    Popover: { defaultProps: { shadow: "xs" } },
    Menu: { defaultProps: { shadow: "xs", radius: "sm" } },
    Tooltip: { defaultProps: { shadow: "xs" } },
    Button: { defaultProps: { size: "sm", radius: "sm" } },
    Input: { defaultProps: { radius: "sm" } },
    InputBase: { defaultProps: { radius: "sm" } },
    Checkbox: { defaultProps: { radius: "sm" } },
    TextInput: { defaultProps: { radius: "sm" } },
    Autocomplete: { defaultProps: { radius: "sm" } },
    DatePickerInput: { defaultProps: { radius: "sm" } },
    Textarea: {
      defaultProps: { radius: "sm" },
      styles: { input: { paddingTop: "0.5rem" } },
    },
    MultiSelect: { defaultProps: { radius: "sm" } },
    TagsInput: { defaultProps: { radius: "sm" } },
    NativeSelect: { defaultProps: { radius: "sm" } },
    Select: { defaultProps: { radius: "sm" } },
    ActionIcon: { defaultProps: { radius: "sm" } },
    NavLink: { defaultProps: { radius: "8" } },
  },
});
