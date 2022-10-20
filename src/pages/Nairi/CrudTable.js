import React, { useState, useEffect, Fragment } from "react";
import "./CrudTable.css";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";
import { useDispatch, useSelector } from "react-redux";
import { sagaActions } from "./redux_saga/sagaActions";

const CrudTable = () => {
  const [contacts, setContacts] = useState([]);

  const [addFormData, setAddFormData] = useState({});
  const dispatch = useDispatch();
  const [editFormData, setEditFormData] = useState({});
  const { data } = useSelector((store) => store.booksData);


  console.log(data);
  useEffect(() => {
    dispatch({
      type: sagaActions.GET_BOOKS,
    });
  }, [dispatch]);

  

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      author: addFormData.author,
      title: addFormData.title,
      language: addFormData.language,
      status: addFormData.status,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addFormData),
    };
    fetch("http://localhost:5000/books", requestOptions)
      .then((response) => response.json())
      .then((bookData) => addFormData(bookData));

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      author: editFormData.author,
      title: editFormData.title,
      language: editFormData.language,
      status: editFormData.status,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      id: contact.id,
      author: contact.author,
      title: contact.title,
      language: contact.language,
      status: contact.status,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);
    fetch(`http://localhost:5000/books/${contactId}`, { method: "DELETE" });
    setContacts(newContacts);
  };

  return (
    <section className="my_body">
      <div className="app-container">
        <form onSubmit={handleEditFormSubmit}>
          <table className="table">
            <thead>
              <tr>
                <th>Author</th>
                <th>Title</th>
                <th>Language</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((contact, index) => (
                <Fragment key={index}>
                  {editContactId === contact.id ? (
                    <EditableRow
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                      editContactId={editContactId}
                    />
                  ) : (
                    <ReadOnlyRow
                      contact={contact}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}
                    />
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </form>

        <form onSubmit={handleAddFormSubmit}>
          <input
            type="text"
            name="author"
            required="required"
            placeholder="Enter an author..."
            onChange={handleAddFormChange}
          />
          <input
            type="text"
            name="title"
            required="required"
            placeholder="Enter a title..."
            onChange={handleAddFormChange}
          />
          <input
            type="text"
            name="language"
            required="required"
            placeholder="Enter a language..."
            onChange={handleAddFormChange}
          />
          <input
            type="text"
            name="status"
            required="required"
            placeholder="Enter a status..."
            onChange={handleAddFormChange}
          />
          <button type="submit">Add</button>
        </form>
      </div>
    </section>
  );
};

export default CrudTable;
