const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const chatContainer = document.querySelector(".chat-container");

const createElement = (html, className) => {
    const chatDiv = document.createElement("div"); // Create a div element
    chatDiv.classList.add("chat", className);
    chatDiv.innerHTML = html;
    return chatDiv;
};

const getChatResponse = () =>{}

const showTypingAnimation = () => {

    const html = `
        <div class="chat-content">
            <div class="chat-details">
                <img src="images/chatgpt-logo.jpg" alt="user_img">
                <div class="typing-animation">
                    <div class="typing-dot" style="--delay: 0.2s"></div>
                    <div class="typing-dot" style="--delay: 0.3s"></div>
                    <div class="typing-dot" style="--delay: 0.4s"></div>
                </div>
            </div>
            <span class="material-symbols-rounded">content_copy</span>
        </div>
    `;

    const outgoingChatDiv = createElement(html, "incoming"); // Corrected spelling
    chatContainer.appendChild(outgoingChatDiv);
    getChatResponse()
}

const handleOutgoingChat = () => {
    const userText = chatInput.value.trim(); // Get chat input and remove extra spaces
    console.log(userText);
    if (userText) { // Ensure there's text to send
        const html = `<div class="chat-content">
                        <div class="chat-details">
                            <img src="images/User.jpg" alt="user_img">
                            <p>${userText}</p>
                        </div>
                      </div>`;
        
        const outgoingChatDiv = createElement(html, "outgoing"); // Corrected spelling
        chatContainer.appendChild(outgoingChatDiv);
        
        chatInput.value = ""; // Clear the input after sending
        setTimeout(showTypingAnimation,500)
    }
};

chatInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevents the newline in textarea
        handleOutgoingChat(); // Call the function to send the message
    }
});

sendButton.addEventListener("click", handleOutgoingChat);
