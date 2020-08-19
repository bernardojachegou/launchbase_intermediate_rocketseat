const currentPage = location.pathname;
const menuItems = document.querySelectorAll("header .links a");
const formDelete = document.querySelector("#form-delete");

for (item of menuItems) {
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active");
    }
}

function handleDeleteConfirmation() {
    const confirmation = confirm("Do you want to delete?")
    if (!confirmation) {
        event.preventDefault()
    }
}

formDelete.addEventListener("click", handleDeleteConfirmation);