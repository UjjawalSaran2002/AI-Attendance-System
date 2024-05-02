// function process() {
//     const file = document.querySelector("#upload").files[0];
  
//     if (!file) return;
  
//     const reader = new FileReader();
  
//     reader.readAsDataURL(file);
  
//     reader.onload = function (event) {
//       const imgElement = document.createElement("img");
//       imgElement.src = event.target.result;
//     //   document.querySelector("#input").src = event.target.result;
  
//       imgElement.onload = function (e) {
//         const canvas = document.createElement("canvas");
//         const MAX_WIDTH = 216;
//         const MAX_HEIGHT = 216;
//         canvas.width = MAX_WIDTH;
//         canvas.height = MAX_HEIGHT;
  
//         const ctx = canvas.getContext("2d");
  
//         ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);
  
//         const srcEncoded = ctx.canvas.toDataURL(e.target, "image/jpeg");
  
//         // you can send srcEncoded to the server
//         console.log(e.tareget);
//         console.log(srcEncoded);
//         document.querySelector("#output").src = srcEncoded;
//       };
//     };
//   }


// TRY @2

// Import the functions you need from the SDKs you need
import {initializeApp} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase,ref,set,get,child } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL,uploadString} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-storage.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCdhfyRwtqsEH2j9VSgTYfZw2HnuE9-seE",
    authDomain: "db-attendance-cbe34.firebaseapp.com",
    databaseURL: "https://db-attendance-cbe34-default-rtdb.firebaseio.com",
    projectId: "db-attendance-cbe34",
    storageBucket: "db-attendance-cbe34.appspot.com",
    messagingSenderId: "1026923890586",
    appId: "1:1026923890586:web:bef0c05d617d37b4a69c23"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// get ref to Database Services
const storage = getStorage(app);
const database =getDatabase(app);
console.log(app);

document.getElementById('R_btn').addEventListener('click', ()=>{
    const file=document.querySelector("#upload").files[0];
    const name=file.name;

    if (!file) return;
    const imgRef = storageRef(storage, 'images/'+file);
    const reader = new FileReader();
  
    reader.readAsDataURL(file);
  
    reader.onload = function (event) {
      const imgElement = document.createElement("img");
      imgElement.src = event.target.result;
    //   document.querySelector("#input").src = event.target.result;
  
      imgElement.onload = function (e) {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 216;
        const MAX_HEIGHT = 216;
        canvas.width = MAX_WIDTH;
        canvas.height = MAX_HEIGHT;
  
        const ctx = canvas.getContext("2d");
  
        ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);
  
        const srcEncoded = ctx.canvas.toDataURL(e.target, "image/jpeg");
  
        // you can send srcEncoded to the server
        uploadString(imgRef, srcEncoded, 'data_url').then((snapshot) => {
        console.log('Uploaded a data_url string!');
        });

        document.querySelector("#output").src = srcEncoded;
      };
    };


    // const imgRef = storageRef(storage, 'images/'+file);
    // uploadBytes(imgRef, file).then((snapshot) => {
    // console.log('Uploaded an image!');
    // });



    // task
    // .then(snapshot =>snapshot.ref.getDownloadURL())
    // .then(url=>{
    //     console.log(url);
    //     alert("Image uploaded");
    //     const image=document.querySelector("#output");
    //     image.src=url;
    // })
// }
});