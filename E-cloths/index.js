// DOM Elements
const dropArea = document.getElementById("dropArea");
const imageInput = document.getElementById("imageInput");
const uploadPlaceholder = document.getElementById("uploadPlaceholder");
const previewImage = document.getElementById("previewImage");
const generateBtn = document.getElementById("generateBtn");

const emptyState = document.getElementById("emptyState");
const loadingState = document.getElementById("loadingState");
const resultView = document.getElementById("resultView");
const resultImage = document.getElementById("resultImage");
const resultTitle = document.getElementById("resultTitle");
const resultDesc = document.getElementById("resultDesc");
const genderSelect = document.getElementById("genderSelect");

let selectedFile = null;

// Mock database: Demonstration ke liye images & titles
const sampleResults = {
  // shaadi: {
  //   men: {
  //     title: "Royal Embroidered Sherwani",
  //     desc: "Cream and gold silk sherwani suited for weddings and receptions.",
  //     img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80",
  //   },
  //   women: {
  //     title: "Designer Bridal Lehenga",
  //     desc: "Handcrafted crimson red velvet lehenga with zardozi embroidery.",
  //     img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80",
  //   }
  // },
shaadi: {
  men: {
    title: "Royal Embroidered Sherwani",
    desc: "Cream silk designer sherwani perfectly styled for weddings.",
    img: "https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?w=600&auto=format&fit=crop&q=80"
  },
  women: {
    title: "Designer Bridal Lehenga",
    desc: "Crimson red hand-embroidered velvet lehenga set.",
    img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80"
  }
},
  winter: {
    men: {
      title: "Charcoal Overcoat & Turtleneck",
      desc: "Tailored wool blend trench coat for sleek winter layering.",
      img: "https://images.unsplash.com/photo-1544441893-675973e31985?w=600&auto=format&fit=crop&q=80",
    },
    women: {
      title: "Beige Cashmere Trench & Boots",
      desc: "Minimalist warm wool long coat with matching winter scarf.",
      img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80",
    }
  },
  party: {
    men: {
      title: "Midnight Velvet Tuxedo",
      desc: "Sharp modern slim-fit blazer tailored for evening clubwear.",
      img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80",
    },
    women: {
      title: "Satin Evening Gown",
      desc: "Emerald green side-slit cocktail party dress.",
      img: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&auto=format&fit=crop&q=80",
    }
  },
  summer: {
    men: {
      title: "Breeze Linen Shirt & Chinos",
      desc: "Lightweight breathable cotton shirt for sunny beach days.",
      img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80",
    },
    women: {
      title: "Floral Summer Sundress",
      desc: "Airy pastel sundress perfect for vacation and day outs.",
      img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&auto=format&fit=crop&q=80",
    }
  }
};

// 1. File Upload Interaction
dropArea.addEventListener("click", () => imageInput.click());

imageInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    handleFile(file);
  }
});

// Drag & Drop Support
dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.style.borderColor = "var(--primary)";
});

dropArea.addEventListener("dragleave", () => {
  dropArea.style.borderColor = "var(--border)";
});

dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith("image/")) {
    handleFile(file);
  }
});

function handleFile(file) {
  selectedFile = file;
  const reader = new FileReader();
  reader.onload = (event) => {
    previewImage.src = event.target.result;
    previewImage.classList.remove("hidden");
    uploadPlaceholder.classList.add("hidden");
    generateBtn.removeAttribute("disabled");
  };
  reader.readAsDataURL(file);
}
// 2. Generate Outfit Logic
// generateBtn.addEventListener("click", () => {
//   if (!selectedFile) return;
//   const occasion = document.querySelector('input[name="occasion"]:checked').value;
//   const gender = genderSelect.value;
//   // UI state change to loading
//   emptyState.classList.add("hidden");
//   resultView.classList.add("hidden");
//   loadingState.classList.remove("hidden");
//   generateBtn.disabled = true;

generateBtn.addEventListener("click", () => {
  if (!selectedFile) return;

  // Selected Occasion (shaadi, winter, etc.)
  const occasion = document.querySelector('input[name="occasion"]:checked').value;

  // Selected Gender (men ya women)
  const gender = document.querySelector('input[name="gender"]:checked').value;

  console.log("Selected Occasion:", occasion);
  console.log("Selected Gender:", gender); // Check karein console me "men" print hoga

  // UI state change to loading
  emptyState.classList.add("hidden");
  resultView.classList.add("hidden");
  loadingState.classList.remove("hidden");
  generateBtn.disabled = true;

  setTimeout(() => {
    // Exact match nikalna
    const outcome = sampleResults[occasion][gender];

    resultImage.src = outcome.img;
    resultTitle.textContent = outcome.title;
    resultDesc.textContent = outcome.desc;

    loadingState.classList.add("hidden");
    resultView.classList.remove("hidden");
    generateBtn.disabled = false;
  }, 1500);
});


  /* =========================================================
     AGAR AAP BACKEND API USE KARENGE TOH AISE CALL HOGA:
     
     const formData = new FormData();
     formData.append("photo", selectedFile);
     formData.append("occasion", occasion);
     formData.append("gender", gender);

     fetch('/api/generate-outfit', {
       method: 'POST',
       body: formData
     })
     .then(res => res.json())
     .then(data => { ... })
  ========================================================== */

  // Simulation: 2 second baad output dikhayega
  setTimeout(() => {
    const outcome = sampleResults[occasion][gender];

    resultImage.src = outcome.img;
    resultTitle.textContent = outcome.title;
    resultDesc.textContent = outcome.desc;

    loadingState.classList.add("hidden");
    resultView.classList.remove("hidden");
    generateBtn.disabled = false;
  }, 2000);
