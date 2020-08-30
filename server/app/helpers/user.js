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
    const dest = "/Users/ruhulamin/Documents/client";
    fs.access(dest, function (error) {
      if (error) {
        console.log("Directory does not exist.");
        return fs.mkdir(dest, (error) => cb(error, dest));
      } else {
        console.log("Directory exists.");
      }
    });

    console.log("dest", dest);

    const pdfPath = path.join(
      dest,
      `c${user.client_id}_u${user.id}_contract` + ".pdf"
    );
    const pdfDoc = new PDFDocument({ size: "A4", margin: 50 });
    pdfDoc.text(content);

    // Footer
    pdfDoc.text(`Signed: ${user.sign_dt}`, 50, pdfDoc.page.height - 160, {
      width: 410,
      align: "left",
    });
    pdfDoc.text(`Name: ${user.firstname} ${user.lastname}`);
    pdfDoc.text(`IP Address: ${user.sign_ip_address}`);
    pdfDoc.text(`Company: ${user.company || "Company hardcoded"}`);
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
