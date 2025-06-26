import './App.css'
import { useState, useEffect } from 'react'
import { Modal, Alert } from 'react-bootstrap'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const [products, setProducts] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: ""
  })
  const [editingId, setEditingId] = useState(null)
  const [cart, setCart] = useState([])
  const [showAlert, setShowAlert] = useState(false)

  const API = "https://daymern.onrender.com/products"

  const fetchProducts = async () => {
    const res = await axios.get(API)
    console.log(res)
    setProducts(res.data)

  }

  const handleEdit = (product) => {
    setFormData(product)
    setEditingId(product._id)
  }

  const addToCart = (product) => {
    setCart([...cart, product])
    setShowAlert(true)
    setTimeout(() => setShowAlert(false), 2000)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const deleteMe = async (id) => {
    await axios.delete(`${API}/${id}`)
    fetchProducts()
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editingId) {
      await axios.put(`${API}/${editingId}`, formData)
      setEditingId(null)
    } else {
      await axios.post(API, formData)
    }
    setFormData({ name: "", price: "", description: "", image: "" })
    fetchProducts()
  }

  return (

    <>
      <h1>🛒 My Shopping Cart </h1>
      <Modal show={showAlert} onHide={() => setShowAlert(false)} centered>
        <Modal.Body className="text-success text-center">
          Item added to Cart!!
        </Modal.Body>
      </Modal>

      <form onSubmit={handleSubmit}
        className='mb-4 p-3 border rounded'>
        Name : <input type='text'
          name='name'
          value={formData.name}
          placeholder='Enter product name'
          onChange={handleChange}
          required /> <br />
        Price : <input type='number'
          name='price'
          value={formData.price}
          placeholder='Enter a price'
          onChange={handleChange}
          required /> <br />
        Description  : <input type='text'
          name='description'
          value={formData.description}
          placeholder='Enter the description'
          onChange={handleChange}
          required /> <br />
        Image : <input type='text'
          name='image'
          value={formData.image}
          placeholder='Enter product url'
          onChange={handleChange}
          required /> <br />
        <button className='btn btn-primary mt-2'>Add</button>
      </form>

      <div className='d-flex flex-wrap justify-content-center'>
        {products.map((product) => (
          <div
            key={product._id}
            className='card m-2 p-2 border-primary'
            style={{ width: "18rem" }}>
            <h2> {product.name}</h2>
            <h3> Price : {product.price}</h3>
            <h4> {product.description}</h4>
            <img src={product.image} alt={product.name}
              className="card-img-top"
              style={{ height: "180px", objectFit: 'cover', borderRadius: '10px' }} />
            <div>
              <button className='btn btn-warning btn-sm me-2'
                onClick={() => handleEdit(product)}> Edit </button>
              <button className='btn btn-danger btn-sm me-2'
                onClick={() => deleteMe(product._id)}> Delete </button>

              <button className='btn btn-primary btn-sm me-2' onClick={() => addToCart(product)}> Add to Cart </button>
            </div>
          </div>
        ))}
      </div>

      <h4 className='mt-2'> The Total Price is : ({totalPrice} )</h4>
      {cart.map((item, idx) => (
        <Alert key={idx} variant="info"> {item.name} - {item.price}</Alert>
      ))}
    </>
  )
}
