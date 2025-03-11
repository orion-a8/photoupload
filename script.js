 <script>
        const UPLOAD_URL = "https://script.google.com/macros/s/AKfycbzt7NrULdouo_JgmJaNCRbdzFFXQsBK-flVm5DIZu7sLt7lUJqlY_jf-dccvWQkGws96A/exec";  // Google Apps Script URL यहाँ डालें

        function uploadImage() {
            const fileInput = document.getElementById("selfie");
            const file = fileInput.files[0];

            if (!file) {
                alert("कृपया पहले एक फ़ोटो चुनें!");
                return;
            }

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                const base64String = reader.result.split(",")[1];

                const formData = new URLSearchParams();
                formData.append("file", base64String);
                formData.append("filename", file.name);
                formData.append("mimetype", file.type);

                fetch(UPLOAD_URL, {
                    method: "POST",
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    if (data.fileId) {
                        document.getElementById("status").innerHTML = `✅ अपलोड सफल! <br> <a href="${data.url}" target="_blank">फाइल देखें</a>`;
                    } else {
                        document.getElementById("status").innerText = "❌ अपलोड विफल!";
                    }
                })
                .catch(error => console.error("Error uploading file", error));
            };
        }
    </script>
