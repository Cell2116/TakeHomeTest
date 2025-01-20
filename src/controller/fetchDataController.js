// find data from real time

const { fetchData } = require('../models/splitData');

exports.findData = async (req, res) => {
  try {
    const parseData = await fetchData();
    const { nim, nama, ymd } = req.body;
    let filterData = [];

    switch (true) {
      case !!nim && !!nama && !ymd:
        filterData = parseData.filter(data => data.NIM === nim && data.NAMA === nama && data.YMD === ymd);
        break;
      case !!nim && !!nama:
        filterData = parseData.filter(data => data.NIM === nim && data.NAMA === nama);
        break;
      case !!nim && !!ymd:
        filterData = parseData.filter(data => data.NIM === nim && data.YMD === ymd);
        break;
      case !!nama && !!ymd:
        filterData = parseData.filter(data => data.NAMA === nama && data.YMD === ymd);
        break;
      case !!nim:
        filterData = parseData.filter(data => data.NIM === nim);
        break;
      case !!nama:
        filterData = parseData.filter(data => data.NAMA === nama);
        break;
      case !!ymd:
        filterData = parseData.filter(data => data.YMD === ymd);
        break;
      default:
        return res.status(400).json({ message: 'At least one search criteria: nim, nama, or ymd.'});
    }

    if (filterData.length === 0) {
      return res.status(200).json({ message: 'No Data Found' });
    }

    res.status(200).json({
      message: 'Data Found',
      data: filterData.map(item => ({
        NIM: item.NIM,
        NAMA: item.NAMA,
        YMD: item.YMD,
      })),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server Error' });
  }
};
