//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(url) {
    return new Promise ((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("Image download failed"));
    });
}

function downloadImages() {
    output.innerHTML = "<p>Loading images, please wait...</p>";

    const promises = images.map(imgObj => downloadImage(imgObj.url));
    Promise.all(promises)
        .then((images) => {
			output.innerHTML = "";
            images.forEach((img) => output.appendChild(img));
        })
        .catch((err) => {
            error.innerText = err.message;
        })
}

btn.addEventListener("click", downloadImages);