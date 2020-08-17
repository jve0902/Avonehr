"use strict";
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

/**
 * Generate Contract PDF
 * @param {string} fileName
 * @param {string} content
 * @param {object} user
 * @returns {string} pdfUrl
 */
const generatePDF = async (content, user) => {
  try {
    const pdfPath = path.join(
      "app",
      "client",
      `c${user.clientId}_u${user.id}_contract` + ".pdf"
    );
    const pdfDoc = new PDFDocument({ size: "A4", margin: 50 });
    pdfDoc.text(content);

    // Footer
    pdfDoc.text(`Signed: ${user.date}`, 50, pdfDoc.page.height - 160, {
      width: 410,
      align: "left",
    });
    pdfDoc.text(`Name: ${user.firstname} ${user.lastname}`);
    pdfDoc.text(`IP Address: ${user.ip}`);
    pdfDoc.text(`Company: ${user.company}`);
    pdfDoc.text(`UserID: ${user.id}`);

    pdfDoc.end();
    const writeStream = fs.createWriteStream(pdfPath);
    pdfDoc.pipe(writeStream);

    return pdfPath;
  } catch (error) {
    console.error("pdfDoc >>>:", error);
    return false;
  }
};

const user = {
  generatePDF,
};

module.exports = user;
