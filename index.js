
/* constructor for Book Object */
 function book(title, author,pages,read)
 {
 this.title = title
 this.author = author
 this.pages = pages
 this.read = read
 }

 /*function to add books to stock */
function addToStock()
{
    modal.style.display="block";
    console.log("inside addTostock");
    const addStockBtn = document.querySelector('#addToStock');

    addStockBtn.onclick=function(e)
    {
        let title = document.querySelector('#title').value;
        let author = document.querySelector('#author').value;
        let pages = document.querySelector('#pages').value;
        let status = document.querySelector('#status').value;
        console.log(title);
        let book1 = new book(title,author,pages,status);
        Books.push(book1);
        localStorage.setItem('items', JSON.stringify(Books));
        console.log("new Books"+Books);
        render();
        modal.style.display="none";
        this.form.reset();
    }
    
}



/*function to display books in table*/
function render()
{
    let container = document.querySelector("tbody");
    let i=current;
    for(i=current;i<Books.length;i++){
        let card = document.createElement('tr');
        card.setAttribute("data-index",i);
        let text="";
        for(let props in Books[i])
          {
              if(props!="read")
                text=text+"<td>"+Books[i][props]+"</td>";
              else
              {
                if(Books[i][props].indexOf('Not')>-1)
                    text=text+"<td><span class=\"readToggle\" data-index="+i+">"+Books[i][props]+"</span></td>";
                else
                    text=text+"<td><span class=\"notreadToggle\" data-index="+i+">"+Books[i][props]+"</span></td>";
              }

          }
         
        console.log(text);
        card.innerHTML=text+"<td><i class=\"fa fa-trash\" style=\"font-size:30px;padding-left:30px;\" data-index="+i+"></i></td>";
        container.appendChild(card);
     }
     current=i;

}

/*function to toggle read*/
function toggleBtn(e)
{
    console.log("inside toggle");
     if(e.target.className=="notreadToggle")
     {
         Books[e.target.dataset.index].read="Not read";
         e.target.innerHTML="Not Read";
         e.target.className="readToggle";
     }
     else
     {
        Books[e.target.dataset.index].read="Read";
        e.target.innerHTML="Read";
        e.target.className="notreadToggle";
     }
     localStorage.setItem('items', JSON.stringify(Books));
}

/*function to delete books from stock*/
function remove(i)
{
    
    Books.splice(i,1);
    let container = document.querySelector("tbody");
    let row = document.querySelector(`tr[data-index="${i}"]`);
    console.log(row);
    container.removeChild(row);
    current--;
    i=i+1;
    
    console.log(`current:${current}    i:${i}`);
    while(i<=current)
    {

        let nextRow = document.querySelector(`tr[data-index="${i}"]`);
        let nextSpan = document.querySelector(`span[data-index="${i}"]`);
        nextRow.dataset.index=nextRow.dataset.index-1;
        nextSpan.dataset.index=nextSpan.dataset.index-1;
        console.log(nextRow);
        i++;
    }
    
    console.log("New Books"+Books);
}

let Books=JSON.parse(localStorage.getItem('items')) || [];
let current=0;
render();
//const book1 = new book("Harry Potter","test","200","read");
//console.log(book1.info());
const addBtn = document.querySelector('#add');
const modal = document.getElementById('myModal');
let tableBody= document.querySelector("tbody");
var span = document.getElementsByClassName("close")[0];
    addBtn.addEventListener('click',(e)=>addToStock());
    span.onclick = function() {
    modal.style.display = "none";
  }
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }


tableBody.addEventListener('click',(e)=>{
    console.log(e);
    if(e.target.className=='readToggle')
    {
        Books[e.target.dataset.index].read="Read";
        e.target.innerHTML="Read";
        e.target.className="notreadToggle";
    }
    else if(e.target.className=='notreadToggle')
    {
        Books[e.target.dataset.index].read="Not read";
        e.target.innerHTML="Not Read";
        e.target.className="readToggle";
    }
    else if(e.target.className=='fa fa-trash')
    {
        remove(parseInt(e.target.dataset.index));
    }
    localStorage.setItem('items', JSON.stringify(Books));

})






