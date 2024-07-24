import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Add = ({ products, setProducts, setIsAdding }) => {
  const [post, setPosts] = useState({});
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  const handleAdd = e => {
    e.preventDefault();
    if (!name || !desc || !price || !stock) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    fetch('http://localhost:5244/api/Product', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        nama: name,
        deskripsi: desc,
        harga: price,
        stok: stock
      }),
      headers: {
         'Content-type': 'application/json; charset=UTF-8',
      },
   })
      .then((res) => res.json(0))
      .then((posts) => {
        setPosts([post, ...posts]);
        setName('');
        setDesc('');
        setPrice('');
        setStock('');
        })
        .catch((err) => {
          console.log(err.message);
        });
        
    window.location.reload();
    
    setProducts(products);
    setIsAdding(false);

    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: `Product ${name}'s has been Added.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Product</h1>
        <label htmlFor="productName">Product Name</label>
        <input
          id="productName"
          type="text"
          name="productName"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="desc"
          type="text"
          name="desc"
          value={desc}
          rows={10}
          cols={15}
          onChange={e => setDesc(e.target.value)}
        />
        <label htmlFor="salary">Price (Rp)</label>
        <input
          id="price"
          type="number"
          name="price"
          value={price}
          placeholder='0'
          onChange={e => setPrice(e.target.value)}
        />
        <label htmlFor="stock">Stock</label>
        <input
          id="stock"
          type="number"
          name="stock"
          value={stock}
          placeholder='0'
          onChange={e => setStock(e.target.value)}
        />
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
      
    </div>
  );
};

export default Add;
