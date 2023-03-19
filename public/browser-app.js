const url = '/api/v1/products'
const fileFormDOM = document.querySelector('.file-form')

const nameInputDOM = document.querySelector('#name')
const priceInputDOM = document.querySelector('#price')
const imageInputDOM = document.querySelector('#image')

const containerDOM = document.querySelector('.container')
let imageValue;

// imageInputDOM.addEventListener('change',(e)=>{
//  const file = e.target.files[0];
//  console.log(file);
// })







imageInputDOM.addEventListener('change',async (e)=>{
 const imageFile = e.target.files[0];
 const formData = new FormData();
 formData.append('image',imageFile)
 try {
  // const para = document.createElement("p");
  // const node = document.createTextNode("Please wait image is loading");
  // para.appendChild(node);
  // const element = document.getElementById("data");
  // const child = document.getElementById("button");
  // element.insertBefore(para, child);
  const temp = document.getElementById("status");
  temp.innerHTML="Please wait image is loading"
  const {data:{image:{src}}} = await axios.post(`${url}/uploads`,formData,{
   headers:{
    'Content-Type':'multipart/form-data'
   }
  })
  imageValue = src
  console.log(imageValue)
  if(!imageValue==false)
  {
    const status1 = document.getElementById("status"); 
    status1.innerHTML="Image Loaded successfully "
    // alert("Image added successfully , Now you can add product")
  }
 } catch (error) {
   imageValue = null
   const temp = document.getElementById("status")
  temp.innerHTML=error+'  ,Please try again!!'
  console.log(error);
 }
})


fileFormDOM.addEventListener('submit',async (e)=>{
e.preventDefault()
const nameValue = nameInputDOM.value;
const priceValue = priceInputDOM.value;
try {
  if(!imageValue)
  {
    alert('Please wait while image is loading')
  }
  else
  {
    const product = {name:nameValue,price:priceValue,image:imageValue}
  // console.log(product)
  await axios.post(url,product);

  fetchProducts()
  const temp1= document.getElementById("status")
  temp1.innerHTML="Product Added"
  imageValue=''
  }
 
} catch (error) {
  const temp = document.getElementById("status")
  temp.innerHTML='There is an error please try again'
 console.log(error);
}
})



async function fetchProducts () {
 try {
  const {data:{products}} = await axios.get(url);
  
  const productsDOM = products.map((product)=>{
return `<article class="product">
<img src="${product.image}" alt="${product.name}" class="img"/>
<footer>
<p>${product.name}</p>
<span>$${product.price}</span>
</footer>
</article>`
  }).join('')
  containerDOM.innerHTML = productsDOM
 } catch (error) {
  console.log(error);
 }
 
}

fetchProducts()