import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="like-button"
export default class extends Controller {
  static targets = ["sum", "container"]

  connect() {
    // console.log(this.likedValue)
  }

  like(event) {
  event.preventDefault()
  const postId = event.currentTarget.dataset.likeButtonPostId;
  const likableType = event.currentTarget.dataset.likeButtonLikableType;
  // console.log(event.currentTarget.dataset.likeButtonLikableType)
  if (likableType === "post") {
    fetch(`/posts/${postId}/likes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.querySelector("meta[name=csrf-token]").content
      },
      body: JSON.stringify({})
    })
    .then(response => response.json())
    .then(data => {
      // console.log("Like created successfully:", data);
      if (data.value === "deleted") {
        this.sumTarget.innerHTML = parseInt(this.sumTarget.innerHTML) - 1
        this.containerTarget.classList.add("blacky")
        this.containerTarget.classList.remove("greeny")

      } else {
        this.sumTarget.innerHTML = parseInt(this.sumTarget.innerHTML) + 1
        this.containerTarget.classList.remove("blacky")
        this.containerTarget.classList.add("greeny")
      }
    })
    }else{
      const commentId = event.currentTarget.dataset.likeButtonCommentId;
      // console.log(commentId)
      fetch(`/posts/${postId}/comments/${commentId}/likes`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": document.querySelector("meta[name=csrf-token]").content
        },
        body: JSON.stringify({})
      })
      .then(response => response.json())
      .then(data => {
        // console.log("Like created successfully:", data);
      if (data.value === "deleted") {
        this.sumTarget.innerHTML = parseInt(this.sumTarget.innerHTML) - 1
        this.containerTarget.classList.add("blacky")
        this.containerTarget.classList.remove("greeny")

      } else {
        this.sumTarget.innerHTML = parseInt(this.sumTarget.innerHTML) + 1
        this.containerTarget.classList.remove("blacky")
        this.containerTarget.classList.add("greeny")
      }
    })
  }
}}
