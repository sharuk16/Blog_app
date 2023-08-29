<script setup>
import {ref} from "vue"

const showModal = ref(false)
const newPost = ref("")  //two way binding
const posts = ref([])
const errorMsg = ref("")


const addPost = () => {
  if (newPost.value.length < 2 ) {
    return errorMsg.value = "Post needs to be atleast 30 Characters"
  }
  posts.value.push({
    id: Math.floor(Math.random() * 100000),
    text: newPost.value,
    date: new Date(),
  })
  showModal.value = false;
  newPost.value = ""
  errorMsg.value = ""
}

const deletePost = (postId) => {
  const index = posts.value.findIndex(post => post.id === postId);
  if (index !== -1) {
    posts.value.splice(index, 1);
  }
};
</script> 



<template>
  <main>
    <div v-if="showModal" class="overlay">
      <div class="modal">
        <textarea v-model.trim ="newPost" name="post" id="post" cols="30" rows="10"></textarea>
        <p v-if="errorMsg">{{ errorMsg }}</p>
        <button @click = "addPost">Create Post</button>
        <button class="discard" @click="showModal = false">Discard</button>
      </div>
</div>

    <div class="container">
      <header>
        <h1>
          Blog
          </h1>
          <button @click="showModal = true">+</button>
      </header>
      <div class="cards-container">
        <div v-for="post in posts" :key="post.id" class="card">
  <p class="main-txt">{{ post.text }}</p>
  <p class="date">{{ post.date.toLocaleDateString("en-UK") }}</p>
  <button @click="deletePost(post.id)" class="delete-button">Delete</button>
  <button @click="editshowModal = true" class="edit-button">Edit</button>
  
</div>

      </div>
    </div>
  </main>
</template>


<style scoped>

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.date {
  font-size: 11px;
  font-weight: bold;
}

main {
  height: 100vh;
  width: 100vw;
  background: rgb(40,37,102);
background: linear-gradient(90deg, rgba(40,37,102,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);
}

h1 {
  
  margin-bottom: 25px;
  font-size: 100px;
  font-weight: bold;
  
}

header button {
  border: none;
  padding: 10px;
  height: 50px;
  width: 50px;
  cursor: pointer;
  font-size: 20px;
  color:aliceblue;
  background-color: black;
  border-radius: 100%;
  transition: transform .5s;

}

header button:hover {
  transform: scale(1.2); 
}

/* .card {
  width: 225px;
  height: 225px;
  padding: 10px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 20px;
  margin-left: 20px;
  margin-bottom: 20px;
  background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);

} */

.card {
  width: max-content;
  padding: 10px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 20px;
  margin-left: 20px;
  margin-bottom: 20px;
  background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
}

.card-content {
  flex: 1; 
  overflow: hidden; 
  white-space: nowrap; 
  text-overflow: ellipsis; 
  
}


.container{
  max-width: 1000px;
  padding: 10px;
  margin: 0 auto;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
}

.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgb(0,0,0,0.77);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;

}

.modal {
  width: 750px;
  background-color: aliceblue;
  border-radius: 10px;
  padding: 30px;
  display: flex;
  position: relative;
  flex-direction: column;
}

.modal button {
  padding: 10px 20px;
  font-size: 20px;
  width: 100%;
  background-color: rgb(2, 36, 255);
  border: none;
  color: aliceblue;
  margin-top: 15px;
  cursor: pointer;

}

.modal .discard {
  margin-top: 5px;
  background-color: red;
}
.modal p {
  color: red;
}

.main-txt, .date {
  color: black;
}

.delete-button {
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
  border-radius: 5px;
  margin-top: 10px;
}

.edit-button {
  background-color: orange;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
  border-radius: 5px;
  margin-top: 10px;
  margin-right: 10px;
}




</style>