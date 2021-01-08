import { Platform } from "react-native";
import SQLite from "react-native-sqlite-storage";

const errorCB = (err) => {
	console.log("SQL Error: " + err);
};

const successCB = () => {
	console.log("SQL executed fine");
};

const openCB = () => {
	console.log("Database OPENED");
};

// export const db = SQLite.openDatabase(
// 	{
// 		name: "osgo_uz.db",
// 		// createFromLocation: 1,
// 		createFromLocation: "~www/osgo_uz.db",
// 		location: "default",
// 	},
// 	openCB,
// 	errorCB
// );

let db
if (Platform.OS === 'ios') {
   db = SQLite.openDatabase({name:  "osgo_uz.db", createFromLocation: 1}, (open) => {}, (e) => {});
}
else {
 db = SQLite.openDatabase({name:  "osgo_uz.db", createFromLocation: "~www/osgo_uz.db", location: 'default'}, (open) => {}, (e) => {});
}

export default db;