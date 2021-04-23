const addBtn = document.getElementById('add__btn');
const content = document.querySelector('.container');
const col1 = document.querySelector('.col-1');
const col2 = document.querySelector('.col-2');
const col3 = document.querySelector('.col-3');
const addTag = document.querySelectorAll('.add__tag');

let Notes = [];
let id = 0;
let date = new Date();
let newdate = formatDate(date, 'DD.MM.YY  hh:mm')//форматирование даты
let colors = [
    [250, 128, 114],
    [152, 251, 152],
    [255, 192, 203],
    [176, 196, 222],
    [240, 230, 140],
    [220, 220, 220],
    [240, 230, 140]
]
let color;

//нажатие на кнопку добавить
addBtn.addEventListener('click', () => {
    noteMaker();
});

//создание макета заметки
function noteMaker() {
    color = colors[Math.floor(Math.random()*colors.length)];
    //html код макета
    let noteObj = `<div id='note${id}' class='note__box' style='background: rgba(${color[0]}, ${color[1]}, ${color[2]}, 1)'>
                    <div class="container__note">
                        <input id='title${id}' type='text' class="note__title title__input" placeholder='Title'/>
                        <textarea id='text${id}' class="note__text text__input" placeholder='Type your note...'></textarea>
                          
                        </div>
                        <div id='date${id}' class="note__date">${newdate}</div>
                        <div class="tags__container">
                            <div class="note__tag">#tag</div>
                        </div>
                        <input type='submit' class="btn_note_add" onclick='addNoteToList(${id})' value='+'>
                    </div>
                </div>`

    //сдвиг предыдущих заметок вправо для освобождения места для новой заметки
    Notes.forEach(note => {
        moveCol(note, 'r');
    })
    //удаление старого отображения
    clearHTML();
    //отрисовка нового
    drawNotes();

    //вставка макета в первую колонку
    col1.insertAdjacentHTML('afterbegin', noteObj);
    id++;
}

//создание заметки и добавление ее в список
function addNoteToList(id) {
    const note = document.getElementById('note' + id);
    const title = document.getElementById('title' + id);
    const text = document.getElementById('text' + id);
    const date = document.getElementById('date' + id);

    //создание объекта заметки
    let noteObj = {
        id: id,
        title: title.value,
        text: text.value,
        date: date.innerText,
        column: col1,
        color: color,
        tags: []
    }

    //не вставляет пустую заметку
    if (noteObj.title != '' && noteObj.text != '') {
        Notes.push(noteObj);
        note.remove(); //удаляет создающий макет заметки
        drawNotes();
    }
}

//отрисовка заметок. Вставка заметок в колонки
function drawNotes() {
    clearHTML();
    Notes.forEach(note => {
        let noteObj = ` <div id='note${note.id}' class="note__box" style='background:linear-gradient(225deg, transparent 40px, rgba(${note.color[0]}, ${note.color[1]}, ${note.color[2]}, 1) 0);'>
                            <div class='corner' style='background:linear-gradient(225deg, transparent 40px, rgba(${note.color[0]-30}, ${note.color[1]-40}, ${note.color[2]-40}, 1) 0);'></div>
                            <div class="container__note">
                                <div id='title${note.id}' class="note__title">${note.title}</div>
                                <div id='text${note.id}' class="note__text">
                                    <p>${note.text}</p>
                                </div>
                                <div id='date${note.id}' class="note__date">${note.date}</div>
                                <div class="tags__container" id='tags${note.id}'>
                                <input type='submit' value='+' class='add__tag' onclick='addNewTag(${note.id})'/>
                                    <input type='text' class='input__tag' placeholder='#'/>
                                </div>
                                <div class='btn__del'  onclick='delNote(${note.id})'><img src='../img/1.png'/></div>
                            </div>
                        </div>`
        note.column.insertAdjacentHTML('afterbegin', noteObj);
        let noteTags = document.getElementById('tags'+note.id);
        let tags = note.tags;
        if(noteTags !== null){
            tags.forEach(tag=>{
                const div = document.createElement('div')
                div.classList='note__tag'
                div.innerText = '#'+tag
                noteTags.appendChild(div);        
            })
        }
    })
}

//удаляет объекты перед перерисовкой 
function clearHTML() {
    let notes = Array.from(document.querySelectorAll('.note__box'));
    notes.forEach(note => {
        note.remove();
    })
}

//перемещение заметки в другую колонку
function moveCol(note, dir) {
    let col = note.column;
    if (dir == 'r') {
        if (col == col1) {
            note.column = col2;
        }
        if (col == col2) {
            note.column = col3;
        }
        if (col == col3) {
            note.column = col1;
        }
    }
    if (dir == 'l') {
        if (col == col1) {
            note.column = col3;
        }
        if (col == col2) {
            note.column = col1;
        }
        if (col == col3) {
            note.column = col2;
        }
    }
}

//удаление заметки
function delNote(id) { 
    Notes.forEach((note, index) => {
        //ищет необходимую заметку
        if (note.id == id) {
            //передвигает заметки, находящиеся справа от удаляемой на 1 столбик влево
            for (let i = index - 1; i >= 0; i--) {
                moveCol(Notes[i], 'l');
            }
            //удаление необходимой заметки
            Notes.splice(index, 1); 
            //отрисовка
            drawNotes();
            return
        }
    })
}

//форматирование даты
function formatDate(date, format) {
    const map = {
        MM: ('0' + (date.getMonth() + 1)).slice(-2), //slice(-2) дает только 2 последних числа
        DD: date.getDate(),
        YY: date.getFullYear().toString().slice(-2),
        YYYY: date.getFullYear(),
        hh: ('0' + date.getHours()).slice(-2),
        mm: ('0' + date.getMinutes()).slice(-2)
    }
    return format.replace(/MM|DD|YY|YYYY|hh|mm/gi, matched => map[matched]);
}

//используется для проверки работоспособности. Создает необходимое количество заметок
function addFakeNotes(num) {
    for (let i = 0; i < num; i++) {
        let noteObj = {
            id: i,
            title: 'Title' + i,
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            date: '22.04.2021',
            column: col1,
            color: colors[1],
            tags: []
        }
        //передвигает ранее созданные заметки вправо, чтобы освободить место для новой
        Notes.forEach(note => {
            moveCol(note, 'r');
        })
        Notes.push(noteObj)
    }
    drawNotes()
}

//добавление тэга
function addNewTag(id){
   let inputTags = Array.from(document.querySelectorAll('.input__tag'));
   //поиск нужной заметки
   inputTags.forEach(input =>{
        if(input.parentElement.id == 'tags'+id){
            //отображение/скрытие добавления
            input.classList.toggle('active');
            if(!input.classList.contains('active')){
                Notes[id].tags.push(input.value)
                console.log(Notes[id])
                drawNotes();
            }
        }
   });
}