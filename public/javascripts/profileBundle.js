(() => {
  // public/javascripts/profile.js
  async function loadCurrentInfo() {
    try {
      const response = await fetch("http://127.0.0.1:5001/sports-arena-39a32/europe-west2/currentUser", {
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
    const fetched = await loadCurrentInfo();
    const username = Object.keys(fetched)[0];
    const data = fetched[username];
    const name = data.name;
    const role = data.role;
    const bmr = data.bmr;
    const gender = data.gender;
    const age = data.age;
    const weight = data.weight;
    const height = data.height;
    const address = data.address;
    const phone = data.phone;
    const bookingsNo = data.bookings.length;
    console.log(name);
    document.getElementById("name").innerHTML = "".concat(name, " (").concat(username, ")");
    document.getElementById("role").innerHTML = role;
    document.getElementById("bmr").innerHTML = bmr;
    document.getElementById("gender").innerHTML = gender;
    document.getElementById("age").innerHTML = age;
    document.getElementById("weight").innerHTML = weight;
    document.getElementById("height").innerHTML = height;
    document.getElementById("address").innerHTML = address;
    document.getElementById("phone").innerHTML = phone;
    document.getElementById("bookingsNo").innerHTML = bookingsNo;
  }
  updateHTML();
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicHJvZmlsZS5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiYXN5bmMgZnVuY3Rpb24gbG9hZEN1cnJlbnRJbmZvKCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwOi8vMTI3LjAuMC4xOjUwMDEvc3BvcnRzLWFyZW5hLTM5YTMyL2V1cm9wZS13ZXN0Mi9jdXJyZW50VXNlcicsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSFRUUCBlcnJvciEgU3RhdHVzOiAke3Jlc3BvbnNlLnN0YXR1c31gKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHVzZXJEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgIHJldHVybiB1c2VyRGF0YS5kYXRhO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyB1c2VyIGRhdGE6JywgZXJyb3IpO1xyXG4gICAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiB1cGRhdGVIVE1MKCkge1xyXG4gICAgY29uc3QgZmV0Y2hlZCA9IGF3YWl0IGxvYWRDdXJyZW50SW5mbygpXHJcbiAgICBjb25zdCB1c2VybmFtZSA9IE9iamVjdC5rZXlzKGZldGNoZWQpWzBdO1xyXG4gICAgY29uc3QgZGF0YSA9IGZldGNoZWRbdXNlcm5hbWVdXHJcbiAgICBjb25zdCBuYW1lID0gZGF0YS5uYW1lXHJcbiAgICBjb25zdCByb2xlID0gZGF0YS5yb2xlXHJcbiAgICBjb25zdCBibXIgPSBkYXRhLmJtclxyXG4gICAgY29uc3QgZ2VuZGVyID0gZGF0YS5nZW5kZXJcclxuICAgIGNvbnN0IGFnZSA9IGRhdGEuYWdlXHJcbiAgICBjb25zdCB3ZWlnaHQgPSBkYXRhLndlaWdodFxyXG4gICAgY29uc3QgaGVpZ2h0ID0gZGF0YS5oZWlnaHRcclxuICAgIGNvbnN0IGFkZHJlc3MgPSBkYXRhLmFkZHJlc3NcclxuICAgIGNvbnN0IHBob25lID0gZGF0YS5waG9uZVxyXG4gICAgY29uc3QgYm9va2luZ3NObyA9IGRhdGEuYm9va2luZ3MubGVuZ3RoXHJcbiAgICBjb25zb2xlLmxvZyhuYW1lKVxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hbWUnKS5pbm5lckhUTUwgPSBgJHtuYW1lfSAoJHt1c2VybmFtZX0pYFxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JvbGUnKS5pbm5lckhUTUwgPSByb2xlXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm1yJykuaW5uZXJIVE1MID0gYm1yXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2VuZGVyJykuaW5uZXJIVE1MID0gZ2VuZGVyXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWdlJykuaW5uZXJIVE1MID0gYWdlXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2VpZ2h0JykuaW5uZXJIVE1MID0gd2VpZ2h0XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGVpZ2h0JykuaW5uZXJIVE1MID0gaGVpZ2h0XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkcmVzcycpLmlubmVySFRNTCA9IGFkZHJlc3NcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwaG9uZScpLmlubmVySFRNTCA9IHBob25lXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9va2luZ3NObycpLmlubmVySFRNTCA9IGJvb2tpbmdzTm9cclxufVxyXG5cclxudXBkYXRlSFRNTCgpIl0sCiAgIm1hcHBpbmdzIjogIjs7QUFBQSxpQkFBZSxrQkFBa0I7QUFDN0IsUUFBSTtBQUNBLFlBQU0sV0FBVyxNQUFNLE1BQU0scUVBQXFFO0FBQUEsUUFDOUYsUUFBUTtBQUFBLFFBQ1IsU0FBUztBQUFBLFVBQ0wsZ0JBQWdCO0FBQUEsUUFDcEI7QUFBQSxNQUNKLENBQUM7QUFFRCxVQUFJLENBQUMsU0FBUyxJQUFJO0FBQ2QsY0FBTSxJQUFJLE1BQU0sdUJBQXVCLGdCQUFTLE9BQVE7QUFBQSxNQUM1RDtBQUVBLFlBQU0sV0FBVyxNQUFNLFNBQVMsS0FBSztBQUNyQyxhQUFPLFNBQVM7QUFBQSxJQUNwQixTQUFTLE9BQU87QUFDWixjQUFRLE1BQU0sNkJBQTZCLEtBQUs7QUFBQSxJQUNwRDtBQUFBLEVBQ0o7QUFFQSxpQkFBZSxhQUFhO0FBQ3hCLFVBQU0sVUFBVSxNQUFNLGdCQUFnQjtBQUN0QyxVQUFNLFdBQVcsT0FBTyxLQUFLLE9BQU8sRUFBRSxDQUFDO0FBQ3ZDLFVBQU0sT0FBTyxRQUFRLFFBQVE7QUFDN0IsVUFBTSxPQUFPLEtBQUs7QUFDbEIsVUFBTSxPQUFPLEtBQUs7QUFDbEIsVUFBTSxNQUFNLEtBQUs7QUFDakIsVUFBTSxTQUFTLEtBQUs7QUFDcEIsVUFBTSxNQUFNLEtBQUs7QUFDakIsVUFBTSxTQUFTLEtBQUs7QUFDcEIsVUFBTSxTQUFTLEtBQUs7QUFDcEIsVUFBTSxVQUFVLEtBQUs7QUFDckIsVUFBTSxRQUFRLEtBQUs7QUFDbkIsVUFBTSxhQUFhLEtBQUssU0FBUztBQUNqQyxZQUFRLElBQUksSUFBSTtBQUNoQixhQUFTLGVBQWUsTUFBTSxFQUFFLFlBQVksR0FBRyxhQUFJLE1BQUssaUJBQVE7QUFDaEUsYUFBUyxlQUFlLE1BQU0sRUFBRSxZQUFZO0FBQzVDLGFBQVMsZUFBZSxLQUFLLEVBQUUsWUFBWTtBQUMzQyxhQUFTLGVBQWUsUUFBUSxFQUFFLFlBQVk7QUFDOUMsYUFBUyxlQUFlLEtBQUssRUFBRSxZQUFZO0FBQzNDLGFBQVMsZUFBZSxRQUFRLEVBQUUsWUFBWTtBQUM5QyxhQUFTLGVBQWUsUUFBUSxFQUFFLFlBQVk7QUFDOUMsYUFBUyxlQUFlLFNBQVMsRUFBRSxZQUFZO0FBQy9DLGFBQVMsZUFBZSxPQUFPLEVBQUUsWUFBWTtBQUM3QyxhQUFTLGVBQWUsWUFBWSxFQUFFLFlBQVk7QUFBQSxFQUN0RDtBQUVBLGFBQVc7IiwKICAibmFtZXMiOiBbXQp9Cg==
