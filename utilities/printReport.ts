import { jsPDF } from "jspdf";
import * as fs from "fs";
import { Document, Packer, Paragraph, TextRun } from "docx";

// Default export is a4 paper, portrait, using millimeters for units
export const exportPDF = () => {
  const pdfDoc = new jsPDF();
  
  pdfDoc.text("Hello world!", 10, 10);
  pdfDoc.save("a4.pdf");
}


// Documents contain sections, you can have multiple sections per document, go here to learn more about sections
//
//  This simple example will only contain one section
export const printDocx = () => {
  const doc = new Document({
      sections: [
          {
              properties: {},
              children: [
                  new Paragraph({
                      children: [
                          new TextRun("Hello World"),
                          new TextRun({
                              text: "Foo Bar",
                              bold: true,
                          }),
                          new TextRun({
                              text: "\tGithub is the best",
                              bold: true,
                          }),
                      ],
                  }),
              ],
          },
      ],
  });
  
  // Used to export the file into a .docx file
  Packer.toBuffer(doc).then((buffer) => {
      fs.writeFileSync("My Document.docx", buffer);
  });
  
  // Done! A file called 'My Document.docx' will be in your file system.
}