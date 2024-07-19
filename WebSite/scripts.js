const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const chatContainer = document.querySelector(".chat-container");
const deleteButton = document.querySelector("#delete-btn");

const createElement = (html, className) => {
    const chatDiv = document.createElement("div"); 
    chatDiv.classList.add("chat", className);
    chatDiv.innerHTML = html;
    return chatDiv;
};

const getChatResponse = (incomingChatDiv, userInput) => {
    fetch('http://127.0.0.1:5000/run', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ input: userInput })
    })
    .then(response => response.json())
    .then(data => {
        // Yanıtı kullanarak UI güncelleme
        const responseHtml = `<p>${data.output}</p>`;
        incomingChatDiv.querySelector(".chat-details").insertAdjacentHTML('beforeend', responseHtml);
        incomingChatDiv.querySelector(".typing-animation").remove(); // Typing animasyonunu kaldır
    })
    .catch(error => {
        console.error('Hata:', error);
    });
};

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
        </div>
    `;
    
    const incomingChatDiv = createElement(html, "incoming");
    chatContainer.appendChild(incomingChatDiv);
    return incomingChatDiv; // `incomingChatDiv`'i döndür
};

const handleOutgoingChat = () => {
    const userText = chatInput.value.trim();
    if (userText) {
        const html = `<div class="chat-content">
                        <div class="chat-details">
                            <img src="images/User.jpg" alt="user_img">
                            <p>${userText}</p>
                        </div>
                      </div>`;
        
        const outgoingChatDiv = createElement(html, "outgoing");
        chatContainer.appendChild(outgoingChatDiv);
        
        chatInput.value = ""; // Clear the input after sending
        const incomingChatDiv = showTypingAnimation(); // Show typing animation and get reference
        setTimeout(() => getChatResponse(incomingChatDiv, userText), 1000); // Wait for typing animation
    }
};

// Enter tuşuna basıldığında mesaj gönderme
chatInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault(); // Prevent default behavior (i.e., adding a new line)
        handleOutgoingChat();
    }
});

sendButton.addEventListener("click", handleOutgoingChat);

