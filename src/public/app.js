async function loadInfo() {
  const res = await fetch("/api/info");
  const data = await res.json();

  document.getElementById("appTitle").textContent = data.appName;
  document.getElementById("env").textContent = data.env;
  document.getElementById("version").textContent = data.version;
  document.getElementById("sha").textContent = data.gitSha;
  document.getElementById("hostname").textContent = data.hostname;
  document.getElementById("startedAt").textContent = data.startedAt;
  document.getElementById("now").textContent = data.now;
}

document.getElementById("refreshBtn").addEventListener("click", loadInfo);

loadInfo();
setInterval(loadInfo, 15000);
