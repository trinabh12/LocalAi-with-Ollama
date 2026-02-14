let currentModel = "";

window.onload = loadModels;

async function loadModels() {
    try {
        const res = await fetch("/api/models");
        const data = await res.json();
        const select = document.getElementById("model-select");

        if (data.models && data.models.length > 0) {
            select.innerHTML = data.models.map(m => `<option value="${m}">${m}</option>`).join('');
            setModel();
        } else {
            select.innerHTML = `<option>No models installed</option>`;
        }
    } catch (err) {
        console.error("Failed to fetch models:", err);
    }
}

async function setModel() {
    const select = document.getElementById("model-select");
    const selected = select.value;
    const badge = document.getElementById("active-model-name");

    if (!badge) return;

    badge.innerText = "Switching to " + selected + "...";
    badge.style.color = "#f59e0b";

    try {
        const res = await fetch("/api/set_model", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ model: selected })
        });
        const data = await res.json();

        currentModel = selected;
        badge.innerText = "Active: " + selected;
        badge.style.color = "#10b981";
    } catch (err) {
        badge.innerText = "Error setting model";
        badge.style.color = "#ef4444";
    }
}

async function sendMessage() {
    const input = document.getElementById("user-input");
    const btn = document.getElementById("send-btn");
    const typing = document.getElementById("typing-indicator");
    const message = input.value.trim();

    if (!message) return;

    appendMessage("user", message);
    input.value = "";
    input.disabled = true;
    btn.disabled = true;
    if (typing) typing.style.display = "block";

    try {
        const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: message })
        });

        const data = await res.json();
        appendMessage("bot", data.response, currentModel);
    } catch (error) {
        appendMessage("bot", "Error: The server is not responding.");
    } finally {
        input.disabled = false;
        btn.disabled = false;
        if (typing) typing.style.display = "none";
        input.focus();
    }
}

function appendMessage(sender, text, model = "") {
    const chatBox = document.getElementById("chat-box");
    const div = document.createElement("div");
    div.className = "message " + sender;
    div.innerText = text;

    if (sender === "bot" && model) {
        const footer = document.createElement("div");
        footer.className = "bot-footer";
        footer.innerText = "Model: " + model;
        div.appendChild(footer);
    }

    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function handleEnter(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}