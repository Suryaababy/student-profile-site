// JavaScript already included inside the HTML file
// If you want to extract it to a separate JS file, use the following:

const form = document.getElementById("studentForm");
const output = document.getElementById("output");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const address = document.getElementById("address").value;
  const selfie = document.getElementById("selfie").files[0];

  const reader = new FileReader();
  reader.onloadend = function () {
    const imageURL = selfie ? reader.result : generateFunnyAvatar();

    const profileHTML = `
      <div class="profile-card">
        <h2>${name}</h2>
        <p>वय: ${age}</p>
        <p>पत्ता: ${address}</p>
        <img src="${imageURL}" width="150" />
      </div>
    `;

    output.innerHTML = profileHTML;
    output.style.display = "block";
    document.getElementById("pdfBtn").style.display = "inline-block";
    document.getElementById("whatsappBtn").style.display = "inline-block";

    // Local storage save
    localStorage.setItem("studentProfile", profileHTML);
  };

  if (selfie) {
    reader.readAsDataURL(selfie);
  } else {
    reader.onloadend();
  }
});

// Load from local storage if available
window.addEventListener("DOMContentLoaded", () => {
  const savedProfile = localStorage.getItem("studentProfile");
  if (savedProfile) {
    output.innerHTML = savedProfile;
    output.style.display = "block";
    document.getElementById("pdfBtn").style.display = "inline-block";
    document.getElementById("whatsappBtn").style.display = "inline-block";
  }
});

function toggleTheme() {
  document.body.classList.toggle("dark");
  const themeButton = document.getElementById("themeToggle");
  themeButton.innerText = document.body.classList.contains("dark") ? "☀️ लाइट मोड" : "🌙 डार्क मोड";
}

function downloadPDF() {
  const element = document.getElementById("output");
  setTimeout(() => {
    const options = {
      margin: 0.3,
      filename: 'student-profile.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(element).set(options).save();
  }, 500);
}

function shareWhatsApp() {
  const text = "माझा प्रोफाईल पहा! \n" + document.getElementById("output").innerText;
  const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

function generateFunnyAvatar() {
  const avatars = [
    "https://api.dicebear.com/7.x/fun-emoji/svg",
    "https://api.dicebear.com/7.x/thumbs/svg",
    "https://api.dicebear.com/7.x/big-smile/svg"
  ];
  const randomIndex = Math.floor(Math.random() * avatars.length);
  return avatars[randomIndex];
}