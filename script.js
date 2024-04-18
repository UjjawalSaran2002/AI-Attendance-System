

// Import the functions you need from the SDKs you need
import {initializeApp} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase,ref,set,get,child } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-storage.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA5CSB25UHPZKMDPPmrD22ba0pevGmMU_8",
    authDomain: "ai-attendance-system-6e370.firebaseapp.com",
    projectId: "ai-attendance-system-6e370",
    storageBucket: "ai-attendance-system-6e370.appspot.com",
    messagingSenderId: "705748210191",
    appId: "1:705748210191:web:f3f8673040b2a82cd6097a"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// get ref to Database Services
const storage = getStorage(app);
const database =getDatabase(app);



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
    const formData = {
        username: document.getElementById("name").value,
        Reg_No: document.getElementById("regno").value,
        Program: document.getElementById("program").value,
        Branch: document.getElementById("branch").value,
        DOB: document.getElementById("dob").value,
        Last_attendance: document.getElementById("last_attd").value,
        Attendance_count: document.getElementById("attd_count").value,
    };

    // Get the image file
    const imageFile = document.getElementById("imageInput").files[0];

    // Upload image to Firebase Storage
    const imageRef = storageRef(storage, 'images/' + imageFile.name);
    await uploadBytes(imageRef, imageFile);

    // Get download URL of the uploaded image
    const imageUrl = await getDownloadURL(imageRef);

    // Add imageUrl to formData
    formData.imageUrl = imageUrl;

    // Save formData to Firebase Realtime Database
    set(ref(database, 'user/' + formData.username), formData);

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
