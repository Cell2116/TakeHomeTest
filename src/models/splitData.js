//Split data into better JSON format
//Fetch data from real time website
//This is a little tricky because there is always data randomization

const axios = require('axios');

const fetchData = async () => {
  try {
    const response = await axios.get('https://ogienurdiana.com/career/ecc694ce4e7f6e45a5a7912cde9fe131');
    const data = response.data.DATA;
    const entries = data.split('\n').slice(1);
    
    const parsedData = entries.map(entry => {
      const parts = entry.split('|');
      const NIM = parts.find(part => /^\d{10}$/.test(part));
      const YMD = parts.find(part => /^\d{8}$/.test(part) && /^\d{4}(\d{2})(\d{2})$/.test(part));
      const NAMA = parts.find(part => part !== NIM && part !== YMD);
      return { NIM, NAMA, YMD };
    });

    console.log(parsedData);
    return parsedData;
  } catch (err) {
    console.error('Error fetching data:', err);
    return [];
  }
}

module.exports = { fetchData };