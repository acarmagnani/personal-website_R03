document.addEventListener("DOMContentLoaded", function() {

    // COMMON
    fetchAndInsert('/common/header.html', 'Header');
    fetchAndInsert('/common/footer.html', 'Footer');
    fetchAndInsert('/common/backtotop.html', 'BackToTop');   
});

function fetchAndInsert(url, targetId, callback) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            const targetElement = document.getElementById(targetId);
            const div = document.createElement('div');
            div.innerHTML = data;
            // Append the first child of the new div (the root element of the fetched HTML) to the target element
            targetElement.appendChild(div.firstChild);
            // Call the callback function (if provided)
            if (callback) {
                callback();
            }
        });
}