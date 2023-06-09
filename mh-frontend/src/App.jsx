import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./containers/landing/Landing";
import Home from "./containers/Home";
import FindingDetail from "./containers/FindingDetail";
import Loader from "./components/Loader";
import axios from "axios";
import Pricing from "./containers/pricing/Pricing";
import History from "./containers/history/History";

function App() {
	const [scanResData, setScanResData] = useState();
	const [scanError, setScanError] = useState("");
	const [repoURL, setRepoURL] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [finding, setFinding] = useState();

	useEffect(() => {
		if (repoURL !== "" && typeof repoURL !== "undefined") {
			setIsLoading(true);
			axios
				.get(
					`http://localhost:5000?repositoryLink=${encodeURIComponent(
						repoURL
					)}`
				)
				.then((res) => {
					setScanResData(res.data);
					setScanError("");
					setIsLoading(false);
				})
				.catch((err) => {
					console.log(err.message);
					setScanError(err.message);
					setIsLoading(false);
				});
		}
	}, [repoURL]);

	return (
		<>
			<Routes>
				<Route
					path="/"
					element={
						<Landing
							setScanError={setScanError}
							setRepoURL={setRepoURL}
							scanError={scanError}
						/>
					}
				/>
				<Route
					path="/home"
					element={
						scanError != "" ? (
							<Landing
								setScanError={setScanError}
								setRepoURL={setRepoURL}
								scanError={scanError}
							/>
						) : isLoading ? (
							<Loader />
						) : (
							<Home
								scanResData={scanResData}
								scanError={scanError}
								setFinding={setFinding}
							/>
						)
					}
				/>
				<Route
					path="/home/findingDetail/*"
					element={<FindingDetail finding={finding} />}
				/>
				<Route path="/pricing" element={<Pricing />} />
				<Route path="/history" element={<History />} />
			</Routes>
		</>
	);
}

export default App;
