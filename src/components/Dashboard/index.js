import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = id => {
    const [product] = products.filter(product => product.id === id);

    setSelectedProduct(product);
    setIsEditing(true);
  };


  useEffect(() => {
    async function fetchData() {
      const storedData =
        (await fetch("http://localhost:5244/api/Product",{method:"GET", mode: "cors"})
          .then((response => response.json())
        )) || [];
        setProducts(storedData);
    }
    fetchData();
  }, []);

  

  const handleDelete = id => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete!',
      cancelButtonText: 'No, cancel!',
    }).then(result => {
      if (result.value) {
        const [product] = products.filter(product => product.id === id);
        fetch(`http://localhost:5244/api/Product/${id}`, {
          method: 'DELETE',
          mode: 'cors',
          headers: {
            'Content-type': 'application/json',
         },
        })
        .then(async response => {
          const data = await response;
          console.log(data)
          //check for error response
          if (!response.ok) {
           //   get error message from body or default to response status
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
          }
        })
        .catch(error => 
            console.error('There was an error!', error)
        );
        
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${product.nama}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });

        const productsCopy = products.filter(product => product.id !== id);
        localStorage.setItem('product_data', JSON.stringify(productsCopy));
        setProducts(productsCopy);
      }
    });
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Header
            setIsAdding={setIsAdding}
          />
          <Table
            products={products}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && (
        <Add
          products={products}
          setProducts={setProducts}
          setIsAdding={setIsAdding}
        />
      )}
      {isEditing && (
        <Edit
          products={products}
          selectedProduct={selectedProduct}
          setProducts={setProducts}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default Dashboard;
