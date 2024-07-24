import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const Table = ({ products, handleEdit, handleDelete }) => {
  

  const formatCurrency = (value) => {
    return value.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' , minimumFractionDigits: null,});
  };

  const actionBodyTemplate = (products) => {
    return (
        <React.Fragment>
            <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => handleEdit(products.id)} />
            <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => handleDelete(products.id)} />
        </React.Fragment>
    );
};
  const priceBodyTemplate = (products) => {
    return formatCurrency(products.harga);
  };


  return (
    <div className="card">
      <DataTable value={products} showGridlines paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} sortMode="multiple" tableStyle={{ minWidth: '50rem' }}>
        <Column field="nama" header="Name" sortable style={{ width: '25%' }}></Column>
        <Column field="harga" header="Price" body={priceBodyTemplate} sortable style={{ width: '25%' }}></Column>
        <Column field="stok" header="Stock" sortable style={{ width: '25%' }}></Column>
        <Column header="Actions" body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
      </DataTable>
    </div>
    // <div className="contain-table">
    //   <table className="striped-table">
    //     <thead>
    //       <tr>
    //         <th>No.</th>
    //         <th>Nama Produk</th>
    //         <th>Harga</th>
    //         <th>Stok</th>
    //         <th colSpan={2} className="text-center">
    //           Actions
    //         </th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {products.length > 0 ? (
    //         products.map((product, i) => (
    //           <tr key={product.id}>
    //             <td>{i + 1}</td>
    //             <td>{product.nama}</td>
    //             <td>{formatter.format(product.harga)}</td>
    //             <td>{product.stok} </td>
    //             <td className="text-right">
    //               <button
    //                 onClick={() => handleEdit(product.id)}
    //                 className="button muted-button"
    //               >
    //                 Edit
    //               </button>
    //             </td>
    //             <td className="text-left">
    //               <button
    //                 onClick={() => handleDelete(product.id)}
    //                 className="button muted-button"
    //               >
    //                 Delete
    //               </button>
    //             </td>
    //           </tr>
    //         ))
    //       ) : (
    //         <tr>
    //           <td colSpan={7}>No Product</td>
    //         </tr>
    //       )}
    //     </tbody>
    //   </table>
    // </div>
  );
};

export default Table;
