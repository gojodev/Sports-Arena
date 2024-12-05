(() => {
  // public/javascripts/operations.js
  async function bookFacility() {
    try {
      const description = "Test booking for facility";
      const clubID = "Basketball Club";
      const facilityID = "Basketball Court 1";
      const datetime = "2024-11-21T10:00:00Z";
      const duration = 60;
      const response = await fetch("https://bookfacility-77hki32qna-nw.a.run.app", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          description,
          clubID,
          facilityID,
          datetime,
          duration
        })
      });
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error);
        throw new Error("HTTP error! Status: ".concat(response.status));
      }
      const bookingData = await response.json();
      alert("Booking successful!");
      console.log("Booking Successful:", bookingData);
      return bookingData;
    } catch (error) {
      console.error("Error booking facility:", error);
    }
  }
  async function loadFacilities() {
    const response = await fetch("https://showallfacilities-77hki32qna-nw.a.run.app", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data.facilities);
      const tableBody = document.querySelector("#facilitiesTable tbody");
      tableBody.innerHTML = "";
      Object.entries(data.facilities).forEach(([facilityID, facility]) => {
        const row = document.createElement("tr");
        const nameCell = document.createElement("td");
        nameCell.textContent = facilityID;
        const locationCell = document.createElement("td");
        locationCell.textContent = facility.location;
        const editCell = document.createElement("td");
        editCell.innerHTML = '<a href="#" onclick="editFacility(\''.concat(facilityID, "')\">\u270F\uFE0F</a>");
        const deleteCell = document.createElement("td");
        deleteCell.innerHTML = '<a href="#" onclick="deleteFacility(\''.concat(facilityID, "')\">\u274C</a>");
        row.appendChild(nameCell);
        row.appendChild(locationCell);
        row.appendChild(editCell);
        row.appendChild(deleteCell);
        tableBody.appendChild(row);
      });
    }
  }
  async function createFacility() {
    const facilityID = document.getElementById("facilityID").value;
    const location = document.getElementById("location").value;
    if (!facilityID || !location) {
      alert("Please fill in both fields.");
      return;
    }
    try {
      const response = await fetch("https://createfacility-77hki32qna-nw.a.run.app", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ facilityID, location })
      });
      const result = await response.json();
      if (response.status === 200) {
        alert(result.message);
        toggleFacilityForm();
        loadFacilities();
      } else {
        alert("Error: ".concat(result.error));
      }
    } catch (error) {
      console.log("Error during facility creation:", error);
      alert("There was an error creating the facility.");
    }
  }
  async function editFacility(facilityID) {
    let newLocation = prompt("Enter new location facility ".concat(facilityID, ":"));
    if (!newLocation) {
      alert("Location is required.");
      return;
    }
    try {
      const response = await fetch("https://updatefacility-77hki32qna-nw.a.run.app", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ facilityID, newLocation })
      });
      const result = await response.json();
      if (response.status === 200) {
        alert("Facility ".concat(facilityID, " updated successfully!"));
        loadFacilities();
      } else {
        alert("Error: ".concat(result.error));
      }
    } catch (error) {
      console.error("Error updating facility:", error);
      alert("There was an error updating the facility.");
    }
  }
  async function deleteFacility(facilityID) {
    const confirmed = window.confirm("Are you sure you want to delete this facility?");
    if (confirmed) {
      try {
        const response = await fetch("https://deletefacility-77hki32qna-nw.a.run.app", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ facilityID })
        });
        const result = await response.json();
        if (response.status === 200) {
          alert(result.message);
          loadFacilities();
        } else {
          alert("Error: ".concat(result.error));
        }
      } catch (error) {
        console.log("Error during deletion:", error);
        alert("There was an error deleting the facility.");
      }
    }
  }
  function toggleFacilityForm() {
    const form = document.getElementById("facilityForm");
    form.style.display = form.style.display === "none" ? "block" : "none";
    document.getElementById("facilityID").value = "";
    document.getElementById("location").value = "";
  }
  function toggleClubForm() {
    const form = document.getElementById("clubForm");
    form.style.display = form.style.display === "none" ? "block" : "none";
    document.getElementById("clubID").value = "";
    document.getElementById("clubSport").value = "";
    document.getElementById("caloryBurnRate").value = "";
  }
  async function loadClubs() {
    const response = await fetch("https://showallclubs-77hki32qna-nw.a.run.app", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data.clubs);
      const tableBody = document.querySelector("#clubsTable tbody");
      tableBody.innerHTML = "";
      Object.entries(data.clubs).forEach(([clubID, club]) => {
        const row = document.createElement("tr");
        const nameCell = document.createElement("td");
        nameCell.textContent = clubID;
        const sportCell = document.createElement("td");
        sportCell.textContent = club.sport;
        const caloryCell = document.createElement("td");
        caloryCell.textContent = club.caloryBurnRate;
        const editCell = document.createElement("td");
        editCell.innerHTML = '<a href="#" onclick="editClub(\''.concat(clubID, "')\">\u270F\uFE0F</a>");
        const deleteCell = document.createElement("td");
        deleteCell.innerHTML = '<a href="#" onclick="deleteClub(\''.concat(clubID, "')\">\u274C</a>");
        row.appendChild(nameCell);
        row.appendChild(sportCell);
        row.appendChild(caloryCell);
        row.appendChild(editCell);
        row.appendChild(deleteCell);
        tableBody.appendChild(row);
      });
    }
  }
  async function createClub() {
    const clubID = document.getElementById("clubID").value;
    const clubSport = document.getElementById("clubSport").value;
    let caloryBurnRate = document.getElementById("caloryBurnRate").value;
    if (!clubID || !clubSport || !caloryBurnRate) {
      alert("Please fill in all fields.");
      return;
    }
    caloryBurnRate = parseInt(caloryBurnRate, 10);
    if (isNaN(caloryBurnRate) || caloryBurnRate < 1 || caloryBurnRate > 1e3) {
      alert("Please enter a valid calory burn rate between 1 and 1000.");
      return;
    }
    try {
      const response = await fetch("https://createclub-77hki32qna-nw.a.run.app", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ clubID, sport: clubSport, caloryBurnRate })
      });
      const result = await response.json();
      if (response.status === 200) {
        alert(result.message);
        toggleClubForm();
        loadClubs();
      } else {
        alert("Error: ".concat(result.error));
      }
    } catch (error) {
      console.log("Error during club creation:", error);
      alert("There was an error creating the club.");
    }
  }
  async function editClub(clubID) {
    let newSport = prompt("Enter new sport for ".concat(clubID, ":"));
    let newCaloryBurnRate = prompt("Enter new calory burn rate for ".concat(clubID, " (1-1000):"));
    newCaloryBurnRate = parseInt(newCaloryBurnRate, 10);
    if (isNaN(newCaloryBurnRate) || newCaloryBurnRate < 1 || newCaloryBurnRate > 1e3 || !newSport) {
      alert("Please enter a valid calory burn rate between 1 and 1000 and a club sport!");
      return;
    }
    try {
      const response = await fetch("https://updateclub-77hki32qna-nw.a.run.app", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ clubID, newSport, newCaloryBurnRate })
      });
      const result = await response.json();
      if (response.status === 200) {
        alert("Club ".concat(clubID, " updated successfully!"));
        loadClubs();
      } else {
        alert("Error: ".concat(result.error));
      }
    } catch (error) {
      console.error("Error updating club:", error);
      alert("There was an error updating the club.");
    }
  }
  async function deleteClub(clubID) {
    const confirmed = window.confirm("Are you sure you want to delete this club?");
    if (confirmed) {
      try {
        const response = await fetch("https://deleteclub-77hki32qna-nw.a.run.app", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ clubID })
        });
        const result = await response.json();
        if (response.status === 200) {
          alert(result.message);
          loadClubs();
        } else {
          alert("Error: ".concat(result.error));
        }
      } catch (error) {
        console.log("Error during deletion:", error);
        alert("There was an error deleting the club.");
      }
    }
  }
  bookFacility();
  var currentPage = window.location.pathname;
  if (currentPage.includes("manageclubs.html")) {
    loadClubs();
  } else if (currentPage.includes("managefacilities.html")) {
    loadFacilities();
  }
  document.createFacility = createFacility;
  document.editFacility = editFacility;
  document.deleteFacility = deleteFacility;
  document.toggleFacilityForm = toggleFacilityForm;
  document.toggleClubForm = toggleClubForm;
  document.createClub = createClub;
  document.editClub = editClub;
  document.deleteClub = deleteClub;
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsib3BlcmF0aW9ucy5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiYXN5bmMgZnVuY3Rpb24gYm9va0ZhY2lsaXR5KCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9ICdUZXN0IGJvb2tpbmcgZm9yIGZhY2lsaXR5JztcclxuICAgICAgICBjb25zdCBjbHViSUQgPSAnQmFza2V0YmFsbCBDbHViJztcclxuICAgICAgICBjb25zdCBmYWNpbGl0eUlEID0gJ0Jhc2tldGJhbGwgQ291cnQgMSc7XHJcbiAgICAgICAgY29uc3QgZGF0ZXRpbWUgPSAnMjAyNC0xMS0yMVQxMDowMDowMFonO1xyXG4gICAgICAgIGNvbnN0IGR1cmF0aW9uID0gNjA7XHJcblxyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vYm9va2ZhY2lsaXR5LTc3aGtpMzJxbmEtbncuYS5ydW4uYXBwJywge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgY2x1YklEOiBjbHViSUQsXHJcbiAgICAgICAgICAgICAgICBmYWNpbGl0eUlEOiBmYWNpbGl0eUlELFxyXG4gICAgICAgICAgICAgICAgZGF0ZXRpbWU6IGRhdGV0aW1lLFxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uLFxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xyXG4gICAgICAgICAgICBjb25zdCBlcnJvckRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICAgIGFsZXJ0KGVycm9yRGF0YS5lcnJvcik7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSFRUUCBlcnJvciEgU3RhdHVzOiAke3Jlc3BvbnNlLnN0YXR1c31gKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGJvb2tpbmdEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgIGFsZXJ0KFwiQm9va2luZyBzdWNjZXNzZnVsIVwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnQm9va2luZyBTdWNjZXNzZnVsOicsIGJvb2tpbmdEYXRhKTtcclxuICAgICAgICByZXR1cm4gYm9va2luZ0RhdGE7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGJvb2tpbmcgZmFjaWxpdHk6JywgZXJyb3IpO1xyXG4gICAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBsb2FkRmFjaWxpdGllcygpIHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vc2hvd2FsbGZhY2lsaXRpZXMtNzdoa2kzMnFuYS1udy5hLnJ1bi5hcHAnLCB7XHJcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChyZXNwb25zZS5vaykge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEuZmFjaWxpdGllcyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRhYmxlQm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZmFjaWxpdGllc1RhYmxlIHRib2R5XCIpO1xyXG4gICAgICAgIHRhYmxlQm9keS5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuICAgICAgICBPYmplY3QuZW50cmllcyhkYXRhLmZhY2lsaXRpZXMpLmZvckVhY2goKFtmYWNpbGl0eUlELCBmYWNpbGl0eV0pID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgbmFtZUNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgICAgICAgICAgIG5hbWVDZWxsLnRleHRDb250ZW50ID0gZmFjaWxpdHlJRDtcclxuICAgICAgICAgICAgY29uc3QgbG9jYXRpb25DZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xyXG4gICAgICAgICAgICBsb2NhdGlvbkNlbGwudGV4dENvbnRlbnQgPSBmYWNpbGl0eS5sb2NhdGlvbjtcclxuICAgICAgICAgICAgY29uc3QgZWRpdENlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgICAgICAgICAgIGVkaXRDZWxsLmlubmVySFRNTCA9IGA8YSBocmVmPVwiI1wiIG9uY2xpY2s9XCJlZGl0RmFjaWxpdHkoJyR7ZmFjaWxpdHlJRH0nKVwiPlx1MjcwRlx1RkUwRjwvYT5gO1xyXG4gICAgICAgICAgICBjb25zdCBkZWxldGVDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xyXG4gICAgICAgICAgICBkZWxldGVDZWxsLmlubmVySFRNTCA9IGA8YSBocmVmPVwiI1wiIG9uY2xpY2s9XCJkZWxldGVGYWNpbGl0eSgnJHtmYWNpbGl0eUlEfScpXCI+XHUyNzRDPC9hPmA7XHJcblxyXG4gICAgICAgICAgICByb3cuYXBwZW5kQ2hpbGQobmFtZUNlbGwpO1xyXG4gICAgICAgICAgICByb3cuYXBwZW5kQ2hpbGQobG9jYXRpb25DZWxsKTtcclxuICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKGVkaXRDZWxsKTtcclxuICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKGRlbGV0ZUNlbGwpO1xyXG5cclxuICAgICAgICAgICAgdGFibGVCb2R5LmFwcGVuZENoaWxkKHJvdyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUZhY2lsaXR5KCkge1xyXG4gICAgY29uc3QgZmFjaWxpdHlJRCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmYWNpbGl0eUlEJykudmFsdWU7XHJcbiAgICBjb25zdCBsb2NhdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2NhdGlvbicpLnZhbHVlO1xyXG5cclxuICAgIGlmICghZmFjaWxpdHlJRCB8fCAhbG9jYXRpb24pIHtcclxuICAgICAgICBhbGVydChcIlBsZWFzZSBmaWxsIGluIGJvdGggZmllbGRzLlwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL2NyZWF0ZWZhY2lsaXR5LTc3aGtpMzJxbmEtbncuYS5ydW4uYXBwJywge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBmYWNpbGl0eUlEOiBmYWNpbGl0eUlELCBsb2NhdGlvbjogbG9jYXRpb24gfSksXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuXHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KHJlc3VsdC5tZXNzYWdlKTtcclxuICAgICAgICAgICAgdG9nZ2xlRmFjaWxpdHlGb3JtKCk7XHJcbiAgICAgICAgICAgIGxvYWRGYWNpbGl0aWVzKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoYEVycm9yOiAke3Jlc3VsdC5lcnJvcn1gKTtcclxuICAgICAgICB9XHJcbiAgICB9IFxyXG4gICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBkdXJpbmcgZmFjaWxpdHkgY3JlYXRpb246XCIsIGVycm9yKTtcclxuICAgICAgICBhbGVydChcIlRoZXJlIHdhcyBhbiBlcnJvciBjcmVhdGluZyB0aGUgZmFjaWxpdHkuXCIpOyBcclxuICAgIH1cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gZWRpdEZhY2lsaXR5KGZhY2lsaXR5SUQpe1xyXG4gICAgbGV0IG5ld0xvY2F0aW9uID0gcHJvbXB0KGBFbnRlciBuZXcgbG9jYXRpb24gZmFjaWxpdHkgJHtmYWNpbGl0eUlEfTpgKTtcclxuXHJcbiAgICBpZiAoIW5ld0xvY2F0aW9uKSB7XHJcbiAgICAgICAgYWxlcnQoXCJMb2NhdGlvbiBpcyByZXF1aXJlZC5cIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly91cGRhdGVmYWNpbGl0eS03N2hraTMycW5hLW53LmEucnVuLmFwcCcsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBmYWNpbGl0eUlEOiBmYWNpbGl0eUlELCBuZXdMb2NhdGlvbjogbmV3TG9jYXRpb24gfSksXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgICAgYWxlcnQoYEZhY2lsaXR5ICR7ZmFjaWxpdHlJRH0gdXBkYXRlZCBzdWNjZXNzZnVsbHkhYCk7XHJcbiAgICAgICAgICAgIGxvYWRGYWNpbGl0aWVzKCk7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoYEVycm9yOiAke3Jlc3VsdC5lcnJvcn1gKTtcclxuICAgICAgICB9XHJcbiAgICB9IFxyXG4gICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHVwZGF0aW5nIGZhY2lsaXR5OlwiLCBlcnJvcik7XHJcbiAgICAgICAgYWxlcnQoXCJUaGVyZSB3YXMgYW4gZXJyb3IgdXBkYXRpbmcgdGhlIGZhY2lsaXR5LlwiKTtcclxuICAgIH1cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gZGVsZXRlRmFjaWxpdHkoZmFjaWxpdHlJRCl7XHJcbiAgICBjb25zdCBjb25maXJtZWQgPSB3aW5kb3cuY29uZmlybShgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGZhY2lsaXR5P2ApO1xyXG4gICAgaWYgKGNvbmZpcm1lZCl7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9kZWxldGVmYWNpbGl0eS03N2hraTMycW5hLW53LmEucnVuLmFwcCcsIHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0RFTEVURScsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IGZhY2lsaXR5SUQ6IGZhY2lsaXR5SUQgfSksXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChyZXN1bHQubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICBsb2FkRmFjaWxpdGllcygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoYEVycm9yOiAke3Jlc3VsdC5lcnJvcn1gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBkdXJpbmcgZGVsZXRpb246XCIsIGVycm9yKTtcclxuICAgICAgICAgICAgYWxlcnQoXCJUaGVyZSB3YXMgYW4gZXJyb3IgZGVsZXRpbmcgdGhlIGZhY2lsaXR5LlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRvZ2dsZUZhY2lsaXR5Rm9ybSgpIHtcclxuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmFjaWxpdHlGb3JtJyk7XHJcbiAgICBmb3JtLnN0eWxlLmRpc3BsYXkgPSBmb3JtLnN0eWxlLmRpc3BsYXkgPT09ICdub25lJyA/ICdibG9jaycgOiAnbm9uZSc7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmFjaWxpdHlJRCcpLnZhbHVlID0gJyc7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9jYXRpb24nKS52YWx1ZSA9ICcnO1xyXG59XHJcblxyXG5mdW5jdGlvbiB0b2dnbGVDbHViRm9ybSgpIHtcclxuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2x1YkZvcm0nKTtcclxuICAgIGZvcm0uc3R5bGUuZGlzcGxheSA9IGZvcm0uc3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnID8gJ2Jsb2NrJyA6ICdub25lJztcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbHViSUQnKS52YWx1ZSA9ICcnO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NsdWJTcG9ydCcpLnZhbHVlID0gJyc7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2Fsb3J5QnVyblJhdGUnKS52YWx1ZSA9ICcnO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBsb2FkQ2x1YnMoKSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL3Nob3dhbGxjbHVicy03N2hraTMycW5hLW53LmEucnVuLmFwcCcsIHtcclxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YS5jbHVicyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRhYmxlQm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2x1YnNUYWJsZSB0Ym9keVwiKTtcclxuICAgICAgICB0YWJsZUJvZHkuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcbiAgICAgICAgT2JqZWN0LmVudHJpZXMoZGF0YS5jbHVicykuZm9yRWFjaCgoW2NsdWJJRCwgY2x1Yl0pID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgbmFtZUNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgICAgICAgICAgIG5hbWVDZWxsLnRleHRDb250ZW50ID0gY2x1YklEO1xyXG4gICAgICAgICAgICBjb25zdCBzcG9ydENlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgICAgICAgICAgIHNwb3J0Q2VsbC50ZXh0Q29udGVudCA9IGNsdWIuc3BvcnQ7XHJcbiAgICAgICAgICAgIGNvbnN0IGNhbG9yeUNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgICAgICAgICAgIGNhbG9yeUNlbGwudGV4dENvbnRlbnQgPSBjbHViLmNhbG9yeUJ1cm5SYXRlO1xyXG4gICAgICAgICAgICBjb25zdCBlZGl0Q2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuICAgICAgICAgICAgZWRpdENlbGwuaW5uZXJIVE1MID0gYDxhIGhyZWY9XCIjXCIgb25jbGljaz1cImVkaXRDbHViKCcke2NsdWJJRH0nKVwiPlx1MjcwRlx1RkUwRjwvYT5gO1xyXG4gICAgICAgICAgICBjb25zdCBkZWxldGVDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xyXG4gICAgICAgICAgICBkZWxldGVDZWxsLmlubmVySFRNTCA9IGA8YSBocmVmPVwiI1wiIG9uY2xpY2s9XCJkZWxldGVDbHViKCcke2NsdWJJRH0nKVwiPlx1Mjc0QzwvYT5gO1xyXG5cclxuICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKG5hbWVDZWxsKTtcclxuICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKHNwb3J0Q2VsbCk7XHJcbiAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChjYWxvcnlDZWxsKTtcclxuICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKGVkaXRDZWxsKTtcclxuICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKGRlbGV0ZUNlbGwpO1xyXG5cclxuICAgICAgICAgICAgdGFibGVCb2R5LmFwcGVuZENoaWxkKHJvdyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUNsdWIoKSB7XHJcbiAgICBjb25zdCBjbHViSUQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2x1YklEJykudmFsdWU7XHJcbiAgICBjb25zdCBjbHViU3BvcnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2x1YlNwb3J0JykudmFsdWU7XHJcbiAgICBsZXQgY2Fsb3J5QnVyblJhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2Fsb3J5QnVyblJhdGUnKS52YWx1ZTtcclxuXHJcbiAgICBpZiAoIWNsdWJJRCB8fCAhY2x1YlNwb3J0IHx8ICFjYWxvcnlCdXJuUmF0ZSkge1xyXG4gICAgICAgIGFsZXJ0KFwiUGxlYXNlIGZpbGwgaW4gYWxsIGZpZWxkcy5cIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY2Fsb3J5QnVyblJhdGUgPSBwYXJzZUludChjYWxvcnlCdXJuUmF0ZSwgMTApO1xyXG5cclxuICAgIGlmIChpc05hTihjYWxvcnlCdXJuUmF0ZSkgfHwgY2Fsb3J5QnVyblJhdGUgPCAxIHx8IGNhbG9yeUJ1cm5SYXRlID4gMTAwMCkge1xyXG4gICAgICAgIGFsZXJ0KFwiUGxlYXNlIGVudGVyIGEgdmFsaWQgY2Fsb3J5IGJ1cm4gcmF0ZSBiZXR3ZWVuIDEgYW5kIDEwMDAuXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vY3JlYXRlY2x1Yi03N2hraTMycW5hLW53LmEucnVuLmFwcCcsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgY2x1YklEOiBjbHViSUQsIHNwb3J0OiBjbHViU3BvcnQsIGNhbG9yeUJ1cm5SYXRlOiBjYWxvcnlCdXJuUmF0ZSB9KSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgICAgICBhbGVydChyZXN1bHQubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIHRvZ2dsZUNsdWJGb3JtKCk7XHJcbiAgICAgICAgICAgIGxvYWRDbHVicygpO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KGBFcnJvcjogJHtyZXN1bHQuZXJyb3J9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBcclxuICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgZHVyaW5nIGNsdWIgY3JlYXRpb246XCIsIGVycm9yKTtcclxuICAgICAgICBhbGVydChcIlRoZXJlIHdhcyBhbiBlcnJvciBjcmVhdGluZyB0aGUgY2x1Yi5cIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGVkaXRDbHViKGNsdWJJRCl7XHJcbiAgICBsZXQgbmV3U3BvcnQgPSBwcm9tcHQoYEVudGVyIG5ldyBzcG9ydCBmb3IgJHtjbHViSUR9OmApO1xyXG4gICAgbGV0IG5ld0NhbG9yeUJ1cm5SYXRlID0gcHJvbXB0KGBFbnRlciBuZXcgY2Fsb3J5IGJ1cm4gcmF0ZSBmb3IgJHtjbHViSUR9ICgxLTEwMDApOmApO1xyXG5cclxuICAgIG5ld0NhbG9yeUJ1cm5SYXRlID0gcGFyc2VJbnQobmV3Q2Fsb3J5QnVyblJhdGUsIDEwKTtcclxuICAgIGlmIChpc05hTihuZXdDYWxvcnlCdXJuUmF0ZSkgfHwgbmV3Q2Fsb3J5QnVyblJhdGUgPCAxIHx8IG5ld0NhbG9yeUJ1cm5SYXRlID4gMTAwMCB8fCAhbmV3U3BvcnQpIHtcclxuICAgICAgICBhbGVydChcIlBsZWFzZSBlbnRlciBhIHZhbGlkIGNhbG9yeSBidXJuIHJhdGUgYmV0d2VlbiAxIGFuZCAxMDAwIGFuZCBhIGNsdWIgc3BvcnQhXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vdXBkYXRlY2x1Yi03N2hraTMycW5hLW53LmEucnVuLmFwcCcsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBjbHViSUQ6IGNsdWJJRCwgbmV3U3BvcnQ6IG5ld1Nwb3J0LCBuZXdDYWxvcnlCdXJuUmF0ZTogbmV3Q2Fsb3J5QnVyblJhdGUgfSksXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgICAgYWxlcnQoYENsdWIgJHtjbHViSUR9IHVwZGF0ZWQgc3VjY2Vzc2Z1bGx5IWApO1xyXG4gICAgICAgICAgICBsb2FkQ2x1YnMoKTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChgRXJyb3I6ICR7cmVzdWx0LmVycm9yfWApO1xyXG4gICAgICAgIH1cclxuICAgIH0gXHJcbiAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgdXBkYXRpbmcgY2x1YjpcIiwgZXJyb3IpO1xyXG4gICAgICAgIGFsZXJ0KFwiVGhlcmUgd2FzIGFuIGVycm9yIHVwZGF0aW5nIHRoZSBjbHViLlwiKTtcclxuICAgIH1cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gZGVsZXRlQ2x1YihjbHViSUQpe1xyXG4gICAgY29uc3QgY29uZmlybWVkID0gd2luZG93LmNvbmZpcm0oYEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBjbHViP2ApO1xyXG4gICAgaWYgKGNvbmZpcm1lZCl7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9kZWxldGVjbHViLTc3aGtpMzJxbmEtbncuYS5ydW4uYXBwJywge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgY2x1YklEOiBjbHViSUQgfSksXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChyZXN1bHQubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICBsb2FkQ2x1YnMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KGBFcnJvcjogJHtyZXN1bHQuZXJyb3J9YCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgZHVyaW5nIGRlbGV0aW9uOlwiLCBlcnJvcik7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiVGhlcmUgd2FzIGFuIGVycm9yIGRlbGV0aW5nIHRoZSBjbHViLlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmJvb2tGYWNpbGl0eSgpXHJcbmNvbnN0IGN1cnJlbnRQYWdlID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xyXG5pZiAoY3VycmVudFBhZ2UuaW5jbHVkZXMoJ21hbmFnZWNsdWJzLmh0bWwnKSkge1xyXG4gICAgbG9hZENsdWJzKCk7XHJcbn1cclxuZWxzZSBpZiAoY3VycmVudFBhZ2UuaW5jbHVkZXMoJ21hbmFnZWZhY2lsaXRpZXMuaHRtbCcpKSB7XHJcbiAgICBsb2FkRmFjaWxpdGllcygpOyBcclxufVxyXG5cclxuZG9jdW1lbnQuY3JlYXRlRmFjaWxpdHkgPSBjcmVhdGVGYWNpbGl0eTtcclxuZG9jdW1lbnQuZWRpdEZhY2lsaXR5ID0gZWRpdEZhY2lsaXR5O1xyXG5kb2N1bWVudC5kZWxldGVGYWNpbGl0eSA9IGRlbGV0ZUZhY2lsaXR5O1xyXG5kb2N1bWVudC50b2dnbGVGYWNpbGl0eUZvcm0gPSB0b2dnbGVGYWNpbGl0eUZvcm07XHJcbmRvY3VtZW50LnRvZ2dsZUNsdWJGb3JtID0gdG9nZ2xlQ2x1YkZvcm07XHJcbmRvY3VtZW50LmNyZWF0ZUNsdWIgPSBjcmVhdGVDbHViO1xyXG5kb2N1bWVudC5lZGl0Q2x1YiA9IGVkaXRDbHViO1xyXG5kb2N1bWVudC5kZWxldGVDbHViID0gZGVsZXRlQ2x1YjsiXSwKICAibWFwcGluZ3Mi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
