/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

/*
// Add variables that store DOM elements you will need to reference and/or manipulate
*/
const studentListUl = document.querySelector('ul.student-list');
const studentList = studentListUl.children;
const page = document.querySelector('div.page');
const pageHeader = document.querySelector('div.page-header.cf');

/*
Build Search Box
*/
//create elements needed for searchbox
const searchBoxDiv = document.createElement('div');
const searchForm = document.createElement('form');
const searchInput = document.createElement('input');
const searchButton = document.createElement('button');
//add attributes
searchBoxDiv.className = "student-search";
searchInput.placeholder = "Search for students...";
searchButton.textContent = "Search";
//append searchBox
pageHeader
    .appendChild(searchBoxDiv)
    .appendChild(searchForm)
    .append(searchInput, searchButton);
/*
end Build Seach Box
*/

/*
add list-item to DOM
*/
const addLi = (parent, page) => {
    //build element
    let li = document.createElement('li');
    let a = document.createElement('a');
    // add attribute
    a.textContent = page;
    a.id = "page-" + page;

    // add a child and capture the node
    let liRef = parent.appendChild(li);
    // use added node to append another child
    liRef.appendChild(a)
}

/*
Show only student in page range page 1: 0-9 2: 10-19 ...etc
*/
const showPage = (list, page) => {

    hideAll();

    let pageStart = 10 * page - 10;
    let pageEnd = 10 * page;

    //ternary to test if pageEnd is greater than actually number of student
    pageEnd = (list.length > pageEnd)
        ? pageEnd
        : list.length;

    for (let i = pageStart; i < pageEnd; i += 1) {
        list[i].style.display = "block";
    }
}

/*
Hides all the students
*/
const hideAll = () => {
    //loop through all students and set display to none
    for (let i = 0; i < studentList.length; i += 1) {
        studentList[i].style.display = "none";
    }
}

/*
indicate current page
*/
const addActive = (page) => {

    //remove all active first
    removeActive();

    //add active class to selected id
    let id = document.querySelector(`#page-${page}`);
    id.className = "active";
}

const removeActive = () => {
    let links = document.querySelectorAll('div.pagination ul li a');
    for (let i = 0; i < links.length; i += 1) {
        links[i].className = "";
    }
}

const removeLinks = () => {
    let links = document.querySelectorAll('div.pagination ul li');

    for (let i = 0; i < links.length; i += 1) {
        links[i]
            .parentNode
            .removeChild(links[i]);
    }
}

/*
Pagination
*/
//create elements needed for pagination
const pagination = document.createElement('div');
const paginationUl = document.createElement('ul');
//add attributes
pagination.className = "pagination";
//append pagination
page.appendChild(pagination);
pagination.appendChild(paginationUl);

const addLinks = (list) => {
    const numberOfPages = Math.ceil(list.length / 10);

    for (let i = 1; i <= numberOfPages; i += 1) {
        addLi(paginationUl, i);
    }
}

/*
end Pagination
*/

paginationUl.addEventListener('click', (event) => {
    let pageId = parseInt(event.target.textContent);
    showPage(studentList, pageId);
    addActive(pageId);
});

searchForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    let keyword = evt
        .target
        .querySelector('input')
        .value;

    if (keyword === "") {
        renderList(studentList);
    } else {
        filterByKeyword(keyword);
    }
});

searchInput.addEventListener('keyup', (evt) => {
    evt.preventDefault();
    let keyword = evt.target.value;

    if (keyword === "") {
        renderList(studentList);
    } else {
        filterByKeyword(keyword);
    }
});

const filterByKeyword = (keyword) => {
    let newList = [];
    for (let i = 0; i < studentList.length; i += 1) {
        let studentName = studentList[i]
            .querySelector('div h3')
            .textContent;

        let studentEmail = studentList[i]
            .querySelector('div span.email')
            .textContent;
        if (studentName.search(keyword) !== -1 || studentEmail.search(keyword) !== -1) {
            newList.push(studentList[i]);
        }
    }

    if (newList.length > 0) {
        renderList(newList);
    }

}

const renderList = (list) => {
    showPage(list, 1);
    removeLinks();
    addLinks(list);
    addActive(1);
}
/*
Wait for DOM for load
Hide All
add active to Link 1
and show first group of students
*/
document.addEventListener('DOMContentLoaded', () => {
    renderList(studentList);
});