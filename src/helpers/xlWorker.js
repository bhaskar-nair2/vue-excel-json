import XLSX from 'xlsx';

/**
 *
 * @param {file} file
 * @return {Promise<Array>}
 */
function excelFileToUT8Array(file) {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onerror = () => {
      reader.abort();
      reject(new Error('Problem reading input file.'));
    };

    reader.onload = (e) => {
      const ut8ar = new Uint8Array(e.target.result);
      resolve(ut8ar);
    };

    reader.readAsArrayBuffer(file);
  });
}

/**
 *
 * @param {Uint8Array} ut8ar
 * @param {number} startRow
 * @return {Array}
 */
async function ut8ArraytoJSON(ut8ar, startRow) {
  return new Promise((resolve, reject) => {
    try {
      const workbook = XLSX.read(ut8ar, { type: 'array' });
      const firstWorksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstWorksheet, {
        header: 'A',
        range: startRow,
      });
      resolve(jsonData);
    } catch (error) {
      reject(new Error('Error in parsing File'));
    }
  });
}

/**
 *
 * @param {file} file
 * @param {number} startRow
 * @return {Array}
 */
async function processFile(file, startRow = 0) {
  try {
    const ut8ar = await excelFileToUT8Array(file);
    const jsonData = await ut8ArraytoJSON(ut8ar, startRow);
    console.log('mod: ', jsonData);
    return jsonData;
  } catch (error) {
    console.log(error);
    throw new Error('Error in processing data');
  }
}

export {
  processFile,
};
