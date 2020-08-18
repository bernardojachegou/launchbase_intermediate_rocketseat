const currentPage = location.pathname;
const menuItems = document.querySelectorAll("header .links a");
const formDelete = document.querySelector("#form-delete");

for (item of menuItems) {
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active");
    }
}

formDelete.addEventListener("submit", function () {
    const confirmation = confirm("Do you want to delete?")
    if (!confirmation) {
        event.preventDefault()
    }
})

function paginate(selectedPage, totalPages) {

    let totalPages = 20,
        selectedPage = 15,
        pages = []
    oldPage

    for (let currentPage = 0; currentPage <= totalPages; currentPage++) {

        const firstAndLastPage = currentPage == 1 || currentPage == totalPages
        const pagesAfterSelectedPage = currentPage <= selectedPage + 2
        const pagesBeforeSelectedPage = currentPage >= selectedPage - 2

        if (firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage) {
            pages.push(currentPage)

            if (oldPage && currentPage - oldPage > 2) {
                pages.push('...')
            }

            if (oldPage && currentPage - oldPage == 2) {
                pages.push(currentPage - 1)
            }

            oldPage = currentPage
        }
    }
    return pages
}

const pagination = document.querySelector(".pagination")
const page = +pagination.dataset.page;
const total = +pagination.dataset.total;
const pages = paginate(page, total);

let elements = ""

for (let page of pages) {
    elements += `<a href="#">${page}</a>`
}

pagination.innerHTML = elements;