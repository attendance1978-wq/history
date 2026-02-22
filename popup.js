const historyList = document.getElementById("historyList");
const searchInput = document.getElementById("search");

function loadHistory(searchText = "") {

    chrome.history.search({
        text: searchText,
        maxResults: 100,
        startTime: 0
    }, function(results) {

        historyList.innerHTML = "";

        results.forEach(item => {

            const li = document.createElement("li");
            li.className = "list-group-item";

            // favicon URL
            const favicon = `https://www.google.com/s2/favicons?sz=32&domain=${item.url}`;

            li.innerHTML = `
                <div class="d-flex align-items-center">

                    <img src="${favicon}"
                         width="16"
                         height="16"
                         class="me-2">

                    <div>

                        <div>
                            <a href="${item.url}" target="_blank">
                                ${item.title || "No Title"}
                            </a>
                        </div>

                        <div class="url">
                            ${item.url}
                        </div>

                    </div>

                </div>
            `;

            historyList.appendChild(li);

        });

    });

}

searchInput.addEventListener("input", () => {
    loadHistory(searchInput.value);
});

loadHistory();