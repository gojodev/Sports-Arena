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
      const trainerResponse = await fetch("https://fetchtrainernames-77hki32qna-nw.a.run.app", {
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
    const response = await fetch("https://fetchtrainernames-77hki32qna-nw.a.run.app", {
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
  function filterFacilityTable() {
    const searchValue = document.getElementById("facilitySearch").value.toLowerCase();
    const table = document.getElementById("facilitiesTable");
    const rows = table.getElementsByTagName("tr");
    for (let i = 1; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName("td");
      const nameCell = cells[0];
      if (nameCell) {
        const facilityName = nameCell.textContent || nameCell.innerText;
        let matchFacility = facilityName.toLowerCase().includes(searchValue);
        if (matchFacility) {
          rows[i].style.display = "";
        } else {
          rows[i].style.display = "none";
        }
      }
    }
  }
  function filterClubTable() {
    const searchValue = document.getElementById("clubSearch").value.toLowerCase();
    const table = document.getElementById("clubsTable");
    const rows = table.getElementsByTagName("tr");
    for (let i = 1; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName("td");
      const nameCell = cells[0];
      if (nameCell) {
        const clubName = nameCell.textContent || nameCell.innerText;
        let matchClub = clubName.toLowerCase().includes(searchValue);
        if (matchClub) {
          rows[i].style.display = "";
        } else {
          rows[i].style.display = "none";
        }
      }
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
  document.filterFacilityTable = filterFacilityTable;
  document.filterClubTable = filterClubTable;
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsib3BlcmF0aW9ucy5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiYXN5bmMgZnVuY3Rpb24gYm9va0ZhY2lsaXR5KCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9ICdUZWFtIFRyYWluaW5nIFNlc3Npb25cIic7XHJcbiAgICAgICAgY29uc3QgY2x1YklEID0gJ0Jhc2tldGJhbGwgQ2x1Yic7XHJcbiAgICAgICAgY29uc3QgZmFjaWxpdHlJRCA9ICdCYXNrZXRiYWxsIENvdXJ0IDEnO1xyXG4gICAgICAgIGNvbnN0IGRhdGV0aW1lID0gJzIwMjQtMTItMTBUMTQ6MDA6MDBaJztcclxuICAgICAgICBjb25zdCBkdXJhdGlvbiA9IDYwO1xyXG5cclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL2Jvb2tmYWNpbGl0eS03N2hraTMycW5hLW53LmEucnVuLmFwcCcsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgICAgIGNsdWJJRDogY2x1YklELFxyXG4gICAgICAgICAgICAgICAgZmFjaWxpdHlJRDogZmFjaWxpdHlJRCxcclxuICAgICAgICAgICAgICAgIGRhdGV0aW1lOiBkYXRldGltZSxcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbixcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcclxuICAgICAgICAgICAgY29uc3QgZXJyb3JEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvckRhdGEpO1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEhUVFAgZXJyb3IhIFN0YXR1czogJHtyZXNwb25zZS5zdGF0dXN9YCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBib29raW5nRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICBhbGVydChcIkJvb2tpbmcgc3VjY2Vzc2Z1bCFcIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0Jvb2tpbmcgU3VjY2Vzc2Z1bDonLCBib29raW5nRGF0YSk7XHJcbiAgICAgICAgcmV0dXJuIGJvb2tpbmdEYXRhO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBib29raW5nIGZhY2lsaXR5OicsIGVycm9yKTtcclxuICAgIH1cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gbG9hZEZhY2lsaXRpZXMoKSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL3Nob3dhbGxmYWNpbGl0aWVzLTc3aGtpMzJxbmEtbncuYS5ydW4uYXBwJywge1xyXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAocmVzcG9uc2Uub2spIHtcclxuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhLmZhY2lsaXRpZXMpO1xyXG5cclxuICAgICAgICBjb25zdCB0YWJsZUJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2ZhY2lsaXRpZXNUYWJsZSB0Ym9keVwiKTtcclxuICAgICAgICB0YWJsZUJvZHkuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcbiAgICAgICAgT2JqZWN0LmVudHJpZXMoZGF0YS5mYWNpbGl0aWVzKS5mb3JFYWNoKChbZmFjaWxpdHlJRCwgZmFjaWxpdHldKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWVDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xyXG4gICAgICAgICAgICBuYW1lQ2VsbC50ZXh0Q29udGVudCA9IGZhY2lsaXR5SUQ7XHJcbiAgICAgICAgICAgIGNvbnN0IGxvY2F0aW9uQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuICAgICAgICAgICAgbG9jYXRpb25DZWxsLnRleHRDb250ZW50ID0gZmFjaWxpdHkubG9jYXRpb247XHJcbiAgICAgICAgICAgIGNvbnN0IGVkaXRDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xyXG4gICAgICAgICAgICBlZGl0Q2VsbC5pbm5lckhUTUwgPSBgPGEgaHJlZj1cIiNcIiBvbmNsaWNrPVwiZWRpdEZhY2lsaXR5KCcke2ZhY2lsaXR5SUR9JylcIj5cdTI3MEZcdUZFMEY8L2E+YDtcclxuICAgICAgICAgICAgY29uc3QgZGVsZXRlQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuICAgICAgICAgICAgZGVsZXRlQ2VsbC5pbm5lckhUTUwgPSBgPGEgaHJlZj1cIiNcIiBvbmNsaWNrPVwiZGVsZXRlRmFjaWxpdHkoJyR7ZmFjaWxpdHlJRH0nKVwiPlx1Mjc0QzwvYT5gO1xyXG5cclxuICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKG5hbWVDZWxsKTtcclxuICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKGxvY2F0aW9uQ2VsbCk7XHJcbiAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChlZGl0Q2VsbCk7XHJcbiAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChkZWxldGVDZWxsKTtcclxuXHJcbiAgICAgICAgICAgIHRhYmxlQm9keS5hcHBlbmRDaGlsZChyb3cpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBjcmVhdGVGYWNpbGl0eSgpIHtcclxuICAgIGNvbnN0IGZhY2lsaXR5SUQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmFjaWxpdHlJRCcpLnZhbHVlO1xyXG4gICAgY29uc3QgbG9jYXRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9jYXRpb24nKS52YWx1ZTtcclxuXHJcbiAgICBpZiAoIWZhY2lsaXR5SUQgfHwgIWxvY2F0aW9uKSB7XHJcbiAgICAgICAgYWxlcnQoXCJQbGVhc2UgZmlsbCBpbiBib3RoIGZpZWxkcy5cIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9jcmVhdGVmYWNpbGl0eS03N2hraTMycW5hLW53LmEucnVuLmFwcCcsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgZmFjaWxpdHlJRDogZmFjaWxpdHlJRCwgbG9jYXRpb246IGxvY2F0aW9uIH0pLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcblxyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgICAgICBhbGVydChyZXN1bHQubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIHRvZ2dsZUZhY2lsaXR5Rm9ybSgpO1xyXG4gICAgICAgICAgICBsb2FkRmFjaWxpdGllcygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KGBFcnJvcjogJHtyZXN1bHQuZXJyb3J9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBcclxuICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgZHVyaW5nIGZhY2lsaXR5IGNyZWF0aW9uOlwiLCBlcnJvcik7XHJcbiAgICAgICAgYWxlcnQoXCJUaGVyZSB3YXMgYW4gZXJyb3IgY3JlYXRpbmcgdGhlIGZhY2lsaXR5LlwiKTsgXHJcbiAgICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGVkaXRGYWNpbGl0eShmYWNpbGl0eUlEKXtcclxuICAgIGxldCBuZXdMb2NhdGlvbiA9IHByb21wdChgRW50ZXIgbmV3IGxvY2F0aW9uIGZhY2lsaXR5ICR7ZmFjaWxpdHlJRH06YCk7XHJcblxyXG4gICAgaWYgKCFuZXdMb2NhdGlvbikge1xyXG4gICAgICAgIGFsZXJ0KFwiTG9jYXRpb24gaXMgcmVxdWlyZWQuXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vdXBkYXRlZmFjaWxpdHktNzdoa2kzMnFuYS1udy5hLnJ1bi5hcHAnLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BVVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgZmFjaWxpdHlJRDogZmFjaWxpdHlJRCwgbmV3TG9jYXRpb246IG5ld0xvY2F0aW9uIH0pLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KGBGYWNpbGl0eSAke2ZhY2lsaXR5SUR9IHVwZGF0ZWQgc3VjY2Vzc2Z1bGx5IWApO1xyXG4gICAgICAgICAgICBsb2FkRmFjaWxpdGllcygpO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KGBFcnJvcjogJHtyZXN1bHQuZXJyb3J9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBcclxuICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciB1cGRhdGluZyBmYWNpbGl0eTpcIiwgZXJyb3IpO1xyXG4gICAgICAgIGFsZXJ0KFwiVGhlcmUgd2FzIGFuIGVycm9yIHVwZGF0aW5nIHRoZSBmYWNpbGl0eS5cIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGRlbGV0ZUZhY2lsaXR5KGZhY2lsaXR5SUQpe1xyXG4gICAgY29uc3QgY29uZmlybWVkID0gd2luZG93LmNvbmZpcm0oYEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBmYWNpbGl0eT9gKTtcclxuICAgIGlmIChjb25maXJtZWQpe1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vZGVsZXRlZmFjaWxpdHktNzdoa2kzMnFuYS1udy5hLnJ1bi5hcHAnLCB7XHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBmYWNpbGl0eUlEOiBmYWNpbGl0eUlEIH0pLFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQocmVzdWx0Lm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgbG9hZEZhY2lsaXRpZXMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KGBFcnJvcjogJHtyZXN1bHQuZXJyb3J9YCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgZHVyaW5nIGRlbGV0aW9uOlwiLCBlcnJvcik7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiVGhlcmUgd2FzIGFuIGVycm9yIGRlbGV0aW5nIHRoZSBmYWNpbGl0eS5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB0b2dnbGVGYWNpbGl0eUZvcm0oKSB7XHJcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZhY2lsaXR5Rm9ybScpO1xyXG4gICAgZm9ybS5zdHlsZS5kaXNwbGF5ID0gZm9ybS5zdHlsZS5kaXNwbGF5ID09PSAnbm9uZScgPyAnYmxvY2snIDogJ25vbmUnO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZhY2lsaXR5SUQnKS52YWx1ZSA9ICcnO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvY2F0aW9uJykudmFsdWUgPSAnJztcclxufVxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlQ2x1YkZvcm0oKSB7XHJcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NsdWJGb3JtJyk7XHJcbiAgICBmb3JtLnN0eWxlLmRpc3BsYXkgPSBmb3JtLnN0eWxlLmRpc3BsYXkgPT09ICdub25lJyA/ICdibG9jaycgOiAnbm9uZSc7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2x1YklEJykudmFsdWUgPSAnJztcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbHViU3BvcnQnKS52YWx1ZSA9ICcnO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbG9yeUJ1cm5SYXRlJykudmFsdWUgPSAnJztcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmFpbmVyRHJvcGRvd24nKS5zZWxlY3RlZEluZGV4ID0gMDtcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gbG9hZENsdWJzKCkge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9zaG93YWxsY2x1YnMtNzdoa2kzMnFuYS1udy5hLnJ1bi5hcHAnLCB7XHJcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChyZXNwb25zZS5vaykge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEuY2x1YnMpO1xyXG5cclxuICAgICAgICBjb25zdCB0cmFpbmVyUmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9mZXRjaHRyYWluZXJuYW1lcy03N2hraTMycW5hLW53LmEucnVuLmFwcCcsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIFxyXG4gICAgICAgIGxldCB0cmFpbmVycyA9IFtdO1xyXG4gICAgICAgIGlmICh0cmFpbmVyUmVzcG9uc2Uub2spIHtcclxuICAgICAgICAgICAgdHJhaW5lcnMgPSBhd2FpdCB0cmFpbmVyUmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdHJhaW5lck1hcCA9IG5ldyBNYXAoKTtcclxuICAgICAgICB0cmFpbmVycy5mb3JFYWNoKHRyYWluZXIgPT4ge1xyXG4gICAgICAgICAgICB0cmFpbmVyTWFwLnNldCh0cmFpbmVyLmtleSwgdHJhaW5lci5uYW1lKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgdGFibGVCb2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjbHVic1RhYmxlIHRib2R5XCIpO1xyXG4gICAgICAgIHRhYmxlQm9keS5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuICAgICAgICBPYmplY3QuZW50cmllcyhkYXRhLmNsdWJzKS5mb3JFYWNoKChbY2x1YklELCBjbHViXSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIik7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBuYW1lQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuICAgICAgICAgICAgbmFtZUNlbGwudGV4dENvbnRlbnQgPSBjbHViSUQ7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwb3J0Q2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuICAgICAgICAgICAgc3BvcnRDZWxsLnRleHRDb250ZW50ID0gY2x1Yi5zcG9ydDtcclxuICAgICAgICAgICAgY29uc3QgY2Fsb3J5Q2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuICAgICAgICAgICAgY2Fsb3J5Q2VsbC50ZXh0Q29udGVudCA9IGNsdWIuY2Fsb3J5QnVyblJhdGU7XHJcbiAgICAgICAgICAgIGNvbnN0IHRyYWluZXJDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xyXG4gICAgICAgICAgICB0cmFpbmVyQ2VsbC50ZXh0Q29udGVudCA9IHRyYWluZXJNYXAuZ2V0KGNsdWIudHJhaW5lcikgfHwgXCJVbmtub3duIFRyYWluZXJcIjtcclxuICAgICAgICAgICAgY29uc3QgZWRpdENlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgICAgICAgICAgIGVkaXRDZWxsLmlubmVySFRNTCA9IGA8YSBocmVmPVwiI1wiIG9uY2xpY2s9XCJlZGl0Q2x1YignJHtjbHViSUR9JylcIj5cdTI3MEZcdUZFMEY8L2E+YDtcclxuICAgICAgICAgICAgY29uc3QgZGVsZXRlQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuICAgICAgICAgICAgZGVsZXRlQ2VsbC5pbm5lckhUTUwgPSBgPGEgaHJlZj1cIiNcIiBvbmNsaWNrPVwiZGVsZXRlQ2x1YignJHtjbHViSUR9JylcIj5cdTI3NEM8L2E+YDtcclxuXHJcbiAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChuYW1lQ2VsbCk7XHJcbiAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChzcG9ydENlbGwpO1xyXG4gICAgICAgICAgICByb3cuYXBwZW5kQ2hpbGQoY2Fsb3J5Q2VsbCk7XHJcbiAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZCh0cmFpbmVyQ2VsbCk7XHJcbiAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChlZGl0Q2VsbCk7XHJcbiAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChkZWxldGVDZWxsKTtcclxuXHJcbiAgICAgICAgICAgIHRhYmxlQm9keS5hcHBlbmRDaGlsZChyb3cpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBjcmVhdGVDbHViKCkge1xyXG4gICAgY29uc3QgY2x1YklEID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NsdWJJRCcpLnZhbHVlO1xyXG4gICAgY29uc3QgY2x1YlNwb3J0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NsdWJTcG9ydCcpLnZhbHVlO1xyXG4gICAgbGV0IGNhbG9yeUJ1cm5SYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbG9yeUJ1cm5SYXRlJykudmFsdWU7XHJcbiAgICBjb25zdCB0cmFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RyYWluZXJEcm9wZG93bicpLnZhbHVlO1xyXG5cclxuICAgIGlmICghY2x1YklEIHx8ICFjbHViU3BvcnQgfHwgIWNhbG9yeUJ1cm5SYXRlIHx8ICF0cmFpbmVyKSB7XHJcbiAgICAgICAgYWxlcnQoXCJQbGVhc2UgZmlsbCBpbiBhbGwgZmllbGRzLlwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjYWxvcnlCdXJuUmF0ZSA9IHBhcnNlSW50KGNhbG9yeUJ1cm5SYXRlLCAxMCk7XHJcblxyXG4gICAgaWYgKGlzTmFOKGNhbG9yeUJ1cm5SYXRlKSB8fCBjYWxvcnlCdXJuUmF0ZSA8IDEgfHwgY2Fsb3J5QnVyblJhdGUgPiAxMDAwKSB7XHJcbiAgICAgICAgYWxlcnQoXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBjYWxvcnkgYnVybiByYXRlIGJldHdlZW4gMSBhbmQgMTAwMC5cIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0cmFpbmVyRHJvcGRvd24uc2VsZWN0ZWRJbmRleCA9PSAwKXtcclxuICAgICAgICBhbGVydChcIlBsZWFzZSBzZWxlY3QgYSB2YWxpZCB0cmFpbmVyLlwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL2NyZWF0ZWNsdWItNzdoa2kzMnFuYS1udy5hLnJ1bi5hcHAnLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IGNsdWJJRDogY2x1YklELCBzcG9ydDogY2x1YlNwb3J0LCBjYWxvcnlCdXJuUmF0ZTogY2Fsb3J5QnVyblJhdGUsIHRyYWluZXI6IHRyYWluZXIgfSksXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgICAgYWxlcnQocmVzdWx0Lm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB0b2dnbGVDbHViRm9ybSgpO1xyXG4gICAgICAgICAgICBsb2FkQ2x1YnMoKTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChgRXJyb3I6ICR7cmVzdWx0LmVycm9yfWApO1xyXG4gICAgICAgIH1cclxuICAgIH0gXHJcbiAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGR1cmluZyBjbHViIGNyZWF0aW9uOlwiLCBlcnJvcik7XHJcbiAgICAgICAgYWxlcnQoXCJUaGVyZSB3YXMgYW4gZXJyb3IgY3JlYXRpbmcgdGhlIGNsdWIuXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBlZGl0Q2x1YihjbHViSUQpe1xyXG4gICAgbGV0IG5ld1Nwb3J0ID0gcHJvbXB0KGBFbnRlciBuZXcgc3BvcnQgZm9yICR7Y2x1YklEfTpgKTtcclxuICAgIGxldCBuZXdDYWxvcnlCdXJuUmF0ZSA9IHByb21wdChgRW50ZXIgbmV3IGNhbG9yeSBidXJuIHJhdGUgZm9yICR7Y2x1YklEfSAoMS0xMDAwKTpgKTtcclxuXHJcbiAgICBuZXdDYWxvcnlCdXJuUmF0ZSA9IHBhcnNlSW50KG5ld0NhbG9yeUJ1cm5SYXRlLCAxMCk7XHJcbiAgICBpZiAoaXNOYU4obmV3Q2Fsb3J5QnVyblJhdGUpIHx8IG5ld0NhbG9yeUJ1cm5SYXRlIDwgMSB8fCBuZXdDYWxvcnlCdXJuUmF0ZSA+IDEwMDAgfHwgIW5ld1Nwb3J0KSB7XHJcbiAgICAgICAgYWxlcnQoXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBjYWxvcnkgYnVybiByYXRlIGJldHdlZW4gMSBhbmQgMTAwMCBhbmQgYSBjbHViIHNwb3J0IVwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL3VwZGF0ZWNsdWItNzdoa2kzMnFuYS1udy5hLnJ1bi5hcHAnLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BVVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgY2x1YklEOiBjbHViSUQsIG5ld1Nwb3J0OiBuZXdTcG9ydCwgbmV3Q2Fsb3J5QnVyblJhdGU6IG5ld0NhbG9yeUJ1cm5SYXRlIH0pLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KGBDbHViICR7Y2x1YklEfSB1cGRhdGVkIHN1Y2Nlc3NmdWxseSFgKTtcclxuICAgICAgICAgICAgbG9hZENsdWJzKCk7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoYEVycm9yOiAke3Jlc3VsdC5lcnJvcn1gKTtcclxuICAgICAgICB9XHJcbiAgICB9IFxyXG4gICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHVwZGF0aW5nIGNsdWI6XCIsIGVycm9yKTtcclxuICAgICAgICBhbGVydChcIlRoZXJlIHdhcyBhbiBlcnJvciB1cGRhdGluZyB0aGUgY2x1Yi5cIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGRlbGV0ZUNsdWIoY2x1YklEKXtcclxuICAgIGNvbnN0IGNvbmZpcm1lZCA9IHdpbmRvdy5jb25maXJtKGBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgY2x1Yj9gKTtcclxuICAgIGlmIChjb25maXJtZWQpe1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vZGVsZXRlY2x1Yi03N2hraTMycW5hLW53LmEucnVuLmFwcCcsIHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0RFTEVURScsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IGNsdWJJRDogY2x1YklEIH0pLFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQocmVzdWx0Lm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgbG9hZENsdWJzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChgRXJyb3I6ICR7cmVzdWx0LmVycm9yfWApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGR1cmluZyBkZWxldGlvbjpcIiwgZXJyb3IpO1xyXG4gICAgICAgICAgICBhbGVydChcIlRoZXJlIHdhcyBhbiBlcnJvciBkZWxldGluZyB0aGUgY2x1Yi5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBsb2FkVHJhaW5lckRyb3Bkb3duKCkge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9mZXRjaHRyYWluZXJuYW1lcy03N2hraTMycW5hLW53LmEucnVuLmFwcCcsIHtcclxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgY29uc3QgdHJhaW5lcnMgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgY29uc3QgdHJhaW5lckRyb3Bkb3duID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0cmFpbmVyRHJvcGRvd25cIik7XHJcbiAgICAgICAgY29uc29sZS5sb2codHJhaW5lcnMpO1xyXG4gICAgICAgIHRyYWluZXJzLmZvckVhY2godHJhaW5lciA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XHJcbiAgICAgICAgICAgIG9wdGlvbi52YWx1ZSA9IHRyYWluZXIua2V5O1xyXG4gICAgICAgICAgICBvcHRpb24udGV4dENvbnRlbnQgPSB0cmFpbmVyLm5hbWU7XHJcbiAgICAgICAgICAgIHRyYWluZXJEcm9wZG93bi5hcHBlbmRDaGlsZChvcHRpb24pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIGxvYWQgdHJhaW5lcnMuXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBmaWx0ZXJGYWNpbGl0eVRhYmxlKCkge1xyXG4gICAgY29uc3Qgc2VhcmNoVmFsdWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmFjaWxpdHlTZWFyY2gnKS52YWx1ZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgY29uc3QgdGFibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmFjaWxpdGllc1RhYmxlJyk7XHJcbiAgICBjb25zdCByb3dzID0gdGFibGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3RyJyk7XHJcbiAgICBcclxuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgcm93cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGNlbGxzID0gcm93c1tpXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgndGQnKTtcclxuICAgICAgICBjb25zdCBuYW1lQ2VsbCA9IGNlbGxzWzBdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChuYW1lQ2VsbCkge1xyXG4gICAgICAgICAgICBjb25zdCBmYWNpbGl0eU5hbWUgPSBuYW1lQ2VsbC50ZXh0Q29udGVudCB8fCBuYW1lQ2VsbC5pbm5lclRleHQ7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgbWF0Y2hGYWNpbGl0eSA9IGZhY2lsaXR5TmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChtYXRjaEZhY2lsaXR5KSB7XHJcbiAgICAgICAgICAgICAgICByb3dzW2ldLnN0eWxlLmRpc3BsYXkgPSAnJztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJvd3NbaV0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZmlsdGVyQ2x1YlRhYmxlKCkge1xyXG4gICAgY29uc3Qgc2VhcmNoVmFsdWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2x1YlNlYXJjaCcpLnZhbHVlLnRvTG93ZXJDYXNlKCk7XHJcbiAgICBjb25zdCB0YWJsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbHVic1RhYmxlJyk7XHJcbiAgICBjb25zdCByb3dzID0gdGFibGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3RyJyk7XHJcbiAgICBcclxuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgcm93cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGNlbGxzID0gcm93c1tpXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgndGQnKTtcclxuICAgICAgICBjb25zdCBuYW1lQ2VsbCA9IGNlbGxzWzBdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChuYW1lQ2VsbCkge1xyXG4gICAgICAgICAgICBjb25zdCBjbHViTmFtZSA9IG5hbWVDZWxsLnRleHRDb250ZW50IHx8IG5hbWVDZWxsLmlubmVyVGV4dDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBtYXRjaENsdWIgPSBjbHViTmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChtYXRjaENsdWIpIHtcclxuICAgICAgICAgICAgICAgIHJvd3NbaV0uc3R5bGUuZGlzcGxheSA9ICcnO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcm93c1tpXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vL2Jvb2tGYWNpbGl0eSgpXHJcbmNvbnN0IGN1cnJlbnRQYWdlID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xyXG5pZiAoY3VycmVudFBhZ2UuaW5jbHVkZXMoJ21hbmFnZWNsdWJzLmh0bWwnKSkge1xyXG4gICAgbG9hZENsdWJzKCk7XHJcbiAgICBsb2FkVHJhaW5lckRyb3Bkb3duKCk7XHJcbn1cclxuZWxzZSBpZiAoY3VycmVudFBhZ2UuaW5jbHVkZXMoJ21hbmFnZWZhY2lsaXRpZXMuaHRtbCcpKSB7XHJcbiAgICBsb2FkRmFjaWxpdGllcygpOyBcclxufVxyXG5cclxuZG9jdW1lbnQuY3JlYXRlRmFjaWxpdHkgPSBjcmVhdGVGYWNpbGl0eTtcclxuZG9jdW1lbnQuZWRpdEZhY2lsaXR5ID0gZWRpdEZhY2lsaXR5O1xyXG5kb2N1bWVudC5kZWxldGVGYWNpbGl0eSA9IGRlbGV0ZUZhY2lsaXR5O1xyXG5kb2N1bWVudC50b2dnbGVGYWNpbGl0eUZvcm0gPSB0b2dnbGVGYWNpbGl0eUZvcm07XHJcbmRvY3VtZW50LnRvZ2dsZUNsdWJGb3JtID0gdG9nZ2xlQ2x1YkZvcm07XHJcbmRvY3VtZW50LmNyZWF0ZUNsdWIgPSBjcmVhdGVDbHViO1xyXG5kb2N1bWVudC5lZGl0Q2x1YiA9IGVkaXRDbHViO1xyXG5kb2N1bWVudC5kZWxldGVDbHViID0gZGVsZXRlQ2x1YjtcclxuZG9jdW1lbnQuZmlsdGVyRmFjaWxpdHlUYWJsZSA9IGZpbHRlckZhY2lsaXR5VGFibGU7XHJcbmRvY3VtZW50LmZpbHRlckNsdWJUYWJs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TSxRQUFRLFNBQVMsZUFBZSxpQkFBaUI7QUFDdkQsVUFBTSxPQUFPLE1BQU0scUJBQXFCLElBQUk7QUFFNUMsYUFBUyxJQUFJLEdBQUcsSUFBSSxLQUFLLFFBQVEsS0FBSztBQUNsQyxZQUFNLFFBQVEsS0FBSyxDQUFDLEVBQUUscUJBQXFCLElBQUk7QUFDL0MsWUFBTSxXQUFXLE1BQU0sQ0FBQztBQUV4QixVQUFJLFVBQVU7QUFDVixjQUFNLGVBQWUsU0FBUyxlQUFlLFNBQVM7QUFFdEQsWUFBSSxnQkFBZ0IsYUFBYSxZQUFZLEVBQUUsU0FBUyxXQUFXO0FBRW5FLFlBQUksZUFBZTtBQUNmLGVBQUssQ0FBQyxFQUFFLE1BQU0sVUFBVTtBQUFBLFFBQzVCLE9BQU87QUFDSCxlQUFLLENBQUMsRUFBRSxNQUFNLFVBQVU7QUFBQSxRQUM1QjtBQUFBLE1BQ0o7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUVBLFdBQVMsa0JBQWtCO0FBQ3ZCLFVBQU0sY0FBYyxTQUFTLGVBQWUsWUFBWSxFQUFFLE1BQU0sWUFBWTtBQUM1RSxVQUFNLFFBQVEsU0FBUyxlQUFlLFlBQVk7QUFDbEQsVUFBTSxPQUFPLE1BQU0scUJBQXFCLElBQUk7QUFFNUMsYUFBUyxJQUFJLEdBQUcsSUFBSSxLQUFLLFFBQVEsS0FBSztBQUNsQyxZQUFNLFFBQVEsS0FBSyxDQUFDLEVBQUUscUJBQXFCLElBQUk7QUFDL0MsWUFBTSxXQUFXLE1BQU0sQ0FBQztBQUV4QixVQUFJLFVBQVU7QUFDVixjQUFNLFdBQVcsU0FBUyxlQUFlLFNBQVM7QUFFbEQsWUFBSSxZQUFZLFNBQVMsWUFBWSxFQUFFLFNBQVMsV0FBVztBQUUzRCxZQUFJLFdBQVc7QUFDWCxlQUFLLENBQUMsRUFBRSxNQUFNLFVBQVU7QUFBQSxRQUM1QixPQUFPO0FBQ0gsZUFBSyxDQUFDLEVBQUUsTUFBTSxVQUFVO0FBQUEsUUFDNUI7QUFBQSxNQUNKO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFHQSxNQUFNLGNBQWMsT0FBTyxTQUFTO0FBQ3BDLE1BQUksWUFBWSxTQUFTLGtCQUFrQixHQUFHO0FBQzFDLGNBQVU7QUFDVix3QkFBb0I7QUFBQSxFQUN4QixXQUNTLFlBQVksU0FBUyx1QkFBdUIsR0FBRztBQUNwRCxtQkFBZTtBQUFBLEVBQ25CO0FBRUEsV0FBUyxpQkFBaUI7QUFDMUIsV0FBUyxlQUFlO0FBQ3hCLFdBQVMsaUJBQWlCO0FBQzFCLFdBQVMscUJBQXFCO0FBQzlCLFdBQVMsaUJBQWlCO0FBQzFCLFdBQVMsYUFBYTtBQUN0QixXQUFTLFdBQVc7QUFDcEIsV0FBUyxhQUFhO0FBQ3RCLFdBQVMsc0JBQXNCO0FBQy9CLFdBQVMsa0JBQWtCOyIsCiAgIm5hbWVzIjogWyJ0cmFpbmVyRHJvcGRvd24iXQp9Cg==
