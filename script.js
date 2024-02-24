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

// Function to allow the user to close the Modal when clicking outside it.
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
    e.preventDefault();
    addBookDialog.close();
    createCardBook(addBookToLibrary());
    myLibrary.push(addBookToLibrary());
    clearCurrentInfo()
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

    return newBook
}

function clearCurrentInfo() {
    bookTitle.value = "";
    bookAuthor.value = "";
    bookPages.value = "10";
}

// Function to create the Book Card and add it to the DOM
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
                <button class="button remove_book_button" >Remove</button>
            </div>
            <div class="book_status flex">
                <h4 class="book_description book_status status_title">Status:</h4>
                <div class="book_status_change flex">
                    <select name="book_status_option" class="book_status_selector" id="book_status_option">
                        <option value="Reading">Reading</option>
                        <option value="To_Read">Plan to Read</option>
                        <option value="Read">Read</option>
                    </select>
                    <button class="button update_button">Update</button>
                </div>
            </div>
        </div>
    `;

    // Add event listener to remove button
    addRemoveButtonListener(createCard);

    checkCardStatus(createCard);

    return createCard;
}

// Function to assign the Book Card to the correct Section
function checkCardStatus(card) {

    if (bookStatus.value === "reading") {
        readingSection.appendChild(card)
    } else if (bookStatus.value === "plan_to_read") {
        planToReadSection.appendChild(card)
    } else if (bookStatus.value === "read") {
        readSection.appendChild(card)
    } else {
        console.log("checkCardStatus_ERROR")
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
    const index = Array.from(card.parentNode.children).indexOf(card);
    
    // Remove the card from the DOM
    card.remove();

    // Remove the corresponding book object from the myLibrary array
    myLibrary.splice(index, 1);
}



// Here's a breakdown of how it works:

// card.parentNode: This property retrieves the parent node of the card element in the DOM.

// children: The children property returns a live HTMLCollection of child elements of the specified parent element.

// Array.from(...): This converts the HTMLCollection (which is array-like but not a true array) into an array. This conversion allows us to use array methods like indexOf.

// indexOf(card): This method searches the array for the specified card element and returns its index within the array. If the element is not found, it returns -1.

// Putting it all together, Array.from(card.parentNode.children).indexOf(card) finds the index of the card element within its parent's children array. This index indicates the position of the card in the DOM relative to its siblings. This index is then used to locate and remove the corresponding book object from the myLibrary array.