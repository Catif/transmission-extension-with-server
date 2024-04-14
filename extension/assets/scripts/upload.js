// ===--- Upload Logs ---===
const logsEl = document.querySelector(".logs");
const logs = [];

function refreshLogs() {
  logsEl.innerHTML = "";
  showLogs();
  logsEl.scrollTop = logsEl.scrollHeight;
}

function showLogs() {
  for (let log of logs) {
    const logEl = document.createElement("div");
    logEl.classList.add("log");
    logEl.style.color = log.color;
    logEl.innerHTML = `
      <div class="log__date">${log.date.toLocaleString()}</div>
      | 
      <div class="log__message">${log.message}</div>
    `;
    logsEl.appendChild(logEl);
  }
}

function addLog(log, color = "white") {
  logs.push({
    message: log,
    date: new Date(),
    color: color,
  });
  refreshLogs();
}

// ===--- Upload location ---===
const inputLocation = document.querySelector('input[id="location"]');
let urlServer = "http://localhost:9080/upload";

if (inputLocation) {
  chrome.storage.local.get(["urlServer"], (result) => {
    if (result.urlServer) {
      inputLocation.value = result.urlServer;
      urlServer = result.urlServer;
    } else {
      inputLocation.value = urlServer;
    }

    addLog(`Server URL loaded: ${urlServer}`);
  });
}

inputLocation.addEventListener("change", async (event) => {
  urlServer = event.target.value;
  chrome.storage.local.set({ urlServer: urlServer });
  addLog(`Server URL updated to ${urlServer}`);
});

// ===--- Upload files ---===
const inputFileMovie = document.querySelector('input[id="movie"]');
const labelMovie = document.querySelector('label[for="movie"]');
const inputFileSerie = document.querySelector('input[id="serie"]');
const labelSerie = document.querySelector('label[for="serie"]');

const inputFiles = [
  [inputFileMovie, "movie"],
  [inputFileSerie, "serie"],
];
const labels = [
  [labelMovie, "movie"],
  [labelSerie, "serie"],
];

for (let input of inputFiles) {
  input[0].addEventListener("change", async (event) => {
    const files = event.target.files;
    uploadFiles(files, input[1]);
  });
}

for (let label of labels) {
  label[0].addEventListener("dragenter", (event) => {
    event.preventDefault();
    event.stopPropagation();
  });

  label[0].addEventListener("dragover", (event) => {
    event.preventDefault();
    event.stopPropagation();
  });

  label[0].addEventListener("drop", async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer.files;
    uploadFiles(files, label[1]);
  });
}

function uploadFiles(files, destination) {
  if (files.length > 0) {
    for (let file of files) {
      uploadFile(file, destination);
    }
  }
}

function uploadFile(file, destination) {
  const formData = new FormData();
  formData.append("torrent", file);
  formData.append("destination", destination);

  addLog(`Uploading ${file.name} to ${destination}...`, "blue");

  fetch(urlServer, {
    method: "POST",
    body: formData,
    mode: "cors",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      addLog(`Success uploading ${file.name} to ${destination}`, "green");
    })
    .catch((error) => {
      addLog(`Error uploading ${file.name} to ${destination}`, "red");
      console.error("Error:", error);
    });
}
