const fs = require("fs");
const fsPromise = require("fs").promises;
const path = require("path");

//----------------------------------------------------//
//                     FILE WORK                      //
//----------------------------------------------------//

// READ FILE:
// fs.readFile(
//   path.join(__dirname, "files", "node_js_tutorial.txt"),
//   "utf-8",
//   (err, file) => {
//     try {
//       if (err) throw err;
//       console.log(file);
//     } catch (err) {
//       console.log(err);
//     }
//   }
// );

// CREATE FILE:
// fs.writeFile(
//   "./files/Node_JS_Tutorial2.docx",
//   "Let see can we create new Word File",
//   () => console.log("file was changed")
// );

// UPDATE FILE:
// fs.appendFile(
//   "./files/Node_JS_Tutorial2.docx",
//   "\nThe File Was Updated",
//   (err) => {
//     if (err) throw err;
//     console.log("File Appended");
//   }
// );

// RENAME FILE:
// fs.rename(
//   path.join(__dirname, "files", "node_js_tutorial.txt"),
//   path.join(__dirname, "files", "file1.txt"),
//   (err) => {
//     if (err) throw err;
//     console.log("File Renamed");
//   }
// );

// DELETE FILE:
// fs.unlink(path.join(__dirname, "files", "node_js_tutorial2.txt"), (err) => {
//   if (err) throw err;
// });


//----------------------------------------------------//
//               SYNCHRONOUS FILE WORK                //
//----------------------------------------------------//

// Since NodeJS is Async by default, we can not controll the flow functions
// So the delete function may run before create one
// In order to omit this problem we can use the async version of file-system

/* const fileOps = async () => {
  try {
    const file_path = path.join(__dirname, "files", "file3.txt");
    const data = await fsPromise.readFile(file_path, "utf-8");
    console.log("BEFORE", data);
    // await fsPromise.unlink(file_path);
    await fsPromise.writeFile(file_path, "\nNew Information");
    await fsPromise.appendFile(file_path, "\n\nUpdated Information");
    await fsPromise.rename(
      file_path,
      path.join(__dirname, "files", "new-file3.txt")
    );
    const new_data = await fsPromise.readFile(
      path.join(__dirname, "files", "new-file3.txt"),
      "utf-8"
    );
    console.log("AFTER", new_data);
  } catch (err) {
    console.error(err);
  }
};

fileOps() */

//----------------------------------------------------//
//            LARGE AMOUNT/STREAM OF DATA             //
//----------------------------------------------------//

// const rs = fs.createReadStream("./files/lorem.txt", { encoding: "utf8" });
// const ws = fs.createWriteStream("./files/new-lorem.txt");

// passing data from the readable file to writable file -> METHOD 1
// rs.on("data", (chunk) => {
//   ws.write("\n----- LOREM -----\n");
//   ws.write(chunk);
// });

// passing data from the readable file to writable file -> EASY METHOD
// rs.pipe(write_streams);


//----------------------------------------------------//
//                    DIRECTORIES                     //
//----------------------------------------------------//

// CREATE DIRECTORY
// if (!fs.existsSync("./new_folder")) {
//   fs.mkdir("./new_folder", (err) => {
//     if (err) throw err;
//     console.log("Folder was Created");
//   });

//   fs.writeFile(
//     "./new_folder/new_file.txt",
//     "creating new file after creating new folder",
//     (err) => {
//       if (err) throw err;
//       console.log("new info was written in new created folder");
//     }
//   );
// }
// // REMOVE/DELETE DIRECTORY:
// else {
//   fs.rmdir("./new_folder", { recursive: true, force: true }, (err) => {
//     if (err) throw err;
//     console.log("Folder was Removed");
//   });
// }

//----------------------------------------------------//
//             CATCHING UN-CAUGHT ERRORS              //
//----------------------------------------------------//

process.on("uncaughtException", (err) => {
  console.log(`Here is an uncaught ERROR: ${err}`);
  process.exit(1);
});