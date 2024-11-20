(() => {
  // public/javascripts/operations.js
  async function loadFacilities() {
    const response = await fetch("http://127.0.0.1:5001/sports-arena-39a32/europe-west2/showAllFacilities", {
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
      const response = await fetch("http://127.0.0.1:5001/sports-arena-39a32/europe-west2/createFacility", {
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
      const response = await fetch("http://127.0.0.1:5001/sports-arena-39a32/europe-west2/updateFacility", {
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
        const response = await fetch("http://127.0.0.1:5001/sports-arena-39a32/europe-west2/deleteFacility", {
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
    document.getElementById("caloryBurnRate").value = "";
  }
  async function loadClubs() {
    const response = await fetch("http://127.0.0.1:5001/sports-arena-39a32/europe-west2/showAllClubs", {
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
        const caloryCell = document.createElement("td");
        caloryCell.textContent = club.caloryBurnRate;
        const editCell = document.createElement("td");
        editCell.innerHTML = '<a href="#" onclick="editClub(\''.concat(clubID, "')\">\u270F\uFE0F</a>");
        const deleteCell = document.createElement("td");
        deleteCell.innerHTML = '<a href="#" onclick="deleteClub(\''.concat(clubID, "')\">\u274C</a>");
        row.appendChild(nameCell);
        row.appendChild(caloryCell);
        row.appendChild(editCell);
        row.appendChild(deleteCell);
        tableBody.appendChild(row);
      });
    }
  }
  async function createClub() {
    const clubID = document.getElementById("clubID").value;
    let caloryBurnRate = document.getElementById("caloryBurnRate").value;
    if (!clubID || !caloryBurnRate) {
      alert("Please fill in both fields.");
      return;
    }
    caloryBurnRate = parseInt(caloryBurnRate, 10);
    if (isNaN(caloryBurnRate) || caloryBurnRate < 1 || caloryBurnRate > 1e3) {
      alert("Please enter a valid calory burn rate between 1 and 1000.");
      return;
    }
    try {
      const response = await fetch("http://127.0.0.1:5001/sports-arena-39a32/europe-west2/createClub", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ clubID, caloryBurnRate })
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
    let newCaloryBurnRate = prompt("Enter new calory burn rate for ".concat(clubID, " (1-1000):"));
    newCaloryBurnRate = parseInt(newCaloryBurnRate, 10);
    if (isNaN(newCaloryBurnRate) || newCaloryBurnRate < 1 || newCaloryBurnRate > 1e3) {
      alert("Please enter a valid calory burn rate between 1 and 1000.");
      return;
    }
    try {
      const response = await fetch("http://127.0.0.1:5001/sports-arena-39a32/europe-west2/updateClub", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ clubID, newCaloryBurnRate })
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
        const response = await fetch("http://127.0.0.1:5001/sports-arena-39a32/europe-west2/deleteClub", {
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsib3BlcmF0aW9ucy5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiYXN5bmMgZnVuY3Rpb24gYm9va0ZhY2lsaXR5KCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9ICdUZXN0IGJvb2tpbmcgZm9yIGZhY2lsaXR5JztcclxuICAgICAgICBjb25zdCBjbHViSUQgPSAnY2x1YjEnO1xyXG4gICAgICAgIGNvbnN0IGZhY2lsaXR5SUQgPSAnZmFjaWxpdHkxJztcclxuICAgICAgICBjb25zdCBkYXRldGltZSA9ICcyMDI0LTExLTIxVDEwOjAwOjAwWic7XHJcbiAgICAgICAgY29uc3QgZHVyYXRpb24gPSA2MDtcclxuXHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cDovLzEyNy4wLjAuMTo1MDAxL3Nwb3J0cy1hcmVuYS0zOWEzMi9ldXJvcGUtd2VzdDIvYm9va0ZhY2lsaXR5Jywge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgY2x1YklEOiBjbHViSUQsXHJcbiAgICAgICAgICAgICAgICBmYWNpbGl0eUlEOiBmYWNpbGl0eUlELFxyXG4gICAgICAgICAgICAgICAgZGF0ZXRpbWU6IGRhdGV0aW1lLFxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uLFxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xyXG4gICAgICAgICAgICBjb25zdCBlcnJvckRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICAgIGFsZXJ0KGVycm9yRGF0YS5lcnJvcik7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSFRUUCBlcnJvciEgU3RhdHVzOiAke3Jlc3BvbnNlLnN0YXR1c31gKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGJvb2tpbmdEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgIGFsZXJ0KFwiQm9va2luZyBzdWNjZXNzZnVsIVwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnQm9va2luZyBTdWNjZXNzZnVsOicsIGJvb2tpbmdEYXRhKTtcclxuICAgICAgICByZXR1cm4gYm9va2luZ0RhdGE7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGJvb2tpbmcgZmFjaWxpdHk6JywgZXJyb3IpO1xyXG4gICAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBsb2FkRmFjaWxpdGllcygpIHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHA6Ly8xMjcuMC4wLjE6NTAwMS9zcG9ydHMtYXJlbmEtMzlhMzIvZXVyb3BlLXdlc3QyL3Nob3dBbGxGYWNpbGl0aWVzJywge1xyXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAocmVzcG9uc2Uub2spIHtcclxuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhLmZhY2lsaXRpZXMpO1xyXG5cclxuICAgICAgICBjb25zdCB0YWJsZUJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2ZhY2lsaXRpZXNUYWJsZSB0Ym9keVwiKTtcclxuICAgICAgICB0YWJsZUJvZHkuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcbiAgICAgICAgT2JqZWN0LmVudHJpZXMoZGF0YS5mYWNpbGl0aWVzKS5mb3JFYWNoKChbZmFjaWxpdHlJRCwgZmFjaWxpdHldKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWVDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xyXG4gICAgICAgICAgICBuYW1lQ2VsbC50ZXh0Q29udGVudCA9IGZhY2lsaXR5SUQ7XHJcbiAgICAgICAgICAgIGNvbnN0IGxvY2F0aW9uQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuICAgICAgICAgICAgbG9jYXRpb25DZWxsLnRleHRDb250ZW50ID0gZmFjaWxpdHkubG9jYXRpb247XHJcbiAgICAgICAgICAgIGNvbnN0IGVkaXRDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xyXG4gICAgICAgICAgICBlZGl0Q2VsbC5pbm5lckhUTUwgPSBgPGEgaHJlZj1cIiNcIiBvbmNsaWNrPVwiZWRpdEZhY2lsaXR5KCcke2ZhY2lsaXR5SUR9JylcIj5cdTI3MEZcdUZFMEY8L2E+YDtcclxuICAgICAgICAgICAgY29uc3QgZGVsZXRlQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuICAgICAgICAgICAgZGVsZXRlQ2VsbC5pbm5lckhUTUwgPSBgPGEgaHJlZj1cIiNcIiBvbmNsaWNrPVwiZGVsZXRlRmFjaWxpdHkoJyR7ZmFjaWxpdHlJRH0nKVwiPlx1Mjc0QzwvYT5gO1xyXG5cclxuICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKG5hbWVDZWxsKTtcclxuICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKGxvY2F0aW9uQ2VsbCk7XHJcbiAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChlZGl0Q2VsbCk7XHJcbiAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChkZWxldGVDZWxsKTtcclxuXHJcbiAgICAgICAgICAgIHRhYmxlQm9keS5hcHBlbmRDaGlsZChyb3cpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBjcmVhdGVGYWNpbGl0eSgpIHtcclxuICAgIGNvbnN0IGZhY2lsaXR5SUQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmFjaWxpdHlJRCcpLnZhbHVlO1xyXG4gICAgY29uc3QgbG9jYXRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9jYXRpb24nKS52YWx1ZTtcclxuXHJcbiAgICBpZiAoIWZhY2lsaXR5SUQgfHwgIWxvY2F0aW9uKSB7XHJcbiAgICAgICAgYWxlcnQoXCJQbGVhc2UgZmlsbCBpbiBib3RoIGZpZWxkcy5cIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cDovLzEyNy4wLjAuMTo1MDAxL3Nwb3J0cy1hcmVuYS0zOWEzMi9ldXJvcGUtd2VzdDIvY3JlYXRlRmFjaWxpdHknLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IGZhY2lsaXR5SUQ6IGZhY2lsaXR5SUQsIGxvY2F0aW9uOiBsb2NhdGlvbiB9KSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgICAgYWxlcnQocmVzdWx0Lm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB0b2dnbGVGYWNpbGl0eUZvcm0oKTtcclxuICAgICAgICAgICAgbG9hZEZhY2lsaXRpZXMoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChgRXJyb3I6ICR7cmVzdWx0LmVycm9yfWApO1xyXG4gICAgICAgIH1cclxuICAgIH0gXHJcbiAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGR1cmluZyBmYWNpbGl0eSBjcmVhdGlvbjpcIiwgZXJyb3IpO1xyXG4gICAgICAgIGFsZXJ0KFwiVGhlcmUgd2FzIGFuIGVycm9yIGNyZWF0aW5nIHRoZSBmYWNpbGl0eS5cIik7IFxyXG4gICAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBlZGl0RmFjaWxpdHkoZmFjaWxpdHlJRCl7XHJcbiAgICBsZXQgbmV3TG9jYXRpb24gPSBwcm9tcHQoYEVudGVyIG5ldyBsb2NhdGlvbiBmYWNpbGl0eSAke2ZhY2lsaXR5SUR9OmApO1xyXG5cclxuICAgIGlmICghbmV3TG9jYXRpb24pIHtcclxuICAgICAgICBhbGVydChcIkxvY2F0aW9uIGlzIHJlcXVpcmVkLlwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwOi8vMTI3LjAuMC4xOjUwMDEvc3BvcnRzLWFyZW5hLTM5YTMyL2V1cm9wZS13ZXN0Mi91cGRhdGVGYWNpbGl0eScsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBmYWNpbGl0eUlEOiBmYWNpbGl0eUlELCBuZXdMb2NhdGlvbjogbmV3TG9jYXRpb24gfSksXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgICAgYWxlcnQoYEZhY2lsaXR5ICR7ZmFjaWxpdHlJRH0gdXBkYXRlZCBzdWNjZXNzZnVsbHkhYCk7XHJcbiAgICAgICAgICAgIGxvYWRGYWNpbGl0aWVzKCk7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoYEVycm9yOiAke3Jlc3VsdC5lcnJvcn1gKTtcclxuICAgICAgICB9XHJcbiAgICB9IFxyXG4gICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHVwZGF0aW5nIGZhY2lsaXR5OlwiLCBlcnJvcik7XHJcbiAgICAgICAgYWxlcnQoXCJUaGVyZSB3YXMgYW4gZXJyb3IgdXBkYXRpbmcgdGhlIGZhY2lsaXR5LlwiKTtcclxuICAgIH1cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gZGVsZXRlRmFjaWxpdHkoZmFjaWxpdHlJRCl7XHJcbiAgICBjb25zdCBjb25maXJtZWQgPSB3aW5kb3cuY29uZmlybShgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGZhY2lsaXR5P2ApO1xyXG4gICAgaWYgKGNvbmZpcm1lZCl7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cDovLzEyNy4wLjAuMTo1MDAxL3Nwb3J0cy1hcmVuYS0zOWEzMi9ldXJvcGUtd2VzdDIvZGVsZXRlRmFjaWxpdHknLCB7XHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBmYWNpbGl0eUlEOiBmYWNpbGl0eUlEIH0pLFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQocmVzdWx0Lm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgbG9hZEZhY2lsaXRpZXMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KGBFcnJvcjogJHtyZXN1bHQuZXJyb3J9YCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgZHVyaW5nIGRlbGV0aW9uOlwiLCBlcnJvcik7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiVGhlcmUgd2FzIGFuIGVycm9yIGRlbGV0aW5nIHRoZSBmYWNpbGl0eS5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB0b2dnbGVGYWNpbGl0eUZvcm0oKSB7XHJcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZhY2lsaXR5Rm9ybScpO1xyXG4gICAgZm9ybS5zdHlsZS5kaXNwbGF5ID0gZm9ybS5zdHlsZS5kaXNwbGF5ID09PSAnbm9uZScgPyAnYmxvY2snIDogJ25vbmUnO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZhY2lsaXR5SUQnKS52YWx1ZSA9ICcnO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvY2F0aW9uJykudmFsdWUgPSAnJztcclxufVxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlQ2x1YkZvcm0oKSB7XHJcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NsdWJGb3JtJyk7XHJcbiAgICBmb3JtLnN0eWxlLmRpc3BsYXkgPSBmb3JtLnN0eWxlLmRpc3BsYXkgPT09ICdub25lJyA/ICdibG9jaycgOiAnbm9uZSc7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2x1YklEJykudmFsdWUgPSAnJztcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYWxvcnlCdXJuUmF0ZScpLnZhbHVlID0gJyc7XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGxvYWRDbHVicygpIHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHA6Ly8xMjcuMC4wLjE6NTAwMS9zcG9ydHMtYXJlbmEtMzlhMzIvZXVyb3BlLXdlc3QyL3Nob3dBbGxDbHVicycsIHtcclxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YS5jbHVicyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRhYmxlQm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2x1YnNUYWJsZSB0Ym9keVwiKTtcclxuICAgICAgICB0YWJsZUJvZHkuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcbiAgICAgICAgT2JqZWN0LmVudHJpZXMoZGF0YS5jbHVicykuZm9yRWFjaCgoW2NsdWJJRCwgY2x1Yl0pID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgbmFtZUNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgICAgICAgICAgIG5hbWVDZWxsLnRleHRDb250ZW50ID0gY2x1YklEO1xyXG4gICAgICAgICAgICBjb25zdCBjYWxvcnlDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xyXG4gICAgICAgICAgICBjYWxvcnlDZWxsLnRleHRDb250ZW50ID0gY2x1Yi5jYWxvcnlCdXJuUmF0ZTtcclxuICAgICAgICAgICAgY29uc3QgZWRpdENlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgICAgICAgICAgIGVkaXRDZWxsLmlubmVySFRNTCA9IGA8YSBocmVmPVwiI1wiIG9uY2xpY2s9XCJlZGl0Q2x1YignJHtjbHViSUR9JylcIj5cdTI3MEZcdUZFMEY8L2E+YDtcclxuICAgICAgICAgICAgY29uc3QgZGVsZXRlQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuICAgICAgICAgICAgZGVsZXRlQ2VsbC5pbm5lckhUTUwgPSBgPGEgaHJlZj1cIiNcIiBvbmNsaWNrPVwiZGVsZXRlQ2x1YignJHtjbHViSUR9JylcIj5cdTI3NEM8L2E+YDtcclxuXHJcbiAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChuYW1lQ2VsbCk7XHJcbiAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChjYWxvcnlDZWxsKTtcclxuICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKGVkaXRDZWxsKTtcclxuICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKGRlbGV0ZUNlbGwpO1xyXG5cclxuICAgICAgICAgICAgdGFibGVCb2R5LmFwcGVuZENoaWxkKHJvdyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUNsdWIoKSB7XHJcbiAgICBjb25zdCBjbHViSUQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2x1YklEJykudmFsdWU7XHJcbiAgICBsZXQgY2Fsb3J5QnVyblJhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2Fsb3J5QnVyblJhdGUnKS52YWx1ZTtcclxuXHJcbiAgICBpZiAoIWNsdWJJRCB8fCAhY2Fsb3J5QnVyblJhdGUpIHtcclxuICAgICAgICBhbGVydChcIlBsZWFzZSBmaWxsIGluIGJvdGggZmllbGRzLlwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjYWxvcnlCdXJuUmF0ZSA9IHBhcnNlSW50KGNhbG9yeUJ1cm5SYXRlLCAxMCk7XHJcblxyXG4gICAgaWYgKGlzTmFOKGNhbG9yeUJ1cm5SYXRlKSB8fCBjYWxvcnlCdXJuUmF0ZSA8IDEgfHwgY2Fsb3J5QnVyblJhdGUgPiAxMDAwKSB7XHJcbiAgICAgICAgYWxlcnQoXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBjYWxvcnkgYnVybiByYXRlIGJldHdlZW4gMSBhbmQgMTAwMC5cIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cDovLzEyNy4wLjAuMTo1MDAxL3Nwb3J0cy1hcmVuYS0zOWEzMi9ldXJvcGUtd2VzdDIvY3JlYXRlQ2x1YicsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgY2x1YklEOiBjbHViSUQsIGNhbG9yeUJ1cm5SYXRlOiBjYWxvcnlCdXJuUmF0ZSB9KSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgICAgICBhbGVydChyZXN1bHQubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIHRvZ2dsZUNsdWJGb3JtKCk7XHJcbiAgICAgICAgICAgIGxvYWRDbHVicygpO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KGBFcnJvcjogJHtyZXN1bHQuZXJyb3J9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBcclxuICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgZHVyaW5nIGNsdWIgY3JlYXRpb246XCIsIGVycm9yKTtcclxuICAgICAgICBhbGVydChcIlRoZXJlIHdhcyBhbiBlcnJvciBjcmVhdGluZyB0aGUgY2x1Yi5cIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGVkaXRDbHViKGNsdWJJRCl7XHJcbiAgICBsZXQgbmV3Q2Fsb3J5QnVyblJhdGUgPSBwcm9tcHQoYEVudGVyIG5ldyBjYWxvcnkgYnVybiByYXRlIGZvciAke2NsdWJJRH0gKDEtMTAwMCk6YCk7XHJcblxyXG4gICAgbmV3Q2Fsb3J5QnVyblJhdGUgPSBwYXJzZUludChuZXdDYWxvcnlCdXJuUmF0ZSwgMTApO1xyXG4gICAgaWYgKGlzTmFOKG5ld0NhbG9yeUJ1cm5SYXRlKSB8fCBuZXdDYWxvcnlCdXJuUmF0ZSA8IDEgfHwgbmV3Q2Fsb3J5QnVyblJhdGUgPiAxMDAwKSB7XHJcbiAgICAgICAgYWxlcnQoXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBjYWxvcnkgYnVybiByYXRlIGJldHdlZW4gMSBhbmQgMTAwMC5cIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cDovLzEyNy4wLjAuMTo1MDAxL3Nwb3J0cy1hcmVuYS0zOWEzMi9ldXJvcGUtd2VzdDIvdXBkYXRlQ2x1YicsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBjbHViSUQ6IGNsdWJJRCwgbmV3Q2Fsb3J5QnVyblJhdGU6IG5ld0NhbG9yeUJ1cm5SYXRlIH0pLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KGBDbHViICR7Y2x1YklEfSB1cGRhdGVkIHN1Y2Nlc3NmdWxseSFgKTtcclxuICAgICAgICAgICAgbG9hZENsdWJzKCk7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoYEVycm9yOiAke3Jlc3VsdC5lcnJvcn1gKTtcclxuICAgICAgICB9XHJcbiAgICB9IFxyXG4gICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHVwZGF0aW5nIGNsdWI6XCIsIGVycm9yKTtcclxuICAgICAgICBhbGVydChcIlRoZXJlIHdhcyBhbiBlcnJvciB1cGRhdGluZyB0aGUgY2x1Yi5cIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGRlbGV0ZUNsdWIoY2x1YklEKXtcclxuICAgIGNvbnN0IGNvbmZpcm1lZCA9IHdpbmRvdy5jb25maXJtKGBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgY2x1Yj9gKTtcclxuICAgIGlmIChjb25maXJtZWQpe1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHA6Ly8xMjcuMC4wLjE6NTAwMS9zcG9ydHMtYXJlbmEtMzlhMzIvZXVyb3BlLXdlc3QyL2RlbGV0ZUNsdWInLCB7XHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBjbHViSUQ6IGNsdWJJRCB9KSxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KHJlc3VsdC5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIGxvYWRDbHVicygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoYEVycm9yOiAke3Jlc3VsdC5lcnJvcn1gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBkdXJpbmcgZGVsZXRpb246XCIsIGVycm9yKTtcclxuICAgICAgICAgICAgYWxlcnQoXCJUaGVyZSB3YXMgYW4gZXJyb3IgZGVsZXRpbmcgdGhlIGNsdWIuXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLy8gYm9va0ZhY2lsaXR5KClcclxuY29uc3QgY3VycmVudFBhZ2UgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XHJcbmlmIChjdXJyZW50UGFnZS5pbmNsdWRlcygnbWFuYWdlY2x1YnMuaHRtbCcpKSB7XHJcbiAgICBsb2FkQ2x1YnMoKTtcclxufVxyXG5lbHNlIGlmIChjdXJyZW50UGFnZS5pbmNsdWRlcygnbWFuYWdlZmFjaWxpdGllcy5odG1sJykpIHtcclxuICAgIGxvYWRGYWNpbGl0aWVzKCk7IFxyXG59XHJcblxyXG5kb2N1bWVudC5jcmVhdGVGYWNpbGl0eSA9IGNyZWF0ZUZhY2lsaXR5O1xyXG5kb2N1bWVudC5lZGl0RmFjaWxpdHkgPSBlZGl0RmFjaWxpdHk7XHJcbmRvY3VtZW50LmRlbGV0ZUZhY2lsaXR5ID0gZGVsZXRlRmFjaWxpdHk7XHJcbmRvY3VtZW50LnRvZ2dsZUZhY2lsaXR5Rm9ybSA9IHRvZ2dsZUZhY2lsaXR5Rm9ybTtcclxuZG9jdW1lbnQudG9nZ2xlQ2x1YkZvcm0gPSB0b2dnbGVDbHViRm9ybTtcclxuZG9jdW1lbnQuY3JlYXRlQ2x1YiA9IGNyZWF0ZUNsdWI7XHJcbmRvY3VtZW50LmVkaXRDbHViID0gZWRpdENsdWI7XHJcbmRvY3VtZW50LmRlbGV0ZUNsdWIgPSBkZWxldGVDbHViOyJdLAogICJtYXBwaW5ncyI6ICI7O0FBcUNBLGlCQUFlLGlCQUFpQjtBQUM1QixVQUFNLFdBQVcsTUFBTSxNQUFNLDJFQUEyRTtBQUFBLE1BQ3BHLFFBQVE7QUFBQSxNQUNSLFNBQVM7QUFBQSxRQUNMLGdCQUFnQjtBQUFBLE1BQ3BCO0FBQUEsSUFDSixDQUFDO0FBRUQsUUFBSSxTQUFTLElBQUk7QUFDYixZQUFNLE9BQU8sTUFBTSxTQUFTLEtBQUs7QUFFakMsY0FBUSxJQUFJLEtBQUssVUFBVTtBQUUzQixZQUFNLFlBQVksU0FBUyxjQUFjLHdCQUF3QjtBQUNqRSxn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
