const addBookDialog = document.querySelector("dialog");
const addBookBtn = document.querySelector("#add_book_button");
const saveBookButton = document.querySelector("#save_new_book_button");

const bookTitle = document.querySelector("#book_title_input");
const bookAuthor = document.querySelector("#book_author_input");
const bookPages = document.querySelector("#book_pages_input");
const bookStatus = document.querySelector("#book_status_input");

const readingSection = document.querySelector(".reading_section");
const planToReadSection = document.querySelector(".plan_to_read_section");
const readSection = document.querySelector(".read_section");


// Add Book Buttons
addBookBtn.addEventListener("click", () => {
    addBookDialog.showModal();
})

addBookDialog.addEventListener("click", (e) => {
    const dialogDimensions = addBookDialog.getBoundingClientRect()
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      addBookDialog.close()
    }
})

saveBookButton.addEventListener("click", (e) => {
    addBookToLibrary();
    addBookDialog.close();
    e.preventDefault();

// DO NOT ADD ALL OF THE BOOKS AT THE SAME TIME ---FIX IT!
    myLibrary.forEach((book) => createCardBook(book));

})


//   Library Section

const myLibrary = [];

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function addBookToLibrary() {
    const newBook = new Book(
        `${bookTitle.value}`, 
        `${bookAuthor.value}`, 
        `${bookPages.value}`, 
        `${bookStatus.value}`);
    myLibrary.push(newBook)
    // clearCurrentInfo()
}

function clearCurrentInfo() {
    bookTitle.value = "";
    bookAuthor.value = "";
    bookPages.value = "10";
}

function createCardBook(book) {

    const createCard = document.createElement("article");
    createCard.classList.add("book_card", "flex");
    createCard.innerHTML  = `
        <img class="book_image" src="./Assets/Books/Book Cover Not Available.png" alt="Book Picture">
        <div class="book_details flex">
            <div class="book_first_section flex">
                <div class="book_info">
                    <h3 class="book_title">${book.title}</h3>
                    <h4 class="book_description book_author">Author: ${book.author}</h4>
                    <h4 class="book_description book_pages">${book.pages} Pages</h4>
                </div>
                <input type="submit" class="button remove_book_button" value="Remove">
            </div>
            <div class="book_status flex">
                <h4 class="book_description book_status status_title">Status:</h4>
                <div class="book_status_change flex">
                    <select name="book_status_option" class="book_status_selector" id="book_status_option">
                        <option value="Reading">Reading</option>
                        <option value="To_Read">Plan to Read</option>
                        <option value="Read">Read</option>
                    </select>
                    <input type="submit" value="Update" class="button update_button">
                </div>
            </div>
        </div>
    `;

    checkCardStatus(createCard);

    console.log("1213123")
    console.log(bookStatus.value)


}

function checkCardStatus(card) {

    if (bookStatus.value === "reading") {
        readingSection.appendChild(card)
        console.log("1")
    } else if (bookStatus.value === "plan to Read") {
        planToReadSection.appendChild(card)
        console.log("2")
    } else if (bookStatus.value === "read") {
        readSection.appendChild(card)
    } else {
        console.log("NOOOOOPE")
    }
}

