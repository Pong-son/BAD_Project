import { jsPDF } from "jspdf";
import  autoTable from "jspdf-autotable";
import * as fs from "fs";
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, AlignmentType, VerticalAlign, ImageRun } from "docx";

export const exportPDF = (data:any[]) => {
  console.log(data)
  const pdfDoc = new jsPDF();
  
  let image:string

  pdfDoc.text(`Report (For id:${data[0].id})`, 10, 10);
  pdfDoc.text(`Client Name: ${data[0].company_name}`, 10, 20);
  pdfDoc.text(`Client Info:`, 10, 30);
  pdfDoc.text(` Client Address: ${data[0].address}`, 10, 40);
  pdfDoc.text(` Client Contact Name: ${data[0].contact}`, 10, 50);
  pdfDoc.text(` Client Photo No.:${data[0].phone_no}`, 10, 60);
  pdfDoc.text(` Client E-mail:${data[0].email}`, 10, 70);
  pdfDoc.text(`Sampling Location: ${data[0].location}`, 10, 80);

  let wtDate = new Date(data[0].walkthrough_date).getDate()
  wtDate < 10? wtDate = 0+wtDate:wtDate
  let wtMonth = new Date(data[0].walkthrough_date).getMonth()+1
  wtMonth < 10? wtMonth = 0+wtMonth:wtMonth
  let wtYear = new Date(data[0].walkthrough_date).getFullYear()
  let wtDateData = `${wtYear}-${wtMonth}-${wtDate}`

  pdfDoc.text(`Walkthrough Date: ${wtDateData}`, 10, 90);

  let startDate = new Date(data[0].sampling_start_date).getDate()
  startDate < 10? startDate = 0+startDate:startDate
  let startMonth = new Date(data[0].sampling_start_date).getMonth()+1
  startMonth < 10? startMonth = 0+startMonth:startMonth
  let startYear = new Date(data[0].sampling_start_date).getFullYear()
  let startDateData = `${startYear}-${startMonth}-${startDate}`

  let endDate = new Date(data[0].sampling_end_date).getDate()
  endDate < 10? endDate = 0+endDate:endDate
  let endMonth = new Date(data[0].sampling_end_date).getMonth()+1
  endMonth < 10? endMonth = 0+endMonth:endMonth
  let endYear = new Date(data[0].sampling_end_date).getFullYear()
  let endDateData = `${endYear}-${endMonth}-${endDate}`
  pdfDoc.text(`Sampling Period: ${startDateData} - ${endDateData}`, 10, 100);
  pdfDoc.text(`Total Sampling Point: ${data[0].no_of_sampling_point}`, 10, 110);

  let co2EquipmentList:any = []
  let pm10EquipmentList:any = []
  let rhEquipmentList:any = []
  data.forEach(data => {
    co2EquipmentList.push(data.co2Equipment)
    pm10EquipmentList.push(data.pm10Equipment)
    rhEquipmentList.push(data.rhEquipment)
  })
  let newco2EquipmentList = [...new Set(co2EquipmentList)]
  pdfDoc.text(`CO2 Equipment List: ${newco2EquipmentList}`, 10, 120);

  let newpm10EquipmentList = [...new Set(pm10EquipmentList)]
  pdfDoc.text(`Pm10 Equipment List: ${newpm10EquipmentList}`, 10, 130);

  let newrhEquipmentList = [...new Set(rhEquipmentList)]
  pdfDoc.text(`Humidity Equipment List: ${newrhEquipmentList}`, 10, 140);

  pdfDoc.text(`Result Table:`, 10, 150);
  let heightOfY = 160
  let newHeightOfY:number
  const headers = ['Point No.', 'Description','Sampling Date', 'CO2', 'PM10', 'Humidity']
  let dataBody:any[] = []
  data.forEach(data => {
    let samplingDate = new Date(data.sampling_date).getDate()
    samplingDate < 10? samplingDate = 0+samplingDate:samplingDate
    let samplingMonth = new Date(data.sampling_date).getMonth()+1
    samplingMonth < 10? samplingMonth = 0+samplingMonth:samplingMonth
    let samplingYear = new Date(data.sampling_date).getFullYear()
    let samplingDateData = `${samplingYear}-${samplingMonth}-${samplingDate}`

    let body = [data.point_no, data.description, samplingDateData, data.carbon_dioxide, data.pm10, data.humidity]
    dataBody.push(body)
  })
  newHeightOfY = heightOfY + Number(data.length) * 20
  autoTable(pdfDoc, {
    head: [headers],
    body:dataBody,
    startY: heightOfY
  })
  let dataNo:number = 0
  data.forEach(data => {
    dataNo = dataNo + 1
    image = fs.readFileSync(`./public/treatedPhoto/${data.processed_photo}`,'base64')
    if(dataNo%2 === 0) {
        pdfDoc.text(`Point: ${data.point_no}`, 70, newHeightOfY - 10);
        pdfDoc.addImage(image,'JPEG',70,newHeightOfY ,50,50)
        newHeightOfY = newHeightOfY + 80
    } else {
        pdfDoc.text(`Point: ${data.point_no}`, 10, newHeightOfY);
        newHeightOfY = newHeightOfY + 10
        pdfDoc.addImage(image,'JPEG',10,newHeightOfY,50,50)
    }
  })
  pdfDoc.save(`./public/document/pdf/${data[0].id}-${data[0].location}.pdf`);
}

export const exportDocx = (data:any[]) => {
  let wtDate = new Date(data[0].walkthrough_date).getDate()
  wtDate < 10? wtDate = 0+wtDate:wtDate
  let wtMonth = new Date(data[0].walkthrough_date).getMonth()+1
  wtMonth < 10? wtMonth = 0+wtMonth:wtMonth
  let wtYear = new Date(data[0].walkthrough_date).getFullYear()
  let wtDateData = `${wtYear}-${wtMonth}-${wtDate}`

  let startDate = new Date(data[0].sampling_start_date).getDate()
  startDate < 10? startDate = 0+startDate:startDate
  let startMonth = new Date(data[0].sampling_start_date).getMonth()+1
  startMonth < 10? startMonth = 0+startMonth:startMonth
  let startYear = new Date(data[0].sampling_start_date).getFullYear()
  let startDateData = `${startYear}-${startMonth}-${startDate}`

  let endDate = new Date(data[0].sampling_end_date).getDate()
  endDate < 10? endDate = 0+endDate:endDate
  let endMonth = new Date(data[0].sampling_end_date).getMonth()+1
  endMonth < 10? endMonth = 0+endMonth:endMonth
  let endYear = new Date(data[0].sampling_end_date).getFullYear()
  let endDateData = `${endYear}-${endMonth}-${endDate}`

  let co2EquipmentList:any = []
  let pm10EquipmentList:any = []
  let rhEquipmentList:any = []
  data.forEach(data => {
    co2EquipmentList.push(data.co2Equipment)
    pm10EquipmentList.push(data.pm10Equipment)
    rhEquipmentList.push(data.rhEquipment)
  })
  let newco2EquipmentList = [...new Set(co2EquipmentList)]
  let newpm10EquipmentList = [...new Set(pm10EquipmentList)]
  let newrhEquipmentList = [...new Set(rhEquipmentList)]

  const headers = ['Point No.', 'Description','Sampling Date', 'CO2', 'PM10', 'Humidity']
  const headerRow = new TableRow({
      children: headers.map((cellText:any) => {
      return new TableCell({
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: cellText,
                bold: true,
                color: "FFFFFF",
            }),
            ],
            alignment: AlignmentType.CENTER,
          }),
        ],
        shading: {
            fill: "4472C4",
        },
        verticalAlign: VerticalAlign.CENTER,
      });
    }),
  });

  let body:any[] = []
  data.forEach(data => {
    let samplingDate = new Date(data.sampling_date).getDate()
    samplingDate < 10? samplingDate = 0+samplingDate:samplingDate
    let samplingMonth = new Date(data.sampling_date).getMonth()+1
    samplingMonth < 10? samplingMonth = 0+samplingMonth:samplingMonth
    let samplingYear = new Date(data.sampling_date).getFullYear()
    let samplingDateData = `${samplingYear}-${samplingMonth}-${samplingDate}`

    body.push([data.point_no, data.description, samplingDateData, data.carbon_dioxide.toString(), data.pm10.toString(), data.humidity.toString()])
  })

  const dataRows = body.map((row) => {
    return new TableRow({
      children: row.map((cellText:any) => {
        return new TableCell({
          children: [
            new Paragraph({
              text: cellText,
              alignment: AlignmentType.CENTER,
            }),
          ],
          verticalAlign: VerticalAlign.CENTER,
        });
      }),
    });
  });
  const tableRows = new Table({rows:[headerRow,...dataRows]});
//   let photoContent = []
let photoBody:any[] = []
data.forEach(data => {
  let photo = new ImageRun({
    type: 'jpg',
    data: fs.readFileSync(`./public/treatedPhoto/${data.processed_photo}`),
    transformation: {
      width: 200,
      height: 200,
    }
  })
  photoBody.push([data.point_no,photo])
})

const photoRows = photoBody.map((row) => {
  return new TableRow({
    children: row.map((cellText:any) => {
      if(typeof(cellText) === 'string'){
        return new TableCell({
          children: [
            new Paragraph({
              text: `Point ${cellText}`,
              alignment: AlignmentType.CENTER
            }),
          ],
          verticalAlign: VerticalAlign.CENTER,
        });
      } else {
        return new TableCell({
          children: [
            new Paragraph({
              children: [cellText]
            }),
          ],
          verticalAlign: VerticalAlign.CENTER,
        });
      }
    }),
  });
});
const photoTableRows = new Table({rows:[...photoRows]});

  let doc = new Document({
    sections: [
        {
            properties: {},
            children: [
                new Paragraph({
                    children: [
                        new TextRun({
                          text: `Report (For id:${data[0].id})`,
                          bold: true,
                          }),
                    ],
                }),
                new Paragraph({
                  text: `Client Name: ${data[0].company_name}`,
                }),
                new Paragraph({
                  text:`Client Info:`
                }),
                new Paragraph({
                  text: `Client Address: ${data[0].address}`
                }), 
                new Paragraph({
                  text:` Client Contact Name: ${data[0].contact}`
                }), 
                new Paragraph({
                  text:` Client Photo No.:${data[0].phone_no}`
                }), 
                new Paragraph({
                  text:` Client E-mail:${data[0].email}`
                }), 
                new Paragraph({
                  text:`Sampling Location: ${data[0].location}`
                }), 
                new Paragraph({
                  text:`Walkthrough Date: ${wtDateData}`
                }), 
                new Paragraph({
                  text:`Sampling Period: ${startDateData} - ${endDateData}`
                }), 
                new Paragraph({
                  text:`Total Sampling Point: ${data[0].no_of_sampling_point}`
                }), 
                new Paragraph({
                  text:`CO2 Equipment List: ${newco2EquipmentList}`
                }), 
                new Paragraph({
                  text:`PM10 Equipment List: ${newpm10EquipmentList}`
                }), 
                new Paragraph({
                  text:`Humidity Equipment List: ${newrhEquipmentList}`
                }), 
                new Paragraph({text:'Result Table'}),
                tableRows,
                new Paragraph({
                }), 
                photoTableRows
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