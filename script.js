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
        createCard.setAttribute("data-index", index); // Set the data-index attribute
        createCard.innerHTML = `
            <img class="book_image" src="./Assets/Books/Book Cover Not Available.png" alt="Book Picture">
            <div class="book_details flex">
                <div class="book_first_section flex">
                    <div class="book_info">
                        <h3 class="book_title">${book.title}</h3>
                        <h4 class="book_description book_author">Author: ${book.author}</h4>
                        <h4 class="book_description book_pages">${book.pages} Pages</h4>
                    </div>
                    <button class="button remove_book_button" >Remove</button>
                </div>
                <div class="book_status flex">
                    <h4 class="book_description book_status status_title">Status:</h4>
                    <div class="book_status_change flex">
                        <select name="book_status_option" class="book_status_selector" id="book_status_option${index}">
                            <option value="reading">Reading</option>
                            <option value="plan_to_read">Plan to Read</option>
                            <option value="read">Read</option>
                        </select>
                        <button class="button update_button">Update</button>
                    </div>
                </div>
            </div>
        `;

    const bookCurrentStatus = createCard.querySelector(`#book_status_option${index}`);
    console.log("testi " + book.status);

    checkCardStatus(createCard, index, book.status);
    addRemoveButtonListener(createCard);
    changeCardStatusListener(createCard, index);

    console.log("New Book: " + book.title + ", # " + index);
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
        console.log(index)
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
            console.log("Status changed to Reading");
            readingSection.appendChild(card);
            break;
        case "plan_to_read":
            console.log("Status changed to Plan to Read");
            planToReadSection.appendChild(card);
            break;
        case "read":
            console.log("Status changed to Read");
            readSection.appendChild(card);
            break;
    }
}