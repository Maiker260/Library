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


// Show All books in the Array when the Webpage loads
document.addEventListener("DOMContentLoaded", () => {
    showAllCardsInArray();
})

// Add Book Buttons
addBookBtn.addEventListener("click", () => {
    addBookDialog.showModal();
})

// Function to allow the user to close the Modal when clicking outside it.
addBookDialog.addEventListener("click", (e) => {

    const dialogDimensions = addBookDialog.getBoundingClientRect();

    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      addBookDialog.close();
    }
})

// Functon to add a Event Listener to the new book save button
saveBookButton.addEventListener("click", (e) => {
    e.preventDefault();

    if (bookTitle.value === "" || bookAuthor.value === "") {

    } else {
        addBookDialog.close();
        addBookToLibrary();
        clearAllBooksOnScreen();
        showAllCardsInArray();
        clearCurrentInfo();
    }
})


//   Library Section

const myLibrary = [];

class Book {

    constructor(title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }

}

function addBookToLibrary() {

    const newBook = new Book(
        `${bookTitle.value}`, 
        `${bookAuthor.value}`, 
        `${bookPages.value}`, 
        `${bookStatus.value}`);

    myLibrary.push(newBook);
}

// Function to clear the dialog info
function clearCurrentInfo() {
    bookTitle.value = "";
    bookAuthor.value = "";
    bookPages.value = "10";
    book_status_input.value = "reading";
}

// Function to create the Book Card and add it to the DOM
function createCardBook(book, index) {
    const createCard = document.createElement("article");
    createCard.classList.add("book_card", "flex");
    createCard.setAttribute("data-index", index);
        
    // Create and append the img element
    const bookImage = document.createElement("img");
    bookImage.classList.add("book_image");
    bookImage.src = "./Assets/Books/Book Cover Not Available.png";
    bookImage.alt = "Book Picture";
    createCard.appendChild(bookImage);
    
    // Create and append the div with class "book_details"
    const bookDetails = document.createElement("div");
    bookDetails.classList.add("book_details", "flex");
    createCard.appendChild(bookDetails);
    
    // Create and append the div with class "book_first_section"
    const bookFirstSection = document.createElement("div");
    bookFirstSection.classList.add("book_first_section", "flex");
    bookDetails.appendChild(bookFirstSection);
    
    // Create and append the div with class "book_info"
    const bookInfo = document.createElement("div");
    bookInfo.classList.add("book_info");
    bookFirstSection.appendChild(bookInfo);
    
    // Create and append the h3 element for book title
    const bookTitle = document.createElement("h3");
    bookTitle.classList.add("book_title");
    bookTitle.textContent = book.title;
    bookInfo.appendChild(bookTitle);
    
    // Create and append the h4 element for book author
    const bookAuthor = document.createElement("h4");
    bookAuthor.classList.add("book_description", "book_author");
    bookAuthor.textContent = `Author: ${book.author}`;
    bookInfo.appendChild(bookAuthor);
    
    // Create and append the h4 element for book pages
    const bookPages = document.createElement("h4");
    bookPages.classList.add("book_description", "book_pages");
    bookPages.textContent = `${book.pages} Pages`;
    bookInfo.appendChild(bookPages);
    
    // Create and append the button element for removing book
    const removeButton = document.createElement("button");
    removeButton.classList.add("button", "remove_book_button");
    removeButton.textContent = "Remove";
    bookFirstSection.appendChild(removeButton);
    
    // Create and append the div with class "book_status"
    const bookStatus = document.createElement("div");
    bookStatus.classList.add("book_status", "flex");
    bookDetails.appendChild(bookStatus);
    
    // Create and append the h4 element for status title
    const statusTitle = document.createElement("h4");
    statusTitle.classList.add("book_description", "book_status", "status_title");
    statusTitle.textContent = "Status:";
    bookStatus.appendChild(statusTitle);
    
    // Create and append the div with class "book_status_change"
    const statusChange = document.createElement("div");
    statusChange.classList.add("book_status_change", "flex");
    bookStatus.appendChild(statusChange);
    
    // Create and append the select element for book status
    const statusSelector = document.createElement("select");
    statusSelector.classList.add("book_status_selector");
    statusSelector.name = "book_status_option";
    statusSelector.id = `book_status_option${index}`;
    statusChange.appendChild(statusSelector);
    
    // Add options to the select element
    const statuses = ["reading", "plan_to_read", "read"];
    statuses.forEach(status => {
        const option = document.createElement("option");
        option.value = status;
        option.textContent = status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ');
        statusSelector.appendChild(option);
    });
    
    // Create and append the button element for updating status
    const updateButton = document.createElement("button");
    updateButton.classList.add("button", "update_button");
    updateButton.textContent = "Update";
    statusChange.appendChild(updateButton);

    // Pass the book status to the checkCardStatus function
    checkCardStatus(createCard, index, book.status);
    addRemoveButtonListener(createCard);
    changeCardStatusListener(createCard, index);
}

// function to show all books in the myLibrary Array
function showAllCardsInArray() {
    for (i in myLibrary) {
        createCardBook(myLibrary[i], i)
    }
}

// Function to clear all books in the DOM
function clearAllBooksOnScreen() {
    const bookCards = document.querySelectorAll(".book_card")
    
    bookCards.forEach( book => {
        book.remove();
    });
}

// Function to assign the Book Card to the correct Section
function checkCardStatus(card, index, status) {

    const bookCurrentStatus = card.querySelector(`#book_status_option${index}`);

    switch (status) {
        case "reading":
            // console.log(bookStatus.value + " status")
            readingSection.appendChild(card);
            bookCurrentStatus.value = "reading";
            break;
        case "plan_to_read":
            // console.log(bookStatus.value + " status")
            planToReadSection.appendChild(card);
            bookCurrentStatus.value = "plan_to_read";
            break;
        case "read":
            // console.log(bookStatus.value + " status")
            readSection.appendChild(card);
            bookCurrentStatus.value = "read";
            break;
    }
}

// Function to add event listener to remove button
function addRemoveButtonListener(card) {
    const removeButton = card.querySelector(".remove_book_button");

    removeButton.addEventListener("click", () => {
        removeBookCard(card);
    });
}

// Function to remove the book card
function removeBookCard(card) {

    // Find the index of the card in the DOM
    const index = parseInt(card.getAttribute("data-index"));

    // Remove the corresponding book object from the myLibrary array
    myLibrary.splice(index, 1);

    // Update the DOM with the current Books in the Array
    clearAllBooksOnScreen();
    showAllCardsInArray();
}


// Function to add event listener to update button
function changeCardStatusListener(card, index) {
    const updateButton = card.querySelector(".update_button");

    updateButton.addEventListener("click", () => {
        modifyBookStatus(card, index);
    });
}

// Function to modify the section where the Card will be assign when the book status is change
function modifyBookStatus(card, index) {

    const bookCurrentStatus = card.querySelector(`#book_status_option${index}`).value;

    // Retrieve the corresponding book object from the myLibrary array using the provided index
    const book = myLibrary[index];
    
    // Modify the status property of the book object
    book.status = bookCurrentStatus;
  
    // Reassign the updated book object back to the myLibrary array
    myLibrary[index] = book;

    switch (bookCurrentStatus) {
        case "reading":
            readingSection.appendChild(card);
            break;
        case "plan_to_read":
            planToReadSection.appendChild(card);
            break;
        case "read":
            readSection.appendChild(card);
            break;
    }
}