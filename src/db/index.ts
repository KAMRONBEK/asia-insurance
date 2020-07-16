import SQLite from "react-native-sqlite-storage";

const errorCB = (err) => {
	console.warn("SQL Error: " + err);
};

const successCB = () => {
	console.warn("SQL executed fine");
};

const openCB = () => {
	// console.warn("Database OPENED");
};

export const db = SQLite.openDatabase(
	{
		name: "osgo_uz.db",
		createFromLocation: "~www/osgo_uz.db",
		location: "default",
	},
	openCB,
	errorCB
);
