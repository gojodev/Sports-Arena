(() => {
  // public/javascripts/member.js
  async function loadCurrentInfo() {
    try {
      const response = await fetch("https://currentuser-77hki32qna-nw.a.run.app", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) {
        throw new Error("HTTP error! Status: ".concat(response.status));
      }
      const userData = await response.json();
      return userData.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
  async function updateHTML() {
    const data = await loadCurrentInfo();
    document.getElementById("username").innerHTML = Object.keys(data)[0];
  }
  updateHTML();
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWVtYmVyLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJhc3luYyBmdW5jdGlvbiBsb2FkQ3VycmVudEluZm8oKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vY3VycmVudHVzZXItNzdoa2kzMnFuYS1udy5hLnJ1bi5hcHAnLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEhUVFAgZXJyb3IhIFN0YXR1czogJHtyZXNwb25zZS5zdGF0dXN9YCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB1c2VyRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICByZXR1cm4gdXNlckRhdGEuZGF0YTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgdXNlciBkYXRhOicsIGVycm9yKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUhUTUwoKSB7XHJcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgbG9hZEN1cnJlbnRJbmZvKCk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlcm5hbWUnKS5pbm5lckhUTUwgPSBPYmplY3Qua2V5cyhkYXRhKVswXVxyXG59XHJcblxyXG51cGRhdGVIVE1MKCkiXSwKICAibWFwcGluZ3MiOiAiOztBQUFBLGlCQUFlLGtCQUFrQjtBQUM3QixRQUFJO0FBQ0EsWUFBTSxXQUFXLE1BQU0sTUFBTSwrQ0FBK0M7QUFBQSxRQUN4RSxRQUFRO0FBQUEsUUFDUixTQUFTO0FBQUEsVUFDTCxnQkFBZ0I7QUFBQSxRQUNwQjtBQUFBLE1BQ0osQ0FBQztBQUVELFVBQUksQ0FBQyxTQUFTLElBQUk7QUFDZCxjQUFNLElBQUksTUFBTSx1QkFBdUIsZ0JBQVMsT0FBUTtBQUFBLE1BQzVEO0FBRUEsWUFBTSxXQUFXLE1BQU0sU0FBUyxLQUFLO0FBQ3JDLGFBQU8sU0FBUztBQUFBLElBQ3BCLFNBQVMsT0FBTztBQUNaLGNBQVEsTUFBTSw2QkFBNkIsS0FBSztBQUFBLElBQ3BEO0FBQUEsRUFDSjtBQUdBLGlCQUFlLGFBQWE7QUFDeEIsVUFBTSxPQUFPLE1BQU0sZ0JBQWdCO0FBQ25DLGFBQVMsZUFBZSxVQUFVLEVBQUUsWUFBWSxPQUFPLEtBQUssSUFBSSxFQUFFLENBQUM7QUFBQSxFQUN2RTtBQUVBLGFBQVc7IiwKICAibmFtZXMiOiBbXQp9Cg==
