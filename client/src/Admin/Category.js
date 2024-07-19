import React, { useEffect, useState } from 'react';
import AdminMenu from './AdminMenu';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function Category() {
  const [updatedName, setUpdatedName] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [show, setShow] = useState(false);
  const handleShow = (id) => {
    setCategoryID(id);
    setShow(true);
  };
  const handleClose = () => setShow(false);

  const token = localStorage.getItem('token');
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post('http://localhost:8080/api/category/create-category', { name }, config);
      if (result.data.success) {
        alert(result.data.msg);
        setName('');
        getAllCategories();
      } else {
        alert(result.data.msg);
      }
    } catch (error) {
      alert('Error creating category:', error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await axios.delete(`http://localhost:8080/api/category/delete-category/${id}`, config);
      if (result.data.success) {
        alert(result.data.msg);
        getAllCategories();
      } else {
        alert(result.data.msg);
      }
    } catch (error) {
      console.log('Error:', error.message);
    }
  };

  const handleSaveChanges = async (id) => {
    const result = await axios.put(`http://localhost:8080/api/category/update-category/${id}`, { name: updatedName }, config);
    if (result.data.success) {
      alert(result.data.msg);
      getAllCategories();
      setShow(false);
      setUpdatedName("");
    } else {
      alert(result.data.msg);
    }
  };

  const getAllCategories = async () => {
    try {
      const result = await axios.get('http://localhost:8080/api/category/getAllCategories', config);
      if (result.data.success) {
        setCategories(result.data.msg);
      } else {
        alert(result.data.msg);
      }
    } catch (error) {
      alert('Error fetching categories:', error.message);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div className="category-container">
      <AdminMenu />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            onChange={(e) => setUpdatedName(e.target.value)}
            value={updatedName}
            type="text"
            className="form-control"
            placeholder="Updated Category Name"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSaveChanges(categoryID)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="category-form">
        <h2>Manage Category</h2>
        <div className="form-group">
          <input
            type='text'
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            placeholder="Category Name"
          />
          <button onClick={handleClick} className="btn btn-primary mt-2">Add</button>
        </div>
        <div className="category-list mt-4">
          <h3>Categories Available</h3>
          {categories.length > 0 ? (
            categories.map((item) => (
              <div key={item._id} className="category-item">
                <p>{item.name}</p>
                <div>
                  <button className="btn btn-secondary" onClick={() => handleShow(item._id)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>Delete</button>
                </div>
              </div>
            ))
          ) : (
            <p>No categories available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Category;
