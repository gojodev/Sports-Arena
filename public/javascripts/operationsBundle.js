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
      const trainerResponse = await fetch("http://127.0.0.1:5001/sports-arena-39a32/europe-west2/fetchTrainerNames", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      let trainers = [];
      if (trainerResponse.ok) {
        trainers = await trainerResponse.json();
      }
      const trainerMap = /* @__PURE__ */ new Map();
      trainers.forEach((trainer) => {
        trainerMap.set(trainer.key, trainer.name);
      });
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
        trainerCell.textContent = trainerMap.get(club.trainer) || "Unknown Trainer";
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
        option.value = trainer.key;
        option.textContent = trainer.name;
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsib3BlcmF0aW9ucy5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiYXN5bmMgZnVuY3Rpb24gYm9va0ZhY2lsaXR5KCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9ICdUZWFtIFRyYWluaW5nIFNlc3Npb25cIic7XHJcbiAgICAgICAgY29uc3QgY2x1YklEID0gJ0Jhc2tldGJhbGwgQ2x1Yic7XHJcbiAgICAgICAgY29uc3QgZmFjaWxpdHlJRCA9ICdCYXNrZXRiYWxsIENvdXJ0IDEnO1xyXG4gICAgICAgIGNvbnN0IGRhdGV0aW1lID0gJzIwMjQtMTItMTBUMTQ6MDA6MDBaJztcclxuICAgICAgICBjb25zdCBkdXJhdGlvbiA9IDYwO1xyXG5cclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwOi8vMTI3LjAuMC4xOjUwMDEvc3BvcnRzLWFyZW5hLTM5YTMyL2V1cm9wZS13ZXN0Mi9ib29rRmFjaWxpdHknLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgICAgICBjbHViSUQ6IGNsdWJJRCxcclxuICAgICAgICAgICAgICAgIGZhY2lsaXR5SUQ6IGZhY2lsaXR5SUQsXHJcbiAgICAgICAgICAgICAgICBkYXRldGltZTogZGF0ZXRpbWUsXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb24sXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVycm9yRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3JEYXRhKTtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBIVFRQIGVycm9yISBTdGF0dXM6ICR7cmVzcG9uc2Uuc3RhdHVzfWApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgYm9va2luZ0RhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgYWxlcnQoXCJCb29raW5nIHN1Y2Nlc3NmdWwhXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdCb29raW5nIFN1Y2Nlc3NmdWw6JywgYm9va2luZ0RhdGEpO1xyXG4gICAgICAgIHJldHVybiBib29raW5nRGF0YTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgYm9va2luZyBmYWNpbGl0eTonLCBlcnJvcik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGxvYWRGYWNpbGl0aWVzKCkge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9zaG93YWxsZmFjaWxpdGllcy03N2hraTMycW5hLW53LmEucnVuLmFwcCcsIHtcclxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YS5mYWNpbGl0aWVzKTtcclxuXHJcbiAgICAgICAgY29uc3QgdGFibGVCb2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmYWNpbGl0aWVzVGFibGUgdGJvZHlcIik7XHJcbiAgICAgICAgdGFibGVCb2R5LmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG4gICAgICAgIE9iamVjdC5lbnRyaWVzKGRhdGEuZmFjaWxpdGllcykuZm9yRWFjaCgoW2ZhY2lsaXR5SUQsIGZhY2lsaXR5XSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIik7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBuYW1lQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuICAgICAgICAgICAgbmFtZUNlbGwudGV4dENvbnRlbnQgPSBmYWNpbGl0eUlEO1xyXG4gICAgICAgICAgICBjb25zdCBsb2NhdGlvbkNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uQ2VsbC50ZXh0Q29udGVudCA9IGZhY2lsaXR5LmxvY2F0aW9uO1xyXG4gICAgICAgICAgICBjb25zdCBlZGl0Q2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuICAgICAgICAgICAgZWRpdENlbGwuaW5uZXJIVE1MID0gYDxhIGhyZWY9XCIjXCIgb25jbGljaz1cImVkaXRGYWNpbGl0eSgnJHtmYWNpbGl0eUlEfScpXCI+XHUyNzBGXHVGRTBGPC9hPmA7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlbGV0ZUNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgICAgICAgICAgIGRlbGV0ZUNlbGwuaW5uZXJIVE1MID0gYDxhIGhyZWY9XCIjXCIgb25jbGljaz1cImRlbGV0ZUZhY2lsaXR5KCcke2ZhY2lsaXR5SUR9JylcIj5cdTI3NEM8L2E+YDtcclxuXHJcbiAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChuYW1lQ2VsbCk7XHJcbiAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChsb2NhdGlvbkNlbGwpO1xyXG4gICAgICAgICAgICByb3cuYXBwZW5kQ2hpbGQoZWRpdENlbGwpO1xyXG4gICAgICAgICAgICByb3cuYXBwZW5kQ2hpbGQoZGVsZXRlQ2VsbCk7XHJcblxyXG4gICAgICAgICAgICB0YWJsZUJvZHkuYXBwZW5kQ2hpbGQocm93KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlRmFjaWxpdHkoKSB7XHJcbiAgICBjb25zdCBmYWNpbGl0eUlEID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZhY2lsaXR5SUQnKS52YWx1ZTtcclxuICAgIGNvbnN0IGxvY2F0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvY2F0aW9uJykudmFsdWU7XHJcblxyXG4gICAgaWYgKCFmYWNpbGl0eUlEIHx8ICFsb2NhdGlvbikge1xyXG4gICAgICAgIGFsZXJ0KFwiUGxlYXNlIGZpbGwgaW4gYm90aCBmaWVsZHMuXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vY3JlYXRlZmFjaWxpdHktNzdoa2kzMnFuYS1udy5hLnJ1bi5hcHAnLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IGZhY2lsaXR5SUQ6IGZhY2lsaXR5SUQsIGxvY2F0aW9uOiBsb2NhdGlvbiB9KSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgICAgYWxlcnQocmVzdWx0Lm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB0b2dnbGVGYWNpbGl0eUZvcm0oKTtcclxuICAgICAgICAgICAgbG9hZEZhY2lsaXRpZXMoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChgRXJyb3I6ICR7cmVzdWx0LmVycm9yfWApO1xyXG4gICAgICAgIH1cclxuICAgIH0gXHJcbiAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGR1cmluZyBmYWNpbGl0eSBjcmVhdGlvbjpcIiwgZXJyb3IpO1xyXG4gICAgICAgIGFsZXJ0KFwiVGhlcmUgd2FzIGFuIGVycm9yIGNyZWF0aW5nIHRoZSBmYWNpbGl0eS5cIik7IFxyXG4gICAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBlZGl0RmFjaWxpdHkoZmFjaWxpdHlJRCl7XHJcbiAgICBsZXQgbmV3TG9jYXRpb24gPSBwcm9tcHQoYEVudGVyIG5ldyBsb2NhdGlvbiBmYWNpbGl0eSAke2ZhY2lsaXR5SUR9OmApO1xyXG5cclxuICAgIGlmICghbmV3TG9jYXRpb24pIHtcclxuICAgICAgICBhbGVydChcIkxvY2F0aW9uIGlzIHJlcXVpcmVkLlwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL3VwZGF0ZWZhY2lsaXR5LTc3aGtpMzJxbmEtbncuYS5ydW4uYXBwJywge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQVVQnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IGZhY2lsaXR5SUQ6IGZhY2lsaXR5SUQsIG5ld0xvY2F0aW9uOiBuZXdMb2NhdGlvbiB9KSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgICAgICBhbGVydChgRmFjaWxpdHkgJHtmYWNpbGl0eUlEfSB1cGRhdGVkIHN1Y2Nlc3NmdWxseSFgKTtcclxuICAgICAgICAgICAgbG9hZEZhY2lsaXRpZXMoKTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChgRXJyb3I6ICR7cmVzdWx0LmVycm9yfWApO1xyXG4gICAgICAgIH1cclxuICAgIH0gXHJcbiAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgdXBkYXRpbmcgZmFjaWxpdHk6XCIsIGVycm9yKTtcclxuICAgICAgICBhbGVydChcIlRoZXJlIHdhcyBhbiBlcnJvciB1cGRhdGluZyB0aGUgZmFjaWxpdHkuXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBkZWxldGVGYWNpbGl0eShmYWNpbGl0eUlEKXtcclxuICAgIGNvbnN0IGNvbmZpcm1lZCA9IHdpbmRvdy5jb25maXJtKGBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgZmFjaWxpdHk/YCk7XHJcbiAgICBpZiAoY29uZmlybWVkKXtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL2RlbGV0ZWZhY2lsaXR5LTc3aGtpMzJxbmEtbncuYS5ydW4uYXBwJywge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgZmFjaWxpdHlJRDogZmFjaWxpdHlJRCB9KSxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KHJlc3VsdC5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIGxvYWRGYWNpbGl0aWVzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChgRXJyb3I6ICR7cmVzdWx0LmVycm9yfWApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGR1cmluZyBkZWxldGlvbjpcIiwgZXJyb3IpO1xyXG4gICAgICAgICAgICBhbGVydChcIlRoZXJlIHdhcyBhbiBlcnJvciBkZWxldGluZyB0aGUgZmFjaWxpdHkuXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlRmFjaWxpdHlGb3JtKCkge1xyXG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmYWNpbGl0eUZvcm0nKTtcclxuICAgIGZvcm0uc3R5bGUuZGlzcGxheSA9IGZvcm0uc3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnID8gJ2Jsb2NrJyA6ICdub25lJztcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmYWNpbGl0eUlEJykudmFsdWUgPSAnJztcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2NhdGlvbicpLnZhbHVlID0gJyc7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRvZ2dsZUNsdWJGb3JtKCkge1xyXG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbHViRm9ybScpO1xyXG4gICAgZm9ybS5zdHlsZS5kaXNwbGF5ID0gZm9ybS5zdHlsZS5kaXNwbGF5ID09PSAnbm9uZScgPyAnYmxvY2snIDogJ25vbmUnO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NsdWJJRCcpLnZhbHVlID0gJyc7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2x1YlNwb3J0JykudmFsdWUgPSAnJztcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYWxvcnlCdXJuUmF0ZScpLnZhbHVlID0gJyc7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHJhaW5lckRyb3Bkb3duJykuc2VsZWN0ZWRJbmRleCA9IDA7XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGxvYWRDbHVicygpIHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vc2hvd2FsbGNsdWJzLTc3aGtpMzJxbmEtbncuYS5ydW4uYXBwJywge1xyXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAocmVzcG9uc2Uub2spIHtcclxuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhLmNsdWJzKTtcclxuXHJcbiAgICAgICAgY29uc3QgdHJhaW5lclJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHA6Ly8xMjcuMC4wLjE6NTAwMS9zcG9ydHMtYXJlbmEtMzlhMzIvZXVyb3BlLXdlc3QyL2ZldGNoVHJhaW5lck5hbWVzJywge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgXHJcbiAgICAgICAgbGV0IHRyYWluZXJzID0gW107XHJcbiAgICAgICAgaWYgKHRyYWluZXJSZXNwb25zZS5vaykge1xyXG4gICAgICAgICAgICB0cmFpbmVycyA9IGF3YWl0IHRyYWluZXJSZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB0cmFpbmVyTWFwID0gbmV3IE1hcCgpO1xyXG4gICAgICAgIHRyYWluZXJzLmZvckVhY2godHJhaW5lciA9PiB7XHJcbiAgICAgICAgICAgIHRyYWluZXJNYXAuc2V0KHRyYWluZXIua2V5LCB0cmFpbmVyLm5hbWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCB0YWJsZUJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NsdWJzVGFibGUgdGJvZHlcIik7XHJcbiAgICAgICAgdGFibGVCb2R5LmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG4gICAgICAgIE9iamVjdC5lbnRyaWVzKGRhdGEuY2x1YnMpLmZvckVhY2goKFtjbHViSUQsIGNsdWJdKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWVDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xyXG4gICAgICAgICAgICBuYW1lQ2VsbC50ZXh0Q29udGVudCA9IGNsdWJJRDtcclxuICAgICAgICAgICAgY29uc3Qgc3BvcnRDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xyXG4gICAgICAgICAgICBzcG9ydENlbGwudGV4dENvbnRlbnQgPSBjbHViLnNwb3J0O1xyXG4gICAgICAgICAgICBjb25zdCBjYWxvcnlDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xyXG4gICAgICAgICAgICBjYWxvcnlDZWxsLnRleHRDb250ZW50ID0gY2x1Yi5jYWxvcnlCdXJuUmF0ZTtcclxuICAgICAgICAgICAgY29uc3QgdHJhaW5lckNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgICAgICAgICAgIHRyYWluZXJDZWxsLnRleHRDb250ZW50ID0gdHJhaW5lck1hcC5nZXQoY2x1Yi50cmFpbmVyKSB8fCBcIlVua25vd24gVHJhaW5lclwiO1xyXG4gICAgICAgICAgICBjb25zdCBlZGl0Q2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuICAgICAgICAgICAgZWRpdENlbGwuaW5uZXJIVE1MID0gYDxhIGhyZWY9XCIjXCIgb25jbGljaz1cImVkaXRDbHViKCcke2NsdWJJRH0nKVwiPlx1MjcwRlx1RkUwRjwvYT5gO1xyXG4gICAgICAgICAgICBjb25zdCBkZWxldGVDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xyXG4gICAgICAgICAgICBkZWxldGVDZWxsLmlubmVySFRNTCA9IGA8YSBocmVmPVwiI1wiIG9uY2xpY2s9XCJkZWxldGVDbHViKCcke2NsdWJJRH0nKVwiPlx1Mjc0QzwvYT5gO1xyXG5cclxuICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKG5hbWVDZWxsKTtcclxuICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKHNwb3J0Q2VsbCk7XHJcbiAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChjYWxvcnlDZWxsKTtcclxuICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKHRyYWluZXJDZWxsKTtcclxuICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKGVkaXRDZWxsKTtcclxuICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKGRlbGV0ZUNlbGwpO1xyXG5cclxuICAgICAgICAgICAgdGFibGVCb2R5LmFwcGVuZENoaWxkKHJvdyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUNsdWIoKSB7XHJcbiAgICBjb25zdCBjbHViSUQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2x1YklEJykudmFsdWU7XHJcbiAgICBjb25zdCBjbHViU3BvcnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2x1YlNwb3J0JykudmFsdWU7XHJcbiAgICBsZXQgY2Fsb3J5QnVyblJhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2Fsb3J5QnVyblJhdGUnKS52YWx1ZTtcclxuICAgIGNvbnN0IHRyYWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHJhaW5lckRyb3Bkb3duJykudmFsdWU7XHJcblxyXG4gICAgaWYgKCFjbHViSUQgfHwgIWNsdWJTcG9ydCB8fCAhY2Fsb3J5QnVyblJhdGUgfHwgIXRyYWluZXIpIHtcclxuICAgICAgICBhbGVydChcIlBsZWFzZSBmaWxsIGluIGFsbCBmaWVsZHMuXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNhbG9yeUJ1cm5SYXRlID0gcGFyc2VJbnQoY2Fsb3J5QnVyblJhdGUsIDEwKTtcclxuXHJcbiAgICBpZiAoaXNOYU4oY2Fsb3J5QnVyblJhdGUpIHx8IGNhbG9yeUJ1cm5SYXRlIDwgMSB8fCBjYWxvcnlCdXJuUmF0ZSA+IDEwMDApIHtcclxuICAgICAgICBhbGVydChcIlBsZWFzZSBlbnRlciBhIHZhbGlkIGNhbG9yeSBidXJuIHJhdGUgYmV0d2VlbiAxIGFuZCAxMDAwLlwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRyYWluZXJEcm9wZG93bi5zZWxlY3RlZEluZGV4ID09IDApe1xyXG4gICAgICAgIGFsZXJ0KFwiUGxlYXNlIHNlbGVjdCBhIHZhbGlkIHRyYWluZXIuXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vY3JlYXRlY2x1Yi03N2hraTMycW5hLW53LmEucnVuLmFwcCcsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgY2x1YklEOiBjbHViSUQsIHNwb3J0OiBjbHViU3BvcnQsIGNhbG9yeUJ1cm5SYXRlOiBjYWxvcnlCdXJuUmF0ZSwgdHJhaW5lcjogdHJhaW5lciB9KSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgICAgICBhbGVydChyZXN1bHQubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIHRvZ2dsZUNsdWJGb3JtKCk7XHJcbiAgICAgICAgICAgIGxvYWRDbHVicygpO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KGBFcnJvcjogJHtyZXN1bHQuZXJyb3J9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBcclxuICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgZHVyaW5nIGNsdWIgY3JlYXRpb246XCIsIGVycm9yKTtcclxuICAgICAgICBhbGVydChcIlRoZXJlIHdhcyBhbiBlcnJvciBjcmVhdGluZyB0aGUgY2x1Yi5cIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGVkaXRDbHViKGNsdWJJRCl7XHJcbiAgICBsZXQgbmV3U3BvcnQgPSBwcm9tcHQoYEVudGVyIG5ldyBzcG9ydCBmb3IgJHtjbHViSUR9OmApO1xyXG4gICAgbGV0IG5ld0NhbG9yeUJ1cm5SYXRlID0gcHJvbXB0KGBFbnRlciBuZXcgY2Fsb3J5IGJ1cm4gcmF0ZSBmb3IgJHtjbHViSUR9ICgxLTEwMDApOmApO1xyXG5cclxuICAgIG5ld0NhbG9yeUJ1cm5SYXRlID0gcGFyc2VJbnQobmV3Q2Fsb3J5QnVyblJhdGUsIDEwKTtcclxuICAgIGlmIChpc05hTihuZXdDYWxvcnlCdXJuUmF0ZSkgfHwgbmV3Q2Fsb3J5QnVyblJhdGUgPCAxIHx8IG5ld0NhbG9yeUJ1cm5SYXRlID4gMTAwMCB8fCAhbmV3U3BvcnQpIHtcclxuICAgICAgICBhbGVydChcIlBsZWFzZSBlbnRlciBhIHZhbGlkIGNhbG9yeSBidXJuIHJhdGUgYmV0d2VlbiAxIGFuZCAxMDAwIGFuZCBhIGNsdWIgc3BvcnQhXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vdXBkYXRlY2x1Yi03N2hraTMycW5hLW53LmEucnVuLmFwcCcsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBjbHViSUQ6IGNsdWJJRCwgbmV3U3BvcnQ6IG5ld1Nwb3J0LCBuZXdDYWxvcnlCdXJuUmF0ZTogbmV3Q2Fsb3J5QnVyblJhdGUgfSksXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgICAgYWxlcnQoYENsdWIgJHtjbHViSUR9IHVwZGF0ZWQgc3VjY2Vzc2Z1bGx5IWApO1xyXG4gICAgICAgICAgICBsb2FkQ2x1YnMoKTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChgRXJyb3I6ICR7cmVzdWx0LmVycm9yfWApO1xyXG4gICAgICAgIH1cclxuICAgIH0gXHJcbiAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgdXBkYXRpbmcgY2x1YjpcIiwgZXJyb3IpO1xyXG4gICAgICAgIGFsZXJ0KFwiVGhlcmUgd2FzIGFuIGVycm9yIHVwZGF0aW5nIHRoZSBjbHViLlwiKTtcclxuICAgIH1cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gZGVsZXRlQ2x1YihjbHViSUQpe1xyXG4gICAgY29uc3QgY29uZmlybWVkID0gd2luZG93LmNvbmZpcm0oYEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBjbHViP2ApO1xyXG4gICAgaWYgKGNvbmZpcm1lZCl7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9kZWxldGVjbHViLTc3aGtpMzJxbmEtbncuYS5ydW4uYXBwJywge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgY2x1YklEOiBjbHViSUQgfSksXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChyZXN1bHQubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICBsb2FkQ2x1YnMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KGBFcnJvcjogJHtyZXN1bHQuZXJyb3J9YCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgZHVyaW5nIGRlbGV0aW9uOlwiLCBlcnJvcik7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiVGhlcmUgd2FzIGFuIGVycm9yIGRlbGV0aW5nIHRoZSBjbHViLlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGxvYWRUcmFpbmVyRHJvcGRvd24oKSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwOi8vMTI3LjAuMC4xOjUwMDEvc3BvcnRzLWFyZW5hLTM5YTMyL2V1cm9wZS13ZXN0Mi9mZXRjaFRyYWluZXJOYW1lcycsIHtcclxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgY29uc3QgdHJhaW5lcnMgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgY29uc3QgdHJhaW5lckRyb3Bkb3duID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0cmFpbmVyRHJvcGRvd25cIik7XHJcbiAgICAgICAgY29uc29sZS5sb2codHJhaW5lcnMpO1xyXG4gICAgICAgIHRyYWluZXJzLmZvckVhY2godHJhaW5lciA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XHJcbiAgICAgICAgICAgIG9wdGlvbi52YWx1ZSA9IHRyYWluZXIua2V5O1xyXG4gICAgICAgICAgICBvcHRpb24udGV4dENvbnRlbnQgPSB0cmFpbmVyLm5hbWU7XHJcbiAgICAgICAgICAgIHRyYWluZXJEcm9wZG93bi5hcHBlbmRDaGlsZChvcHRpb24pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGxvYWQgdHJhaW5lcnMuXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vL2Jvb2tGYWNpbGl0eSgpXHJcbmNvbnN0IGN1cnJlbnRQYWdlID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xyXG5pZiAoY3VycmVudFBhZ2UuaW5jbHVkZXMoJ21hbmFnZWNsdWJzLmh0bWwnKSkge1xyXG4gICAgbG9hZENsdWJzKCk7XHJcbiAgICBsb2FkVHJhaW5lckRyb3Bkb3duKCk7XHJcbn1cclxuZWxzZSBpZiAoY3VycmVudFBhZ2UuaW5jbHVkZXMoJ21hbmFnZWZhY2lsaXRpZXMuaHRtbCcpKSB7XHJcbiAgICBsb2FkRmFjaWxpdGllcygpOyBcclxufVxyXG5cclxuZG9jdW1lbnQuY3JlYXRlRmFjaWxpdHkgPSBjcmVhdGVGYWNpbGl0eTtcclxuZG9jdW1lbnQuZWRpdEZhY2lsaXR5ID0gZWRpdEZhY2lsaXR5O1xyXG5kb2N1bWVudC5kZWxldGVGYWNpbGl0eSA9IGRlbGV0ZUZhY2lsaXR5O1xyXG5kb2N1bWVudC50b2dnbGVGYWNpbGl0eUZvcm0gPSB0b2dnbGVGYWNpbGl0eUZvcm07XHJcbmRvY3VtZW50LnRvZ2dsZUNsdWJGb3JtID0gdG9nZ2xlQ2x1YkZvcm07XHJcbmRvY3VtZW50LmNyZWF0ZUNsdWIgPSBjcmVhdGVDbHViO1xyXG5kb2N1bWVudC5lZGl0Q2x1YiA9IGVkaXRDbHViO1xyXG5kb2N1bWVudC5kZWxldGVDbHViID0gZGVsZXRlQ2x1YjsiXSwKICAibWFwcGluZ3MiOiAiOztBQXFDQSxpQkFBZSxpQkFBaUI7QUFDNUIsVUFBTSxXQUFXLE1BQU0sTUFBTSxxREFBcUQ7QUFBQSxNQUM5RSxRQUFRO0FBQUEsTUFDUixTQUFTO0FBQUEsUUFDTCxnQkFBZ0I7QUFBQSxNQUNwQjtBQUFBLElBQ0osQ0FBQztBQUVELFFBQUksU0FBUyxJQUFJO0FBQ2IsWUFBTSxPQUFPLE1BQU0sU0FBUyxLQUFLO0FBRWpDLGNBQVEsSUFBSSxLQUFLLFVBQVU7QUFFM0IsWUFBTSxZQUFZLFNBQVMsY0FBYyx3QkFBd0I7QUFDakUsZ0JBQVUsWUFBWTtBQUV0QixhQUFPLFFBQVEsS0FBSyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUMsWUFBWSxRQUFRLE1BQU07QUFDaEUsY0FBTSxNQUFNLFNBQVMsY0FBYyxJQUFJO0FBRXZDLGNBQU0sV0FBVyxTQUFTLGNBQWMsSUFBSTtBQUM1QyxpQkFBUyxjQUFjO0FBQ3ZCLGNBQU0sZUFBZSxTQUFTLGNBQWMsSUFBSTtBQUNoRCxxQkFBYSxjQUFjLFNBQVM7QUFDcEMsY0FBTSxXQUFXLFNBQVMsY0FBYyxJQUFJO0FBQzVDLGlCQUFTLFlBQVksdUNBQXNDLG1CQUFVO0FBQ3JFLGNBQU0sYUFBYSxTQUFTLGNBQWMsSUFBSTtBQUM5QyxtQkFBVyxZQUFZLHlDQUF3QyxtQkFBVTtBQUV6RSxZQUFJLFlBQVksUUFBUTtBQUN4QixZQUFJLFlBQVksWUFBWTtBQUM1QixZQUFJLFlBQVksUUFBUTtBQUN4QixZQUFJLFlBQVksVUFBVTtBQUUxQixrQkFBVSxZQUFZLEdBQUc7QUFBQSxNQUM3QixDQUFDO0FBQUEsSUFDTDtBQUFBLEVBQ0o7QUFFQSxpQkFBZSxpQkFB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QUFDVixjQUFRLE1BQU0sd0JBQXdCLEtBQUs7QUFDM0MsWUFBTSx1Q0FBdUM7QUFBQSxJQUNqRDtBQUFBLEVBQ0o7QUFFQSxpQkFBZSxXQUFXLFFBQU87QUFDN0IsVUFBTSxZQUFZLE9BQU8sUUFBUSw0Q0FBNEM7QUFDN0UsUUFBSSxXQUFVO0FBQ1YsVUFBSTtBQUNBLGNBQU0sV0FBVyxNQUFNLE1BQU0sOENBQThDO0FBQUEsVUFDdkUsUUFBUTtBQUFBLFVBQ1IsU0FBUztBQUFBLFlBQ0wsZ0JBQWdCO0FBQUEsVUFDcEI7QUFBQSxVQUNBLE1BQU0sS0FBSyxVQUFVLEVBQUUsT0FBZSxDQUFDO0FBQUEsUUFDM0MsQ0FBQztBQUVELGNBQU0sU0FBUyxNQUFNLFNBQVMsS0FBSztBQUVuQyxZQUFJLFNBQVMsV0FBVyxLQUFLO0FBQ3pCLGdCQUFNLE9BQU8sT0FBTztBQUNwQixvQkFBVTtBQUFBLFFBQ2QsT0FDSztBQUNELGdCQUFNLFVBQVUsY0FBTyxNQUFPO0FBQUEsUUFDbEM7QUFBQSxNQUNKLFNBQ08sT0FBTztBQUNWLGdCQUFRLElBQUksMEJBQTBCLEtBQUs7QUFDM0MsY0FBTSx1Q0FBdUM7QUFBQSxNQUNqRDtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBRUEsaUJBQWUsc0JBQXNCO0FBQ2pDLFVBQU0sV0FBVyxNQUFNLE1BQU0sMkVBQTJFO0FBQUEsTUFDcEcsUUFBUTtBQUFBLE1BQ1IsU0FBUztBQUFBLFFBQ0wsZ0JBQWdCO0FBQUEsTUFDcEI7QUFBQSxJQUNKLENBQUM7QUFFRCxRQUFJLFNBQVMsSUFBSTtBQUNiLFlBQU0sV0FBVyxNQUFNLFNBQVMsS0FBSztBQUNyQyxZQUFNQSxtQkFBa0IsU0FBUyxlQUFlLGlCQUFpQjtBQUNqRSxjQUFRLElBQUksUUFBUTtBQUNwQixlQUFTLFFBQVEsYUFBVztBQUN4QixjQUFNLFNBQVMsU0FBUyxjQUFjLFFBQVE7QUFDOUMsZUFBTyxRQUFRLFFBQVE7QUFDdkIsZUFBTyxjQUFjLFFBQVE7QUFDN0IsUUFBQUEsaUJBQWdCLFlBQVksTUFBTTtBQUFBLE1BQ3RDLENBQUM7QUFBQSxJQUNMLE9BQU87QUFDSCxjQUFRLE1BQU0sMEJBQTBCO0FBQUEsSUFDNUM7QUFBQSxFQUNKO0FBR0EsTUFBTSxjQUFjLE9BQU8sU0FBUztBQUNwQyxNQUFJLFlBQVksU0FBUyxrQkFBa0IsR0FBRztBQUMxQyxjQUFVO0FBQ1Ysd0JBQW9CO0FBQUEsRUFDeEIsV0FDUyxZQUFZLFNBQVMsdUJBQXVCLEdBQUc7QUFDcEQsbUJBQWU7QUFBQSxFQUNuQjtBQUVBLFdBQVMsaUJBQWlCO0FBQzFCLFdBQVMsZUFBZTtBQUN4QixXQUFTLGlCQUFpQjtBQUMxQixXQUFTLHFCQUFxQjtBQUM5QixXQUFTLGlCQUFpQjtBQUMxQixXQUFTLGFBQWE7QUFDdEIsV0FBUyxXQUFXO0FBQ3BCLFdBQVMsYUFBYTsiLAogICJuYW1lcyI6IFsidHJhaW5lckRyb3Bkb3duIl0KfQo=
