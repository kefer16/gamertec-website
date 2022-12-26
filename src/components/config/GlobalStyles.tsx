import { createGlobalStyle } from "styled-components";

interface ThemeProps {
	body: string;
	text: string;
}
type GlobalThemeProps = {
	theme: ThemeProps;
};

export const GlobalStyles = createGlobalStyle`
  body {
  
      background: ${({ theme }: GlobalThemeProps) => theme.body};
      color: ${({ theme }: GlobalThemeProps) => theme.text};
      transition: background 0.2s ease-in, color 0.2s ease-in;
  }
`;
export const lightTheme: ThemeProps = {
	body: "#f1f1f1",
	text: "#121620",
};
export const darkTheme: ThemeProps = {
	body: "#121620",
	text: "#f1f1f1",
};
