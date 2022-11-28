import { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./newProduct.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";



export default function NewProduct() {
  const [inputs, setInputs] = useState({})
  const [file, setFile] = useState(null)
  const [cat, setCat] = useState([])
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setInputs(prev => {
      return {...prev, [e.target.name]: e.target.value}
    })
  }
  const handleCat = (e) => {
    setCat(e.target.value.split(','))
  }

 const  handleClick = (e) => {
   e.preventDefault()
   const fileName = new Date().getTime() + file.name
   const storage = getStorage(app)
   const storageRef = ref(storage, fileName)
   const uploadTask = uploadBytesResumable(storageRef, file);

  // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion
  uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {


      const product= ({...inputs, img : downloadURL, categories: cat});
      addProduct(product, dispatch)
    });
  }
);
 }

 

  return (
    // <div className="newProduct">
    //  <Topbar/>
    //    <div style={{display: 'flex'}}>
    //    <Sidebar style={{flex: '1'}}/> 
    //    <div style={{flex: '8'}}>
    //   <h1 className="addProductTitle">New Product</h1>
    //   <form className="addProductForm">
    //     <div className="addProductItem">
    //       <label>Image</label>
    //       <input type="file" id="file" onChange={e => setFile(e.target.files[0])}/>
    //     </div>
    //     <div className="addProductItem">
    //       <label>Title</label>
    //       <input name="title" type="text" placeholder="Apple Airpods" onChange={handleChange}/>
    //     </div>
    //     <div className="addProductItem">
    //       <label>Description</label>
    //       <input name="desc" type="text" placeholder="description...." onChange={handleChange}/>
    //     </div>
    //     <div className="addProductItem">
    //       <label>Price</label>
    //       <input name="price" type="number" placeholder="100" onChange={handleChange}/>
    //     </div>
    //     <div className="addProductItem">
    //       <label>Categories</label>
    //       <input type="text" placeholder="jeans,skirts" onChange={handleCat}/>
    //     </div>
    //     <div className="addProductItem">
    //       <label>Stock</label>
    //       <select name="inStock" onChange={handleChange}>
    //         <option value="true">YES</option>
    //         <option value="false">NO</option>
    //       </select>
    //     </div>
    //     <button onClick={handleClick} className="addProductButton">Create</button>
    //   </form>
    //   </div>
    //   </div>
    // </div>
    <body>
  <div class="sidebar">
    <div class="logo-details">
      <i class='bx bxl-c-plus-plus icon'></i>
        <div class="logo_name">CodingLab</div>
        <i class='bx bx-menu' id="btn" ></i>
    </div>
    <ul class="nav-list">
      <li>
          <i class='bx bx-search' ></i>
         <input type="text" placeholder="Search...">
         <span class="tooltip">Search</span>
      </li>
      <li>
        <a href="#">
          <i class='bx bx-grid-alt'></i>
          <span class="links_name">Dashboard</span>
        </a>
         <span class="tooltip">Dashboard</span>
      </li>
      <li>
       <a href="#">
         <i class='bx bx-user' ></i>
         <span class="links_name">User</span>
       </a>
       <span class="tooltip">User</span>
     </li>
     <li>
       <a href="#">
         <i class='bx bx-chat' ></i>
         <span class="links_name">Messages</span>
       </a>
       <span class="tooltip">Messages</span>
     </li>
     <li>
       <a href="#">
         <i class='bx bx-pie-chart-alt-2' ></i>
         <span class="links_name">Analytics</span>
       </a>
       <span class="tooltip">Analytics</span>
     </li>
     <li>
       <a href="#">
         <i class='bx bx-folder' ></i>
         <span class="links_name">File Manager</span>
       </a>
       <span class="tooltip">Files</span>
     </li>
     <li>
       <a href="#">
         <i class='bx bx-cart-alt' ></i>
         <span class="links_name">Order</span>
       </a>
       <span class="tooltip">Order</span>
     </li>
     <li>
       <a href="#">
         <i class='bx bx-heart' ></i>
         <span class="links_name">Saved</span>
       </a>
       <span class="tooltip">Saved</span>
     </li>
     <li>
       <a href="#">
         <i class='bx bx-cog' ></i>
         <span class="links_name">Setting</span>
       </a>
       <span class="tooltip">Setting</span>
     </li>
     <li class="profile">
         <div class="profile-details">
           {/* <!--<img src="profile.jpg" alt="profileImg">--> */}
           <div class="name_job">
             <div class="name">Prem Shahi</div>
             <div class="job">Web designer</div>
           </div>
         </div>
         <i class='bx bx-log-out' id="log_out" ></i>
     </li>
    </ul>
  </div>
  <section class="home-section">
      <div class="text">Dashboard</div>
  </section>
 
</body>
  );
}
