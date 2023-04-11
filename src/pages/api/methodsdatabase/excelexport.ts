import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import prisma from "~/utils/prismaInstance";
const ExcelJS = require('exceljs');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    await NextCors(req, res, {
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200,
    })
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Sistema Semear';
    workbook.lastModifiedBy = 'Her';
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.lastPrinted = new Date();
    workbook.properties.date1904 = true;

    workbook.views = [
      {
        x: 0, y: 0, width: 10000, height: 20000,
        firstSheet: 0, activeTab: 1, visibility: 'visible'
      }
    ];
    let financeiro = workbook.addWorksheet("Financeiro");
    const dataFinanceiro = await prisma.financeiro.findMany({})
    const alfabeto = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

    const cell = financeiro.getCell('C3')
    cell.value = new Date(1968, 5, 1);
    let indexAlph = 1

    dataFinanceiro.map((item, index) => {
      const cell = financeiro.getCell(`${alfabeto[indexAlph]}${indexAlph}`)
      console.log(`${alfabeto[indexAlph]}${index}`)
      cell.value = item.id
      indexAlph++
    })
    


    /*res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader("Content-Disposition", "attachment; filename=" + "ExportExcel.xlsx");
    workbook.xlsx.write(res)
      .then(function(data: any) {
        res.end();
        console.log('File write done........');
      }); //*/
}