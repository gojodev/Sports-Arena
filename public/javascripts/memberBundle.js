(() => {
  // public/javascripts/member.js
  var clubsData = {};
  async function loadClubs() {
    const response = await fetch("https://showallclubs-77hki32qna-nw.a.run.app", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    if (response.ok) {
      const data = await response.json();
      clubsData = data.clubs;
      const clubDropdown = document.getElementById("clubDropdown");
      clubDropdown.innerHTML = "<option value=''>Select Club</option>";
      Object.keys(clubsData).forEach((clubName) => {
        const option = document.createElement("option");
        option.value = clubName;
        option.textContent = clubName;
        clubDropdown.appendChild(option);
      });
    } else {
      console.log("Failed to fetch clubs");
    }
  }
  function updateTrainingDropdown() {
    const sessionType = document.getElementById("sessionType").value;
    const clubName = document.getElementById("clubDropdown").value;
    if (!clubName) return;
    const club = clubsData[clubName];
    const trainingDropdown = document.getElementById("trainingDropdown");
    trainingDropdown.innerHTML = "<option value=''>Select Training</option>";
    const sessions = club.bookings;
    const filteredSessions = Object.entries(sessions).filter(
      ([key, _]) => sessionType === "training" ? key.startsWith("training") : key.startsWith("advice")
    );
    filteredSessions.forEach(([key, session]) => {
      const option = document.createElement("option");
      option.value = key;
      option.textContent = session.description;
      trainingDropdown.appendChild(option);
    });
  }
  async function bookAppointment() {
    const sessionType = document.getElementById("sessionType").value;
    const clubName = document.getElementById("clubDropdown").value;
    const trainingSlot = document.getElementById("trainingDropdown").value;
    if (!sessionType || !clubName || !trainingSlot) {
      alert("Please select all fields.");
      return;
    }
    const username = localStorage.getItem("username");
    const bookingData = {
      username,
      name: username,
      clubName,
      trainingSlot
    };
    const response = await fetch("https://setactivity-77hki32qna-nw.a.run.app/setActivity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData)
    });
    if (response.ok) {
      const data = await response.json();
      loadTrainingSessions();
    } else {
      console.log("Failed to book appointment");
    }
  }
  function toggleAppointmentForm() {
    const form = document.getElementById("appointmentForm");
    form.style.display = form.style.display === "none" ? "block" : "none";
    document.getElementById("sessionType").selectedIndex = 0;
    document.getElementById("clubDropdown").selectedIndex = 0;
    document.getElementById("trainingDropdown").selectedIndex = 0;
  }
  async function loadTrainingSessions() {
    const username = localStorage.getItem("username");
    if (!username) {
      console.log("No username found in localStorage");
      return;
    }
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
    const response = await fetch("https://showallclubs-77hki32qna-nw.a.run.app", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.ok) {
      const data = await response.json();
      const tbody = document.querySelector("#trainingSessionsTable tbody");
      tbody.innerHTML = "";
      Object.entries(data.clubs).forEach(([clubName, club]) => {
        const membersBookings = club.membersBooking;
        Object.entries(membersBookings).forEach(([usernameKey, bookings]) => {
          if (usernameKey === username) {
            Object.entries(bookings).forEach(([bookingID, bookingData]) => {
              const booking = club.bookings[bookingData.trainingSlot];
              if (booking) {
                const row = document.createElement("tr");
                const clubCell = document.createElement("td");
                clubCell.textContent = clubName;
                row.appendChild(clubCell);
                const typeCell = document.createElement("td");
                if (bookingData.trainingSlot.startsWith("training")) {
                  typeCell.textContent = "Training Session";
                } else if (bookingData.trainingSlot.startsWith("advice")) {
                  typeCell.textContent = "Professional Advice Session";
                }
                row.appendChild(typeCell);
                const descriptionCell = document.createElement("td");
                descriptionCell.textContent = booking.description;
                row.appendChild(descriptionCell);
                const trainerCell = document.createElement("td");
                trainerCell.textContent = trainerMap.get(club.trainer) || "Unknown Trainer";
                row.appendChild(trainerCell);
                const sessionStartCell = document.createElement("td");
                const sessionStartDate = new Date(booking.datetime);
                sessionStartCell.textContent = sessionStartDate.toLocaleString();
                row.appendChild(sessionStartCell);
                const durationCell = document.createElement("td");
                durationCell.textContent = "".concat(booking.duration, " mins");
                row.appendChild(durationCell);
                const facilityCell = document.createElement("td");
                facilityCell.textContent = booking.facilityID;
                row.appendChild(facilityCell);
                const deleteCell = document.createElement("td");
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "\u274C";
                deleteButton.classList.add("deleteButton");
                deleteButton.onclick = () => deleteTrainingSession(bookingData.trainingSlot, clubName);
                deleteCell.appendChild(deleteButton);
                row.appendChild(deleteCell);
                tbody.appendChild(row);
              }
            });
          }
        });
      });
    } else {
      console.log("Failed to fetch club data");
    }
  }
  async function deleteTrainingSession(trainingSlot, clubName) {
    const username = localStorage.getItem("username");
    if (!username) {
      console.log("No username found in localStorage");
      return;
    }
    const bookingData = {
      username,
      trainingSlot,
      clubName
    };
    const response = await fetch("https://removeactivity-77hki32qna-nw.a.run.app/removeActivity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bookingData)
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Booking removed:", data.verdict);
      loadTrainingSessions();
    } else {
      console.log("Failed to delete the training session");
    }
  }
  document.getElementById("sessionType").addEventListener("change", updateTrainingDropdown);
  document.getElementById("clubDropdown").addEventListener("change", updateTrainingDropdown);
  loadClubs();
  loadTrainingSessions();
  document.toggleAppointmentForm = toggleAppointmentForm;
  document.bookAppointment = bookAppointment;
  document.deleteTrainingSession = deleteTrainingSession;
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWVtYmVyLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBhc3luYyBmdW5jdGlvbiBsb2FkQ3VycmVudEluZm8oKSB7XHJcbi8vICAgICB0cnkge1xyXG4vLyAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vY3VycmVudHVzZXItNzdoa2kzMnFuYS1udy5hLnJ1bi5hcHAnLCB7XHJcbi8vICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbi8vICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuLy8gICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICB9KTtcclxuXHJcbi8vICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xyXG4vLyAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEhUVFAgZXJyb3IhIFN0YXR1czogJHtyZXNwb25zZS5zdGF0dXN9YCk7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBjb25zdCB1c2VyRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuLy8gICAgICAgICByZXR1cm4gdXNlckRhdGEuZGF0YTtcclxuLy8gICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbi8vICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgdXNlciBkYXRhOicsIGVycm9yKTtcclxuLy8gICAgIH1cclxuLy8gfVxyXG5cclxuXHJcbi8vIGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUhUTUwoKSB7XHJcbi8vICAgICBjb25zdCBkYXRhID0gYXdhaXQgbG9hZEN1cnJlbnRJbmZvKCk7XHJcbi8vICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlcm5hbWUnKS5pbm5lckhUTUwgPSBPYmplY3Qua2V5cyhkYXRhKVswXVxyXG4vLyB9XHJcblxyXG4vL3VwZGF0ZUhUTUwoKVxyXG5cclxubGV0IGNsdWJzRGF0YSA9IHt9O1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gbG9hZENsdWJzKCkge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9zaG93YWxsY2x1YnMtNzdoa2kzMnFuYS1udy5hLnJ1bi5hcHAnLCB7XHJcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChyZXNwb25zZS5vaykge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgY2x1YnNEYXRhID0gZGF0YS5jbHVicztcclxuXHJcbiAgICAgICAgY29uc3QgY2x1YkRyb3Bkb3duID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbHViRHJvcGRvd25cIik7XHJcbiAgICAgICAgY2x1YkRyb3Bkb3duLmlubmVySFRNTCA9IFwiPG9wdGlvbiB2YWx1ZT0nJz5TZWxlY3QgQ2x1Yjwvb3B0aW9uPlwiO1xyXG5cclxuICAgICAgICBPYmplY3Qua2V5cyhjbHVic0RhdGEpLmZvckVhY2goY2x1Yk5hbWUgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xyXG4gICAgICAgICAgICBvcHRpb24udmFsdWUgPSBjbHViTmFtZTtcclxuICAgICAgICAgICAgb3B0aW9uLnRleHRDb250ZW50ID0gY2x1Yk5hbWU7XHJcbiAgICAgICAgICAgIGNsdWJEcm9wZG93bi5hcHBlbmRDaGlsZChvcHRpb24pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkZhaWxlZCB0byBmZXRjaCBjbHVic1wiKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlVHJhaW5pbmdEcm9wZG93bigpIHtcclxuICAgIGNvbnN0IHNlc3Npb25UeXBlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZXNzaW9uVHlwZVwiKS52YWx1ZTtcclxuICAgIGNvbnN0IGNsdWJOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbHViRHJvcGRvd25cIikudmFsdWU7XHJcblxyXG4gICAgaWYgKCFjbHViTmFtZSkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IGNsdWIgPSBjbHVic0RhdGFbY2x1Yk5hbWVdO1xyXG4gICAgY29uc3QgdHJhaW5pbmdEcm9wZG93biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHJhaW5pbmdEcm9wZG93blwiKTtcclxuICAgIHRyYWluaW5nRHJvcGRvd24uaW5uZXJIVE1MID0gXCI8b3B0aW9uIHZhbHVlPScnPlNlbGVjdCBUcmFpbmluZzwvb3B0aW9uPlwiO1xyXG5cclxuICAgIGNvbnN0IHNlc3Npb25zID0gY2x1Yi5ib29raW5ncztcclxuICAgIGNvbnN0IGZpbHRlcmVkU2Vzc2lvbnMgPSBPYmplY3QuZW50cmllcyhzZXNzaW9ucykuZmlsdGVyKChba2V5LCBfXSkgPT5cclxuICAgICAgICBzZXNzaW9uVHlwZSA9PT0gXCJ0cmFpbmluZ1wiID8ga2V5LnN0YXJ0c1dpdGgoXCJ0cmFpbmluZ1wiKSA6IGtleS5zdGFydHNXaXRoKFwiYWR2aWNlXCIpXHJcbiAgICApO1xyXG5cclxuICAgIGZpbHRlcmVkU2Vzc2lvbnMuZm9yRWFjaCgoW2tleSwgc2Vzc2lvbl0pID0+IHtcclxuICAgICAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xyXG4gICAgICAgIG9wdGlvbi52YWx1ZSA9IGtleTtcclxuICAgICAgICBvcHRpb24udGV4dENvbnRlbnQgPSBzZXNzaW9uLmRlc2NyaXB0aW9uO1xyXG4gICAgICAgIHRyYWluaW5nRHJvcGRvd24uYXBwZW5kQ2hpbGQob3B0aW9uKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBib29rQXBwb2ludG1lbnQoKSB7XHJcbiAgICBjb25zdCBzZXNzaW9uVHlwZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2Vzc2lvblR5cGVcIikudmFsdWU7XHJcbiAgICBjb25zdCBjbHViTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2x1YkRyb3Bkb3duXCIpLnZhbHVlO1xyXG4gICAgY29uc3QgdHJhaW5pbmdTbG90ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0cmFpbmluZ0Ryb3Bkb3duXCIpLnZhbHVlO1xyXG5cclxuICAgIGlmICghc2Vzc2lvblR5cGUgfHwgIWNsdWJOYW1lIHx8ICF0cmFpbmluZ1Nsb3QpIHtcclxuICAgICAgICBhbGVydChcIlBsZWFzZSBzZWxlY3QgYWxsIGZpZWxkcy5cIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHVzZXJuYW1lID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJuYW1lJyk7XHJcbiAgICBjb25zdCBib29raW5nRGF0YSA9IHtcclxuICAgICAgICB1c2VybmFtZSxcclxuICAgICAgICBuYW1lOiB1c2VybmFtZSxcclxuICAgICAgICBjbHViTmFtZSxcclxuICAgICAgICB0cmFpbmluZ1Nsb3RcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9zZXRhY3Rpdml0eS03N2hraTMycW5hLW53LmEucnVuLmFwcC9zZXRBY3Rpdml0eScsIHtcclxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShib29raW5nRGF0YSlcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChyZXNwb25zZS5vaykge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgbG9hZFRyYWluaW5nU2Vzc2lvbnMoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJGYWlsZWQgdG8gYm9vayBhcHBvaW50bWVudFwiKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlQXBwb2ludG1lbnRGb3JtKCkge1xyXG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHBvaW50bWVudEZvcm0nKTtcclxuICAgIGZvcm0uc3R5bGUuZGlzcGxheSA9IGZvcm0uc3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnID8gJ2Jsb2NrJyA6ICdub25lJztcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZXNzaW9uVHlwZScpLnNlbGVjdGVkSW5kZXggPSAwO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NsdWJEcm9wZG93bicpLnNlbGVjdGVkSW5kZXggPSAwO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RyYWluaW5nRHJvcGRvd24nKS5zZWxlY3RlZEluZGV4ID0gMDtcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gbG9hZFRyYWluaW5nU2Vzc2lvbnMoKSB7XHJcbiAgICBjb25zdCB1c2VybmFtZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VybmFtZScpO1xyXG4gICAgXHJcbiAgICBpZiAoIXVzZXJuYW1lKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJObyB1c2VybmFtZSBmb3VuZCBpbiBsb2NhbFN0b3JhZ2VcIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHRyYWluZXJSZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL2ZldGNodHJhaW5lcm5hbWVzLTc3aGtpMzJxbmEtbncuYS5ydW4uYXBwJywge1xyXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgdHJhaW5lcnMgPSBbXTtcclxuICAgIGlmICh0cmFpbmVyUmVzcG9uc2Uub2spIHtcclxuICAgICAgICB0cmFpbmVycyA9IGF3YWl0IHRyYWluZXJSZXNwb25zZS5qc29uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdHJhaW5lck1hcCA9IG5ldyBNYXAoKTtcclxuICAgIHRyYWluZXJzLmZvckVhY2godHJhaW5lciA9PiB7XHJcbiAgICAgICAgdHJhaW5lck1hcC5zZXQodHJhaW5lci5rZXksIHRyYWluZXIubmFtZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL3Nob3dhbGxjbHVicy03N2hraTMycW5hLW53LmEucnVuLmFwcCcsIHtcclxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuXHJcbiAgICAgICAgY29uc3QgdGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RyYWluaW5nU2Vzc2lvbnNUYWJsZSB0Ym9keVwiKTtcclxuICAgICAgICB0Ym9keS5pbm5lckhUTUwgPSAnJztcclxuXHJcbiAgICAgICAgT2JqZWN0LmVudHJpZXMoZGF0YS5jbHVicykuZm9yRWFjaCgoW2NsdWJOYW1lLCBjbHViXSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBtZW1iZXJzQm9va2luZ3MgPSBjbHViLm1lbWJlcnNCb29raW5nO1xyXG4gICAgICAgICAgICBPYmplY3QuZW50cmllcyhtZW1iZXJzQm9va2luZ3MpLmZvckVhY2goKFt1c2VybmFtZUtleSwgYm9va2luZ3NdKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodXNlcm5hbWVLZXkgPT09IHVzZXJuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmVudHJpZXMoYm9va2luZ3MpLmZvckVhY2goKFtib29raW5nSUQsIGJvb2tpbmdEYXRhXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBib29raW5nID0gY2x1Yi5ib29raW5nc1tib29raW5nRGF0YS50cmFpbmluZ1Nsb3RdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvb2tpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjbHViQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsdWJDZWxsLnRleHRDb250ZW50ID0gY2x1Yk5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cuYXBwZW5kQ2hpbGQoY2x1YkNlbGwpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHR5cGVDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvb2tpbmdEYXRhLnRyYWluaW5nU2xvdC5zdGFydHNXaXRoKFwidHJhaW5pbmdcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlQ2VsbC50ZXh0Q29udGVudCA9IFwiVHJhaW5pbmcgU2Vzc2lvblwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChib29raW5nRGF0YS50cmFpbmluZ1Nsb3Quc3RhcnRzV2l0aChcImFkdmljZVwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVDZWxsLnRleHRDb250ZW50ID0gXCJQcm9mZXNzaW9uYWwgQWR2aWNlIFNlc3Npb25cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZCh0eXBlQ2VsbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb25DZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb25DZWxsLnRleHRDb250ZW50ID0gYm9va2luZy5kZXNjcmlwdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbkNlbGwpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRyYWluZXJDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhaW5lckNlbGwudGV4dENvbnRlbnQgPSB0cmFpbmVyTWFwLmdldChjbHViLnRyYWluZXIpIHx8IFwiVW5rbm93biBUcmFpbmVyXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cuYXBwZW5kQ2hpbGQodHJhaW5lckNlbGwpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlc3Npb25TdGFydENlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZXNzaW9uU3RhcnREYXRlID0gbmV3IERhdGUoYm9va2luZy5kYXRldGltZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXNzaW9uU3RhcnRDZWxsLnRleHRDb250ZW50ID0gc2Vzc2lvblN0YXJ0RGF0ZS50b0xvY2FsZVN0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKHNlc3Npb25TdGFydENlbGwpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGR1cmF0aW9uQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uQ2VsbC50ZXh0Q29udGVudCA9IGAke2Jvb2tpbmcuZHVyYXRpb259IG1pbnNgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKGR1cmF0aW9uQ2VsbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmFjaWxpdHlDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFjaWxpdHlDZWxsLnRleHRDb250ZW50ID0gYm9va2luZy5mYWNpbGl0eUlEO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKGZhY2lsaXR5Q2VsbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVsZXRlQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGVCdXR0b24udGV4dENvbnRlbnQgPSBcIlx1Mjc0Q1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJkZWxldGVCdXR0b25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGVCdXR0b24ub25jbGljayA9ICgpID0+IGRlbGV0ZVRyYWluaW5nU2Vzc2lvbihib29raW5nRGF0YS50cmFpbmluZ1Nsb3QsIGNsdWJOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZUNlbGwuYXBwZW5kQ2hpbGQoZGVsZXRlQnV0dG9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChkZWxldGVDZWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRib2R5LmFwcGVuZENoaWxkKHJvdyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRmFpbGVkIHRvIGZldGNoIGNsdWIgZGF0YVwiKTtcclxuICAgIH1cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gZGVsZXRlVHJhaW5pbmdTZXNzaW9uKHRyYWluaW5nU2xvdCwgY2x1Yk5hbWUpIHtcclxuICAgIGNvbnN0IHVzZXJuYW1lID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJuYW1lJyk7XHJcblxyXG4gICAgaWYgKCF1c2VybmFtZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTm8gdXNlcm5hbWUgZm91bmQgaW4gbG9jYWxTdG9yYWdlXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBib29raW5nRGF0YSA9IHtcclxuICAgICAgICB1c2VybmFtZSxcclxuICAgICAgICB0cmFpbmluZ1Nsb3QsXHJcbiAgICAgICAgY2x1Yk5hbWVcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9yZW1vdmVhY3Rpdml0eS03N2hraTMycW5hLW53LmEucnVuLmFwcC9yZW1vdmVBY3Rpdml0eScsIHtcclxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShib29raW5nRGF0YSlcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChyZXNwb25zZS5vaykge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJCb29raW5nIHJlbW92ZWQ6XCIsIGRhdGEudmVyZGljdCk7XHJcbiAgICAgICAgbG9hZFRyYWluaW5nU2Vzc2lvbnMoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJGYWlsZWQgdG8gZGVsZXRlIHRoZSB0cmFpbmluZyBzZXNzaW9uXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlc3Npb25UeXBlXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgdXBkYXRlVHJhaW5pbmdEcm9wZG93bik7XHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2x1YkRyb3Bkb3duXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgdXBkYXRlVHJhaW5pbmdEcm9wZG93bik7XHJcblxyXG5sb2FkQ2x1YnMoKTtcclxubG9hZFRyYWluaW5nU2Vzc2lvbnMoKTtcclxuXHJcbmRvY3VtZW50LnRvZ2dsZUFwcG9pbnRtZW50Rm9ybSA9IHRvZ2dsZUFwcG9pbnRtZW50Rm9ybTtcclxuZG9jdW1lbnQuYm9va0FwcG9pbnRtZW50ID0gYm9va0FwcG9pbnRtZW50O1xyXG5kb2N1bWVudC5kZWxldGVUcmFpbmluZ1Nlc3Npb24gPSBkZWxldGVUcmFpbmluZ1Nlc3Npb247Il0sCiAgIm1hcHBpbmdzIjogIjs7QUE0QkEsTUFBSSxZQUFZLENBQUM7QUFFakIsaUJBQWUsWUFBWTtBQUN2QixVQUFNLFdBQVcsTUFBTSxNQUFNLGdEQUFnRDtBQUFBLE1BQ3pFLFFBQVE7QUFBQSxNQUNSLFNBQVMsRUFBRSxnQkFBZ0IsbUJBQW1CO0FBQUEsSUFDbEQsQ0FBQztBQUVELFFBQUksU0FBUyxJQUFJO0FBQ2IsWUFBTSxPQUFPLE1BQU0sU0FBUyxLQUFLO0FBQ2pDLGtCQUFZLEtBQUs7QUFFakIsWUFBTSxlQUFlLFNBQVMsZUFBZSxjQUFjO0FBQzNELG1CQUFhLFlBQVk7QUFFekIsYUFBTyxLQUFLLFNBQVMsRUFBRSxRQUFRLGNBQVk7QUFDdkMsY0FBTSxTQUFTLFNBQVMsY0FBYyxRQUFRO0FBQzlDLGVBQU8sUUFBUTtBQUNmLGVBQU8sY0FBYztBQUNyQixxQkFBYSxZQUFZLE1BQU07QUFBQSxNQUNuQyxDQUFDO0FBQUEsSUFDTCxPQUFPO0FBQ0gsY0FBUSxJQUFJLHVCQUF1QjtBQUFBLElBQ3ZDO0FBQUEsRUFDSjtBQUVBLFdBQVMseUJBQXlCO0FBQzlCLFVBQU0sY0FBYyxTQUFTLGVBQWUsYUFBYSxFQUFFO0FBQzNELFVBQU0sV0FBVyxTQUFTLGVBQWUsY0FBYyxFQUFFO0FBRXpELFFBQUksQ0FBQyxTQUFVO0FBRWYsVUFBTSxPQUFPLFVBQVUsUUFBUTtBQUMvQixVQUFNLG1CQUFtQixTQUFTLGVBQWUsa0JBQWtCO0FBQ25FLHFCQUFpQixZQUFZO0FBRTdCLFVBQU0sV0FBVyxLQUFLO0FBQ3RCLFVBQU0sbUJBQW1CLE9BQU8sUUFBUSxRQUFRLEVBQUU7QUFBQSxNQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFDN0QsZ0JBQWdCLGFB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
