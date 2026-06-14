import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [priceType, setPriceType] = useState('full_price');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.log(err));
  }, []);

  const addToCart = () => {
    if (!selectedProduct) return;
    const prod = products.find(p => p.id === parseInt(selectedProduct));
    const price = prod[priceType];
    
    const item = {
      id: prod.id,
      name: prod.name,
      priceType: priceType.replace('_', ' '),
      price: price,
      quantity: parseFloat(quantity),
      total: price * parseFloat(quantity)
    };
    
    setCart([...cart, item]);
  };

  const totalBill = cart.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-5 card p-4 shadow-sm">
          <h4 className="text-primary mb-4">New Bill - Billing System</h4>
          <div className="mb-3">
            <label className="form-label">Select Item</label>
            <select className="form-select" onChange={(e) => setSelectedProduct(e.target.value)}>
              <option value="">-- Choose Product --</option>
              {products.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Price Type</label>
            <select className="form-select" onChange={(e) => setPriceType(e.target.value)}>
              <option value="full_price">Full Price</option>
              <option value="half_price">Half Price</option>
              <option value="foot_price">Foot Price</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Quantity</label>
            <input type="number" className="form-control" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          </div>
          <button className="btn btn-success w-100 mt-2" onClick={addToCart}>Add to Bill</button>
        </div>
        <div className="col-md-7">
          <div className="card p-4 shadow-sm bg-light">
            <h4 className="text-dark mb-4">Current Invoice</h4>
            <table className="table table-bordered bg-white">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Type</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td className="text-capitalize">{item.priceType}</td>
                    <td>{item.price}.00</td>
                    <td>{item.quantity}</td>
                    <td>{item.total}.00</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-end mt-3">
              <h3>Total: <span className="text-danger">Rs. {totalBill}.00</span></h3>
            </div>
            <button className="btn btn-primary w-100 mt-3" onClick={() => window.print()}>Print Bill</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
