import React, { useEffect, useState } from "react";
import { Route, NavLink, Link } from "react-router-dom";
import { Document, Page } from "react-pdf/dist/entry.webpack";
import JSONPretty from "react-json-pretty";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "./App.css";

function App() {
	return (
		<>
			<Navbar />
			<Route exact path="/" component={AssignmentPage} />
			<Route exact path="/cv" component={CVPage} />
		</>
	);
}

function Navbar() {
	const [showCollapse, setShowCollapse] = useState(false);

	const toggleCollapseHandler = () =>
		setShowCollapse(oldState => {
			return !oldState;
		});

	return (
		<nav className="navbar navbar-expand-md navbar-dark bg-primary">
			<Link to="/" className="navbar-brand" id="logo">
				Chanachai Sappaso
			</Link>
			<button
				className="navbar-toggler"
				type="button"
				onClick={toggleCollapseHandler}
			>
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className={`navbar-collapse collapse ${showCollapse ? "show" : ""}`}>
				<ul className="navbar-nav">
					<li className="nav-item">
						<NavLink exact to="/" activeClassName="active" className="nav-link">
							ASSIGNMENT
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink to="/cv" activeClassName="active" className="nav-link">
							CV
						</NavLink>
					</li>
				</ul>
			</div>
		</nav>
	);
}

function AssignmentPage() {
	const [keyword, setKeyword] = useState("ชาบู");

	const [numbers, setNumbers] = useState([
		"X",
		5,
		9,
		15,
		23,
		"Y",
		45,
		"Z",
		"A",
		"B"
	]);

	const [numberResult, setNumberResult] = useState({});
	const [restaurantsResult, setRestaurantsResult] = useState({});

	const findRestaurantsHandler = () => {
		fetch("./api/SCG/findRestaurants?keyword=" + keyword, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => res.json())
			.then(res => {
				setRestaurantsResult(res);
			});
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
			.then(res => {
				setNumberResult(res);
			});
	};

	useEffect(() => {
		findXYZHandler();
		findRestaurantsHandler();
	}, []);

	const numbersChangeHandler = e => {
		const val = e.target.value;
		const newNumbers = ""
			.concat(val)
			.split(",")
			.map(num => {
				if (!Number.isNaN(parseFloat(num))) return parseFloat(num);
				return num;
			});
		setNumbers(newNumbers);
	};

	const keywordChangeHandler = e => {
		const val = e.target.value;
		setKeyword(val);
	};

	return (
		<div className="container">
			<div className="row">
				<div className="col">
					<h3>Assignment</h3>
				</div>
			</div>
			<div className="row">
				<div className="col">
					findXYZ :
					<input value={numbers} onChange={numbersChangeHandler} />
					<button onClick={findXYZHandler}>CALL API</button>
					<pre style={{ maxHeight: 400, overflow: "auto" }}>
						<code>
							<JSONPretty data={numberResult}></JSONPretty>
						</code>
					</pre>
				</div>
			</div>
			<div className="row">
				<div className="col">
					findRestaurants :
					<input value={keyword} onChange={keywordChangeHandler} />
					<button onClick={findRestaurantsHandler}>CALL API</button>
					<pre style={{ maxHeight: 400, overflow: "auto" }}>
						<code>
							<JSONPretty data={restaurantsResult}></JSONPretty>
						</code>
					</pre>
				</div>
			</div>
		</div>
	);
}

function CVPage() {
	return (
		<div className="container">
			<div className="row">
				<Document file="myCV.pdf" className="col">
					<Page pageNumber={1} />
				</Document>
			</div>
		</div>
	);
}

export default App;
