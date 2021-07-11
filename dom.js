const UNCOMPLETED_LIST_BOOKSHELF_ID = "incompleteBookshelfList";
const COMPLETED_LIST_BOOKSHELF_ID = "completeBookshelfList";
const BOOKSHELF_ITEMID = "itemId";

function makeBookhelf(title, author, year, isComplete){
    const textTitle = document.createElement("h3")
    textTitle.innerText = title

    const textAuthor = document.createElement("p")
    textAuthor.innerText = author

    const textYear = document.createElement("p")
    textYear.innerText = year

    const container = document.createElement("article")
    container.classList.add("book_item")
    container.append(textTitle, textAuthor, textYear)

    const containerStatus = document.createElement("action")
    containerStatus.classList.add("action")
    containerStatus.append(createButtonDone(isComplete), createButtonRemove())
    container.append(containerStatus)

    return container
}


function addBookshelf(){
    const unComplateBookshelfList = document.getElementById(UNCOMPLETED_LIST_BOOKSHELF_ID)
    const complateBookshelfList = document.getElementById(COMPLETED_LIST_BOOKSHELF_ID)
    const bookTitle = document.getElementById("inputBookTitle").value
    const bookAuthor = document.getElementById("inputBookAuthor").value
    const bookYear = document.getElementById("inputBookYear").value
    const bookComplete = document.getElementById("inputBookIsComplete").checked

    const bookshelf = makeBookhelf(bookTitle, bookAuthor, bookYear, bookComplete)
    const bookshelfObject = composeTodoObject(bookTitle, bookAuthor, bookYear, bookComplete)
    

    bookshelf[BOOKSHELF_ITEMID] = bookshelfObject.id
    bookshelfs.push(bookshelfObject)

    if(bookComplete){
        complateBookshelfList.append(bookshelf)
    } else {
        unComplateBookshelfList.append(bookshelf)
    }
    
    updateDataToStorage();
}

function refreshDataFromBookshelfs(){
    const unComplateBookshelfList = document.getElementById(UNCOMPLETED_LIST_BOOKSHELF_ID)
    const complateBookshelfList = document.getElementById(COMPLETED_LIST_BOOKSHELF_ID)

    for (let book of bookshelfs){
        const newBook = makeBookhelf(book.title, book.author, book.year, book.isCompleted)
        newBook[BOOKSHELF_ITEMID] = book.id

        if(book.isCompleted){
            complateBookshelfList.append(newBook)
        } else {
            unComplateBookshelfList.append(newBook)
        }
    }
}

function createButtonRemove(){
    return createButton("red", "Hapus buku", function(event){
        removeBook(event.target.parentElement.parentElement)
    })
}

function createButtonDone(isComplete){
     if(isComplete){
        return createButton("green", "Belum selesai dibaca", function(event){
            
        })
    } else {
        return createButton("green", "Selesai dibaca", function(event){
            
        })
    }
}

function createButton(buttonTypeClass, buttonValue, eventListener) {
    const button = document.createElement("button")
    button.classList.add(buttonTypeClass)
    button.innerHTML = buttonValue
    button.addEventListener("click", function (event) {
        eventListener(event)
        event.stopPropagation()
    })
    return button
}


function removeBook(taskElement){
    const bookPosition = findBookIndex(taskElement[BOOKSHELF_ITEMID])
    console.log(bookPosition)
    console.log(bookPosition)
    bookshelfs.splice(bookPosition, 1)

    taskElement.remove()
    updateDataToStorage()
}