let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
    window.speechSynthesis.cancel();  // Stop any ongoing speech
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "hi-GB";
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Sir how can i help you ");
    } else if (hours >= 12 && hours < 16) {
        speak("Good afternoon Sir");
    } else {
        speak("Good Evening Sir");
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector(".menu-button");
    const dropdown = document.querySelector(".dropdown");
    const submenuSections = document.querySelectorAll(".dropdown-section");

    // Toggle the main dropdown menu
    menuButton.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent closing dropdown when clicking the menu button
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    });

    // Toggle submenus inside the dropdown sections
    submenuSections.forEach(section => {
        section.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent closing dropdown when clicking inside a section
            const submenu = section.querySelector(".submenu");

            // Close all other submenus
            document.querySelectorAll(".submenu").forEach(s => {
                if (s !== submenu) s.style.display = "none";
            });

            // Toggle the clicked submenu
            submenu.style.display = submenu.style.display === "block" ? "none" : "block";
        });
    });

    // Close the dropdown and all submenus if clicking outside
    document.addEventListener("click", (e) => {
        if (!menuButton.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.style.display = "none"; // Close main dropdown
            document.querySelectorAll(".submenu").forEach(s => s.style.display = "none"); // Close all submenus
        }
    });
});

// Uncomment to greet on load
window.addEventListener('load', () => {
    wishMe();
});

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
    recognition.start();
    voice.style.display = "block";
    btn.style.display = "none";
});


function takeCommand(message) {
    voice.style.display = "none";
    btn.style.display = "flex";


    
    
    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello sir, what can I help you with?");
    } else if (message.includes("who are you")) {
        speak("I am VTU  virtual assistant, created by bassu.");
    } else if (message.includes("how are you")) {
        speak(" i am fine what how can i help u .");
    } else if (message.includes("are you human being?")) {
        speak("No i am not a hument bening i am just vartuall asistant for student studys , created by bassu.");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://youtube.com/", "_blank");
    } else if (message.includes("open google")) {
        speak("Opening Google...");
        window.open("https://google.com/", "_blank");
    } else if (message.includes("open facebook")) {
        speak("Opening Facebook...");
        window.open("https://facebook.com/", "_blank");
    } else if (message.includes("open instagram")) {
        speak("Opening Instagram...");
        window.open("https://instagram.com/", "_blank");
    } else if (message.includes("open calculator")) {
        speak("Opening calculator...");
        window.open("calculator://");
    } else if (message.includes("open whatsapp")) {
        speak("Opening WhatsApp...");
        window.open("whatsapp://");
    } else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak(time);
    } else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
        speak(date);
    } else {
        let finalText = "This is what I found on the internet regarding " + message.replace("shipra", "") || message.replace("shifra", "");
        speak(finalText);
        window.open(`https://www.google.com/search?q=${message.replace("shipra", "")}`, "_blank");
    }
    
    
}
