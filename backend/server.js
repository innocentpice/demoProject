const express = require("express");
const app = express();
const apiRouter = express.Router();

// - Create a new controller called “SCG"
// - X, 5, 9, 15, 23, Y, Z  -
// 	 Please create a new function for finding X, Y, Z value
apiRouter.post("/SCG", (req, res) => {
	const numbers = [].concat(req.body);
	const diffs = []
		.concat(numbers)
		.map((num, index) => {
			// Find diff
			if (typeof num === typeof 0) {
				let a = numbers[index - 1];
				let b = num;
				let c = b - a;
				return c / index;
			}
			return null;
		})
		.filter(val => val != null)
		.sort()
		.reduce((prev, cur) => {
			prev[cur] = (prev[cur] || 0) + 1;
			return prev;
		}, {});

	const diff = [].concat(Object.keys(diffs)).reduce((prev, curr) => {
		return diffs[prev] > diffs[curr] ? diffs[prev] : diffs[curr];
	});

	numbers.map((num, index) => {
		// set Value
		if (typeof num === typeof "") {
			// console.log(numbers[index - 1], numbers[index], numbers[index + 1]);
			if (numbers[index + 1] && typeof numbers[index + 1] != typeof "") {
				numbers[index] = numbers[index + 1] - diff * (index + 1);
			} else {
				numbers[index] = diff * index + numbers[index - 1];
			}
		}
		return num;
	});
	res.json({ numbers, diff });
});

// - Please use “Place search|Place API(by Google)”
//   for finding all restaurants in Bangsue area and show result by JSON

// - Please create one small project for Line messaging API(Up to you),
//   contain a flow diagram, your code, and database.

app.use(express.json());
app.use("/api", apiRouter);
app.listen(8080, () => {
	console.log(`Express Runing in port 8080`);
});
