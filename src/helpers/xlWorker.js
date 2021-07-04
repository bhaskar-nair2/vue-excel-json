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
  try {
    const workbook = XLSX.read(ut8ar, { type: 'array' });
    let jsonData = [];


    // Just read the first sheet and convert tot json
    jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[0], {
      'header': 'A', // header type
      'range': startRow,
    });

    // const data = await p.map(XLSX.utils.sheet_to_json, {);

    return jsonData;
  } catch (error) {
    console.error(error);
    throw new Error('Error in parsing File');
  }
}

/**
 *
 * @param {file} file
 * @param {number} startRow
 * @return {Array}
 */
async function processFile(file, startRow) {
  const ut8ar = await excelFileToUT8Array(file);
  const jsonData = await ut8ArraytoJSON(ut8ar, startRow);
  return jsonData;
}

export {
  processFile,
};
