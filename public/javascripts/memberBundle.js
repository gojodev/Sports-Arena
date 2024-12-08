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
      const clubDropdown2 = document.getElementById("clubDropdown");
      clubDropdown2.innerHTML = "<option value=''>Select Club</option>";
      Object.keys(clubsData).forEach((clubName) => {
        const option = document.createElement("option");
        option.value = clubName;
        option.textContent = clubName;
        clubDropdown2.appendChild(option);
      });
    } else {
      console.log("Failed to fetch clubs");
    }
  }
  function updateTrainingDropdown() {
    const sessionType2 = document.getElementById("sessionType").value;
    const clubName = document.getElementById("clubDropdown").value;
    if (!clubName) return;
    const club = clubsData[clubName];
    const trainingDropdown = document.getElementById("trainingDropdown");
    trainingDropdown.innerHTML = "<option value=''>Select Training</option>";
    const sessions = club.bookings;
    const filteredSessions = Object.entries(sessions).filter(
      ([key, _]) => sessionType2 === "training" ? key.startsWith("training") : key.startsWith("advice")
    );
    filteredSessions.forEach(([key, session]) => {
      const option = document.createElement("option");
      option.value = key;
      option.textContent = session.description;
      trainingDropdown.appendChild(option);
    });
  }
  async function bookAppointment() {
    const sessionType2 = document.getElementById("sessionType").value;
    const clubName = document.getElementById("clubDropdown").value;
    const trainingSlot = document.getElementById("trainingDropdown").value;
    if (!sessionType2 || !clubName || !trainingSlot) {
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
  var sessionType = document.getElementById("sessionType");
  var clubDropdown = document.getElementById("clubDropdown");
  if (sessionType != void 0 && clubDropdown != void 0) {
    sessionType.addEventListener("change", updateTrainingDropdown);
    clubDropdown.addEventListener("change", updateTrainingDropdown);
  }
  var currentPage = window.location.pathname;
  if (currentPage.includes("bookings.html")) {
    loadClubs();
    loadTrainingSessions();
  }
  document.toggleAppointmentForm = toggleAppointmentForm;
  document.bookAppointment = bookAppointment;
  document.deleteTrainingSession = deleteTrainingSession;
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWVtYmVyLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBhc3luYyBmdW5jdGlvbiBsb2FkQ3VycmVudEluZm8oKSB7XHJcbi8vICAgICB0cnkge1xyXG4vLyAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vY3VycmVudHVzZXItNzdoa2kzMnFuYS1udy5hLnJ1bi5hcHAnLCB7XHJcbi8vICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbi8vICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuLy8gICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICB9KTtcclxuXHJcbi8vICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xyXG4vLyAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEhUVFAgZXJyb3IhIFN0YXR1czogJHtyZXNwb25zZS5zdGF0dXN9YCk7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBjb25zdCB1c2VyRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuLy8gICAgICAgICByZXR1cm4gdXNlckRhdGEuZGF0YTtcclxuLy8gICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbi8vICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgdXNlciBkYXRhOicsIGVycm9yKTtcclxuLy8gICAgIH1cclxuLy8gfVxyXG5cclxuXHJcbi8vIGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUhUTUwoKSB7XHJcbi8vICAgICBjb25zdCBkYXRhID0gYXdhaXQgbG9hZEN1cnJlbnRJbmZvKCk7XHJcbi8vICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlcm5hbWUnKS5pbm5lckhUTUwgPSBPYmplY3Qua2V5cyhkYXRhKVswXVxyXG4vLyB9XHJcblxyXG4vL3VwZGF0ZUhUTUwoKVxyXG5cclxubGV0IGNsdWJzRGF0YSA9IHt9O1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gbG9hZENsdWJzKCkge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9zaG93YWxsY2x1YnMtNzdoa2kzMnFuYS1udy5hLnJ1bi5hcHAnLCB7XHJcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChyZXNwb25zZS5vaykge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgY2x1YnNEYXRhID0gZGF0YS5jbHVicztcclxuXHJcbiAgICAgICAgY29uc3QgY2x1YkRyb3Bkb3duID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbHViRHJvcGRvd25cIik7XHJcbiAgICAgICAgY2x1YkRyb3Bkb3duLmlubmVySFRNTCA9IFwiPG9wdGlvbiB2YWx1ZT0nJz5TZWxlY3QgQ2x1Yjwvb3B0aW9uPlwiO1xyXG5cclxuICAgICAgICBPYmplY3Qua2V5cyhjbHVic0RhdGEpLmZvckVhY2goY2x1Yk5hbWUgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xyXG4gICAgICAgICAgICBvcHRpb24udmFsdWUgPSBjbHViTmFtZTtcclxuICAgICAgICAgICAgb3B0aW9uLnRleHRDb250ZW50ID0gY2x1Yk5hbWU7XHJcbiAgICAgICAgICAgIGNsdWJEcm9wZG93bi5hcHBlbmRDaGlsZChvcHRpb24pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkZhaWxlZCB0byBmZXRjaCBjbHVic1wiKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlVHJhaW5pbmdEcm9wZG93bigpIHtcclxuICAgIGNvbnN0IHNlc3Npb25UeXBlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZXNzaW9uVHlwZVwiKS52YWx1ZTtcclxuICAgIGNvbnN0IGNsdWJOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbHViRHJvcGRvd25cIikudmFsdWU7XHJcblxyXG4gICAgaWYgKCFjbHViTmFtZSkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IGNsdWIgPSBjbHVic0RhdGFbY2x1Yk5hbWVdO1xyXG4gICAgY29uc3QgdHJhaW5pbmdEcm9wZG93biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHJhaW5pbmdEcm9wZG93blwiKTtcclxuICAgIHRyYWluaW5nRHJvcGRvd24uaW5uZXJIVE1MID0gXCI8b3B0aW9uIHZhbHVlPScnPlNlbGVjdCBUcmFpbmluZzwvb3B0aW9uPlwiO1xyXG5cclxuICAgIGNvbnN0IHNlc3Npb25zID0gY2x1Yi5ib29raW5ncztcclxuICAgIGNvbnN0IGZpbHRlcmVkU2Vzc2lvbnMgPSBPYmplY3QuZW50cmllcyhzZXNzaW9ucykuZmlsdGVyKChba2V5LCBfXSkgPT5cclxuICAgICAgICBzZXNzaW9uVHlwZSA9PT0gXCJ0cmFpbmluZ1wiID8ga2V5LnN0YXJ0c1dpdGgoXCJ0cmFpbmluZ1wiKSA6IGtleS5zdGFydHNXaXRoKFwiYWR2aWNlXCIpXHJcbiAgICApO1xyXG5cclxuICAgIGZpbHRlcmVkU2Vzc2lvbnMuZm9yRWFjaCgoW2tleSwgc2Vzc2lvbl0pID0+IHtcclxuICAgICAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xyXG4gICAgICAgIG9wdGlvbi52YWx1ZSA9IGtleTtcclxuICAgICAgICBvcHRpb24udGV4dENvbnRlbnQgPSBzZXNzaW9uLmRlc2NyaXB0aW9uO1xyXG4gICAgICAgIHRyYWluaW5nRHJvcGRvd24uYXBwZW5kQ2hpbGQob3B0aW9uKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBib29rQXBwb2ludG1lbnQoKSB7XHJcbiAgICBjb25zdCBzZXNzaW9uVHlwZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2Vzc2lvblR5cGVcIikudmFsdWU7XHJcbiAgICBjb25zdCBjbHViTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2x1YkRyb3Bkb3duXCIpLnZhbHVlO1xyXG4gICAgY29uc3QgdHJhaW5pbmdTbG90ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0cmFpbmluZ0Ryb3Bkb3duXCIpLnZhbHVlO1xyXG5cclxuICAgIGlmICghc2Vzc2lvblR5cGUgfHwgIWNsdWJOYW1lIHx8ICF0cmFpbmluZ1Nsb3QpIHtcclxuICAgICAgICBhbGVydChcIlBsZWFzZSBzZWxlY3QgYWxsIGZpZWxkcy5cIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHVzZXJuYW1lID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJuYW1lJyk7XHJcbiAgICBjb25zdCBib29raW5nRGF0YSA9IHtcclxuICAgICAgICB1c2VybmFtZSxcclxuICAgICAgICBuYW1lOiB1c2VybmFtZSxcclxuICAgICAgICBjbHViTmFtZSxcclxuICAgICAgICB0cmFpbmluZ1Nsb3RcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9zZXRhY3Rpdml0eS03N2hraTMycW5hLW53LmEucnVuLmFwcC9zZXRBY3Rpdml0eScsIHtcclxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShib29raW5nRGF0YSlcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChyZXNwb25zZS5vaykge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgbG9hZFRyYWluaW5nU2Vzc2lvbnMoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJGYWlsZWQgdG8gYm9vayBhcHBvaW50bWVudFwiKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlQXBwb2ludG1lbnRGb3JtKCkge1xyXG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHBvaW50bWVudEZvcm0nKTtcclxuICAgIGZvcm0uc3R5bGUuZGlzcGxheSA9IGZvcm0uc3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnID8gJ2Jsb2NrJyA6ICdub25lJztcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZXNzaW9uVHlwZScpLnNlbGVjdGVkSW5kZXggPSAwO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NsdWJEcm9wZG93bicpLnNlbGVjdGVkSW5kZXggPSAwO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RyYWluaW5nRHJvcGRvd24nKS5zZWxlY3RlZEluZGV4ID0gMDtcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gbG9hZFRyYWluaW5nU2Vzc2lvbnMoKSB7XHJcbiAgICBjb25zdCB1c2VybmFtZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VybmFtZScpO1xyXG5cclxuICAgIGlmICghdXNlcm5hbWUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk5vIHVzZXJuYW1lIGZvdW5kIGluIGxvY2FsU3RvcmFnZVwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdHJhaW5lclJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vZmV0Y2h0cmFpbmVybmFtZXMtNzdoa2kzMnFuYS1udy5hLnJ1bi5hcHAnLCB7XHJcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIGxldCB0cmFpbmVycyA9IFtdO1xyXG4gICAgaWYgKHRyYWluZXJSZXNwb25zZS5vaykge1xyXG4gICAgICAgIHRyYWluZXJzID0gYXdhaXQgdHJhaW5lclJlc3BvbnNlLmpzb24oKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0cmFpbmVyTWFwID0gbmV3IE1hcCgpO1xyXG4gICAgdHJhaW5lcnMuZm9yRWFjaCh0cmFpbmVyID0+IHtcclxuICAgICAgICB0cmFpbmVyTWFwLnNldCh0cmFpbmVyLmtleSwgdHJhaW5lci5uYW1lKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vc2hvd2FsbGNsdWJzLTc3aGtpMzJxbmEtbncuYS5ydW4uYXBwJywge1xyXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAocmVzcG9uc2Uub2spIHtcclxuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cclxuICAgICAgICBjb25zdCB0Ym9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdHJhaW5pbmdTZXNzaW9uc1RhYmxlIHRib2R5XCIpO1xyXG4gICAgICAgIHRib2R5LmlubmVySFRNTCA9ICcnO1xyXG5cclxuICAgICAgICBPYmplY3QuZW50cmllcyhkYXRhLmNsdWJzKS5mb3JFYWNoKChbY2x1Yk5hbWUsIGNsdWJdKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1lbWJlcnNCb29raW5ncyA9IGNsdWIubWVtYmVyc0Jvb2tpbmc7XHJcbiAgICAgICAgICAgIE9iamVjdC5lbnRyaWVzKG1lbWJlcnNCb29raW5ncykuZm9yRWFjaCgoW3VzZXJuYW1lS2V5LCBib29raW5nc10pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh1c2VybmFtZUtleSA9PT0gdXNlcm5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBPYmplY3QuZW50cmllcyhib29raW5ncykuZm9yRWFjaCgoW2Jvb2tpbmdJRCwgYm9va2luZ0RhdGFdKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJvb2tpbmcgPSBjbHViLmJvb2tpbmdzW2Jvb2tpbmdEYXRhLnRyYWluaW5nU2xvdF07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9va2luZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNsdWJDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2x1YkNlbGwudGV4dENvbnRlbnQgPSBjbHViTmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChjbHViQ2VsbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdHlwZUNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9va2luZ0RhdGEudHJhaW5pbmdTbG90LnN0YXJ0c1dpdGgoXCJ0cmFpbmluZ1wiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVDZWxsLnRleHRDb250ZW50ID0gXCJUcmFpbmluZyBTZXNzaW9uXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGJvb2tpbmdEYXRhLnRyYWluaW5nU2xvdC5zdGFydHNXaXRoKFwiYWR2aWNlXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZUNlbGwudGV4dENvbnRlbnQgPSBcIlByb2Zlc3Npb25hbCBBZHZpY2UgU2Vzc2lvblwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKHR5cGVDZWxsKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbkNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbkNlbGwudGV4dENvbnRlbnQgPSBib29raW5nLmRlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uQ2VsbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdHJhaW5lckNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFpbmVyQ2VsbC50ZXh0Q29udGVudCA9IHRyYWluZXJNYXAuZ2V0KGNsdWIudHJhaW5lcikgfHwgXCJVbmtub3duIFRyYWluZXJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZCh0cmFpbmVyQ2VsbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2Vzc2lvblN0YXJ0Q2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlc3Npb25TdGFydERhdGUgPSBuZXcgRGF0ZShib29raW5nLmRhdGV0aW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlc3Npb25TdGFydENlbGwudGV4dENvbnRlbnQgPSBzZXNzaW9uU3RhcnREYXRlLnRvTG9jYWxlU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cuYXBwZW5kQ2hpbGQoc2Vzc2lvblN0YXJ0Q2VsbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZHVyYXRpb25DZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb25DZWxsLnRleHRDb250ZW50ID0gYCR7Ym9va2luZy5kdXJhdGlvbn0gbWluc2A7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cuYXBwZW5kQ2hpbGQoZHVyYXRpb25DZWxsKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmYWNpbGl0eUNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWNpbGl0eUNlbGwudGV4dENvbnRlbnQgPSBib29raW5nLmZhY2lsaXR5SUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cuYXBwZW5kQ2hpbGQoZmFjaWxpdHlDZWxsKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWxldGVDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiXHUyNzRDXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGVCdXR0b24uY2xhc3NMaXN0LmFkZChcImRlbGV0ZUJ1dHRvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZUJ1dHRvbi5vbmNsaWNrID0gKCkgPT4gZGVsZXRlVHJhaW5pbmdTZXNzaW9uKGJvb2tpbmdEYXRhLnRyYWluaW5nU2xvdCwgY2x1Yk5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlQ2VsbC5hcHBlbmRDaGlsZChkZWxldGVCdXR0b24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKGRlbGV0ZUNlbGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGJvZHkuYXBwZW5kQ2hpbGQocm93KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJGYWlsZWQgdG8gZmV0Y2ggY2x1YiBkYXRhXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBkZWxldGVUcmFpbmluZ1Nlc3Npb24odHJhaW5pbmdTbG90LCBjbHViTmFtZSkge1xyXG4gICAgY29uc3QgdXNlcm5hbWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlcm5hbWUnKTtcclxuXHJcbiAgICBpZiAoIXVzZXJuYW1lKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJObyB1c2VybmFtZSBmb3VuZCBpbiBsb2NhbFN0b3JhZ2VcIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGJvb2tpbmdEYXRhID0ge1xyXG4gICAgICAgIHVzZXJuYW1lLFxyXG4gICAgICAgIHRyYWluaW5nU2xvdCxcclxuICAgICAgICBjbHViTmFtZVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL3JlbW92ZWFjdGl2aXR5LTc3aGtpMzJxbmEtbncuYS5ydW4uYXBwL3JlbW92ZUFjdGl2aXR5Jywge1xyXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGJvb2tpbmdEYXRhKVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkJvb2tpbmcgcmVtb3ZlZDpcIiwgZGF0YS52ZXJkaWN0KTtcclxuICAgICAgICBsb2FkVHJhaW5pbmdTZXNzaW9ucygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkZhaWxlZCB0byBkZWxldGUgdGhlIHRyYWluaW5nIHNlc3Npb25cIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IHNlc3Npb25UeXBlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZXNzaW9uVHlwZVwiKVxyXG5jb25zdCBjbHViRHJvcGRvd24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNsdWJEcm9wZG93blwiKVxyXG5cclxuaWYgKHNlc3Npb25UeXBlICE9IHVuZGVmaW5lZCAmJiBjbHViRHJvcGRvd24gIT0gdW5kZWZpbmVkKSB7XHJcbiAgICBzZXNzaW9uVHlwZS5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIHVwZGF0ZVRyYWluaW5nRHJvcGRvd24pO1xyXG4gICAgY2x1YkRyb3Bkb3duLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgdXBkYXRlVHJhaW5pbmdEcm9wZG93bik7XHJcbn1cclxuXHJcbmNvbnN0IGN1cnJlbnRQYWdlID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xyXG5pZiAoY3VycmVudFBhZ2UuaW5jbHVkZXMoJ2Jvb2tpbmdzLmh0bWwnKSkge1xyXG4gICAgbG9hZENsdWJzKCk7XHJcbiAgICBsb2FkVHJhaW5pbmdTZXNzaW9ucygpO1xyXG59XHJcblxyXG5kb2N1bWVudC50b2dnbGVBcHBvaW50bWVudEZvcm0gPSB0b2dnbGVBcHBvaW50bWVudEZvcm07XHJcbmRvY3VtZW50LmJvb2tBcHBvaW50bWVudCA9IGJvb2tBcHBvaW50bWVudDtcclxuZG9jdW1lbnQuZGVsZXRlVHJhaW5pbmdTZXNzaW9uID0gZGVsZXRlVHJhaW5pbmdTZXNzaW9uOyJdLAogICJtYXBwaW5ncyI6ICI7O0FBNEJBLE1BQUksWUFBWSxDQUFDO0FBRWpCLGlCQUFlLFlBQVk7QUFDdkIsVUFBTSxXQUFXLE1BQU0sTUFBTSxnREFBZ0Q7QUFBQSxNQUN6RSxRQUFRO0FBQUEsTUFDUixTQUFTLEVBQUUsZ0JBQWdCLG1CQUFtQjtBQUFBLElBQ2xELENBQUM7QUFFRCxRQUFJLFNBQVMsSUFBSTtBQUNiLFlBQU0sT0FBTyxNQUFNLFNBQVMsS0FBSztBQUNqQyxrQkFBWSxLQUFLO0FBRWpCLFlBQU1BLGdCQUFlLFNBQVMsZUFBZSxjQUFjO0FBQzNELE1BQUFBLGNBQWEsWUFBWTtBQUV6QixhQUFPLEtBQUssU0FBUyxFQUFFLFFBQVEsY0FBWTtBQUN2QyxjQUFNLFNBQVMsU0FBUyxjQUFjLFFBQVE7QUFDOUMsZUFBTyxRQUFRO0FBQ2YsZUFBTyxjQUFjO0FBQ3JCLFFBQUFBLGNBQWEsWUFBWSxNQUFNO0FBQUEsTUFDbkMsQ0FBQztBQUFBLElBQ0wsT0FBTztBQUNILGNBQVEsSUFBSSx1QkFBdUI7QUFBQSxJQUN2QztBQUFBLEVBQ0o7QUFFQSxXQUFTLHlCQUF5QjtBQUM5QixVQUFNQyxlQUFjLFNBQVMsZUFBZSxhQUFhLEVBQUU7QUFDM0QsVUFBTSxXQUFXLFNBQVMsZUFBZSxjQUFjLEVBQUU7QUFFekQsUUFBSSxDQUFDLFNBQVU7QUFFZixVQUFNLE9BQU8sVUFBVSxRQUFRO0FBQy9CLFVBQU0sbUJBQW1CLFNBQVMsZUFBZSxrQkFBa0I7QUFDbkUscUJBQWlCLFlBQVk7QUFFN0IsVUFBTSxXQUFXLEtBQUs7QUFDdEIsVUFBTSxtQkFBbUIsT0FBTyxRQUFRLFFBQVEsRUFBRTtBQUFBLE1BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUM3REEsaUJBQWdCLGFBQWEsSUFBSSxXQUFXLFVBQVUsSUFBSSxJQUFJLFdBQVcsUUFBUTtBQUFBLElBQ3JGO0FBRUEscUJBQWlCLFFBQVEsQ0FBQyxDQUFDLEtBQUssT0FBTyxNQUFNO0FBQ3pDLFlBQU0sU0FBUyxTQUFTLGNBQWMsUUFBUTtBQUM5QyxhQUFPLFFBQVE7QUFDZixhQUFPLGNBQWMsUUFBUTtBQUM3Qix1QkFBaUIsWUFBWSxNQUFNO0FBQUEsSUFDdkMsQ0FBQztBQUFBLEVBQ0w7QUFFQSxpQkFBZSxrQkFBa0I7QUFDN0IsVUFBTUEsZUFBYyxTQUFTLGVBQWUsYUFBYSxFQUFFO0FBQzNELFVBQU0sV0FBVyxTQUFTLGVBQWUsY0FBYyxFQUFFO0FBQ3pELFVBQU0sZUFBZSxTQUFTLGVBQWUsa0JBQWtCLEVBQUU7QUFFakUsUUFBSSxDQUFDQSxnQkFBZSxDQUFDLFlBQVksQ0FBQyxjQUFjO0FBQzVDLFlBQU0sMkJBQTJCO0FBQ2pDO0FBQUEsSUFDSjtBQUVBLFVBQU0sV0FBVyxhQUFhLFFBQVEsVUFBVTtBQUNoRCxVQUFNLGNBQWM7QUFBQSxNQUNoQjtBQUFBLE1BQ0EsTUFBTTtBQUFBLE1BQ047QUFBQSxNQUNBO0FBQUEsSUFDSjtBQUVBLFVBQU0sV0FBVyxNQUFNLE1BQU0sMkRBQTJEO0FBQUEsTUFDcEYsUUFBUTtBQUFBLE1BQ1IsU0FBUyxFQUFFLGdCQUFnQixtQkFBbUI7QUFBQSxNQUM5QyxNQUFNLEtBQUssVUFBVSxXQUFXO0FBQUEsSUFDcEMsQ0FBQztBQUVELFFBQUksU0FBUyxJQUFJO0FBQ2IsWUFBTSxPQUFPLE1BQU0sU0FBUyxLQUFLO0FBQ2pDLDJCQUFxQjtBQUFBLElBQ3pCLE9BQU87QUFDSCxjQUFRLElBQUksNEJBQTRCO0FBQUEsSUFDNUM7QUFBQSxFQUNKO0FBRUEsV0FBUyx3QkFBd0I7QUFDN0IsVUFBTSxPQUFPLFNBQVMsZUFBZSxpQkFBaUI7QUFDdEQsU0FBSyxNQUFNLFVBQVUsS0FBSyxNQUFNLFlBQVksU0FBUyxVQUFVO0FBQy9ELGFBQVMsZUFBZSxhQUFhLEVBQUUsZ0JBQWdCO0FBQ3ZELGFBQVMsZUFBZSxjQUFjLEVBQUUsZ0JBQWdCO0FBQ3hELGFBQVMsZUFBZSxrQkFBa0IsRUFBRSxnQkFBZ0I7QUFBQSxFQUNoRTtBQUVBLGlCQUFlLHVCQUF1QjtBQUNsQyxVQUFNLFdBQVcsYUFBYSxRQUFRLFVBQVU7QUFFaEQsUUFBSSxDQUFDLFVBQVU7QUFDWCxjQUFRLElBQUksbUNBQW1DO0FBQy9DO0FBQUEsSUFDSjtBQUVBLFVBQU0sa0JBQWtCLE1BQU0sTUFBTSxxREFBcUQ7QUFBQSxNQUNyRixRQUFRO0FBQUEsTUFDUixTQUFTO0FBQUEsUUFDTCxnQkFBZ0I7QUFBQSxNQUNwQjtBQUFBLElBQ0osQ0FBQztBQUVELFFBQUksV0FBVyxDQUFDO0FBQ2hCLFFBQUksZ0JBQWdCLElBQUk7QUFDcEIsaUJBQVcsTUFBTSxnQkFBZ0IsS0FBSztBQUFBLElBQzFDO0FBRUEsVUFBTSxhQUFhLG9CQUFJLElBQUk7QUFDM0IsYUFBUyxRQUFRLGFBQVc7QUFDeEIsaUJBQVcsSUFBSSxRQUFRLEtBQUssUUFBUSxJQUFJO0FBQUEsSUFDNUMsQ0FBQztBQUVELFVBQU0sV0FBVyxNQUFNLE1BQU0sZ0RBQWdEO0FBQUEsTUFDekUsUUFBUTtBQUFBLE1BQ1IsU0FBUztBQUFBLFFBQ0wsZ0JBQWdCO0FBQUEsTUFDcEI7QUFBQSxJQUNKLENBQUM7QUFFRCxRQUFJLFNBQVMsSUFBSTtBQUNiLFlBQU0sT0FBTyxNQUFNLFNBQVMsS0FBSztBQUVqQyxZQUFNLFFBQVEsU0FBUyxjQUFjLDhCQUE4QjtBQUNuRSxZQUFNLFlBQVk7QUFFbEIsYUFBTyxRQUFRLEtBQUssS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDLFVBQVUsSUFBSSxNQUFNO0FBQ3JELGNBQU0sa0JBQWtCLEtBQUs7QUFDN0IsZUFBTyxRQUFRLGVBQWUsRUFBRSxRQUFRLENBQUMsQ0FBQyxhQUFhLFFBQVEsTUFBTTtBQUNqRSxjQUFJLGdCQUFnQixVQUFVO0FBQzFCLG1CQUFPLFFBQVEsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDLFdBQVcsV0FBVyxNQUFNO0FBQzNELG9CQUFNLFVBQVUsS0FBSyxTQUFTLFlBQVksWUFBWTtBQUV0RCxrQkFBSSxTQUFTO0FBQ1Qsc0JBQU0sTUFBTSxTQUFTLGNBQWMsSUFBSTtBQUV2QyxzQkFBTSxXQUFXLFNBQVMsY0FBYyxJQUFJO0FBQzVDLHlCQUFTLGNBQWM7QUFDdkIsb0JBQUksWUFBWSxRQUFRO0FBRXhCLHNCQUFNLFdBQVcsU0FBUyxjQUFjLElBQUk7QUFDNUMsb0JBQUksWUFBWSxhQUFhLFdBQVcsVUFBVSxHQUFHO0FBQ2pELDJCQUFTLGNBQWM7QUFBQSxnQkFDM0IsV0FBVyxZQUFZLGFBQWEsV0FBVyxRQUFRLEdBQUc7QUFDdEQsMkJBQVMsY0FBYztBQUFBLGdCQUMzQjtBQUNBLG9CQUFJLFlBQVksUUFBUTtBQUV4QixzQkFBTSxrQkFBa0IsU0FBUyxjQUFjLElBQUk7QUFDbkQsZ0NBQWdCLGNBQWMsUUFBUTtBQUN0QyxvQkFBSSxZQUFZLGVBQWU7QUFFL0Isc0JBQU0sY0FBYyxTQUFTLGNBQWMsSUFBSTtBQUMvQyw0QkFBWSxjQUFjLFdBQVcsSUFBSSxLQUFLLE9BQU8sS0FBSztBQUMxRCxvQkFBSSxZQUFZLFdBQVc7QUFFM0Isc0JBQU0sbUJBQW1CLFNBQVMsY0FBYyxJQUFJO0FBQ3BELHNCQUFNLG1CQUFtQixJQUFJLEtBQUssUUFBUSxRQUFRO0FBQ2xELGlDQUFpQixjQUFjLGlCQUFpQixlQUFlO0FBQy9ELG9CQUFJLFlBQVksZ0JBQWdCO0FBRWhDLHNCQUFNLGVBQWUsU0FBUyxjQUFjLElBQUk7QUFDaEQsNkJBQWEsY0FBYyxHQUFHLGVBQVEsVUFBUTtBQUM5QyxvQkFBSSxZQUFZLFlBQVk7QUFFNUIsc0JBQU0sZUFBZSxTQUFTLGNBQWMsSUFBSTtBQUNoRCw2QkFBYSxjQUFjLFFBQVE7QUFDbkMsb0JBQUksWUFBWSxZQUFZO0FBRTVCLHNCQUFNLGFBQWEsU0FBUyxjQUFjLElBQUk7QUFDOUMsc0JBQU0sZUFBZSxTQUFTLGNBQWMsUUFBUTtBQUNwRCw2QkFBYSxjQUFjO0FBQzNCLDZCQUFhLFVBQVUsSUFBSSxjQUFjO0FBQ3pDLDZCQUFhLFVBQVUsTUFBTSxzQkFBc0IsWUFBWSxjQUFjLFFBQVE7QUFDckYsMkJBQVcsWUFBWSxZQUFZO0FBQ25DLG9CQUFJLFlBQVksVUFBVTtBQUMxQixzQkFBTSxZQUFZLEdBQUc7QUFBQSxjQUN6QjtBQUFBLFlBQ0osQ0FBQztBQUFBLFVBQ0w7QUFBQSxRQUNKLENBQUM7QUFBQSxNQUNMLENBQUM7QUFBQSxJQUNMLE9BQU87QUFDSCxjQUFRLElBQUksMkJBQTJCO0FBQUEsSUFDM0M7QUFBQSxFQUNKO0FBRUEsaUJBQWUsc0JBQXNCLGNBQWMsVUFBVTtBQUN6RCxVQUFNLFdBQVcsYUFBYSxRQUFRLFVBQVU7QUFFaEQsUUFBSSxDQUFDLFVBQVU7QUFDWCxjQUFRLElBQUksbUNBQW1DO0FBQy9DO0FBQUEsSUFDSjtBQUVBLFVBQU0sY0FBYztBQUFBLE1BQ2hCO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNKO0FBRUEsVUFBTSxXQUFXLE1BQU0sTUFBTSxpRUFBaUU7QUFBQSxNQUMxRixRQUFRO0FBQUEsTUFDUixTQUFTO0FBQUEsUUFDTCxnQkFBZ0I7QUFBQSxNQUNwQjtBQUFBLE1BQ0EsTUFBTSxLQUFLLFVBQVUsV0FBVztBQUFBLElBQ3BDLENBQUM7QUFFRCxRQUFJLFNBQVMsSUFBSTtBQUNiLFlBQU0sT0FBTyxNQUFNLFNBQVMsS0FBSztBQUNqQyxjQUFRLElBQUksb0JBQW9CLEtBQUssT0FBTztBQUM1QywyQkFBcUI7QUFBQSxJQUN6QixPQUFPO0FBQ0gsY0FBUSxJQUFJLHVDQUF1QztBQUFBLElBQ3ZEO0FBQUEsRUFDSjtBQUVBLE1BQU0sY0FBYyxTQUFTLGVBQWUsYUFBYTtBQUN6RCxNQUFNLGVBQWUsU0FBUyxlQUFlLGNBQWM7QUFFM0QsTUFBSSxlQUFlLFVBQWEsZ0JBQWdCLFFBQVc7QUFDdkQsZ0JBQVksaUJBQWlCLFVBQVUsc0JBQXNCO0FBQzdELGlCQUFhLGlCQUFpQixVQUFVLHNCQUFzQjtBQUFBLEVBQ2xFO0FBRUEsTUFBTSxjQUFjLE9BQU8sU0FBUztBQUNwQyxNQUFJLFlBQVksU0FBUyxlQUFlLEdBQUc7QUFDdkMsY0FBVTtBQUNWLHlCQUFxQjtBQUFBLEVBQ3pCO0FBRUEsV0FBUyx3QkFBd0I7QUFDakMsV0FBUyxrQkFBa0I7QUFDM0IsV0FBUyx3QkFBd0I7IiwKICAibmFtZXMiOiBbImNsdWJEcm9wZG93biIsICJzZXNzaW9uVHlwZSJdCn0K
