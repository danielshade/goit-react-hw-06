import { createSlice } from '@reduxjs/toolkit';
import contactsData from '../contacts.json';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: contactsData,
  },
  reducers: {
    addContact: (state, action) => {
      state.items.push(action.payload);
    },
    deleteContact: (state, action) => {
      state.items = state.items.filter(
        contact => contact.id !== action.payload
      );
    },
    editContact: (state, action) => {
      const { id, name, number } = action.payload;
      const contactToEdit = state.items.find(contact => contact.id === id);
      if (contactToEdit) {
        contactToEdit.name = name;
        contactToEdit.number = number;
      }
    },
  },
});

export const { addContact, deleteContact, editContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
export const selectContacts = state => state.contacts.items;
