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
    const response = await fetch("http://127.0.0.1:5001/sports-arena-39a32/europe-west2/fetchTrainerClubs?trainerUsername=".concat(username), {
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
    if (!description || !clubID || !facilityID || !sessionStart || !duration) {
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
          duration
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
    const response = await fetch("http://127.0.0.1:5001/sports-arena-39a32/europe-west2/fetchTrainerClubs?trainerUsername=".concat(username), {
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
        Object.entries(bookings).forEach(([bookingID, booking]) => {
          const { description, datetime, duration, facilityID } = booking;
          const row = document.createElement("tr");
          const clubCell = document.createElement("td");
          clubCell.textContent = clubID;
          row.appendChild(clubCell);
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
        const response = await fetch("http://127.0.0.1:5001/sports-arena-39a32/europe-west2/deleteFacilityBooking", {
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
  loadFacilities();
  loadTrainerClubs();
  loadTrainingSessions();
  document.toggleTrainingSessionForm = toggleTrainingSessionForm;
  document.bookTrainingSession = bookTrainingSession;
  document.loadTrainingSessions = loadTrainingSessions;
  document.deleteTrainingSession = deleteTrainingSession;
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidHJhaW5lci5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZnVuY3Rpb24gdG9nZ2xlVHJhaW5pbmdTZXNzaW9uRm9ybSgpIHtcclxuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHJhaW5pbmdTZXNzaW9uRm9ybScpO1xyXG4gICAgZm9ybS5zdHlsZS5kaXNwbGF5ID0gZm9ybS5zdHlsZS5kaXNwbGF5ID09PSAnbm9uZScgPyAnYmxvY2snIDogJ25vbmUnO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rlc2NyaXB0aW9uJykudmFsdWUgPSAnJztcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkdXJhdGlvbicpLnZhbHVlID0gJyc7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2x1YkRyb3Bkb3duJykuc2VsZWN0ZWRJbmRleCA9IDA7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmFjaWxpdHlEcm9wZG93bicpLnNlbGVjdGVkSW5kZXggPSAwO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBsb2FkRmFjaWxpdGllcygpIHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vc2hvd2FsbGZhY2lsaXRpZXMtNzdoa2kzMnFuYS1udy5hLnJ1bi5hcHAnLCB7XHJcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChyZXNwb25zZS5vaykge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGZhY2lsaXR5RHJvcGRvd24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2ZhY2lsaXR5RHJvcGRvd25cIik7XHJcblxyXG4gICAgICAgIE9iamVjdC5lbnRyaWVzKGRhdGEuZmFjaWxpdGllcykuZm9yRWFjaCgoW2ZhY2lsaXR5SURdKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XHJcbiAgICAgICAgICAgIG9wdGlvbi52YWx1ZSA9IGZhY2lsaXR5SUQ7XHJcbiAgICAgICAgICAgIG9wdGlvbi50ZXh0Q29udGVudCA9IGZhY2lsaXR5SUQ7XHJcblxyXG4gICAgICAgICAgICBmYWNpbGl0eURyb3Bkb3duLmFwcGVuZENoaWxkKG9wdGlvbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGxvYWRUcmFpbmVyQ2x1YnMoKXtcclxuICAgIC8vIGNvbnN0IHRyYWluZXJVc2VybmFtZSA9IFdFIEhBVkUgVE8gR0VUIFRISVNcclxuICAgIGxldCB1c2VybmFtZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VybmFtZScpO1xyXG4gICAgY29uc29sZS5sb2codXNlcm5hbWUpO1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cDovLzEyNy4wLjAuMTo1MDAxL3Nwb3J0cy1hcmVuYS0zOWEzMi9ldXJvcGUtd2VzdDIvZmV0Y2hUcmFpbmVyQ2x1YnM/dHJhaW5lclVzZXJuYW1lPSR7dXNlcm5hbWV9YCwge1xyXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAocmVzcG9uc2Uub2spIHtcclxuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cclxuICAgICAgICBjb25zdCBjbHViRHJvcGRvd24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NsdWJEcm9wZG93blwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICBPYmplY3QuZW50cmllcyhkYXRhLnRyYWluZXJDbHVicykuZm9yRWFjaCgoW2NsdWJJRCwgY2x1Yl0pID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcclxuICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gY2x1YklEO1xyXG4gICAgICAgICAgICBvcHRpb24udGV4dENvbnRlbnQgPSBjbHViSUQ7XHJcblxyXG4gICAgICAgICAgICBjbHViRHJvcGRvd24uYXBwZW5kQ2hpbGQob3B0aW9uKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gYm9va1RyYWluaW5nU2Vzc2lvbigpe1xyXG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVzY3JpcHRpb24nKS52YWx1ZTtcclxuICAgIGNvbnN0IGNsdWJJRCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbHViRHJvcGRvd24nKS52YWx1ZTtcclxuICAgIGNvbnN0IGZhY2lsaXR5SUQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmFjaWxpdHlEcm9wZG93bicpLnZhbHVlO1xyXG4gICAgY29uc3Qgc2Vzc2lvblN0YXJ0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Nlc3Npb25TdGFydCcpLnZhbHVlO1xyXG4gICAgbGV0IGR1cmF0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2R1cmF0aW9uJykudmFsdWU7XHJcblxyXG4gICAgaWYgKCFkZXNjcmlwdGlvbiB8fCAhY2x1YklEIHx8ICFmYWNpbGl0eUlEIHx8ICFzZXNzaW9uU3RhcnQgfHwgIWR1cmF0aW9uKSB7XHJcbiAgICAgICAgYWxlcnQoXCJQbGVhc2UgZmlsbCBpbiBhbGwgZmllbGRzLlwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgZHVyYXRpb24gPSBwYXJzZUludChkdXJhdGlvbiwgMTApO1xyXG5cclxuICAgIGlmIChpc05hTihkdXJhdGlvbikgfHwgZHVyYXRpb24gPCAxIHx8IGR1cmF0aW9uID4gMTAwMCkge1xyXG4gICAgICAgIGFsZXJ0KFwiUGxlYXNlIGVudGVyIGEgdmFsaWQgZHVyYXRpb24gYmV0d2VlbiAxIGFuZCAxMDAwIG1pbnV0ZXMuXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NsdWJEcm9wZG93bicpLnNlbGVjdGVkSW5kZXggPT09IDApIHtcclxuICAgICAgICBhbGVydChcIlBsZWFzZSBzZWxlY3QgYSB2YWxpZCBjbHViLlwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmYWNpbGl0eURyb3Bkb3duJykuc2VsZWN0ZWRJbmRleCA9PT0gMCkge1xyXG4gICAgICAgIGFsZXJ0KFwiUGxlYXNlIHNlbGVjdCBhIHZhbGlkIGZhY2lsaXR5LlwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL2Jvb2tmYWNpbGl0eS03N2hraTMycW5hLW53LmEucnVuLmFwcCcsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgICAgIGNsdWJJRDogY2x1YklELFxyXG4gICAgICAgICAgICAgICAgZmFjaWxpdHlJRDogZmFjaWxpdHlJRCxcclxuICAgICAgICAgICAgICAgIGRhdGV0aW1lOiBzZXNzaW9uU3RhcnQsXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb25cclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgICAgYWxlcnQocmVzdWx0LnZlcmRpY3QpO1xyXG4gICAgICAgICAgICB0b2dnbGVUcmFpbmluZ1Nlc3Npb25Gb3JtKCk7XHJcbiAgICAgICAgICAgIGxvYWRUcmFpbmluZ1Nlc3Npb25zKCk7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoYEVycm9yOiAke3Jlc3VsdC5lcnJvcn1gKTtcclxuICAgICAgICB9XHJcbiAgICB9IFxyXG4gICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBkdXJpbmcgdHJhaW5pbmcgc2Vzc2lvbiBib29raW5nOlwiLCBlcnJvcik7XHJcbiAgICAgICAgYWxlcnQoXCJUaGVyZSB3YXMgYW4gZXJyb3IgYm9va2luZyB0aGUgc2Vzc2lvbi5cIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGxvYWRUcmFpbmluZ1Nlc3Npb25zKCkge1xyXG4gICAgY29uc3QgdXNlcm5hbWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlcm5hbWUnKTtcclxuXHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwOi8vMTI3LjAuMC4xOjUwMDEvc3BvcnRzLWFyZW5hLTM5YTMyL2V1cm9wZS13ZXN0Mi9mZXRjaFRyYWluZXJDbHVicz90cmFpbmVyVXNlcm5hbWU9JHt1c2VybmFtZX1gLCB7XHJcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgfSxcclxuICAgIH0pO1xyXG4gICAgaWYgKHJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICBjb25zdCB0Ym9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdHJhaW5pbmdTZXNzaW9uc1RhYmxlIHRib2R5XCIpO1xyXG4gICAgICAgIHRib2R5LmlubmVySFRNTCA9ICcnO1xyXG5cclxuICAgICAgICBPYmplY3QuZW50cmllcyhkYXRhLnRyYWluZXJDbHVicykuZm9yRWFjaCgoW2NsdWJJRCwgY2x1Yl0pID0+IHtcclxuICAgICAgICAgICAgY29uc3QgYm9va2luZ3MgPSBjbHViLmJvb2tpbmdzO1xyXG5cclxuICAgICAgICAgICAgT2JqZWN0LmVudHJpZXMoYm9va2luZ3MpLmZvckVhY2goKFtib29raW5nSUQsIGJvb2tpbmddKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7IGRlc2NyaXB0aW9uLCBkYXRldGltZSwgZHVyYXRpb24sIGZhY2lsaXR5SUQgfSA9IGJvb2tpbmc7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBjbHViQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuICAgICAgICAgICAgICAgIGNsdWJDZWxsLnRleHRDb250ZW50ID0gY2x1YklEO1xyXG4gICAgICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKGNsdWJDZWxsKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbkNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbkNlbGwudGV4dENvbnRlbnQgPSBkZXNjcmlwdGlvbjtcclxuICAgICAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbkNlbGwpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHNlc3Npb25TdGFydENlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzZXNzaW9uU3RhcnREYXRlID0gbmV3IERhdGUoZGF0ZXRpbWUpO1xyXG4gICAgICAgICAgICAgICAgc2Vzc2lvblN0YXJ0Q2VsbC50ZXh0Q29udGVudCA9IHNlc3Npb25TdGFydERhdGUudG9Mb2NhbGVTdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChzZXNzaW9uU3RhcnRDZWxsKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBkdXJhdGlvbkNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbkNlbGwudGV4dENvbnRlbnQgPSBgJHtkdXJhdGlvbn0gbWluc2A7XHJcbiAgICAgICAgICAgICAgICByb3cuYXBwZW5kQ2hpbGQoZHVyYXRpb25DZWxsKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBmYWNpbGl0eUNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgICAgICAgICAgICAgICBmYWNpbGl0eUNlbGwudGV4dENvbnRlbnQgPSBmYWNpbGl0eUlEO1xyXG4gICAgICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKGZhY2lsaXR5Q2VsbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgZGVsZXRlQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICAgICAgICAgICAgICBkZWxldGVCdXR0b24udGV4dENvbnRlbnQgPSBcIlx1Mjc0Q1wiO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJkZWxldGVCdXR0b25cIik7XHJcbiAgICAgICAgICAgICAgICBkZWxldGVCdXR0b24ub25jbGljayA9ICgpID0+IGRlbGV0ZVRyYWluaW5nU2Vzc2lvbihib29raW5nSUQsIGNsdWJJRCk7XHJcbiAgICAgICAgICAgICAgICBkZWxldGVDZWxsLmFwcGVuZENoaWxkKGRlbGV0ZUJ1dHRvbik7XHJcbiAgICAgICAgICAgICAgICByb3cuYXBwZW5kQ2hpbGQoZGVsZXRlQ2VsbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGJvZHkuYXBwZW5kQ2hpbGQocm93KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IFxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJGYWlsZWQgdG8gZmV0Y2ggdHJhaW5lciBjbHVicyBkYXRhXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBkZWxldGVUcmFpbmluZ1Nlc3Npb24oYm9va2luZ0lELCBjbHViSUQpIHtcclxuICAgIGNvbnN0IGNvbmZpcm1lZCA9IHdpbmRvdy5jb25maXJtKGBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgdHJhaW5pbmcgc2Vzc2lvbj9gKTtcclxuICAgIGlmIChjb25maXJtZWQpe1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHA6Ly8xMjcuMC4wLjE6NTAwMS9zcG9ydHMtYXJlbmEtMzlhMzIvZXVyb3BlLXdlc3QyL2RlbGV0ZUZhY2lsaXR5Qm9va2luZ2AsIHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0RFTEVURScsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IGJvb2tpbmdJRCwgY2x1YklEIH0pLFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChyZXN1bHQubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICBsb2FkVHJhaW5pbmdTZXNzaW9ucygpO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KGBFcnJvcjogJHtyZXN1bHQuZXJyb3J9YCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IFxyXG4gICAgICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGR1cmluZyBib29raW5nIGRlbGV0aW9uOlwiLCBlcnJvcik7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiVGhlcmUgd2FzIGFuIGVycm9yIGRlbGV0aW5nIHRoZSBib29raW5nLlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmxvYWRGYWNpbGl0aWVzKCk7XHJcbmxvYWRUcmFpbmVyQ2x1YnMoKTtcclxubG9hZFRyYWluaW5nU2Vzc2lvbnMoKTtcclxuXHJcbmRvY3VtZW50LnRvZ2dsZVRyYWluaW5nU2Vzc2lvbkZvcm0gPSB0b2dnbGVUcmFpbmluZ1Nlc3Npb25Gb3JtO1xyXG5kb2N1bWVudC5ib29rVHJhaW5pbmdTZXNzaW9uID0gYm9va1RyYWluaW5nU2Vzc2lvbjtcclxuZG9jdW1lbnQubG9hZFRyYWluaW5nU2Vzc2lvbnMgPSBsb2FkVHJhaW5pbmdTZXNzaW9ucztcclxuZG9jdW1lbnQuZGVsZXRlVHJhaW5pbmdTZXNzaW9uID0gZGVsZXRlVHJhaW5pbmdTZXNzaW9uOyJdLAogICJtYXBwaW5ncyI6ICI7O0FBQUEsV0FBUyw0QkFBNEI7QUFDakMsVUFBTSxPQUFPLFNBQVMsZUFBZSxxQkFBcUI7QUFDMUQsU0FBSyxNQUFNLFVBQVUsS0FBSyxNQUFNLFlBQVksU0FBUyxVQUFVO0FBQy9ELGFBQVMsZUFBZSxhQUFhLEVBQUUsUUFBUTtBQUMvQyxhQUFTLGVBQWUsVUFBVSxFQUFFLFFBQVE7QUFDNUMsYUFBUyxlQUFlLGNBQWMsRUFBRSxnQkFBZ0I7QUFDeEQsYUFBUyxlQUFlLGtCQUFrQixFQUFFLGdCQUFnQjtBQUFBLEVBQ2hFO0FBRUEsaUJBQWUsaUJBQWlCO0FBQzVCLFVBQU0sV0FBVyxNQUFNLE1BQU0scURBQXFEO0FBQUEsTUFDOUUsUUFBUTtBQUFBLE1BQ1IsU0FBUztBQUFBLFFBQ0wsZ0JBQWdCO0FBQUEsTUFDcEI7QUFBQSxJQUNKLENBQUM7QUFFRCxRQUFJLFNBQVMsSUFBSTtBQUNiLFlBQU0sT0FBTyxNQUFNLFNBQVMsS0FBSztBQUVqQyxZQUFNLG1CQUFtQixTQUFTLGNBQWMsbUJBQW1CO0FBRW5FLGFBQU8sUUFBUSxLQUFLLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQyxVQUFVLE1BQU07QUFDdEQsY0FBTSxTQUFTLFNBQVMsY0FBYyxRQUFRO0FBQzlDLGVBQU8sUUFBUTtBQUNmLGVBQU8sY0FBYztBQUVyQix5QkFBaUIsWUFBWSxNQUFNO0FBQUEsTUFDdkMsQ0FBQztBQUFBLElBQ0w7QUFBQSxFQUNKO0FBRUEsaUJBQWUsbUJBQWtCO0FBRTdCLFFBQUksV0FBVyxhQUFhLFFBQVEsVUFBVTtBQUM5QyxZQUFRLElBQUksUUFBUTtBQUNwQixVQUFNLFdBQVcs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
