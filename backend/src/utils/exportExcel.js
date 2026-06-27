const XLSX = require('xlsx');

/**
 * Send an array of objects as a downloadable Excel file
 * @param {Object} res        - Express response object
 * @param {Array}  data       - Array of plain objects
 * @param {String} sheetName  - Sheet tab name
 * @param {String} fileName   - Download filename (without .xlsx)
 */
const exportToExcel = (res, data, sheetName = 'Sheet1', fileName = 'export') => {
  const worksheet  = XLSX.utils.json_to_sheet(data);
  const workbook   = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

  res.setHeader('Content-Disposition', `attachment; filename="${fileName}.xlsx"`);
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.send(buffer);
};

module.exports = { exportToExcel };
