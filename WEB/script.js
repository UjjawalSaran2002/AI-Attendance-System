

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


// document.getElementById("submit").addEventListener("click",()=>{


    
//     if (!imageFile) return;
  
//     const reader = new FileReader();
//     reader.readAsDataURL(imageFile);
//     reader.onload = function (event) {
//         const imgElement = document.createElement("img");
//         imgElement.src = event.target.result;
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
//         document.querySelector("previewImage").src = srcEncoded;
//       };
//     };
    

// });



document.getElementById("reset").addEventListener('click', function (e) {
    // Clear form fields
    document.getElementById("name").value = "";
    document.getElementById("regno").value = "";
    document.getElementById("program").value = "";
    document.getElementById("branch").value = "";
    document.getElementById("dob").value = "";
    document.getElementById("last_attd").value = "";
    document.getElementById("attd_count").value = "";
    document.getElementById("imageInput").value = "";
});
function handleFileSelect(event) {
    const file = event.target.files[0];
    const previewImage = document.getElementById('previewImage');
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function (e) {
            previewImage.src = e.target.result;
            previewImage.style.display = 'inline-block';
        };
        reader.readAsDataURL(file);
    } else {
        previewImage.src = '';
        previewImage.style.display = 'none';
    }
}

document.getElementById('imageInput').addEventListener('change', handleFileSelect);


document.getElementById("submit").addEventListener('click', async function (e) {
    // Get form data
    let lastAttendance = document.getElementById("last_attd").value;
    let defaultAttendance = "2024-05-02 11:26:38";
    if(!lastAttendance){lastAttendance=defaultAttendance;}

    const formData = {
        username: document.getElementById("name").value,
        Reg_No: document.getElementById("regno").value,
        Program: document.getElementById("program").value,
        Branch: document.getElementById("branch").value,
        DOB: document.getElementById("dob").value,
        Last_attendance: lastAttendance,
        Attendance_count: document.getElementById("attd_count").value,
    };

    // Get the image file
    const imageFile = document.getElementById("imageInput").files[0];
    const filename=formData.Reg_No+'.png';
    const imageRef = storageRef(storage, 'images/' + filename);
    if (!imageFile) return;
    

    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
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
 
        uploadString(imageRef, srcEncoded, 'data_url').then((snapshot) => {
            console.log('Uploaded a data_url string!');
            });
  
        // document.querySelector("previewImage").src = srcEncoded;
      };
    };



    // Upload image to Firebase Storage
    // const imageRef = storageRef(storage, 'images/' + srcEncoded);
    // await uploadBytes(imageRef, srcEncoded);

    // Get download URL of the uploaded image
    // const imageUrl = await getDownloadURL(imageRef);

    // Add imageUrl to formData
    // formData.imageUrl = imageUrl;

    // Save formData to Firebase Realtime Database
    set(ref(database, 'user/' + formData.Reg_No), formData);

    alert("Successfully Saved");
});
























// document.getElementById("submit").addEventListener('click',function(e){
//     set(ref(database,'user/'+document.getElementById("name").value),
//     {
//         username:document.getElementById("name").value,
//         Reg_No:document.getElementById("regno").value,
//         Program:document.getElementById("program").value,
//         Branch:document.getElementById("branch").value,
//         DOB:document.getElementById("dob").value,
//         Last_attendance:document.getElementById("last_attd").value,
//         Attendance_count:document.getElementById("attd_count").value,
//     });
//     alert("Successfully Saved")
// })
// document.getElementById("reset").addEventListener('click',function(e){
//     var username=getElementById("name").value
//     database.ref('/users'+username).remove();
//     alert("deleted")
// })