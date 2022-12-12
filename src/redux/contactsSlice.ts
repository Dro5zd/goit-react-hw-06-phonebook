import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {nanoid} from 'nanoid';

export interface IContact {
    id: string,
    name: string,
    phoneNumber: string
}

const contactsInitialState: IContact[] = [];

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: contactsInitialState,
    reducers: {
        addContact: {
            reducer(state, action: PayloadAction<IContact>) {
                state.push(action.payload);
            },
            prepare(name: string, phoneNumber: string) {
                return {
                    payload: {
                        id: nanoid(),
                        name,
                        phoneNumber,
                    },
                };
            },
        },

        deleteContact(state, action: PayloadAction<string>) {
            const index = state.findIndex(d => d.id === action.payload)
            state.splice(index, 1);
        }
    }
})

export const {addContact, deleteContact} = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer
