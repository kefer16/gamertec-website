import React, { useEffect, useState } from "react";

import { ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyles, lightTheme } from "./config/GlobalStyles";

export const Theme = () => {
	const [theme, setTheme] = useState("light");
	const isDarkTheme = theme === "dark";

	const toggleTheme = () => {
		const updatedTheme = isDarkTheme ? "light" : "dark";
		setTheme(updatedTheme);
		localStorage.setItem("theme", updatedTheme);
	};

	useEffect(() => {
		const savedTheme = localStorage.getItem("theme");
		const prefersDark =
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches;
		if (savedTheme && ["dark", "light"].includes(savedTheme)) {
			setTheme(savedTheme);
		} else if (prefersDark) {
			setTheme("dark");
		}
	}, []);

	return (
		<ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
			<>
				<GlobalStyles />
				<h1>Hello!</h1>
				<button onClick={toggleTheme}>
					{isDarkTheme ? (
						<span aria-label="Light mode" role="img">
							🌞
						</span>
					) : (
						<span aria-label="Dark mode" role="img">
							🌜
						</span>
					)}
				</button>
			</>
		</ThemeProvider>
	);
};
