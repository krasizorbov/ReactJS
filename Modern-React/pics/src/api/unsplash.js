import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
      Authorization:
        'Client-ID pMHzjRChmJ0eBp5h-wqvnnJ4bP4iLN78x3sEoTQNR08',
    },
  });