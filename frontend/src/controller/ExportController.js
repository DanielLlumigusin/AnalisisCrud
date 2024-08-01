// src/controller/ExportController.js
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";

class ExportController {
  static async generatePDF(elementId) {
    const input = document.getElementById(elementId);
    const canvas = await html2canvas(input, { scale: 2 });  // Increase scale for better resolution
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('landscape', 'mm', 'a4');  // landscape orientation
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save("reportes.pdf");
  }

  static generateXLS(headers, data, filename = "reportes.xlsx") {
    const rows = data.map(item => [
      item.id_usuario,
      item.id_task,
      item.titulo,
      item.descripcion,
      item.fecha_inicio.slice(0, 10),
      item.fecha_final.slice(0, 10),
      item.status,
      item.username,
      item.password,
      item.nombre,
      item.apellido
    ]);

    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reportes");
    XLSX.writeFile(workbook, filename);
  }
}

export default ExportController;
