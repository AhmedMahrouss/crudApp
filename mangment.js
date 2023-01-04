let name = document.getElementById('name');
let jop = document.getElementById('jop');
let roll = document.getElementById('roll');
let search = document.getElementById('search');
let btn = document.getElementById('btn');
let delAll = document.getElementById('delAll');
let deluser = document.getElementById('deluser');
let edit = document.getElementById('edit');
let inputs = document.querySelectorAll('input');
let tbody = document.getElementById('tbody');
mood = 'submit'
let index;
let data = [];
if(localStorage.user != null && localStorage.user != ''){
    data = JSON.parse(localStorage.user);
}else{
    data = [];
}
btn.onclick = ()=>{
user = {
    name:name.value.toLowerCase(),
    jop:jop.value,
    roll:roll.value,
}
if(user.name !='' && user.jop !='' && user.roll !=''){
    if(mood === 'submit'){
        data.push(user)
    }else{
        data[index] = user;
        mood='create'
        btn.innerHTML='Submit'
    }
    inputs.forEach(input=>{
        input.value = ''
    })
    name.placeholder = ''
    jop.placeholder = ''
    roll.placeholder =''
}else{
   name.placeholder = 'Please Enter Your Name'
   jop.placeholder = 'Please Enter Your Jop'
   roll.placeholder ='Please Enter Roll NO'
}
localStorage.user = JSON.stringify(data)
ShowData();
}

function ShowData(){
 let table = ''
 for(var i =0; i<data.length; i++){
    table += `
    <tr>
    <td>${data[i].name}</td>
    <td>${data[i].jop}</td>
    <td>${data[i].roll}</td>
    <td><button id="edit" onclick=(update(${i}))>Edit</button> <button id="deluser" onclick="DelUser(${i})">Delete</button></td>
  </tr>
    `
 }
 tbody.innerHTML = table;
 if(data.length > 0){
    delAll.style.display = 'block'
    delAll.innerHTML = `Delete All ( ${i} )`
 }else{
    delAll.style.display = 'none'
    btn.innerHTML='Submit'
    inputs.forEach(input=>{
        input.value = ''
    })
    
 }
}ShowData();

function DelUser(num){
data.splice(num,1);
localStorage.user = JSON.stringify(data);
ShowData();
}
function DellAll(){
data.splice(0)
localStorage.user = JSON.stringify(data)
ShowData();
btn.innerHTML='Submit'
}
function update(i){
name.value = data[i].name;
jop.value = data[i].jop;
roll.value = data[i].roll;
btn.innerHTML = 'Update'
mood = 'update'
index = i;
}
function SearchUser(value){
    let table = '';
for(var i = 0; i<data.length; i++){
    if(data[i].name.includes(value.toLowerCase())){
        table += `
        <tr>
        <td>${data[i].name}</td>
        <td>${data[i].jop}</td>
        <td>${data[i].roll}</td>
        <td><button id="edit" onclick=(update(${i}))>Edit</button> <button id="deluser" onclick="DelUser(${i})">Delete</button></td>
      </tr>
        `
    }tbody.innerHTML = table;
}
}

