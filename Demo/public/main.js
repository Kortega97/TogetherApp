

const groupContainer = [...document.getElementsByClassName("groupContainer")];
const groups         = [...document.getElementsByClassName('groups')];
const trash          = [...document.getElementsByClassName("fa-trash")];
const edit           = [...document.getElementsByClassName("edit")];
const editButton     = [...document.getElementsByClassName("editButton")];
const revealedButton =[...document.getElementsByClassName("revealed")];
const join           = [...document.getElementsByClassName('join')];


groups.forEach(element => {
  element.addEventListener('click', function () {
    
    const createdGroup = element.target.closest('.group .createGroups')
    const name = createdGroup.querySelector('.name').value.toString();
    const msg = createdGroup.querySelector('.msg').value.toString();
    const rules = createdGroup.querySelector('.rules').value.toString();
    const key = createdGroup.querySelector('.key').value.toString();
    console.log()
    if (element.target.className === 'join') {
      
      console.log(element)
    
    fetch('groups', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'name': name,
          'msg': msg,
          'rules': rules,
          'key': key
        })
      })
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {
        console.log(data)
        window.location.reload()
      })}
  });
})

function search(element){
  const closest = element.target.closest('.group')
  const key = closest.querySelector('.key').innerText
  fetch('search', {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
       'key':key
    })
  })
  
}

// TODO:
edit.forEach(function (element) {
  
  element.addEventListener('click', function () {
    const section = element.closest('.bob')
    const name = section.querySelector('.name').value.toString();
    const msg = section.querySelector('.msg').value.toString();
    const rules = section.querySelector('.rules').value.toString();
    const key = section.querySelector('.key').value.toString();
    const oldName =  document.querySelector('.oldName').value
    fetch('editGroup', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          // if the key is the same as the value passed in you only need to say it once 
          // ex:'name':name === name (left = key/right = value)
           name,
           msg,
           rules,
           key,
          oldName
        })
      })
      .then(() =>  window.location.reload())
      //   if (response.ok) return response.json()
      // })
      // .then(data => {
      //   console.log(data)
      //   window.location.reload()
      // })
  });
});

// TODO:
editButton.forEach(function (element) {
  element.addEventListener('click', function (element) {
      const listItem = element.target.closest('.groupContainer')
      const editForm = listItem.querySelector('.bob')
      editForm.classList.toggle("displayEdit")
  });
});



trash.forEach(function (element) {
  element.addEventListener('click', function (element) {
    const groupStuff = element.target.closest('.group')
    const name = groupStuff.querySelector('.name p').innerText.toString().toLowerCase()
    const msg = groupStuff.querySelector('.msg p').innerText.toString().toLowerCase()
    const rules = groupStuff.querySelector('.rules p').innerText.toString().toLowerCase()
    const key = groupStuff.querySelector('.key p').innerText.toString().toLowerCase()
   
    fetch('groups/:author', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': name,
        'msg': msg,
        'rules': rules,
        'key': key
      })
    })
    
    .then(function (response) {
      window.location.reload()
    })

     })
      
  });
 
