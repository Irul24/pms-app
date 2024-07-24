import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Edit = ({ products, selectedProduct, setProducts, setIsEditing }) => {
  const id = selectedProduct.id;

  const [name, setName] = useState(selectedProduct.nama);
  const [desc, setDesc] = useState(selectedProduct.deskripsi);
  const [price, setPrice] = useState(selectedProduct.harga);
  const [stock, setStock] = useState(selectedProduct.stok);

  const handleUpdate = e => {
    e.preventDefault();

    if (!name || !desc || !price || !stock) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    fetch(`http://localhost:5244/api/Product/?id=${id}`, {
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify({
        id: id,
        nama: name,
        deskripsi: desc,
        harga: price,
        stok: stock
      }),
      headers: {
         'Content-type': 'application/json',
      },
    })
        .then(async response => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }

            // setPostId(id);
        })
        .catch(error => 
            console.error('There was an error!', error)
        );
    setIsEditing(false);
    window.location.reload();

    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: `'s data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Product</h1>
        <label htmlFor="productName">Product Name</label>
        <input
          id="productName"
          type="text"
          name="productName"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <label htmlFor="desc">Description</label>
        <textarea
          id="desc"
          type="text"
          name="desc"
          value={desc}
          onChange={e => setDesc(e.target.value)}
        />
        <label htmlFor="price">Price (Rp)</label>
        <input
          id="price"
          type="number"
          name="price"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
        <label htmlFor="stock">Stock</label>
        <input
          id="stock"
          type="number"
          name="stock"
          value={stock}
          onChange={e => setStock(e.target.value)}
        />
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Update" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
