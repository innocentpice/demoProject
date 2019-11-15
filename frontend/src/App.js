import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
	const [keyword, setKeyword] = useState("");

	const numbers = ["", 5, 9, 15, 23, "", 45, "", "", ""];

	const findRestaurantsHandler = () => {
		fetch("./api/SCG/findRestaurants?keyword=" + keyword, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => res.json())
			.then(console.log);
	};

	const findXYZHandler = () => {
		fetch("./api/SCG/findXYZ", {
			method: "POST",
			body: JSON.stringify({ numbers }),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => res.json())
			.then(console.log);
	};

	useEffect(() => {
		findXYZHandler();
		findRestaurantsHandler();
		return () => {};
	}, []);

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
