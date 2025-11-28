import { createTheme } from "@mantine/core";

export const theme = createTheme({
	cursorType: "pointer",
	defaultRadius: "md",
	primaryColor: "indigo",
    fontFamily: 'Inter, Arial',

	components: {
		Card: {
			defaultProps: {
				shadow: "xs",
			},
		},
		Paper: {
			defaultProps: {
				shadow: "xs",
			},
		},
		Popover: {
			defaultProps: {
				shadow: "xs",
			},
		},
		Menu: {
			defaultProps: {
				shadow: "xs",
				radius: "sm",
			},
		},
		Tooltip: {
			defaultProps: {
				shadow: "xs",
			},
		},
		Button: {
			defaultProps: {
				size: "sm",
				radius: "sm",
			},
		},
		Input: {
			defaultProps: {
				radius: "sm",
			},
		},
		InputBase: {
			defaultProps: {
				radius: "sm",
			},
		},
		Checkbox: {
			defaultProps: {
				radius: "sm",
			},
		},
		TextInput: {
			defaultProps: {
				radius: "sm",
			},
		},
		Autocomplete: {
			defaultProps: {
				radius: "sm",
			},
		},
		DatePickerInput: {
			defaultProps: {
				radius: "sm",
			},
		},
		Textarea: {
			defaultProps: {
				radius: "sm",
			},
			styles: {
				input: {
					paddingTop: "0.5rem",
				},
			},
		},
		MultiSelect: {
			defaultProps: {
				radius: "sm",
			},
		},
		TagsInput: {
			defaultProps: {
				radius: "sm",
			},
		},
		NativeSelect: {
			defaultProps: {
				radius: "sm",
			},
		},
		Select: {
			defaultProps: {
				radius: "sm",
			},
		},
		ActionIcon: {
			defaultProps: {
				radius: "sm",
			},
		},
		NavLink:{
			defaultProps: {
				radius: "8",
			},
		}
	},
});
