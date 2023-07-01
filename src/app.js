const assistantIP = "http://127.0.0.1:4999/postrequest/"; // The location for the Assistant's server.

window.addEventListener("resize", () => {    
    let newHeight = document.documentElement.clientHeight;

    document.getElementById("chat").style.maxHeight = (newHeight - 41.62) + "px";
})

function addMessage(str) {
    let chatbox = document.getElementById("chat");

    let tempElement = document.createElement("p");
    tempElement.innerHTML = str;
    tempElement.className = "message";
    chatbox.insertAdjacentElement("beforeend", tempElement);
}

async function assistantCall(str) {

    // This fixes the server not handling / due to it being a web address based system.
    str = str.replace("/", "\\");

    if (str == '') return;

    document.getElementById("textbox").value = '';

    addMessage("👤 You: " + str + "\n");    

    const reply = await fetch(assistantIP + str).catch(e => {
        alert("I'm sorry, but I'm having some issues accessing my AI features. Please try again later.")
        console.error(e);
        
        return;
    })
    const json = await reply.json();

    if (json["val"]) {
        addMessage("🤖 Fiosa: " + json["val"] + "\n");
    } else console.warn("Warning: Assistant has not provided a message -- likely due to wrong reply format.");
    
    if (json["commandExecution"]) {
        addMessage("🕹️ Fiosa is executing the command `" + json["commandExecution"] + "`");
        console.info("Assistant has provided a command @ reply.commandExecution");
    }
}

function processCommand() {
    let textArea = document.getElementById("textbox");
  
    assistantCall(textArea.value);
}