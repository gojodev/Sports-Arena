(() => {
  // public/javascripts/operations.js
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
    document.getElementById("trainerDropdown").selectedIndex = 0;
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
        const trainerCell = document.createElement("td");
        trainerCell.textContent = club.trainer;
        const editCell = document.createElement("td");
        editCell.innerHTML = '<a href="#" onclick="editClub(\''.concat(clubID, "')\">\u270F\uFE0F</a>");
        const deleteCell = document.createElement("td");
        deleteCell.innerHTML = '<a href="#" onclick="deleteClub(\''.concat(clubID, "')\">\u274C</a>");
        row.appendChild(nameCell);
        row.appendChild(sportCell);
        row.appendChild(caloryCell);
        row.appendChild(trainerCell);
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
    const trainer = document.getElementById("trainerDropdown").value;
    if (!clubID || !clubSport || !caloryBurnRate || !trainer) {
      alert("Please fill in all fields.");
      return;
    }
    caloryBurnRate = parseInt(caloryBurnRate, 10);
    if (isNaN(caloryBurnRate) || caloryBurnRate < 1 || caloryBurnRate > 1e3) {
      alert("Please enter a valid calory burn rate between 1 and 1000.");
      return;
    }
    if (trainerDropdown.selectedIndex == 0) {
      alert("Please select a valid trainer.");
      return;
    }
    try {
      const response = await fetch("https://createclub-77hki32qna-nw.a.run.app", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ clubID, sport: clubSport, caloryBurnRate, trainer })
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
  async function loadTrainerDropdown() {
    const response = await fetch("http://127.0.0.1:5001/sports-arena-39a32/europe-west2/fetchTrainerNames", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.ok) {
      const trainers = await response.json();
      const trainerDropdown2 = document.getElementById("trainerDropdown");
      console.log(trainers);
      trainers.forEach((trainer) => {
        const option = document.createElement("option");
        option.value = trainer;
        option.textContent = trainer;
        trainerDropdown2.appendChild(option);
      });
    } else {
      console.error("Failed to load trainers.");
    }
  }
  var currentPage = window.location.pathname;
  if (currentPage.includes("manageclubs.html")) {
    loadClubs();
    loadTrainerDropdown();
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsib3BlcmF0aW9ucy5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiYXN5bmMgZnVuY3Rpb24gYm9va0ZhY2lsaXR5KCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9ICdUZWFtIFRyYWluaW5nIFNlc3Npb25cIic7XHJcbiAgICAgICAgY29uc3QgY2x1YklEID0gJ0Jhc2tldGJhbGwgQ2x1Yic7XHJcbiAgICAgICAgY29uc3QgZmFjaWxpdHlJRCA9ICdCYXNrZXRiYWxsIENvdXJ0IDEnO1xyXG4gICAgICAgIGNvbnN0IGRhdGV0aW1lID0gJzIwMjQtMTItMTBUMTQ6MDA6MDBaJztcclxuICAgICAgICBjb25zdCBkdXJhdGlvbiA9IDYwO1xyXG5cclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwOi8vMTI3LjAuMC4xOjUwMDEvc3BvcnRzLWFyZW5hLTM5YTMyL2V1cm9wZS13ZXN0Mi9ib29rRmFjaWxpdHknLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgICAgICBjbHViSUQ6IGNsdWJJRCxcclxuICAgICAgICAgICAgICAgIGZhY2lsaXR5SUQ6IGZhY2lsaXR5SUQsXHJcbiAgICAgICAgICAgICAgICBkYXRldGltZTogZGF0ZXRpbWUsXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb24sXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVycm9yRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3JEYXRhKTtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBIVFRQIGVycm9yISBTdGF0dXM6ICR7cmVzcG9uc2Uuc3RhdHVzfWApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgYm9va2luZ0RhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgYWxlcnQoXCJCb29raW5nIHN1Y2Nlc3NmdWwhXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdCb29raW5nIFN1Y2Nlc3NmdWw6JywgYm9va2luZ0RhdGEpO1xyXG4gICAgICAgIHJldHVybiBib29raW5nRGF0YTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgYm9va2luZyBmYWNpbGl0eTonLCBlcnJvcik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGxvYWRGYWNpbGl0aWVzKCkge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9zaG93YWxsZmFjaWxpdGllcy03N2hraTMycW5hLW53LmEucnVuLmFwcCcsIHtcclxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YS5mYWNpbGl0aWVzKTtcclxuXHJcbiAgICAgICAgY29uc3QgdGFibGVCb2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmYWNpbGl0aWVzVGFibGUgdGJvZHlcIik7XHJcbiAgICAgICAgdGFibGVCb2R5LmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG4gICAgICAgIE9iamVjdC5lbnRyaWVzKGRhdGEuZmFjaWxpdGllcykuZm9yRWFjaCgoW2ZhY2lsaXR5SUQsIGZhY2lsaXR5XSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIik7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBuYW1lQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuICAgICAgICAgICAgbmFtZUNlbGwudGV4dENvbnRlbnQgPSBmYWNpbGl0eUlEO1xyXG4gICAgICAgICAgICBjb25zdCBsb2NhdGlvbkNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uQ2VsbC50ZXh0Q29udGVudCA9IGZhY2lsaXR5LmxvY2F0aW9uO1xyXG4gICAgICAgICAgICBjb25zdCBlZGl0Q2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuICAgICAgICAgICAgZWRpdENlbGwuaW5uZXJIVE1MID0gYDxhIGhyZWY9XCIjXCIgb25jbGljaz1cImVkaXRGYWNpbGl0eSgnJHtmYWNpbGl0eUlEfScpXCI+XHUyNzBGXHVGRTBGPC9hPmA7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlbGV0ZUNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgICAgICAgICAgIGRlbGV0ZUNlbGwuaW5uZXJIVE1MID0gYDxhIGhyZWY9XCIjXCIgb25jbGljaz1cImRlbGV0ZUZhY2lsaXR5KCcke2ZhY2lsaXR5SUR9JylcIj5cdTI3NEM8L2E+YDtcclxuXHJcbiAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChuYW1lQ2VsbCk7XHJcbiAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChsb2NhdGlvbkNlbGwpO1xyXG4gICAgICAgICAgICByb3cuYXBwZW5kQ2hpbGQoZWRpdENlbGwpO1xyXG4gICAgICAgICAgICByb3cuYXBwZW5kQ2hpbGQoZGVsZXRlQ2VsbCk7XHJcblxyXG4gICAgICAgICAgICB0YWJsZUJvZHkuYXBwZW5kQ2hpbGQocm93KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlRmFjaWxpdHkoKSB7XHJcbiAgICBjb25zdCBmYWNpbGl0eUlEID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZhY2lsaXR5SUQnKS52YWx1ZTtcclxuICAgIGNvbnN0IGxvY2F0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvY2F0aW9uJykudmFsdWU7XHJcblxyXG4gICAgaWYgKCFmYWNpbGl0eUlEIHx8ICFsb2NhdGlvbikge1xyXG4gICAgICAgIGFsZXJ0KFwiUGxlYXNlIGZpbGwgaW4gYm90aCBmaWVsZHMuXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vY3JlYXRlZmFjaWxpdHktNzdoa2kzMnFuYS1udy5hLnJ1bi5hcHAnLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IGZhY2lsaXR5SUQ6IGZhY2lsaXR5SUQsIGxvY2F0aW9uOiBsb2NhdGlvbiB9KSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgICAgYWxlcnQocmVzdWx0Lm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB0b2dnbGVGYWNpbGl0eUZvcm0oKTtcclxuICAgICAgICAgICAgbG9hZEZhY2lsaXRpZXMoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChgRXJyb3I6ICR7cmVzdWx0LmVycm9yfWApO1xyXG4gICAgICAgIH1cclxuICAgIH0gXHJcbiAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGR1cmluZyBmYWNpbGl0eSBjcmVhdGlvbjpcIiwgZXJyb3IpO1xyXG4gICAgICAgIGFsZXJ0KFwiVGhlcmUgd2FzIGFuIGVycm9yIGNyZWF0aW5nIHRoZSBmYWNpbGl0eS5cIik7IFxyXG4gICAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBlZGl0RmFjaWxpdHkoZmFjaWxpdHlJRCl7XHJcbiAgICBsZXQgbmV3TG9jYXRpb24gPSBwcm9tcHQoYEVudGVyIG5ldyBsb2NhdGlvbiBmYWNpbGl0eSAke2ZhY2lsaXR5SUR9OmApO1xyXG5cclxuICAgIGlmICghbmV3TG9jYXRpb24pIHtcclxuICAgICAgICBhbGVydChcIkxvY2F0aW9uIGlzIHJlcXVpcmVkLlwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL3VwZGF0ZWZhY2lsaXR5LTc3aGtpMzJxbmEtbncuYS5ydW4uYXBwJywge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQVVQnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IGZhY2lsaXR5SUQ6IGZhY2lsaXR5SUQsIG5ld0xvY2F0aW9uOiBuZXdMb2NhdGlvbiB9KSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgICAgICBhbGVydChgRmFjaWxpdHkgJHtmYWNpbGl0eUlEfSB1cGRhdGVkIHN1Y2Nlc3NmdWxseSFgKTtcclxuICAgICAgICAgICAgbG9hZEZhY2lsaXRpZXMoKTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChgRXJyb3I6ICR7cmVzdWx0LmVycm9yfWApO1xyXG4gICAgICAgIH1cclxuICAgIH0gXHJcbiAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgdXBkYXRpbmcgZmFjaWxpdHk6XCIsIGVycm9yKTtcclxuICAgICAgICBhbGVydChcIlRoZXJlIHdhcyBhbiBlcnJvciB1cGRhdGluZyB0aGUgZmFjaWxpdHkuXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBkZWxldGVGYWNpbGl0eShmYWNpbGl0eUlEKXtcclxuICAgIGNvbnN0IGNvbmZpcm1lZCA9IHdpbmRvdy5jb25maXJtKGBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgZmFjaWxpdHk/YCk7XHJcbiAgICBpZiAoY29uZmlybWVkKXtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL2RlbGV0ZWZhY2lsaXR5LTc3aGtpMzJxbmEtbncuYS5ydW4uYXBwJywge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgZmFjaWxpdHlJRDogZmFjaWxpdHlJRCB9KSxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KHJlc3VsdC5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIGxvYWRGYWNpbGl0aWVzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChgRXJyb3I6ICR7cmVzdWx0LmVycm9yfWApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGR1cmluZyBkZWxldGlvbjpcIiwgZXJyb3IpO1xyXG4gICAgICAgICAgICBhbGVydChcIlRoZXJlIHdhcyBhbiBlcnJvciBkZWxldGluZyB0aGUgZmFjaWxpdHkuXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlRmFjaWxpdHlGb3JtKCkge1xyXG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmYWNpbGl0eUZvcm0nKTtcclxuICAgIGZvcm0uc3R5bGUuZGlzcGxheSA9IGZvcm0uc3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnID8gJ2Jsb2NrJyA6ICdub25lJztcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmYWNpbGl0eUlEJykudmFsdWUgPSAnJztcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2NhdGlvbicpLnZhbHVlID0gJyc7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRvZ2dsZUNsdWJGb3JtKCkge1xyXG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbHViRm9ybScpO1xyXG4gICAgZm9ybS5zdHlsZS5kaXNwbGF5ID0gZm9ybS5zdHlsZS5kaXNwbGF5ID09PSAnbm9uZScgPyAnYmxvY2snIDogJ25vbmUnO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NsdWJJRCcpLnZhbHVlID0gJyc7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2x1YlNwb3J0JykudmFsdWUgPSAnJztcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYWxvcnlCdXJuUmF0ZScpLnZhbHVlID0gJyc7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHJhaW5lckRyb3Bkb3duJykuc2VsZWN0ZWRJbmRleCA9IDA7XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGxvYWRDbHVicygpIHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vc2hvd2FsbGNsdWJzLTc3aGtpMzJxbmEtbncuYS5ydW4uYXBwJywge1xyXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAocmVzcG9uc2Uub2spIHtcclxuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhLmNsdWJzKTtcclxuXHJcbiAgICAgICAgY29uc3QgdGFibGVCb2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjbHVic1RhYmxlIHRib2R5XCIpO1xyXG4gICAgICAgIHRhYmxlQm9keS5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuICAgICAgICBPYmplY3QuZW50cmllcyhkYXRhLmNsdWJzKS5mb3JFYWNoKChbY2x1YklELCBjbHViXSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIik7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBuYW1lQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuICAgICAgICAgICAgbmFtZUNlbGwudGV4dENvbnRlbnQgPSBjbHViSUQ7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwb3J0Q2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuICAgICAgICAgICAgc3BvcnRDZWxsLnRleHRDb250ZW50ID0gY2x1Yi5zcG9ydDtcclxuICAgICAgICAgICAgY29uc3QgY2Fsb3J5Q2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuICAgICAgICAgICAgY2Fsb3J5Q2VsbC50ZXh0Q29udGVudCA9IGNsdWIuY2Fsb3J5QnVyblJhdGU7XHJcbiAgICAgICAgICAgIGNvbnN0IHRyYWluZXJDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xyXG4gICAgICAgICAgICB0cmFpbmVyQ2VsbC50ZXh0Q29udGVudCA9IGNsdWIudHJhaW5lcjtcclxuICAgICAgICAgICAgY29uc3QgZWRpdENlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgICAgICAgICAgIGVkaXRDZWxsLmlubmVySFRNTCA9IGA8YSBocmVmPVwiI1wiIG9uY2xpY2s9XCJlZGl0Q2x1YignJHtjbHViSUR9JylcIj5cdTI3MEZcdUZFMEY8L2E+YDtcclxuICAgICAgICAgICAgY29uc3QgZGVsZXRlQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuICAgICAgICAgICAgZGVsZXRlQ2VsbC5pbm5lckhUTUwgPSBgPGEgaHJlZj1cIiNcIiBvbmNsaWNrPVwiZGVsZXRlQ2x1YignJHtjbHViSUR9JylcIj5cdTI3NEM8L2E+YDtcclxuXHJcbiAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChuYW1lQ2VsbCk7XHJcbiAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChzcG9ydENlbGwpO1xyXG4gICAgICAgICAgICByb3cuYXBwZW5kQ2hpbGQoY2Fsb3J5Q2VsbCk7XHJcbiAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZCh0cmFpbmVyQ2VsbCk7XHJcbiAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChlZGl0Q2VsbCk7XHJcbiAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChkZWxldGVDZWxsKTtcclxuXHJcbiAgICAgICAgICAgIHRhYmxlQm9keS5hcHBlbmRDaGlsZChyb3cpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBjcmVhdGVDbHViKCkge1xyXG4gICAgY29uc3QgY2x1YklEID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NsdWJJRCcpLnZhbHVlO1xyXG4gICAgY29uc3QgY2x1YlNwb3J0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NsdWJTcG9ydCcpLnZhbHVlO1xyXG4gICAgbGV0IGNhbG9yeUJ1cm5SYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbG9yeUJ1cm5SYXRlJykudmFsdWU7XHJcbiAgICBjb25zdCB0cmFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RyYWluZXJEcm9wZG93bicpLnZhbHVlO1xyXG5cclxuICAgIGlmICghY2x1YklEIHx8ICFjbHViU3BvcnQgfHwgIWNhbG9yeUJ1cm5SYXRlIHx8ICF0cmFpbmVyKSB7XHJcbiAgICAgICAgYWxlcnQoXCJQbGVhc2UgZmlsbCBpbiBhbGwgZmllbGRzLlwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjYWxvcnlCdXJuUmF0ZSA9IHBhcnNlSW50KGNhbG9yeUJ1cm5SYXRlLCAxMCk7XHJcblxyXG4gICAgaWYgKGlzTmFOKGNhbG9yeUJ1cm5SYXRlKSB8fCBjYWxvcnlCdXJuUmF0ZSA8IDEgfHwgY2Fsb3J5QnVyblJhdGUgPiAxMDAwKSB7XHJcbiAgICAgICAgYWxlcnQoXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBjYWxvcnkgYnVybiByYXRlIGJldHdlZW4gMSBhbmQgMTAwMC5cIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0cmFpbmVyRHJvcGRvd24uc2VsZWN0ZWRJbmRleCA9PSAwKXtcclxuICAgICAgICBhbGVydChcIlBsZWFzZSBzZWxlY3QgYSB2YWxpZCB0cmFpbmVyLlwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL2NyZWF0ZWNsdWItNzdoa2kzMnFuYS1udy5hLnJ1bi5hcHAnLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IGNsdWJJRDogY2x1YklELCBzcG9ydDogY2x1YlNwb3J0LCBjYWxvcnlCdXJuUmF0ZTogY2Fsb3J5QnVyblJhdGUsIHRyYWluZXI6IHRyYWluZXIgfSksXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgICAgYWxlcnQocmVzdWx0Lm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB0b2dnbGVDbHViRm9ybSgpO1xyXG4gICAgICAgICAgICBsb2FkQ2x1YnMoKTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChgRXJyb3I6ICR7cmVzdWx0LmVycm9yfWApO1xyXG4gICAgICAgIH1cclxuICAgIH0gXHJcbiAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGR1cmluZyBjbHViIGNyZWF0aW9uOlwiLCBlcnJvcik7XHJcbiAgICAgICAgYWxlcnQoXCJUaGVyZSB3YXMgYW4gZXJyb3IgY3JlYXRpbmcgdGhlIGNsdWIuXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBlZGl0Q2x1YihjbHViSUQpe1xyXG4gICAgbGV0IG5ld1Nwb3J0ID0gcHJvbXB0KGBFbnRlciBuZXcgc3BvcnQgZm9yICR7Y2x1YklEfTpgKTtcclxuICAgIGxldCBuZXdDYWxvcnlCdXJuUmF0ZSA9IHByb21wdChgRW50ZXIgbmV3IGNhbG9yeSBidXJuIHJhdGUgZm9yICR7Y2x1YklEfSAoMS0xMDAwKTpgKTtcclxuXHJcbiAgICBuZXdDYWxvcnlCdXJuUmF0ZSA9IHBhcnNlSW50KG5ld0NhbG9yeUJ1cm5SYXRlLCAxMCk7XHJcbiAgICBpZiAoaXNOYU4obmV3Q2Fsb3J5QnVyblJhdGUpIHx8IG5ld0NhbG9yeUJ1cm5SYXRlIDwgMSB8fCBuZXdDYWxvcnlCdXJuUmF0ZSA+IDEwMDAgfHwgIW5ld1Nwb3J0KSB7XHJcbiAgICAgICAgYWxlcnQoXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBjYWxvcnkgYnVybiByYXRlIGJldHdlZW4gMSBhbmQgMTAwMCBhbmQgYSBjbHViIHNwb3J0IVwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL3VwZGF0ZWNsdWItNzdoa2kzMnFuYS1udy5hLnJ1bi5hcHAnLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BVVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgY2x1YklEOiBjbHViSUQsIG5ld1Nwb3J0OiBuZXdTcG9ydCwgbmV3Q2Fsb3J5QnVyblJhdGU6IG5ld0NhbG9yeUJ1cm5SYXRlIH0pLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KGBDbHViICR7Y2x1YklEfSB1cGRhdGVkIHN1Y2Nlc3NmdWxseSFgKTtcclxuICAgICAgICAgICAgbG9hZENsdWJzKCk7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoYEVycm9yOiAke3Jlc3VsdC5lcnJvcn1gKTtcclxuICAgICAgICB9XHJcbiAgICB9IFxyXG4gICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHVwZGF0aW5nIGNsdWI6XCIsIGVycm9yKTtcclxuICAgICAgICBhbGVydChcIlRoZXJlIHdhcyBhbiBlcnJvciB1cGRhdGluZyB0aGUgY2x1Yi5cIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGRlbGV0ZUNsdWIoY2x1YklEKXtcclxuICAgIGNvbnN0IGNvbmZpcm1lZCA9IHdpbmRvdy5jb25maXJtKGBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgY2x1Yj9gKTtcclxuICAgIGlmIChjb25maXJtZWQpe1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vZGVsZXRlY2x1Yi03N2hraTMycW5hLW53LmEucnVuLmFwcCcsIHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0RFTEVURScsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IGNsdWJJRDogY2x1YklEIH0pLFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQocmVzdWx0Lm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgbG9hZENsdWJzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChgRXJyb3I6ICR7cmVzdWx0LmVycm9yfWApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGR1cmluZyBkZWxldGlvbjpcIiwgZXJyb3IpO1xyXG4gICAgICAgICAgICBhbGVydChcIlRoZXJlIHdhcyBhbiBlcnJvciBkZWxldGluZyB0aGUgY2x1Yi5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBsb2FkVHJhaW5lckRyb3Bkb3duKCkge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cDovLzEyNy4wLjAuMTo1MDAxL3Nwb3J0cy1hcmVuYS0zOWEzMi9ldXJvcGUtd2VzdDIvZmV0Y2hUcmFpbmVyTmFtZXMnLCB7XHJcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChyZXNwb25zZS5vaykge1xyXG4gICAgICAgIGNvbnN0IHRyYWluZXJzID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgIGNvbnN0IHRyYWluZXJEcm9wZG93biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHJhaW5lckRyb3Bkb3duXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRyYWluZXJzKTtcclxuICAgICAgICB0cmFpbmVycy5mb3JFYWNoKHRyYWluZXIgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xyXG4gICAgICAgICAgICBvcHRpb24udmFsdWUgPSB0cmFpbmVyO1xyXG4gICAgICAgICAgICBvcHRpb24udGV4dENvbnRlbnQgPSB0cmFpbmVyXHJcbiAgICAgICAgICAgIHRyYWluZXJEcm9wZG93bi5hcHBlbmRDaGlsZChvcHRpb24pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGxvYWQgdHJhaW5lcnMuXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vL2Jvb2tGYWNpbGl0eSgpXHJcbmNvbnN0IGN1cnJlbnRQYWdlID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xyXG5pZiAoY3VycmVudFBhZ2UuaW5jbHVkZXMoJ21hbmFnZWNsdWJzLmh0bWwnKSkge1xyXG4gICAgbG9hZENsdWJzKCk7XHJcbiAgICBsb2FkVHJhaW5lckRyb3Bkb3duKCk7XHJcbn1cclxuZWxzZSBpZiAoY3VycmVudFBhZ2UuaW5jbHVkZXMoJ21hbmFnZWZhY2lsaXRpZXMuaHRtbCcpKSB7XHJcbiAgICBsb2FkRmFjaWxpdGllcygpOyBcclxufVxyXG5cclxuZG9jdW1lbnQuY3JlYXRlRmFjaWxpdHkgPSBjcmVhdGVGYWNpbGl0eTtcclxuZG9jdW1lbnQuZWRpdEZhY2lsaXR5ID0gZWRpdEZhY2lsaXR5O1xyXG5kb2N1bWVudC5kZWxldGVGYWNpbGl0eSA9IGRlbGV0ZUZhY2lsaXR5O1xyXG5kb2N1bWVudC50b2dnbGVGYWNpbGl0eUZvcm0gPSB0b2dnbGVGYWNpbGl0eUZvcm07XHJcbmRvY3VtZW50LnRvZ2dsZUNsdWJGb3JtID0gdG9nZ2xlQ2x1YkZvcm07XHJcbmRvY3VtZW50LmNyZWF0ZUNsdWIgPSBjcmVhdGVDbHViO1xyXG5kb2N1bWVudC5lZGl0Q2x1YiA9IGVkaXRDbHViO1xyXG5kb2N1bWVudC5kZWxldGVDbHViID0gZGVsZXRlQ2x1YjsiXSwKICAibWFwcGluZ3MiOiAiOztBQXFDQSxpQkFBZSxpQkFBaUI7QUFDNUIsVUFBTSxXQUFXLE1BQU0sTUFBTSxxREFBcUQ7QUFBQSxNQUM5RSxRQUFRO0FBQUEsTUFDUixTQUFTO0FBQUEsUUFDTCxnQkFBZ0I7QUFBQSxNQUNwQjtBQUFBLElBQ0osQ0FBQztBQUVELFFBQUksU0FBUyxJQUFJO0FBQ2IsWUFBTSxPQUFPLE1BQU0sU0FBUyxLQUFLO0FBRWpDLGNBQVEsSUFBSSxLQUFLLFVBQVU7QUFFM0IsWUFBTSxZQUFZLFNBQVMsY0FBYyx3QkFBd0I7QUFDakUsZ0JBQVUsWUFBWTtBQUV0QixhQUFPLFFBQVEsS0FBSyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUMsWUFBWSxRQUFRLE1BQU07QUFDaEUsY0FBTSxNQUFNLFNBQVMsY0FBYyxJQUFJO0FBRXZDLGNBQU0sV0FBVyxTQUFTLGNBQWMsSUFBSTtBQUM1QyxpQkFBUyxjQUFjO0FBQ3ZCLGNBQU0sZUFBZSxTQUFTLGNBQWMsSUFBSTtBQUNoRCxxQkFBYSxjQUFjLFNBQVM7QUFD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QU0sdUNBQXVDO0FBQUEsSUFDakQ7QUFBQSxFQUNKO0FBRUEsaUJBQWUsV0FBVyxRQUFPO0FBQzdCLFVBQU0sWUFBWSxPQUFPLFFBQVEsNENBQTRDO0FBQzdFLFFBQUksV0FBVTtBQUNWLFVBQUk7QUFDQSxjQUFNLFdBQVcsTUFBTSxNQUFNLDhDQUE4QztBQUFBLFVBQ3ZFLFFBQVE7QUFBQSxVQUNSLFNBQVM7QUFBQSxZQUNMLGdCQUFnQjtBQUFBLFVBQ3BCO0FBQUEsVUFDQSxNQUFNLEtBQUssVUFBVSxFQUFFLE9BQWUsQ0FBQztBQUFBLFFBQzNDLENBQUM7QUFFRCxjQUFNLFNBQVMsTUFBTSxTQUFTLEtBQUs7QUFFbkMsWUFBSSxTQUFTLFdBQVcsS0FBSztBQUN6QixnQkFBTSxPQUFPLE9BQU87QUFDcEIsb0JBQVU7QUFBQSxRQUNkLE9BQ0s7QUFDRCxnQkFBTSxVQUFVLGNBQU8sTUFBTztBQUFBLFFBQ2xDO0FBQUEsTUFDSixTQUNPLE9BQU87QUFDVixnQkFBUSxJQUFJLDBCQUEwQixLQUFLO0FBQzNDLGNBQU0sdUNBQXVDO0FBQUEsTUFDakQ7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUVBLGlCQUFlLHNCQUFzQjtBQUNqQyxVQUFNLFdBQVcsTUFBTSxNQUFNLDJFQUEyRTtBQUFBLE1BQ3BHLFFBQVE7QUFBQSxNQUNSLFNBQVM7QUFBQSxRQUNMLGdCQUFnQjtBQUFBLE1BQ3BCO0FBQUEsSUFDSixDQUFDO0FBRUQsUUFBSSxTQUFTLElBQUk7QUFDYixZQUFNLFdBQVcsTUFBTSxTQUFTLEtBQUs7QUFDckMsWUFBTUEsbUJBQWtCLFNBQVMsZUFBZSxpQkFBaUI7QUFDakUsY0FBUSxJQUFJLFFBQVE7QUFDcEIsZUFBUyxRQUFRLGFBQVc7QUFDeEIsY0FBTSxTQUFTLFNBQVMsY0FBYyxRQUFRO0FBQzlDLGVBQU8sUUFBUTtBQUNmLGVBQU8sY0FBYztBQUNyQixRQUFBQSxpQkFBZ0IsWUFBWSxNQUFNO0FBQUEsTUFDdEMsQ0FBQztBQUFBLElBQ0wsT0FBTztBQUNILGNBQVEsTUFBTSwwQkFBMEI7QUFBQSxJQUM1QztBQUFBLEVBQ0o7QUFHQSxNQUFNLGNBQWMsT0FBTyxTQUFTO0FBQ3BDLE1BQUksWUFBWSxTQUFTLGtCQUFrQixHQUFHO0FBQzFDLGNBQVU7QUFDVix3QkFBb0I7QUFBQSxFQUN4QixXQUNTLFlBQVksU0FBUyx1QkFBdUIsR0FBRztBQUNwRCxtQkFBZTtBQUFBLEVBQ25CO0FBRUEsV0FBUyxpQkFBaUI7QUFDMUIsV0FBUyxlQUFlO0FBQ3hCLFdBQVMsaUJBQWlCO0FBQzFCLFdBQVMscUJBQXFCO0FBQzlCLFdBQVMsaUJBQWlCO0FBQzFCLFdBQVMsYUFBYTtBQUN0QixXQUFTLFdBQVc7QUFDcEIsV0FBUyxhQUFhOyIsCiAgIm5hbWVzIjogWyJ0cmFpbmVyRHJvcGRvd24iXQp9Cg==
