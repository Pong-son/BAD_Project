import { jsPDF } from "jspdf";
import * as fs from "fs";
import { Document, Packer, Paragraph, TextRun } from "docx";

// Default export is a4 paper, portrait, using millimeters for units
export const exportPDF = (data:any[]) => {
  console.log(data)
  const pdfDoc = new jsPDF();
  
  pdfDoc.text(`Report (For id:${data[0].id})`, 10, 10);
  pdfDoc.text("test", 10, 20);
  pdfDoc.text("test", 10, 30);
  pdfDoc.text("test", 10, 40);
  pdfDoc.text("test", 10, 50);
  pdfDoc.save(`./public/document/pdf/${data[0].id}-${data[0].location}.pdf`);
}


// Documents contain sections, you can have multiple sections per document, go here to learn more about sections
//
//  This simple example will only contain one section
export const exportDocx = (data:any[]) => {
  data
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
      fs.writeFileSync(`./public/document/word/${data[0].id}-${data[0].location}.docx`, buffer);
  });
  
  // Done! A file called 'My Document.docx' will be in your file system.
}