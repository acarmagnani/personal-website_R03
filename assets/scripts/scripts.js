document.addEventListener("DOMContentLoaded", function () {
    // COMMON: Load header, footer, and back-to-top components
    fetchAndInsert('/common/header.html', 'Header', startTypewriterAnimation);
    fetchAndInsert('/common/footer.html', 'Footer');
    fetchAndInsert('/common/backtotop.html', 'BackToTop');
});

// Function to fetch and insert HTML into the target element
function fetchAndInsert(url, targetId, callback) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            const targetElement = document.getElementById(targetId);
            const div = document.createElement('div');
            div.innerHTML = data;
            targetElement.appendChild(div.firstChild); // Append fetched content
            if (callback) {
                callback(); // Trigger callback after insertion
            }
        });
}

// Function to start typewriter animation
function startTypewriterAnimation() {
    const firstPair = [
        { element: document.getElementById("typewriter-1"), text: "NTONIO" },
        { element: document.getElementById("typewriter-3"), text: "ARMAGNANI" }
    ];

    const secondPair = [
        { element: document.getElementById("typewriter-2"), text: "RCHITECTURE &" },
        { element: document.getElementById("typewriter-4"), text: "OMPUTATION" }
    ];

    const typingSpeed = 75; // Speed for typing in ms
    const deletingSpeed = 75; // Speed for deleting in ms
    const delayAfterTyping = 1000; // Delay after typing in ms
    const delayAfterDeleting = 500; // Delay after deleting in ms

    function typeText(elements, callback) {
        let indices = elements.map(() => 0); // Start indices for all elements
        function type() {
            let isTyping = false;
            elements.forEach((item, i) => {
                if (indices[i] < item.text.length) {
                    item.element.textContent = item.text.slice(0, indices[i] + 1);
                    indices[i]++;
                    isTyping = true;
                }
            });
            if (isTyping) {
                setTimeout(type, typingSpeed);
            } else if (callback) {
                setTimeout(callback, delayAfterTyping);
            }
        }
        type();
    }

    function deleteText(elements, callback) {
        let indices = elements.map((item) => item.text.length); // Start indices for all elements
        function deleteChar() {
            let isDeleting = false;
            elements.forEach((item, i) => {
                if (indices[i] > 0) {
                    item.element.textContent = item.element.textContent.slice(0, -1);
                    indices[i]--;
                    isDeleting = true;
                }
            });
            if (isDeleting) {
                setTimeout(deleteChar, deletingSpeed);
            } else if (callback) {
                setTimeout(callback, delayAfterDeleting);
            }
        }
        deleteChar();
    }

    function startAnimation() {
        typeText(firstPair, () => {
            deleteText(firstPair, () => {
                firstPair.forEach(item => item.element.style.visibility = "hidden");
                secondPair.forEach(item => item.element.style.visibility = "visible");

                typeText(secondPair, () => {
                    deleteText(secondPair, () => {
                        secondPair.forEach(item => item.element.style.visibility = "hidden");
                        firstPair.forEach(item => item.element.style.visibility = "visible");
                        startAnimation(); // Restart the sequence
                    });
                });
            });
        });
    }

    startAnimation();
}
