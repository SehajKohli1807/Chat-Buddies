const socket = io('http://localhost:8000');

const form=document.getElementById("send-message");
const msg=document.getElementById('messageInp');
const msgContainer=document.querySelector('.container');



const append =(message,position) => {
const messageElement=document.createElement('div');
messageElement.innerText=message;
messageElement.classList.add('message');
messageElement.classList.add('font-size');
messageElement.classList.add(position);
msgContainer.append(messageElement);

}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message= messageInp.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value= '';
  })

const name = prompt("Enter your name");
socket.emit('new-user',name);

socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'left');
})

socket.on('receive',data=>{
    append(`${data.name}: ${data.message}`,'left');
})

socket.on('left',data=>{
    append(`${name} joined the chat`,'left');
})