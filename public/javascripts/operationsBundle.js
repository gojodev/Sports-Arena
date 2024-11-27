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
      const response = await fetch("https://createclub-77hki32qna-nw.a.run.app", {
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
      const response = await fetch("https://updateclub-77hki32qna-nw.a.run.app", {
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsib3BlcmF0aW9ucy5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiYXN5bmMgZnVuY3Rpb24gYm9va0ZhY2lsaXR5KCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9ICdUZXN0IGJvb2tpbmcgZm9yIGZhY2lsaXR5JztcclxuICAgICAgICBjb25zdCBjbHViSUQgPSAnY2x1YjEnO1xyXG4gICAgICAgIGNvbnN0IGZhY2lsaXR5SUQgPSAnZmFjaWxpdHkxJztcclxuICAgICAgICBjb25zdCBkYXRldGltZSA9ICcyMDI0LTExLTIxVDEwOjAwOjAwWic7XHJcbiAgICAgICAgY29uc3QgZHVyYXRpb24gPSA2MDtcclxuXHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9ib29rZmFjaWxpdHktNzdoa2kzMnFuYS1udy5hLnJ1bi5hcHAnLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgICAgICBjbHViSUQ6IGNsdWJJRCxcclxuICAgICAgICAgICAgICAgIGZhY2lsaXR5SUQ6IGZhY2lsaXR5SUQsXHJcbiAgICAgICAgICAgICAgICBkYXRldGltZTogZGF0ZXRpbWUsXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb24sXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVycm9yRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICAgICAgYWxlcnQoZXJyb3JEYXRhLmVycm9yKTtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBIVFRQIGVycm9yISBTdGF0dXM6ICR7cmVzcG9uc2Uuc3RhdHVzfWApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgYm9va2luZ0RhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgYWxlcnQoXCJCb29raW5nIHN1Y2Nlc3NmdWwhXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdCb29raW5nIFN1Y2Nlc3NmdWw6JywgYm9va2luZ0RhdGEpO1xyXG4gICAgICAgIHJldHVybiBib29raW5nRGF0YTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgYm9va2luZyBmYWNpbGl0eTonLCBlcnJvcik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGxvYWRGYWNpbGl0aWVzKCkge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9zaG93YWxsZmFjaWxpdGllcy03N2hraTMycW5hLW53LmEucnVuLmFwcCcsIHtcclxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YS5mYWNpbGl0aWVzKTtcclxuXHJcbiAgICAgICAgY29uc3QgdGFibGVCb2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmYWNpbGl0aWVzVGFibGUgdGJvZHlcIik7XHJcbiAgICAgICAgdGFibGVCb2R5LmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG4gICAgICAgIE9iamVjdC5lbnRyaWVzKGRhdGEuZmFjaWxpdGllcykuZm9yRWFjaCgoW2ZhY2lsaXR5SUQsIGZhY2lsaXR5XSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIik7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBuYW1lQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuICAgICAgICAgICAgbmFtZUNlbGwudGV4dENvbnRlbnQgPSBmYWNpbGl0eUlEO1xyXG4gICAgICAgICAgICBjb25zdCBsb2NhdGlvbkNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uQ2VsbC50ZXh0Q29udGVudCA9IGZhY2lsaXR5LmxvY2F0aW9uO1xyXG4gICAgICAgICAgICBjb25zdCBlZGl0Q2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuICAgICAgICAgICAgZWRpdENlbGwuaW5uZXJIVE1MID0gYDxhIGhyZWY9XCIjXCIgb25jbGljaz1cImVkaXRGYWNpbGl0eSgnJHtmYWNpbGl0eUlEfScpXCI+XHUyNzBGXHVGRTBGPC9hPmA7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlbGV0ZUNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgICAgICAgICAgIGRlbGV0ZUNlbGwuaW5uZXJIVE1MID0gYDxhIGhyZWY9XCIjXCIgb25jbGljaz1cImRlbGV0ZUZhY2lsaXR5KCcke2ZhY2lsaXR5SUR9JylcIj5cdTI3NEM8L2E+YDtcclxuXHJcbiAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChuYW1lQ2VsbCk7XHJcbiAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChsb2NhdGlvbkNlbGwpO1xyXG4gICAgICAgICAgICByb3cuYXBwZW5kQ2hpbGQoZWRpdENlbGwpO1xyXG4gICAgICAgICAgICByb3cuYXBwZW5kQ2hpbGQoZGVsZXRlQ2VsbCk7XHJcblxyXG4gICAgICAgICAgICB0YWJsZUJvZHkuYXBwZW5kQ2hpbGQocm93KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlRmFjaWxpdHkoKSB7XHJcbiAgICBjb25zdCBmYWNpbGl0eUlEID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZhY2lsaXR5SUQnKS52YWx1ZTtcclxuICAgIGNvbnN0IGxvY2F0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvY2F0aW9uJykudmFsdWU7XHJcblxyXG4gICAgaWYgKCFmYWNpbGl0eUlEIHx8ICFsb2NhdGlvbikge1xyXG4gICAgICAgIGFsZXJ0KFwiUGxlYXNlIGZpbGwgaW4gYm90aCBmaWVsZHMuXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vY3JlYXRlZmFjaWxpdHktNzdoa2kzMnFuYS1udy5hLnJ1bi5hcHAnLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IGZhY2lsaXR5SUQ6IGZhY2lsaXR5SUQsIGxvY2F0aW9uOiBsb2NhdGlvbiB9KSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgICAgYWxlcnQocmVzdWx0Lm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB0b2dnbGVGYWNpbGl0eUZvcm0oKTtcclxuICAgICAgICAgICAgbG9hZEZhY2lsaXRpZXMoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChgRXJyb3I6ICR7cmVzdWx0LmVycm9yfWApO1xyXG4gICAgICAgIH1cclxuICAgIH0gXHJcbiAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGR1cmluZyBmYWNpbGl0eSBjcmVhdGlvbjpcIiwgZXJyb3IpO1xyXG4gICAgICAgIGFsZXJ0KFwiVGhlcmUgd2FzIGFuIGVycm9yIGNyZWF0aW5nIHRoZSBmYWNpbGl0eS5cIik7IFxyXG4gICAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBlZGl0RmFjaWxpdHkoZmFjaWxpdHlJRCl7XHJcbiAgICBsZXQgbmV3TG9jYXRpb24gPSBwcm9tcHQoYEVudGVyIG5ldyBsb2NhdGlvbiBmYWNpbGl0eSAke2ZhY2lsaXR5SUR9OmApO1xyXG5cclxuICAgIGlmICghbmV3TG9jYXRpb24pIHtcclxuICAgICAgICBhbGVydChcIkxvY2F0aW9uIGlzIHJlcXVpcmVkLlwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL3VwZGF0ZWZhY2lsaXR5LTc3aGtpMzJxbmEtbncuYS5ydW4uYXBwJywge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQVVQnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IGZhY2lsaXR5SUQ6IGZhY2lsaXR5SUQsIG5ld0xvY2F0aW9uOiBuZXdMb2NhdGlvbiB9KSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgICAgICBhbGVydChgRmFjaWxpdHkgJHtmYWNpbGl0eUlEfSB1cGRhdGVkIHN1Y2Nlc3NmdWxseSFgKTtcclxuICAgICAgICAgICAgbG9hZEZhY2lsaXRpZXMoKTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChgRXJyb3I6ICR7cmVzdWx0LmVycm9yfWApO1xyXG4gICAgICAgIH1cclxuICAgIH0gXHJcbiAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgdXBkYXRpbmcgZmFjaWxpdHk6XCIsIGVycm9yKTtcclxuICAgICAgICBhbGVydChcIlRoZXJlIHdhcyBhbiBlcnJvciB1cGRhdGluZyB0aGUgZmFjaWxpdHkuXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBkZWxldGVGYWNpbGl0eShmYWNpbGl0eUlEKXtcclxuICAgIGNvbnN0IGNvbmZpcm1lZCA9IHdpbmRvdy5jb25maXJtKGBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgZmFjaWxpdHk/YCk7XHJcbiAgICBpZiAoY29uZmlybWVkKXtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL2RlbGV0ZWZhY2lsaXR5LTc3aGtpMzJxbmEtbncuYS5ydW4uYXBwJywge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgZmFjaWxpdHlJRDogZmFjaWxpdHlJRCB9KSxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KHJlc3VsdC5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIGxvYWRGYWNpbGl0aWVzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChgRXJyb3I6ICR7cmVzdWx0LmVycm9yfWApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGR1cmluZyBkZWxldGlvbjpcIiwgZXJyb3IpO1xyXG4gICAgICAgICAgICBhbGVydChcIlRoZXJlIHdhcyBhbiBlcnJvciBkZWxldGluZyB0aGUgZmFjaWxpdHkuXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlRmFjaWxpdHlGb3JtKCkge1xyXG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmYWNpbGl0eUZvcm0nKTtcclxuICAgIGZvcm0uc3R5bGUuZGlzcGxheSA9IGZvcm0uc3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnID8gJ2Jsb2NrJyA6ICdub25lJztcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmYWNpbGl0eUlEJykudmFsdWUgPSAnJztcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2NhdGlvbicpLnZhbHVlID0gJyc7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRvZ2dsZUNsdWJGb3JtKCkge1xyXG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbHViRm9ybScpO1xyXG4gICAgZm9ybS5zdHlsZS5kaXNwbGF5ID0gZm9ybS5zdHlsZS5kaXNwbGF5ID09PSAnbm9uZScgPyAnYmxvY2snIDogJ25vbmUnO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NsdWJJRCcpLnZhbHVlID0gJyc7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2Fsb3J5QnVyblJhdGUnKS52YWx1ZSA9ICcnO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBsb2FkQ2x1YnMoKSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL3Nob3dhbGxjbHVicy03N2hraTMycW5hLW53LmEucnVuLmFwcCcsIHtcclxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YS5jbHVicyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRhYmxlQm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2x1YnNUYWJsZSB0Ym9keVwiKTtcclxuICAgICAgICB0YWJsZUJvZHkuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcbiAgICAgICAgT2JqZWN0LmVudHJpZXMoZGF0YS5jbHVicykuZm9yRWFjaCgoW2NsdWJJRCwgY2x1Yl0pID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgbmFtZUNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgICAgICAgICAgIG5hbWVDZWxsLnRleHRDb250ZW50ID0gY2x1YklEO1xyXG4gICAgICAgICAgICBjb25zdCBjYWxvcnlDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xyXG4gICAgICAgICAgICBjYWxvcnlDZWxsLnRleHRDb250ZW50ID0gY2x1Yi5jYWxvcnlCdXJuUmF0ZTtcclxuICAgICAgICAgICAgY29uc3QgZWRpdENlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgICAgICAgICAgIGVkaXRDZWxsLmlubmVySFRNTCA9IGA8YSBocmVmPVwiI1wiIG9uY2xpY2s9XCJlZGl0Q2x1YignJHtjbHViSUR9JylcIj5cdTI3MEZcdUZFMEY8L2E+YDtcclxuICAgICAgICAgICAgY29uc3QgZGVsZXRlQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuICAgICAgICAgICAgZGVsZXRlQ2VsbC5pbm5lckhUTUwgPSBgPGEgaHJlZj1cIiNcIiBvbmNsaWNrPVwiZGVsZXRlQ2x1YignJHtjbHViSUR9JylcIj5cdTI3NEM8L2E+YDtcclxuXHJcbiAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChuYW1lQ2VsbCk7XHJcbiAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChjYWxvcnlDZWxsKTtcclxuICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKGVkaXRDZWxsKTtcclxuICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKGRlbGV0ZUNlbGwpO1xyXG5cclxuICAgICAgICAgICAgdGFibGVCb2R5LmFwcGVuZENoaWxkKHJvdyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUNsdWIoKSB7XHJcbiAgICBjb25zdCBjbHViSUQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2x1YklEJykudmFsdWU7XHJcbiAgICBsZXQgY2Fsb3J5QnVyblJhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2Fsb3J5QnVyblJhdGUnKS52YWx1ZTtcclxuXHJcbiAgICBpZiAoIWNsdWJJRCB8fCAhY2Fsb3J5QnVyblJhdGUpIHtcclxuICAgICAgICBhbGVydChcIlBsZWFzZSBmaWxsIGluIGJvdGggZmllbGRzLlwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjYWxvcnlCdXJuUmF0ZSA9IHBhcnNlSW50KGNhbG9yeUJ1cm5SYXRlLCAxMCk7XHJcblxyXG4gICAgaWYgKGlzTmFOKGNhbG9yeUJ1cm5SYXRlKSB8fCBjYWxvcnlCdXJuUmF0ZSA8IDEgfHwgY2Fsb3J5QnVyblJhdGUgPiAxMDAwKSB7XHJcbiAgICAgICAgYWxlcnQoXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBjYWxvcnkgYnVybiByYXRlIGJldHdlZW4gMSBhbmQgMTAwMC5cIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9jcmVhdGVjbHViLTc3aGtpMzJxbmEtbncuYS5ydW4uYXBwJywge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBjbHViSUQ6IGNsdWJJRCwgY2Fsb3J5QnVyblJhdGU6IGNhbG9yeUJ1cm5SYXRlIH0pLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KHJlc3VsdC5tZXNzYWdlKTtcclxuICAgICAgICAgICAgdG9nZ2xlQ2x1YkZvcm0oKTtcclxuICAgICAgICAgICAgbG9hZENsdWJzKCk7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoYEVycm9yOiAke3Jlc3VsdC5lcnJvcn1gKTtcclxuICAgICAgICB9XHJcbiAgICB9IFxyXG4gICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBkdXJpbmcgY2x1YiBjcmVhdGlvbjpcIiwgZXJyb3IpO1xyXG4gICAgICAgIGFsZXJ0KFwiVGhlcmUgd2FzIGFuIGVycm9yIGNyZWF0aW5nIHRoZSBjbHViLlwiKTtcclxuICAgIH1cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gZWRpdENsdWIoY2x1YklEKXtcclxuICAgIGxldCBuZXdDYWxvcnlCdXJuUmF0ZSA9IHByb21wdChgRW50ZXIgbmV3IGNhbG9yeSBidXJuIHJhdGUgZm9yICR7Y2x1YklEfSAoMS0xMDAwKTpgKTtcclxuXHJcbiAgICBuZXdDYWxvcnlCdXJuUmF0ZSA9IHBhcnNlSW50KG5ld0NhbG9yeUJ1cm5SYXRlLCAxMCk7XHJcbiAgICBpZiAoaXNOYU4obmV3Q2Fsb3J5QnVyblJhdGUpIHx8IG5ld0NhbG9yeUJ1cm5SYXRlIDwgMSB8fCBuZXdDYWxvcnlCdXJuUmF0ZSA+IDEwMDApIHtcclxuICAgICAgICBhbGVydChcIlBsZWFzZSBlbnRlciBhIHZhbGlkIGNhbG9yeSBidXJuIHJhdGUgYmV0d2VlbiAxIGFuZCAxMDAwLlwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL3VwZGF0ZWNsdWItNzdoa2kzMnFuYS1udy5hLnJ1bi5hcHAnLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BVVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgY2x1YklEOiBjbHViSUQsIG5ld0NhbG9yeUJ1cm5SYXRlOiBuZXdDYWxvcnlCdXJuUmF0ZSB9KSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgICAgICBhbGVydChgQ2x1YiAke2NsdWJJRH0gdXBkYXRlZCBzdWNjZXNzZnVsbHkhYCk7XHJcbiAgICAgICAgICAgIGxvYWRDbHVicygpO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KGBFcnJvcjogJHtyZXN1bHQuZXJyb3J9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBcclxuICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciB1cGRhdGluZyBjbHViOlwiLCBlcnJvcik7XHJcbiAgICAgICAgYWxlcnQoXCJUaGVyZSB3YXMgYW4gZXJyb3IgdXBkYXRpbmcgdGhlIGNsdWIuXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBkZWxldGVDbHViKGNsdWJJRCl7XHJcbiAgICBjb25zdCBjb25maXJtZWQgPSB3aW5kb3cuY29uZmlybShgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGNsdWI/YCk7XHJcbiAgICBpZiAoY29uZmlybWVkKXtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL2RlbGV0ZWNsdWItNzdoa2kzMnFuYS1udy5hLnJ1bi5hcHAnLCB7XHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBjbHViSUQ6IGNsdWJJRCB9KSxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KHJlc3VsdC5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIGxvYWRDbHVicygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoYEVycm9yOiAke3Jlc3VsdC5lcnJvcn1gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBkdXJpbmcgZGVsZXRpb246XCIsIGVycm9yKTtcclxuICAgICAgICAgICAgYWxlcnQoXCJUaGVyZSB3YXMgYW4gZXJyb3IgZGVsZXRpbmcgdGhlIGNsdWIuXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLy8gYm9va0ZhY2lsaXR5KClcclxuY29uc3QgY3VycmVudFBhZ2UgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XHJcbmlmIChjdXJyZW50UGFnZS5pbmNsdWRlcygnbWFuYWdlY2x1YnMuaHRtbCcpKSB7XHJcbiAgICBsb2FkQ2x1YnMoKTtcclxufVxyXG5lbHNlIGlmIChjdXJyZW50UGFnZS5pbmNsdWRlcygnbWFuYWdlZmFjaWxpdGllcy5odG1sJykpIHtcclxuICAgIGxvYWRGYWNpbGl0aWVzKCk7IFxyXG59XHJcblxyXG5kb2N1bWVudC5jcmVhdGVGYWNpbGl0eSA9IGNyZWF0ZUZhY2lsaXR5O1xyXG5kb2N1bWVudC5lZGl0RmFjaWxpdHkgPSBlZGl0RmFjaWxpdHk7XHJcbmRvY3VtZW50LmRlbGV0ZUZhY2lsaXR5ID0gZGVsZXRlRmFjaWxpdHk7XHJcbmRvY3VtZW50LnRvZ2dsZUZhY2lsaXR5Rm9ybSA9IHRvZ2dsZUZhY2lsaXR5Rm9ybTtcclxuZG9jdW1lbnQudG9nZ2xlQ2x1YkZvcm0gPSB0b2dnbGVDbHViRm9ybTtcclxuZG9jdW1lbnQuY3JlYXRlQ2x1YiA9IGNyZWF0ZUNsdWI7XHJcbmRvY3VtZW50LmVkaXRDbHViID0gZWRpdENsdWI7XHJcbmRvY3VtZW50LmRlbGV0ZUNsdWIgPSBkZWxldGVDbHViOyJdLAogICJtYXBwaW5ncyI6ICI7O0FBcUNBLGlCQUFlLGlCQUFpQjtBQUM1QixVQUFNLFdBQVcsTUFBTSxNQUFNLHFEQUFxRDtBQUFBLE1BQzlFLFFBQVE7QUFBQSxNQUNSLFNBQVM7QUFBQSxRQUNMLGdCQUFnQjtBQUFBLE1BQ3BCO0FBQUEsSUFDSixDQUFDO0FBRUQsUUFBSSxTQUFTLElBQUk7QUFDYixZQUFNLE9BQU8sTUFBTSxTQUFTLEtBQUs7QUFFakMsY0FBUSxJQUFJLEtBQUssVUFBVTtBQUUzQixZQUFNLFlBQVksU0FBUyxjQUFjLHdCQUF3QjtBQUNqRSxnQkFBVSxZQUFZO0FBRXRCLGFBQU8sUUFBUSxLQUFLLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQyxZQUFZLFFBQVEsTUFBTTtBQUNoRSxjQUFNLE1BQU0sU0FBUyxjQUFjLElBQUk7QUFFdkMsY0FBTSxXQUFXLFNBQVMsY0FBYyxJQUFJO0FBQzVDLGlCQUFTLGNBQWM7QUFDdkIsY0FBTSxlQUFlLFNBQVMsY0FBYyxJQUFJO0FBQ2hELHFCQUFhLGNBQWMs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
