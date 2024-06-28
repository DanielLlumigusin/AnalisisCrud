import { database } from './Firebase';
import { ref, get, set } from 'firebase/database';

export const getData = async () => {
  try {
    const headerRef = ref(database, 'reservas'); 
    const snapshot = await get(headerRef); 
    return snapshot.val();
  } catch (error) {
    console.error('Error getting data:', error);
    throw error;
  }
};

export const setData = async (reservas) => {
  try {
    const dataRef = ref(database, 'reservas');
    await set(dataRef, reservas);
    console.log('Data written successfully!');
  } catch (error) {
    console.error('Error setting data:', error);
    throw error;
  }
};