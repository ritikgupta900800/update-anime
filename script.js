document.getElementById('uploadForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const response = await fetch('/upload', {
    method: 'POST',
    body: formData
  });
  const data = await response.json();
  alert(data.message);
  window.location.href = data.url; // हैश-बेस्ड URL पर रीडायरेक्ट
});

// हैश चेंज पर इमेज लोड करें (हैश का उपयोग)
window.addEventListener('hashchange', loadImage);
function loadImage() {
  const hash = window.location.hash.substring(1); // #image-id से ID निकालें
  if (hash) {
    const imgPath = `/uploads/${hash}.jpg`; // मान लें एक्सटेंशन jpg (आप बदल सकते हैं)
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = `
      <img src="${imgPath}" alt="वॉलपेपर" style="max-width: 100%;">
      <a href="${imgPath}" download>डाउनलोड करें</a>
    `;
  }
}

// इनिशियल लोड
loadImage();
