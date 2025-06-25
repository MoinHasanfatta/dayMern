import './App.css'
import {useState,useEffect} from 'react'
import { Modal,Alert } from 'react-bootstrap'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const [products,setProducts] = useState([])
  const [formData,setFormData] = useState({
    name : "",
    price : "",
    description : ""
  })
  const [editingId,setEditingId] = useState(null)
  const [cart,setCart] = useState([])
  const [showAlert,setShowAlert] = useState(false)

  const API = "http://localhost:3002/products"

  const fetchProducts = async ()=>{
    const res = await axios.get(API)
    console.log(res)
    setProducts(res.data)

  }

  const handleEdit = (product) => {
    setFormData(product)
    setEditingId(product._id)
  }

  const addToCart = (product)=>{
    setCart([...cart,product])
    setShowAlert(true)
    setTimeout(()=> setShowAlert(false),2000)
  }

  useEffect(()=>{
    fetchProducts()
  },[])

  const handleChange =(e) =>{
    setFormData({...formData,[e.target.name] : e.target.value})
  }

  const deleteMe = async (id)=>{
    await axios.delete(`${API}/${id}`)
    fetchProducts()
  }

  const totalPrice = cart.reduce((sum,item) => sum + item.price,0)

  const handleSubmit = async (e)=>{
    e.preventDefault()
    if(editingId){
      await axios.put(`${API}/${editingId}`,formData)
      setEditingId(null)
    } else {
      await axios.post(API,formData)
    }       
    setFormData({ name : "", price : "",description : ""})
    fetchProducts()
  }

  return (

    <>
    <h1> My Shopping Cart </h1>
       <Modal show={showAlert} onHide = {()=> setShowAlert(false) }centered>
         <Modal.Body className="text-success text-center">
      Item added to Cart!!
    </Modal.Body>
    </Modal>
   
    <form onSubmit={handleSubmit}>
      Name : <input type='text'
      name='name'
      value={formData.name}
      placeholder='Enter product name'
      onChange={handleChange}
      required/> <br/>
      price : <input type='number'
      name='price'
      value={formData.price}
      placeholder='Enter a price'
      onChange={handleChange}
      required/> <br/>
      description  : <input type='text'
      name='description'
      value={formData.description}
      placeholder='Enter the description'
      onChange={handleChange}
      required/> <br />
      <button>Add</button>
    </form>
    {products.map((product)=>(
      <div key={product._id}>
        {/* <h1>{product._id}</h1> */}
        <h2> {product.name}</h2>
        <h3> Price : {product.price}</h3>
        <h4> {product.description}</h4>
        <button onClick={()=> handleEdit(product)}> Edit </button>
        <button onClick={()=> deleteMe(product._id)}> Delete </button>
   
        <button onClick={()=> addToCart(product)}

          
          > Add to Cart </button>
      </div>
    ))}

    <h4> The Total Price is : ({cart.length} items)</h4>
    {cart.map((item,idx)=>(
      <Alert key = {idx} variant="info"> {item.name} - {item.price}</Alert>
    ))}
    </>
  )
}
