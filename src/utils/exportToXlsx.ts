import * as xlsx from "xlsx"

export function exportToExcel(data: Array<any>, name?: string) {
  const wb = xlsx.utils.book_new()
  const ws = xlsx.utils.json_to_sheet(data)
  xlsx.utils.book_append_sheet(wb, ws, "Planilha1")
  const wbout = xlsx.write(wb, { bookType: "xlsx", type: "array" })
  const blob = new Blob([wbout], { type: "application/octet-stream" })
  const fileName = `${name}.xlsx` ?? "output.xlsx"

  const url = window.URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = fileName
  document.body.appendChild(a)
  a.click()
  window.URL.revokeObjectURL(url)
  document.body.removeChild(a)
}
