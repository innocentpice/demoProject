import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
	const numbers = ["", 5, 9, "", 23, 33, "", "", 75, "", ""];

	useEffect(() => {
		fetch("./api/SCG", {
			method: "POST",
			body: JSON.stringify(numbers),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => res.text())
			.then(console.log);
		return () => {};
	}, [numbers]);

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header>
		</div>
	);
}

export default App;
