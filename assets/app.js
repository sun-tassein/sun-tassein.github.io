let selectedFile;//input file je polje za putanju dodeljujemo selectedFile
document.getElementById("input").addEventListener("change", (event) => {selectedFile = event.target.files[0];});

document.getElementById("button").addEventListener("click", () => {
  if (selectedFile) {
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event) => {
      let data = event.target.result;
      let workbook = XLSX.read(data, { type: "binary" });
      let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets["Sheet1"]); //sheet]);
      console.log(rowObject);
      document.getElementById("jsondata").innerHTML = JSON.stringify(rowObject,undefined,4);
    };
  }
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err))
  })
}
