(() => {
  // public/javascripts/trainer.js
  function toggleTrainingSessionForm() {
    const form = document.getElementById("trainingSessionForm");
    form.style.display = form.style.display === "none" ? "block" : "none";
    document.getElementById("description").value = "";
    document.getElementById("duration").value = "";
    document.getElementById("clubDropdown").selectedIndex = 0;
    document.getElementById("facilityDropdown").selectedIndex = 0;
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
      const facilityDropdown = document.querySelector("#facilityDropdown");
      Object.entries(data.facilities).forEach(([facilityID]) => {
        const option = document.createElement("option");
        option.value = facilityID;
        option.textContent = facilityID;
        facilityDropdown.appendChild(option);
      });
    }
  }
  async function loadTrainerClubs() {
    let username = localStorage.getItem("username");
    console.log(username);
    const response = await fetch("https://fetchtrainerclubs-77hki32qna-nw.a.run.app?trainerUsername=".concat(username), {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.ok) {
      const data = await response.json();
      const clubDropdown = document.querySelector("#clubDropdown");
      console.log(data);
      Object.entries(data.trainerClubs).forEach(([clubID, club]) => {
        const option = document.createElement("option");
        option.value = clubID;
        option.textContent = clubID;
        clubDropdown.appendChild(option);
      });
    }
  }
  async function bookTrainingSession() {
    const description = document.getElementById("description").value;
    const clubID = document.getElementById("clubDropdown").value;
    const facilityID = document.getElementById("facilityDropdown").value;
    const sessionStart = document.getElementById("sessionStart").value;
    let duration = document.getElementById("duration").value;
    const sessionType = document.getElementById("sessionType").value;
    alert(sessionType);
    if (!description || !clubID || !facilityID || !sessionStart || !duration || !sessionType) {
      alert("Please fill in all fields.");
      return;
    }
    duration = parseInt(duration, 10);
    if (isNaN(duration) || duration < 1 || duration > 1e3) {
      alert("Please enter a valid duration between 1 and 1000 minutes.");
      return;
    }
    if (document.getElementById("clubDropdown").selectedIndex === 0) {
      alert("Please select a valid club.");
      return;
    }
    if (document.getElementById("facilityDropdown").selectedIndex === 0) {
      alert("Please select a valid facility.");
      return;
    }
    try {
      const response = await fetch("https://bookfacility-77hki32qna-nw.a.run.app", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          description,
          clubID,
          facilityID,
          datetime: sessionStart,
          duration,
          bookingType: sessionType
        })
      });
      const result = await response.json();
      if (response.status === 200) {
        alert(result.verdict);
        toggleTrainingSessionForm();
        loadTrainingSessions();
      } else {
        alert("Error: ".concat(result.error));
      }
    } catch (error) {
      console.log("Error during training session booking:", error);
      alert("There was an error booking the session.");
    }
  }
  async function loadTrainingSessions() {
    const username = localStorage.getItem("username");
    const response = await fetch("https://fetchtrainerclubs-77hki32qna-nw.a.run.app?trainerUsername=".concat(username), {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.ok) {
      const data = await response.json();
      const tbody = document.querySelector("#trainingSessionsTable tbody");
      tbody.innerHTML = "";
      Object.entries(data.trainerClubs).forEach(([clubID, club]) => {
        const bookings = club.bookings;
        const membersBooking = club.membersBooking;
        Object.entries(bookings).forEach(([bookingID, booking]) => {
          const { description, datetime, duration, facilityID } = booking;
          let memberCount = 0;
          Object.entries(membersBooking).forEach(([userID, userBookings]) => {
            if (userBookings) {
              Object.entries(userBookings).forEach(([bookingKey, userBooking]) => {
                if (userBooking.trainingSlot === bookingID) {
                  memberCount++;
                }
              });
            }
          });
          const row = document.createElement("tr");
          const clubCell = document.createElement("td");
          clubCell.textContent = clubID;
          row.appendChild(clubCell);
          const typeCell = document.createElement("td");
          if (bookingID.startsWith("training")) {
            typeCell.textContent = "Training Session";
          } else if (bookingID.startsWith("advice")) {
            typeCell.textContent = "Professional Advice Session";
          } else {
            typeCell.textContent = "Unknown Type";
          }
          row.appendChild(typeCell);
          const descriptionCell = document.createElement("td");
          descriptionCell.textContent = description;
          row.appendChild(descriptionCell);
          const sessionStartCell = document.createElement("td");
          const sessionStartDate = new Date(datetime);
          sessionStartCell.textContent = sessionStartDate.toLocaleString();
          row.appendChild(sessionStartCell);
          const durationCell = document.createElement("td");
          durationCell.textContent = "".concat(duration, " mins");
          row.appendChild(durationCell);
          const facilityCell = document.createElement("td");
          facilityCell.textContent = facilityID;
          row.appendChild(facilityCell);
          const memberCountCell = document.createElement("td");
          memberCountCell.textContent = memberCount;
          row.appendChild(memberCountCell);
          const deleteCell = document.createElement("td");
          const deleteButton = document.createElement("button");
          deleteButton.textContent = "\u274C";
          deleteButton.classList.add("deleteButton");
          deleteButton.onclick = () => deleteTrainingSession(bookingID, clubID);
          deleteCell.appendChild(deleteButton);
          row.appendChild(deleteCell);
          tbody.appendChild(row);
        });
      });
    } else {
      console.log("Failed to fetch trainer clubs data");
    }
  }
  async function deleteTrainingSession(bookingID, clubID) {
    const confirmed = window.confirm("Are you sure you want to delete this training session?");
    if (confirmed) {
      try {
        const response = await fetch("https://deletefacilitybooking-77hki32qna-nw.a.run.app", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ bookingID, clubID })
        });
        const result = await response.json();
        if (response.ok) {
          alert(result.message);
          loadTrainingSessions();
        } else {
          alert("Error: ".concat(result.error));
        }
      } catch (error) {
        console.log("Error during booking deletion:", error);
        alert("There was an error deleting the booking.");
      }
    }
  }
  function toggleDateFilter() {
    const dateFilterInput = document.getElementById("dateFilter");
    const enableDateFilterCheckbox = document.getElementById("enableDateFilter");
    dateFilterInput.disabled = !enableDateFilterCheckbox.checked;
    if (!enableDateFilterCheckbox.checked) {
      dateFilterInput.value = "";
    }
    filterTable();
  }
  function filterTable() {
    const searchValue = document.getElementById("clubSearch").value.toLowerCase();
    const dateValue = document.getElementById("dateFilter").value;
    const enableDateFilter = document.getElementById("enableDateFilter").checked;
    const table = document.getElementById("trainingSessionsTable");
    const rows = table.getElementsByTagName("tr");
    for (let i = 1; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName("td");
      const clubCell = cells[0];
      const sessionStartCell = cells[3];
      if (clubCell && sessionStartCell) {
        const clubName = clubCell.textContent || clubCell.innerText;
        const sessionStartText = sessionStartCell.textContent.trim();
        const [datePart, timePart] = sessionStartText.split(", ");
        const [day, month, year] = datePart.split("/");
        const sessionStartDate = new Date("".concat(year, "-").concat(month.padStart(2, "0"), "-").concat(day.padStart(2, "0"), "T").concat(timePart));
        const formattedYear = sessionStartDate.getFullYear();
        const formattedMonth = (sessionStartDate.getMonth() + 1).toString().padStart(2, "0");
        const formattedDay = sessionStartDate.getDate().toString().padStart(2, "0");
        const formattedDate = "".concat(formattedYear, "-").concat(formattedMonth, "-").concat(formattedDay);
        let matchClub = clubName.toLowerCase().includes(searchValue);
        let matchDate = true;
        if (enableDateFilter && dateValue) {
          matchDate = formattedDate === dateValue;
        }
        if (matchClub && matchDate) {
          rows[i].style.display = "";
        } else {
          rows[i].style.display = "none";
        }
      }
    }
  }
  loadFacilities();
  loadTrainerClubs();
  loadTrainingSessions();
  document.toggleTrainingSessionForm = toggleTrainingSessionForm;
  document.bookTrainingSession = bookTrainingSession;
  document.loadTrainingSessions = loadTrainingSessions;
  document.deleteTrainingSession = deleteTrainingSession;
  document.toggleDateFilter = toggleDateFilter;
  document.filterTable = filterTable;
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidHJhaW5lci5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZnVuY3Rpb24gdG9nZ2xlVHJhaW5pbmdTZXNzaW9uRm9ybSgpIHtcclxuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHJhaW5pbmdTZXNzaW9uRm9ybScpO1xyXG4gICAgZm9ybS5zdHlsZS5kaXNwbGF5ID0gZm9ybS5zdHlsZS5kaXNwbGF5ID09PSAnbm9uZScgPyAnYmxvY2snIDogJ25vbmUnO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rlc2NyaXB0aW9uJykudmFsdWUgPSAnJztcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkdXJhdGlvbicpLnZhbHVlID0gJyc7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2x1YkRyb3Bkb3duJykuc2VsZWN0ZWRJbmRleCA9IDA7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmFjaWxpdHlEcm9wZG93bicpLnNlbGVjdGVkSW5kZXggPSAwO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBsb2FkRmFjaWxpdGllcygpIHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vc2hvd2FsbGZhY2lsaXRpZXMtNzdoa2kzMnFuYS1udy5hLnJ1bi5hcHAnLCB7XHJcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChyZXNwb25zZS5vaykge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGZhY2lsaXR5RHJvcGRvd24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2ZhY2lsaXR5RHJvcGRvd25cIik7XHJcblxyXG4gICAgICAgIE9iamVjdC5lbnRyaWVzKGRhdGEuZmFjaWxpdGllcykuZm9yRWFjaCgoW2ZhY2lsaXR5SURdKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XHJcbiAgICAgICAgICAgIG9wdGlvbi52YWx1ZSA9IGZhY2lsaXR5SUQ7XHJcbiAgICAgICAgICAgIG9wdGlvbi50ZXh0Q29udGVudCA9IGZhY2lsaXR5SUQ7XHJcblxyXG4gICAgICAgICAgICBmYWNpbGl0eURyb3Bkb3duLmFwcGVuZENoaWxkKG9wdGlvbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGxvYWRUcmFpbmVyQ2x1YnMoKXtcclxuICAgIC8vIGNvbnN0IHRyYWluZXJVc2VybmFtZSA9IFdFIEhBVkUgVE8gR0VUIFRISVNcclxuICAgIGxldCB1c2VybmFtZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VybmFtZScpO1xyXG4gICAgY29uc29sZS5sb2codXNlcm5hbWUpO1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9mZXRjaHRyYWluZXJjbHVicy03N2hraTMycW5hLW53LmEucnVuLmFwcD90cmFpbmVyVXNlcm5hbWU9JHt1c2VybmFtZX1gLCB7XHJcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChyZXNwb25zZS5vaykge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGNsdWJEcm9wZG93biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2x1YkRyb3Bkb3duXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgIE9iamVjdC5lbnRyaWVzKGRhdGEudHJhaW5lckNsdWJzKS5mb3JFYWNoKChbY2x1YklELCBjbHViXSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xyXG4gICAgICAgICAgICBvcHRpb24udmFsdWUgPSBjbHViSUQ7XHJcbiAgICAgICAgICAgIG9wdGlvbi50ZXh0Q29udGVudCA9IGNsdWJJRDtcclxuXHJcbiAgICAgICAgICAgIGNsdWJEcm9wZG93bi5hcHBlbmRDaGlsZChvcHRpb24pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBib29rVHJhaW5pbmdTZXNzaW9uKCl7XHJcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZXNjcmlwdGlvbicpLnZhbHVlO1xyXG4gICAgY29uc3QgY2x1YklEID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NsdWJEcm9wZG93bicpLnZhbHVlO1xyXG4gICAgY29uc3QgZmFjaWxpdHlJRCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmYWNpbGl0eURyb3Bkb3duJykudmFsdWU7XHJcbiAgICBjb25zdCBzZXNzaW9uU3RhcnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2Vzc2lvblN0YXJ0JykudmFsdWU7XHJcbiAgICBsZXQgZHVyYXRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZHVyYXRpb24nKS52YWx1ZTtcclxuICAgIGNvbnN0IHNlc3Npb25UeXBlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Nlc3Npb25UeXBlJykudmFsdWU7XHJcbiAgICBhbGVydChzZXNzaW9uVHlwZSk7XHJcblxyXG4gICAgaWYgKCFkZXNjcmlwdGlvbiB8fCAhY2x1YklEIHx8ICFmYWNpbGl0eUlEIHx8ICFzZXNzaW9uU3RhcnQgfHwgIWR1cmF0aW9uICB8fCAhc2Vzc2lvblR5cGUpIHtcclxuICAgICAgICBhbGVydChcIlBsZWFzZSBmaWxsIGluIGFsbCBmaWVsZHMuXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBkdXJhdGlvbiA9IHBhcnNlSW50KGR1cmF0aW9uLCAxMCk7XHJcblxyXG4gICAgaWYgKGlzTmFOKGR1cmF0aW9uKSB8fCBkdXJhdGlvbiA8IDEgfHwgZHVyYXRpb24gPiAxMDAwKSB7XHJcbiAgICAgICAgYWxlcnQoXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBkdXJhdGlvbiBiZXR3ZWVuIDEgYW5kIDEwMDAgbWludXRlcy5cIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2x1YkRyb3Bkb3duJykuc2VsZWN0ZWRJbmRleCA9PT0gMCkge1xyXG4gICAgICAgIGFsZXJ0KFwiUGxlYXNlIHNlbGVjdCBhIHZhbGlkIGNsdWIuXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZhY2lsaXR5RHJvcGRvd24nKS5zZWxlY3RlZEluZGV4ID09PSAwKSB7XHJcbiAgICAgICAgYWxlcnQoXCJQbGVhc2Ugc2VsZWN0IGEgdmFsaWQgZmFjaWxpdHkuXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vYm9va2ZhY2lsaXR5LTc3aGtpMzJxbmEtbncuYS5ydW4uYXBwJywge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgY2x1YklEOiBjbHViSUQsXHJcbiAgICAgICAgICAgICAgICBmYWNpbGl0eUlEOiBmYWNpbGl0eUlELFxyXG4gICAgICAgICAgICAgICAgZGF0ZXRpbWU6IHNlc3Npb25TdGFydCxcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbixcclxuICAgICAgICAgICAgICAgIGJvb2tpbmdUeXBlOiBzZXNzaW9uVHlwZVxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgICAgICBhbGVydChyZXN1bHQudmVyZGljdCk7XHJcbiAgICAgICAgICAgIHRvZ2dsZVRyYWluaW5nU2Vzc2lvbkZvcm0oKTtcclxuICAgICAgICAgICAgbG9hZFRyYWluaW5nU2Vzc2lvbnMoKTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChgRXJyb3I6ICR7cmVzdWx0LmVycm9yfWApO1xyXG4gICAgICAgIH1cclxuICAgIH0gXHJcbiAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGR1cmluZyB0cmFpbmluZyBzZXNzaW9uIGJvb2tpbmc6XCIsIGVycm9yKTtcclxuICAgICAgICBhbGVydChcIlRoZXJlIHdhcyBhbiBlcnJvciBib29raW5nIHRoZSBzZXNzaW9uLlwiKTtcclxuICAgIH1cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gbG9hZFRyYWluaW5nU2Vzc2lvbnMoKSB7XHJcbiAgICBjb25zdCB1c2VybmFtZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VybmFtZScpO1xyXG4gICAgLy8gaHR0cDovLzEyNy4wLjAuMTo1MDAxL3Nwb3J0cy1hcmVuYS0zOWEzMi9ldXJvcGUtd2VzdDIvZmV0Y2hUcmFpbmVyQ2x1YnM/dHJhaW5lclVzZXJuYW1lPSR7dXNlcm5hbWV9XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwczovL2ZldGNodHJhaW5lcmNsdWJzLTc3aGtpMzJxbmEtbncuYS5ydW4uYXBwP3RyYWluZXJVc2VybmFtZT0ke3VzZXJuYW1lfWAsIHtcclxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICB9LFxyXG4gICAgfSk7XHJcbiAgICBpZiAocmVzcG9uc2Uub2spIHtcclxuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgIGNvbnN0IHRib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0cmFpbmluZ1Nlc3Npb25zVGFibGUgdGJvZHlcIik7XHJcbiAgICAgICAgdGJvZHkuaW5uZXJIVE1MID0gJyc7XHJcblxyXG4gICAgICAgIE9iamVjdC5lbnRyaWVzKGRhdGEudHJhaW5lckNsdWJzKS5mb3JFYWNoKChbY2x1YklELCBjbHViXSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBib29raW5ncyA9IGNsdWIuYm9va2luZ3M7XHJcbiAgICAgICAgICAgIGNvbnN0IG1lbWJlcnNCb29raW5nID0gY2x1Yi5tZW1iZXJzQm9va2luZztcclxuXHJcbiAgICAgICAgICAgIE9iamVjdC5lbnRyaWVzKGJvb2tpbmdzKS5mb3JFYWNoKChbYm9va2luZ0lELCBib29raW5nXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeyBkZXNjcmlwdGlvbiwgZGF0ZXRpbWUsIGR1cmF0aW9uLCBmYWNpbGl0eUlEIH0gPSBib29raW5nO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBtZW1iZXJDb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICBPYmplY3QuZW50cmllcyhtZW1iZXJzQm9va2luZykuZm9yRWFjaCgoW3VzZXJJRCwgdXNlckJvb2tpbmdzXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyQm9va2luZ3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmVudHJpZXModXNlckJvb2tpbmdzKS5mb3JFYWNoKChbYm9va2luZ0tleSwgdXNlckJvb2tpbmddKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodXNlckJvb2tpbmcudHJhaW5pbmdTbG90ID09PSBib29raW5nSUQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZW1iZXJDb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgY2x1YkNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgICAgICAgICAgICAgICBjbHViQ2VsbC50ZXh0Q29udGVudCA9IGNsdWJJRDtcclxuICAgICAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChjbHViQ2VsbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZUNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoYm9va2luZ0lELnN0YXJ0c1dpdGgoXCJ0cmFpbmluZ1wiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGVDZWxsLnRleHRDb250ZW50ID0gXCJUcmFpbmluZyBTZXNzaW9uXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChib29raW5nSUQuc3RhcnRzV2l0aChcImFkdmljZVwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGVDZWxsLnRleHRDb250ZW50ID0gXCJQcm9mZXNzaW9uYWwgQWR2aWNlIFNlc3Npb25cIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGVDZWxsLnRleHRDb250ZW50ID0gXCJVbmtub3duIFR5cGVcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZCh0eXBlQ2VsbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb25DZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb25DZWxsLnRleHRDb250ZW50ID0gZGVzY3JpcHRpb247XHJcbiAgICAgICAgICAgICAgICByb3cuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb25DZWxsKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBzZXNzaW9uU3RhcnRDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2Vzc2lvblN0YXJ0RGF0ZSA9IG5ldyBEYXRlKGRhdGV0aW1lKTtcclxuICAgICAgICAgICAgICAgIHNlc3Npb25TdGFydENlbGwudGV4dENvbnRlbnQgPSBzZXNzaW9uU3RhcnREYXRlLnRvTG9jYWxlU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICByb3cuYXBwZW5kQ2hpbGQoc2Vzc2lvblN0YXJ0Q2VsbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgZHVyYXRpb25DZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xyXG4gICAgICAgICAgICAgICAgZHVyYXRpb25DZWxsLnRleHRDb250ZW50ID0gYCR7ZHVyYXRpb259IG1pbnNgO1xyXG4gICAgICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKGR1cmF0aW9uQ2VsbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgZmFjaWxpdHlDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xyXG4gICAgICAgICAgICAgICAgZmFjaWxpdHlDZWxsLnRleHRDb250ZW50ID0gZmFjaWxpdHlJRDtcclxuICAgICAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChmYWNpbGl0eUNlbGwpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IG1lbWJlckNvdW50Q2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuICAgICAgICAgICAgICAgIG1lbWJlckNvdW50Q2VsbC50ZXh0Q29udGVudCA9IG1lbWJlckNvdW50O1xyXG4gICAgICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKG1lbWJlckNvdW50Q2VsbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgZGVsZXRlQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICAgICAgICAgICAgICBkZWxldGVCdXR0b24udGV4dENvbnRlbnQgPSBcIlx1Mjc0Q1wiO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJkZWxldGVCdXR0b25cIik7XHJcbiAgICAgICAgICAgICAgICBkZWxldGVCdXR0b24ub25jbGljayA9ICgpID0+IGRlbGV0ZVRyYWluaW5nU2Vzc2lvbihib29raW5nSUQsIGNsdWJJRCk7XHJcbiAgICAgICAgICAgICAgICBkZWxldGVDZWxsLmFwcGVuZENoaWxkKGRlbGV0ZUJ1dHRvbik7XHJcbiAgICAgICAgICAgICAgICByb3cuYXBwZW5kQ2hpbGQoZGVsZXRlQ2VsbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGJvZHkuYXBwZW5kQ2hpbGQocm93KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IFxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJGYWlsZWQgdG8gZmV0Y2ggdHJhaW5lciBjbHVicyBkYXRhXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBkZWxldGVUcmFpbmluZ1Nlc3Npb24oYm9va2luZ0lELCBjbHViSUQpIHtcclxuICAgIGNvbnN0IGNvbmZpcm1lZCA9IHdpbmRvdy5jb25maXJtKGBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgdHJhaW5pbmcgc2Vzc2lvbj9gKTtcclxuICAgIGlmIChjb25maXJtZWQpe1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIGh0dHA6Ly8xMjcuMC4wLjE6NTAwMS9zcG9ydHMtYXJlbmEtMzlhMzIvZXVyb3BlLXdlc3QyL2RlbGV0ZUZhY2lsaXR5Qm9va2luZ1xyXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwczovL2RlbGV0ZWZhY2lsaXR5Ym9va2luZy03N2hraTMycW5hLW53LmEucnVuLmFwcGAsIHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0RFTEVURScsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IGJvb2tpbmdJRCwgY2x1YklEIH0pLFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChyZXN1bHQubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICBsb2FkVHJhaW5pbmdTZXNzaW9ucygpO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KGBFcnJvcjogJHtyZXN1bHQuZXJyb3J9YCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IFxyXG4gICAgICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGR1cmluZyBib29raW5nIGRlbGV0aW9uOlwiLCBlcnJvcik7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiVGhlcmUgd2FzIGFuIGVycm9yIGRlbGV0aW5nIHRoZSBib29raW5nLlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRvZ2dsZURhdGVGaWx0ZXIoKSB7XHJcbiAgICBjb25zdCBkYXRlRmlsdGVySW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGF0ZUZpbHRlcicpO1xyXG4gICAgY29uc3QgZW5hYmxlRGF0ZUZpbHRlckNoZWNrYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VuYWJsZURhdGVGaWx0ZXInKTtcclxuICAgIFxyXG4gICAgZGF0ZUZpbHRlcklucHV0LmRpc2FibGVkID0gIWVuYWJsZURhdGVGaWx0ZXJDaGVja2JveC5jaGVja2VkO1xyXG4gICAgXHJcbiAgICBpZiAoIWVuYWJsZURhdGVGaWx0ZXJDaGVja2JveC5jaGVja2VkKSB7XHJcbiAgICAgICAgZGF0ZUZpbHRlcklucHV0LnZhbHVlID0gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgZmlsdGVyVGFibGUoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZmlsdGVyVGFibGUoKSB7XHJcbiAgICBjb25zdCBzZWFyY2hWYWx1ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbHViU2VhcmNoJykudmFsdWUudG9Mb3dlckNhc2UoKTtcclxuICAgIGNvbnN0IGRhdGVWYWx1ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYXRlRmlsdGVyJykudmFsdWU7XHJcbiAgICBjb25zdCBlbmFibGVEYXRlRmlsdGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VuYWJsZURhdGVGaWx0ZXInKS5jaGVja2VkO1xyXG4gICAgY29uc3QgdGFibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHJhaW5pbmdTZXNzaW9uc1RhYmxlJyk7XHJcbiAgICBjb25zdCByb3dzID0gdGFibGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3RyJyk7XHJcbiAgICBcclxuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgcm93cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGNlbGxzID0gcm93c1tpXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgndGQnKTtcclxuICAgICAgICBjb25zdCBjbHViQ2VsbCA9IGNlbGxzWzBdO1xyXG4gICAgICAgIGNvbnN0IHNlc3Npb25TdGFydENlbGwgPSBjZWxsc1szXTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoY2x1YkNlbGwgJiYgc2Vzc2lvblN0YXJ0Q2VsbCkge1xyXG4gICAgICAgICAgICBjb25zdCBjbHViTmFtZSA9IGNsdWJDZWxsLnRleHRDb250ZW50IHx8IGNsdWJDZWxsLmlubmVyVGV4dDtcclxuICAgICAgICAgICAgY29uc3Qgc2Vzc2lvblN0YXJ0VGV4dCA9IHNlc3Npb25TdGFydENlbGwudGV4dENvbnRlbnQudHJpbSgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc3QgW2RhdGVQYXJ0LCB0aW1lUGFydF0gPSBzZXNzaW9uU3RhcnRUZXh0LnNwbGl0KCcsICcpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgW2RheSwgbW9udGgsIHllYXJdID0gZGF0ZVBhcnQuc3BsaXQoJy8nKTtcclxuICAgICAgICAgICAgY29uc3Qgc2Vzc2lvblN0YXJ0RGF0ZSA9IG5ldyBEYXRlKGAke3llYXJ9LSR7bW9udGgucGFkU3RhcnQoMiwgJzAnKX0tJHtkYXkucGFkU3RhcnQoMiwgJzAnKX1UJHt0aW1lUGFydH1gKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdHRlZFllYXIgPSBzZXNzaW9uU3RhcnREYXRlLmdldEZ1bGxZZWFyKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdHRlZE1vbnRoID0gKHNlc3Npb25TdGFydERhdGUuZ2V0TW9udGgoKSArIDEpLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKTtcclxuICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVkRGF5ID0gc2Vzc2lvblN0YXJ0RGF0ZS5nZXREYXRlKCkudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVkRGF0ZSA9IGAke2Zvcm1hdHRlZFllYXJ9LSR7Zm9ybWF0dGVkTW9udGh9LSR7Zm9ybWF0dGVkRGF5fWA7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgbWF0Y2hDbHViID0gY2x1Yk5hbWUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hWYWx1ZSk7XHJcbiAgICAgICAgICAgIGxldCBtYXRjaERhdGUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKGVuYWJsZURhdGVGaWx0ZXIgJiYgZGF0ZVZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBtYXRjaERhdGUgPSBmb3JtYXR0ZWREYXRlID09PSBkYXRlVmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChtYXRjaENsdWIgJiYgbWF0Y2hEYXRlKSB7XHJcbiAgICAgICAgICAgICAgICByb3dzW2ldLnN0eWxlLmRpc3BsYXkgPSAnJztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJvd3NbaV0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxubG9hZEZhY2lsaXRpZXMoKTtcclxubG9hZFRyYWluZXJDbHVicygpO1xyXG5sb2FkVHJhaW5pbmdTZXNzaW9ucygpO1xyXG5cclxuZG9jdW1lbnQudG9nZ2xlVHJhaW5pbmdTZXNzaW9uRm9ybSA9IHRvZ2dsZVRyYWluaW5nU2Vzc2lvbkZvcm07XHJcbmRvY3VtZW50LmJvb2tUcmFpbmluZ1Nlc3Npb24gPSBib29rVHJhaW5pbmdTZXNzaW9uO1xyXG5kb2N1bWVudC5sb2FkVHJhaW5pbmdTZXNzaW9ucyA9IGxvYWRUcmFpbmluZ1Nlc3Npb25zO1xyXG5kb2N1bWVudC5kZWxldGVUcmFpbmluZ1Nlc3Npb24gPSBkZWxldGVUcmFpbmluZ1Nlc3Npb247XHJcbmRvY3VtZW50LnRvZ2dsZURhdGVGaWx0ZXIgPSB0b2dnbGVEYXRlRmlsdGVyO1xyXG5kb2N1bWVudC5maWx0ZXJUYWJsZSA9IGZpbHRlclRhYmxlOyJdLAogICJtYXBwaW5ncyI6ICI7O0FBQUEsV0FBUyw0QkFBNEI7QUFDakMsVUFBTSxPQUFPLFNBQVMsZUFBZSxxQkFBcUI7QUFDMUQsU0FBSyxNQUFNLFVBQVUsS0FBSyxNQUFNLFlBQVksU0FBUyxVQUFVO0FBQy9ELGFBQVMsZUFBZSxhQUFhLEVBQUUsUUFBUTtBQUMvQyxhQUFTLGVBQWUsVUFBVSxFQUFFLFFBQVE7QUFDNUMsYUFBUyxlQUFlLGNBQWMsRUFBRSxnQkFBZ0I7QUFDeEQsYUFBUyxlQUFlLGtCQUFrQixFQUFFLGdCQUFnQjtBQUFBLEVBQ2hFO0FBRUEsaUJBQWUsaUJBQWlCO0FBQzVCLFVBQU0sV0FBVyxNQUFNLE1BQU0scURBQXFEO0FB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
