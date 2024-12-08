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
  async function updateTrainingDropdown() {
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
    const sessionType2 = document.getElementById("sessionType").value;
    const clubName = document.getElementById("clubDropdown").value;
    if (!clubName) return;
    const club = clubsData[clubName];
    const trainingDropdown = document.getElementById("trainingDropdown");
    const trainerDropdown = document.getElementById("trainerDropdown");
    trainingDropdown.innerHTML = "<option value=''>Select Training Slot</option>";
    trainerDropdown.innerHTML = "<option value=''>Select a trainer for advice</option>";
    if (sessionType2 === "advice") {
      trainingDropdown.innerHTML = "<option value=''>Select Advice Slot</option>";
      trainerDropdown.style.display = "block";
    } else {
      trainerDropdown.style.display = "none";
    }
    const sessions = club.bookings;
    const filteredSessions = Object.entries(sessions).filter(
      ([key, _]) => sessionType2 === "training" ? key.startsWith("training") : key.startsWith("advice")
    );
    filteredSessions.forEach(([key, session]) => {
      const option = document.createElement("option");
      option.value = key;
      const sessionStartDate = new Date(session.datetime);
      option.textContent = "".concat(session.description, " - (").concat(sessionStartDate.toLocaleString(), ", ").concat(session.duration, " mins)");
      trainingDropdown.appendChild(option);
    });
    if (sessionType2 === "advice") {
      const trainerOption = document.createElement("option");
      trainerOption.value = club.trainer;
      trainerOption.textContent = trainerMap.get(club.trainer) || "Unknown Trainer";
      trainerDropdown.appendChild(trainerOption);
    }
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
      alert(data.verdict);
      loadTrainingSessions();
    } else {
      const data = await response.json();
      alert(data.error);
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
      alert(data.verdict);
      loadTrainingSessions();
    } else {
      console.log("Failed to delete the training session");
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
      const sessionStartCell = cells[4];
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
  document.filterTable = filterTable;
  document.toggleDateFilter = toggleDateFilter;
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWVtYmVyLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBhc3luYyBmdW5jdGlvbiBsb2FkQ3VycmVudEluZm8oKSB7XHJcbi8vICAgICB0cnkge1xyXG4vLyAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vY3VycmVudHVzZXItNzdoa2kzMnFuYS1udy5hLnJ1bi5hcHAnLCB7XHJcbi8vICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbi8vICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuLy8gICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICB9KTtcclxuXHJcbi8vICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xyXG4vLyAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEhUVFAgZXJyb3IhIFN0YXR1czogJHtyZXNwb25zZS5zdGF0dXN9YCk7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBjb25zdCB1c2VyRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuLy8gICAgICAgICByZXR1cm4gdXNlckRhdGEuZGF0YTtcclxuLy8gICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbi8vICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgdXNlciBkYXRhOicsIGVycm9yKTtcclxuLy8gICAgIH1cclxuLy8gfVxyXG5cclxuXHJcbi8vIGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUhUTUwoKSB7XHJcbi8vICAgICBjb25zdCBkYXRhID0gYXdhaXQgbG9hZEN1cnJlbnRJbmZvKCk7XHJcbi8vICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlcm5hbWUnKS5pbm5lckhUTUwgPSBPYmplY3Qua2V5cyhkYXRhKVswXVxyXG4vLyB9XHJcblxyXG4vL3VwZGF0ZUhUTUwoKVxyXG5cclxubGV0IGNsdWJzRGF0YSA9IHt9O1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gbG9hZENsdWJzKCkge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9zaG93YWxsY2x1YnMtNzdoa2kzMnFuYS1udy5hLnJ1bi5hcHAnLCB7XHJcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChyZXNwb25zZS5vaykge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgY2x1YnNEYXRhID0gZGF0YS5jbHVicztcclxuXHJcbiAgICAgICAgY29uc3QgY2x1YkRyb3Bkb3duID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbHViRHJvcGRvd25cIik7XHJcbiAgICAgICAgY2x1YkRyb3Bkb3duLmlubmVySFRNTCA9IFwiPG9wdGlvbiB2YWx1ZT0nJz5TZWxlY3QgQ2x1Yjwvb3B0aW9uPlwiO1xyXG5cclxuICAgICAgICBPYmplY3Qua2V5cyhjbHVic0RhdGEpLmZvckVhY2goY2x1Yk5hbWUgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xyXG4gICAgICAgICAgICBvcHRpb24udmFsdWUgPSBjbHViTmFtZTtcclxuICAgICAgICAgICAgb3B0aW9uLnRleHRDb250ZW50ID0gY2x1Yk5hbWU7XHJcbiAgICAgICAgICAgIGNsdWJEcm9wZG93bi5hcHBlbmRDaGlsZChvcHRpb24pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkZhaWxlZCB0byBmZXRjaCBjbHVic1wiKTtcclxuICAgIH1cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gdXBkYXRlVHJhaW5pbmdEcm9wZG93bigpIHtcclxuICAgIGNvbnN0IHRyYWluZXJSZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL2ZldGNodHJhaW5lcm5hbWVzLTc3aGtpMzJxbmEtbncuYS5ydW4uYXBwJywge1xyXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgdHJhaW5lcnMgPSBbXTtcclxuICAgIGlmICh0cmFpbmVyUmVzcG9uc2Uub2spIHtcclxuICAgICAgICB0cmFpbmVycyA9IGF3YWl0IHRyYWluZXJSZXNwb25zZS5qc29uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdHJhaW5lck1hcCA9IG5ldyBNYXAoKTtcclxuICAgIHRyYWluZXJzLmZvckVhY2godHJhaW5lciA9PiB7XHJcbiAgICAgICAgdHJhaW5lck1hcC5zZXQodHJhaW5lci5rZXksIHRyYWluZXIubmFtZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBzZXNzaW9uVHlwZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2Vzc2lvblR5cGVcIikudmFsdWU7XHJcbiAgICBjb25zdCBjbHViTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2x1YkRyb3Bkb3duXCIpLnZhbHVlO1xyXG5cclxuICAgIGlmICghY2x1Yk5hbWUpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBjbHViID0gY2x1YnNEYXRhW2NsdWJOYW1lXTtcclxuICAgIGNvbnN0IHRyYWluaW5nRHJvcGRvd24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRyYWluaW5nRHJvcGRvd25cIik7XHJcbiAgICBjb25zdCB0cmFpbmVyRHJvcGRvd24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRyYWluZXJEcm9wZG93blwiKTtcclxuICAgIHRyYWluaW5nRHJvcGRvd24uaW5uZXJIVE1MID0gXCI8b3B0aW9uIHZhbHVlPScnPlNlbGVjdCBUcmFpbmluZyBTbG90PC9vcHRpb24+XCI7XHJcbiAgICB0cmFpbmVyRHJvcGRvd24uaW5uZXJIVE1MID0gXCI8b3B0aW9uIHZhbHVlPScnPlNlbGVjdCBhIHRyYWluZXIgZm9yIGFkdmljZTwvb3B0aW9uPlwiO1xyXG5cclxuICAgIGlmIChzZXNzaW9uVHlwZSA9PT0gXCJhZHZpY2VcIikge1xyXG4gICAgICAgIHRyYWluaW5nRHJvcGRvd24uaW5uZXJIVE1MID0gXCI8b3B0aW9uIHZhbHVlPScnPlNlbGVjdCBBZHZpY2UgU2xvdDwvb3B0aW9uPlwiO1xyXG4gICAgICAgIHRyYWluZXJEcm9wZG93bi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgfSBcclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHRyYWluZXJEcm9wZG93bi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2Vzc2lvbnMgPSBjbHViLmJvb2tpbmdzO1xyXG4gICAgY29uc3QgZmlsdGVyZWRTZXNzaW9ucyA9IE9iamVjdC5lbnRyaWVzKHNlc3Npb25zKS5maWx0ZXIoKFtrZXksIF9dKSA9PlxyXG4gICAgICAgIHNlc3Npb25UeXBlID09PSBcInRyYWluaW5nXCIgPyBrZXkuc3RhcnRzV2l0aChcInRyYWluaW5nXCIpIDoga2V5LnN0YXJ0c1dpdGgoXCJhZHZpY2VcIilcclxuICAgICk7XHJcblxyXG4gICAgZmlsdGVyZWRTZXNzaW9ucy5mb3JFYWNoKChba2V5LCBzZXNzaW9uXSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XHJcbiAgICAgICAgb3B0aW9uLnZhbHVlID0ga2V5O1xyXG4gICAgICAgIGNvbnN0IHNlc3Npb25TdGFydERhdGUgPSBuZXcgRGF0ZShzZXNzaW9uLmRhdGV0aW1lKTtcclxuICAgICAgICBvcHRpb24udGV4dENvbnRlbnQgPSBgJHtzZXNzaW9uLmRlc2NyaXB0aW9ufSAtICgke3Nlc3Npb25TdGFydERhdGUudG9Mb2NhbGVTdHJpbmcoKX0sICR7c2Vzc2lvbi5kdXJhdGlvbn0gbWlucylgO1xyXG4gICAgICAgIHRyYWluaW5nRHJvcGRvd24uYXBwZW5kQ2hpbGQob3B0aW9uKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChzZXNzaW9uVHlwZSA9PT0gXCJhZHZpY2VcIikge1xyXG4gICAgICAgIGNvbnN0IHRyYWluZXJPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xyXG4gICAgICAgIHRyYWluZXJPcHRpb24udmFsdWUgPSBjbHViLnRyYWluZXI7XHJcbiAgICAgICAgdHJhaW5lck9wdGlvbi50ZXh0Q29udGVudCA9IHRyYWluZXJNYXAuZ2V0KGNsdWIudHJhaW5lcikgfHwgXCJVbmtub3duIFRyYWluZXJcIjtcclxuICAgICAgICB0cmFpbmVyRHJvcGRvd24uYXBwZW5kQ2hpbGQodHJhaW5lck9wdGlvbik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGJvb2tBcHBvaW50bWVudCgpIHtcclxuICAgIGNvbnN0IHNlc3Npb25UeXBlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZXNzaW9uVHlwZVwiKS52YWx1ZTtcclxuICAgIGNvbnN0IGNsdWJOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbHViRHJvcGRvd25cIikudmFsdWU7XHJcbiAgICBjb25zdCB0cmFpbmluZ1Nsb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRyYWluaW5nRHJvcGRvd25cIikudmFsdWU7XHJcblxyXG4gICAgaWYgKCFzZXNzaW9uVHlwZSB8fCAhY2x1Yk5hbWUgfHwgIXRyYWluaW5nU2xvdCkge1xyXG4gICAgICAgIGFsZXJ0KFwiUGxlYXNlIHNlbGVjdCBhbGwgZmllbGRzLlwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdXNlcm5hbWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlcm5hbWUnKTtcclxuICAgIGNvbnN0IGJvb2tpbmdEYXRhID0ge1xyXG4gICAgICAgIHVzZXJuYW1lLFxyXG4gICAgICAgIG5hbWU6IHVzZXJuYW1lLFxyXG4gICAgICAgIGNsdWJOYW1lLFxyXG4gICAgICAgIHRyYWluaW5nU2xvdFxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL3NldGFjdGl2aXR5LTc3aGtpMzJxbmEtbncuYS5ydW4uYXBwL3NldEFjdGl2aXR5Jywge1xyXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGJvb2tpbmdEYXRhKVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICBhbGVydChkYXRhLnZlcmRpY3QpO1xyXG4gICAgICAgIGxvYWRUcmFpbmluZ1Nlc3Npb25zKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgYWxlcnQoZGF0YS5lcnJvcik7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJGYWlsZWQgdG8gYm9vayBhcHBvaW50bWVudFwiKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlQXBwb2ludG1lbnRGb3JtKCkge1xyXG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHBvaW50bWVudEZvcm0nKTtcclxuICAgIGZvcm0uc3R5bGUuZGlzcGxheSA9IGZvcm0uc3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnID8gJ2Jsb2NrJyA6ICdub25lJztcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZXNzaW9uVHlwZScpLnNlbGVjdGVkSW5kZXggPSAwO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NsdWJEcm9wZG93bicpLnNlbGVjdGVkSW5kZXggPSAwO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RyYWluaW5nRHJvcGRvd24nKS5zZWxlY3RlZEluZGV4ID0gMDtcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gbG9hZFRyYWluaW5nU2Vzc2lvbnMoKSB7XHJcbiAgICBjb25zdCB1c2VybmFtZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VybmFtZScpO1xyXG5cclxuICAgIGlmICghdXNlcm5hbWUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk5vIHVzZXJuYW1lIGZvdW5kIGluIGxvY2FsU3RvcmFnZVwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdHJhaW5lclJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vZmV0Y2h0cmFpbmVybmFtZXMtNzdoa2kzMnFuYS1udy5hLnJ1bi5hcHAnLCB7XHJcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIGxldCB0cmFpbmVycyA9IFtdO1xyXG4gICAgaWYgKHRyYWluZXJSZXNwb25zZS5vaykge1xyXG4gICAgICAgIHRyYWluZXJzID0gYXdhaXQgdHJhaW5lclJlc3BvbnNlLmpzb24oKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0cmFpbmVyTWFwID0gbmV3IE1hcCgpO1xyXG4gICAgdHJhaW5lcnMuZm9yRWFjaCh0cmFpbmVyID0+IHtcclxuICAgICAgICB0cmFpbmVyTWFwLnNldCh0cmFpbmVyLmtleSwgdHJhaW5lci5uYW1lKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vc2hvd2FsbGNsdWJzLTc3aGtpMzJxbmEtbncuYS5ydW4uYXBwJywge1xyXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAocmVzcG9uc2Uub2spIHtcclxuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cclxuICAgICAgICBjb25zdCB0Ym9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdHJhaW5pbmdTZXNzaW9uc1RhYmxlIHRib2R5XCIpO1xyXG4gICAgICAgIHRib2R5LmlubmVySFRNTCA9ICcnO1xyXG5cclxuICAgICAgICBPYmplY3QuZW50cmllcyhkYXRhLmNsdWJzKS5mb3JFYWNoKChbY2x1Yk5hbWUsIGNsdWJdKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1lbWJlcnNCb29raW5ncyA9IGNsdWIubWVtYmVyc0Jvb2tpbmc7XHJcbiAgICAgICAgICAgIE9iamVjdC5lbnRyaWVzKG1lbWJlcnNCb29raW5ncykuZm9yRWFjaCgoW3VzZXJuYW1lS2V5LCBib29raW5nc10pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh1c2VybmFtZUtleSA9PT0gdXNlcm5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBPYmplY3QuZW50cmllcyhib29raW5ncykuZm9yRWFjaCgoW2Jvb2tpbmdJRCwgYm9va2luZ0RhdGFdKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJvb2tpbmcgPSBjbHViLmJvb2tpbmdzW2Jvb2tpbmdEYXRhLnRyYWluaW5nU2xvdF07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9va2luZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNsdWJDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2x1YkNlbGwudGV4dENvbnRlbnQgPSBjbHViTmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChjbHViQ2VsbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdHlwZUNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9va2luZ0RhdGEudHJhaW5pbmdTbG90LnN0YXJ0c1dpdGgoXCJ0cmFpbmluZ1wiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVDZWxsLnRleHRDb250ZW50ID0gXCJUcmFpbmluZyBTZXNzaW9uXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGJvb2tpbmdEYXRhLnRyYWluaW5nU2xvdC5zdGFydHNXaXRoKFwiYWR2aWNlXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZUNlbGwudGV4dENvbnRlbnQgPSBcIlByb2Zlc3Npb25hbCBBZHZpY2UgU2Vzc2lvblwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKHR5cGVDZWxsKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbkNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbkNlbGwudGV4dENvbnRlbnQgPSBib29raW5nLmRlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uQ2VsbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdHJhaW5lckNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFpbmVyQ2VsbC50ZXh0Q29udGVudCA9IHRyYWluZXJNYXAuZ2V0KGNsdWIudHJhaW5lcikgfHwgXCJVbmtub3duIFRyYWluZXJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZCh0cmFpbmVyQ2VsbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2Vzc2lvblN0YXJ0Q2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlc3Npb25TdGFydERhdGUgPSBuZXcgRGF0ZShib29raW5nLmRhdGV0aW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlc3Npb25TdGFydENlbGwudGV4dENvbnRlbnQgPSBzZXNzaW9uU3RhcnREYXRlLnRvTG9jYWxlU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cuYXBwZW5kQ2hpbGQoc2Vzc2lvblN0YXJ0Q2VsbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZHVyYXRpb25DZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb25DZWxsLnRleHRDb250ZW50ID0gYCR7Ym9va2luZy5kdXJhdGlvbn0gbWluc2A7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cuYXBwZW5kQ2hpbGQoZHVyYXRpb25DZWxsKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmYWNpbGl0eUNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWNpbGl0eUNlbGwudGV4dENvbnRlbnQgPSBib29raW5nLmZhY2lsaXR5SUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cuYXBwZW5kQ2hpbGQoZmFjaWxpdHlDZWxsKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWxldGVDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiXHUyNzRDXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGVCdXR0b24uY2xhc3NMaXN0LmFkZChcImRlbGV0ZUJ1dHRvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZUJ1dHRvbi5vbmNsaWNrID0gKCkgPT4gZGVsZXRlVHJhaW5pbmdTZXNzaW9uKGJvb2tpbmdEYXRhLnRyYWluaW5nU2xvdCwgY2x1Yk5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlQ2VsbC5hcHBlbmRDaGlsZChkZWxldGVCdXR0b24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKGRlbGV0ZUNlbGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGJvZHkuYXBwZW5kQ2hpbGQocm93KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJGYWlsZWQgdG8gZmV0Y2ggY2x1YiBkYXRhXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBkZWxldGVUcmFpbmluZ1Nlc3Npb24odHJhaW5pbmdTbG90LCBjbHViTmFtZSkge1xyXG4gICAgY29uc3QgdXNlcm5hbWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlcm5hbWUnKTtcclxuXHJcbiAgICBpZiAoIXVzZXJuYW1lKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJObyB1c2VybmFtZSBmb3VuZCBpbiBsb2NhbFN0b3JhZ2VcIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGJvb2tpbmdEYXRhID0ge1xyXG4gICAgICAgIHVzZXJuYW1lLFxyXG4gICAgICAgIHRyYWluaW5nU2xvdCxcclxuICAgICAgICBjbHViTmFtZVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL3JlbW92ZWFjdGl2aXR5LTc3aGtpMzJxbmEtbncuYS5ydW4uYXBwL3JlbW92ZUFjdGl2aXR5Jywge1xyXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGJvb2tpbmdEYXRhKVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICBhbGVydChkYXRhLnZlcmRpY3QpO1xyXG4gICAgICAgIGxvYWRUcmFpbmluZ1Nlc3Npb25zKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRmFpbGVkIHRvIGRlbGV0ZSB0aGUgdHJhaW5pbmcgc2Vzc2lvblwiKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlRGF0ZUZpbHRlcigpIHtcclxuICAgIGNvbnN0IGRhdGVGaWx0ZXJJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYXRlRmlsdGVyJyk7XHJcbiAgICBjb25zdCBlbmFibGVEYXRlRmlsdGVyQ2hlY2tib3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZW5hYmxlRGF0ZUZpbHRlcicpO1xyXG4gICAgXHJcbiAgICBkYXRlRmlsdGVySW5wdXQuZGlzYWJsZWQgPSAhZW5hYmxlRGF0ZUZpbHRlckNoZWNrYm94LmNoZWNrZWQ7XHJcbiAgICBcclxuICAgIGlmICghZW5hYmxlRGF0ZUZpbHRlckNoZWNrYm94LmNoZWNrZWQpIHtcclxuICAgICAgICBkYXRlRmlsdGVySW5wdXQudmFsdWUgPSAnJztcclxuICAgIH1cclxuXHJcbiAgICBmaWx0ZXJUYWJsZSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmaWx0ZXJUYWJsZSgpIHtcclxuICAgIGNvbnN0IHNlYXJjaFZhbHVlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NsdWJTZWFyY2gnKS52YWx1ZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgY29uc3QgZGF0ZVZhbHVlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RhdGVGaWx0ZXInKS52YWx1ZTtcclxuICAgIGNvbnN0IGVuYWJsZURhdGVGaWx0ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZW5hYmxlRGF0ZUZpbHRlcicpLmNoZWNrZWQ7XHJcbiAgICBjb25zdCB0YWJsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmFpbmluZ1Nlc3Npb25zVGFibGUnKTtcclxuICAgIGNvbnN0IHJvd3MgPSB0YWJsZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgndHInKTtcclxuICAgIFxyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCByb3dzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgY2VsbHMgPSByb3dzW2ldLmdldEVsZW1lbnRzQnlUYWdOYW1lKCd0ZCcpO1xyXG4gICAgICAgIGNvbnN0IGNsdWJDZWxsID0gY2VsbHNbMF07XHJcbiAgICAgICAgY29uc3Qgc2Vzc2lvblN0YXJ0Q2VsbCA9IGNlbGxzWzRdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChjbHViQ2VsbCAmJiBzZXNzaW9uU3RhcnRDZWxsKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNsdWJOYW1lID0gY2x1YkNlbGwudGV4dENvbnRlbnQgfHwgY2x1YkNlbGwuaW5uZXJUZXh0O1xyXG4gICAgICAgICAgICBjb25zdCBzZXNzaW9uU3RhcnRUZXh0ID0gc2Vzc2lvblN0YXJ0Q2VsbC50ZXh0Q29udGVudC50cmltKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCBbZGF0ZVBhcnQsIHRpbWVQYXJ0XSA9IHNlc3Npb25TdGFydFRleHQuc3BsaXQoJywgJyk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBbZGF5LCBtb250aCwgeWVhcl0gPSBkYXRlUGFydC5zcGxpdCgnLycpO1xyXG4gICAgICAgICAgICBjb25zdCBzZXNzaW9uU3RhcnREYXRlID0gbmV3IERhdGUoYCR7eWVhcn0tJHttb250aC5wYWRTdGFydCgyLCAnMCcpfS0ke2RheS5wYWRTdGFydCgyLCAnMCcpfVQke3RpbWVQYXJ0fWApO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVkWWVhciA9IHNlc3Npb25TdGFydERhdGUuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVkTW9udGggPSAoc2Vzc2lvblN0YXJ0RGF0ZS5nZXRNb250aCgpICsgMSkudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpO1xyXG4gICAgICAgICAgICBjb25zdCBmb3JtYXR0ZWREYXkgPSBzZXNzaW9uU3RhcnREYXRlLmdldERhdGUoKS50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBmb3JtYXR0ZWREYXRlID0gYCR7Zm9ybWF0dGVkWWVhcn0tJHtmb3JtYXR0ZWRNb250aH0tJHtmb3JtYXR0ZWREYXl9YDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBtYXRjaENsdWIgPSBjbHViTmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFZhbHVlKTtcclxuICAgICAgICAgICAgbGV0IG1hdGNoRGF0ZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBpZiAoZW5hYmxlRGF0ZUZpbHRlciAmJiBkYXRlVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIG1hdGNoRGF0ZSA9IGZvcm1hdHRlZERhdGUgPT09IGRhdGVWYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG1hdGNoQ2x1YiAmJiBtYXRjaERhdGUpIHtcclxuICAgICAgICAgICAgICAgIHJvd3NbaV0uc3R5bGUuZGlzcGxheSA9ICcnO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcm93c1tpXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBzZXNzaW9uVHlwZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2Vzc2lvblR5cGVcIilcclxuY29uc3QgY2x1YkRyb3Bkb3duID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbHViRHJvcGRvd25cIilcclxuXHJcbmlmIChzZXNzaW9uVHlwZSAhPSB1bmRlZmluZWQgJiYgY2x1YkRyb3Bkb3duICE9IHVuZGVmaW5lZCkge1xyXG4gICAgc2Vzc2lvblR5cGUuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCB1cGRhdGVUcmFpbmluZ0Ryb3Bkb3duKTtcclxuICAgIGNsdWJEcm9wZG93bi5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIHVwZGF0ZVRyYWluaW5nRHJvcGRvd24pO1xyXG59XHJcblxyXG5jb25zdCBjdXJyZW50UGFnZSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcclxuaWYgKGN1cnJlbnRQYWdlLmluY2x1ZGVzKCdib29raW5ncy5odG1sJykpIHtcclxuICAgIGxvYWRDbHVicygpO1xyXG4gICAgbG9hZFRyYWluaW5nU2Vzc2lvbnMoKTtcclxufVxyXG5cclxuZG9jdW1lbnQudG9nZ2xlQXBwb2ludG1lbnRGb3JtID0gdG9nZ2xlQXBwb2ludG1lbnRGb3JtO1xyXG5kb2N1bWVudC5ib29rQXBwb2ludG1lbnQgPSBib29rQXBwb2ludG1lbnQ7XHJcbmRvY3VtZW50LmRlbGV0ZVRyYWluaW5nU2Vzc2lvbiA9IGRlbGV0ZVRyYWluaW5nU2Vzc2lvbjtcclxuZG9jdW1lbnQuZmlsdGVyVGFibGUgPSBmaWx0ZXJUYWJsZTtcclxuZG9jdW1lbnQudG9nZ2xlRGF0ZUZpbHRlciA9IHRvZ2dsZURhdGVGaWx0ZXI7Il0sCiAgIm1hcHBpbmdzIjogIjs7QUE0QkEsTUFBSSxZQUFZLENBQUM7QUFFakIsaUJBQWUsWUFBWTtBQUN2QixVQUFNLFdBQVcsTUFBTSxNQUFNLGdEQUFnRDtBQUFBLE1BQ3pFLFFBQVE7QUFBQSxNQUNSLFNBQVMsRUFBRSxnQkFBZ0IsbUJBQW1CO0FBQUEsSUFDbEQsQ0FBQztBQUVELFFBQUksU0FBUyxJQUFJO0FBQ2IsWUFBTSxPQUFPLE1BQU0sU0FBUyxLQUFLO0FBQ2pDLGtCQUFZLEtBQUs7QUFFakIsWUFBTUEsZ0JBQWUsU0FBUyxlQUFlLGNBQWM7QUFDM0QsTUFBQUEsY0FBYSxZQUFZO0FBRXpCLGFBQU8sS0FBSyxTQUFTLEVBQUUsUUFBUSxjQUFZO0FBQ3ZDLGNBQU0sU0FBUyxTQUFTLGNBQWMsUUFBUTtBQUM5QyxlQUFPLFFBQVE7QUFDZixlQUFPLGNBQWM7QUFDckIsUUFBQUEsY0FBYSxZQUFZLE1BQU07QUFBQSxNQUNuQyxDQUFDO0FBQUEsSUFDTCxPQUFPO0FBQ0gsY0FBUSxJQUFJLHVCQUF1QjtBQUFBLElBQ3ZDO0FBQUEsRUFDSjtBQUVBLGlCQUFlLHlCQUF5QjtBQUNwQyxVQUFNLGtCQUFrQixNQUFNLE1BQU0scURBQXFEO0FBQUEsTUFDckYsUUFBUTtBQUFBLE1BQ1IsU0FBUztBQUFBLFFBQ0wsZ0JBQWdCO0FBQUEsTUFDcEI7QUFBQSxJQUNKLENBQUM7QUFFRCxRQUFJLFdBQVcsQ0FBQztBQUNoQixRQUFJLGdCQUFnQixJQUFJO0FBQ3BCLGlCQUFXLE1BQU0sZ0JBQWdCLEtBQUs7QUFBQSxJQUMxQztBQUVBLFVBQU0sYUFBYSxvQkFBSSxJQUFJO0FBQzNCLGFBQVMsUUFBUSxhQUFXO0FBQ3hCLGlCQUFXLElBQUksUUFBUSxLQUFLLFFBQVEsSUFBSTtBQUFBLElBQzVDLENBQUM7QUFFRCxVQUFNQyxlQUFjLFNBQVMsZUFBZSxhQUFhLEVBQUU7QUFDM0QsVUFBTSxXQUFXLFNBQVMsZUFBZSxjQUFjLEVBQUU7QUFFekQsUUFBSSxDQUFDLFNBQVU7QUFFZixVQUFNLE9BQU8sVUFBVSxRQUFRO0FBQy9CLFVBQU0sbUJBQW1CLFNBQVMsZUFBZSxrQkFBa0I7QUFDbkUsVUFBTSxrQkFBa0IsU0FBUyxlQUFlLGlCQUFpQjtBQUNqRSxxQkFBaUIsWUFBWTtBQUM3QixvQkFBZ0IsWUFBWTtBQUU1QixRQUFJQSxpQkFBZ0IsVUFBVTtBQUMxQix1QkFBaUIsWUFBWTtBQUM3QixzQkFBZ0IsTUFBTSxVQUFVO0FBQUEsSUFDcEMsT0FDSztBQUNELHNCQUFnQixNQUFNLFVBQVU7QUFBQSxJQUNwQztBQUVBLFVBQU0sV0FBVyxLQUFLO0FBQ3RCLFVBQU0sbUJBQW1CLE9BQU8sUUFBUSxRQUFRLEVBQUU7QUFBQSxNQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFDN0RBLGlCQUFnQixhQUFhLElBQUksV0FBVyxVQUFVLElBQUksSUFBSSxXQUFXLFFBQVE7QUFBQSxJQUNyRjtBQUVBLHFCQUFpQixRQUFRLENBQUMsQ0FBQyxLQUFLLE9BQU8sTUFBTTtBQUN6QyxZQUFNLFNBQVMsU0FBUyxjQUFjLFFBQVE7QUFDOUMsYUFBTyxRQUFRO0FBQ2YsWUFBTSxtQkFBbUIsSUFBSSxLQUFLLFFBQVEsUUFBUTtBQUNsRCxhQUFPLGNBQWMsR0FBRyxlQUFRLGFBQVcsUUFBTyx3QkFBaUIsZUFBZSxHQUFDLE1BQUssZUFBUSxVQUFRO0FBQ3hHLHVCQUFpQixZQUFZLE1BQU07QUFBQSxJQUN2QyxDQUFDO0FBRUQsUUFBSUEsaUJBQWdCLFVBQVU7QUFDMUIsWUFBTSxnQkFBZ0IsU0FBUyxjQUFjLFFBQVE7QUFDckQsb0JBQWMsUUFBUSxLQUFLO0FBQzNCLG9CQUFjLGNBQWMsV0FBVyxJQUFJLEtBQUssT0FBTyxLQUFLO0FBQzVELHNCQUFnQixZQUFZLGFBQWE7QUFBQSxJQUM3QztBQUFBLEVBQ0o7QUFFQSxpQkFBZSxrQkFBa0I7QUFDN0IsVUFBTUEsZUFBYyxTQUFTLGVBQWUsYUFBYSxFQUFFO0FBQzNELFVBQU0sV0FBVyxTQUFTLGVBQWUsY0FBYyxFQUFFO0FBQ3pELFVBQU0sZUFBZSxTQUFTLGVBQWUsa0JBQWtCLEVBQUU7QUFFakUsUUFBSSxDQUFDQSxnQkFBZSxDQUFDLFlBQVksQ0FBQyxjQUFjO0FBQzVDLFlBQU0sMkJBQTJCO0FBQ2pDO0FBQUEsSUFDSjtBQUVBLFVBQU0sV0FBVyxhQUFhLFFBQVEsVUFBVTtBQUNoRCxVQUFNLGNBQWM7QUFBQSxNQUNoQjtBQUFBLE1BQ0EsTUFBTTtBQUFBLE1BQ047QUFBQSxNQUNBO0FBQUEsSUFDSjtBQUVBLFVBQU0sV0FBVyxNQUFNLE1BQU0sMkRBQTJEO0FBQUEsTUFDcEYsUUFBUTtBQUFBLE1BQ1IsU0FBUyxFQUFFLGdCQUFnQixtQkFBbUI7QUFBQSxNQUM5QyxNQUFNLEtBQUssVUFBVSxXQUFXO0FBQUEsSUFDcEMsQ0FBQztBQUVELFFBQUksU0FBUyxJQUFJO0FBQ2IsWUFBTSxPQUFPLE1BQU0sU0FBUyxLQUFLO0FBQ2pDLFlBQU0sS0FBSyxPQUFPO0FBQ2xCLDJCQUFxQjtBQUFBLElBQ3pCLE9BQU87QUFDSCxZQUFNLE9BQU8sTUFBTSxTQUFTLEtBQUs7QUFDakMsWUFBTSxLQUFLLEtBQUs7QUFDaEIsY0FBUSxJQUFJLDRCQUE0QjtBQUFBLElBQzVDO0FBQUEsRUFDSjtBQUVBLFdBQVMsd0JBQXdCO0FBQzdCLFVBQU0sT0FBTyxTQUFTLGVBQWUsaUJBQWlCO0FBQ3RELFNBQUssTUFBTSxVQUFVLEtBQUssTUFBTSxZQUFZLFNBQVMsVUFBVTtBQUMvRCxhQUFTLGVBQWUsYUFBYSxFQUFFLGdCQUFnQjtBQUN2RCxhQUFTLGVBQWUsY0FBYyxFQUFFLGdCQUFnQjtBQUN4RCxhQUFTLGVBQWUsa0JBQWtCLEVBQUUsZ0JBQWdCO0FBQUEsRUFDaEU7QUFFQSxpQkFBZSx1QkFBdUI7QUFDbEMsVUFBTSxXQUFXLGFBQWEsUUFBUSxVQUFVO0FBRWhELFFBQUksQ0FBQyxVQUFVO0FBQ1gsY0FBUSxJQUFJLG1DQUFtQztBQUMvQztBQUFBLElBQ0o7QUFFQSxVQUFNLGtCQUFrQixNQUFNLE1BQU0scURBQXFEO0FBQUEsTUFDckYsUUFBUTtBQUFBLE1BQ1IsU0FBUztBQUFBLFFBQ0wsZ0JBQWdCO0FBQUEsTUFDcEI7QUFBQSxJQUNKLENBQUM7QUFFRCxRQUFJLFdBQVcsQ0FBQztBQUNoQixRQUFJLGdCQUFnQixJQUFJO0FBQ3BCLGlCQUFXLE1BQU0sZ0JBQWdCLEtBQUs7QUFBQSxJQUMxQztBQUVBLFVBQU0sYUFBYSxvQkFBSSxJQUFJO0FBQzNCLGFBQVMsUUFBUSxhQUFXO0FBQ3hCLGlCQUFXLElBQUksUUFBUSxLQUFLLFFBQVEsSUFBSTtBQUFBLElBQzVDLENBQUM7QUFFRCxVQUFNLFdBQVcsTUFBTSxNQUFNLGdEQUFnRDtBQUFBLE1BQ3pFLFFBQVE7QUFBQSxNQUNSLFNBQVM7QUFBQSxRQUNMLGdCQUFnQjtBQUFBLE1BQ3BCO0FBQUEsSUFDSixDQUFDO0FBRUQsUUFBSSxTQUFTLElBQUk7QUFDYixZQUFNLE9BQU8sTUFBTSxTQUFTLEtBQUs7QUFFakMsWUFBTSxRQUFRLFNBQVMsY0FBYyw4QkFBOEI7QUFDbkUsWUFBTSxZQUFZO0FBRWxCLGFBQU8sUUFBUSxLQUFLLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQyxVQUFVLElBQUksTUFBTTtBQUNyRCxjQUFNLGtCQUFrQixLQUFLO0FBQzdCLGVBQU8sUUFBUSxlQUFlLEVBQUUsUUFBUSxDQUFDLENBQUMsYUFBYSxRQUFRLE1BQU07QUFDakUsY0FBSSxnQkFBZ0IsVUFBVTtBQUMxQixtQkFBTyxRQUFRLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQyxXQUFXLFdBQVcsTUFBTTtBQUMzRCxvQkFBTSxVQUFVLEtBQUssU0FBUyxZQUFZLFlBQVk7QUFFdEQsa0JBQUksU0FBUztBQUNULHNCQUFNLE1BQU0sU0FBUyxjQUFjLElBQUk7QUFFdkMsc0JBQU0sV0FBVyxTQUFTLGNBQWMsSUFBSTtBQUM1Qyx5QkFBUyxjQUFjO0FBQ3ZCLG9CQUFJLFlBQVksUUFBUTtBQUV4QixzQkFBTSxXQUFXLFNBQVMsY0FBYyxJQUFJO0FBQzVDLG9CQUFJLFlBQVksYUFBYSxXQUFXLFVBQVUsR0FBRztBQUNqRCwyQkFBUyxjQUFjO0FBQUEsZ0JBQzNCLFdBQVcsWUFBWSxhQUFhLFdBQVcsUUFBUSxHQUFHO0FBQ3RELDJCQUFTLGNBQWM7QUFBQSxnQkFDM0I7QUFDQSxvQkFBSSxZQUFZLFFBQVE7QUFFeEIsc0JBQU0sa0JBQWtCLFNBQVMsY0FBYyxJQUFJO0FBQ25ELGdDQUFnQixjQUFjLFFBQVE7QUFDdEMsb0JBQUksWUFBWSxlQUFlO0FBRS9CLHNCQUFNLGNBQWMsU0FBUyxjQUFjLElBQUk7QUFDL0MsNEJBQVksY0FBYyxXQUFXLElBQUksS0FBSyxPQUFPLEtBQUs7QUFDMUQsb0JBQUksWUFBWSxXQUFXO0FBRTNCLHNCQUFNLG1CQUFtQixTQUFTLGNBQWMsSUFBSTtBQUNwRCxzQkFBTSxtQkFBbUIsSUFBSSxLQUFLLFFBQVEsUUFBUTtBQUNsRCxpQ0FBaUIsY0FBYyxpQkFBaUIsZUFBZTtBQUMvRCxvQkFBSSxZQUFZLGdCQUFnQjtBQUVoQyxzQkFBTSxlQUFlLFNBQVMsY0FBYyxJQUFJO0FBQ2hELDZCQUFhLGNBQWMsR0FBRyxlQUFRLFVBQVE7QUFDOUMsb0JBQUksWUFBWSxZQUFZO0FBRTVCLHNCQUFNLGVBQWUsU0FBUyxjQUFjLElBQUk7QUFDaEQsNkJBQWEsY0FBYyxRQUFRO0FBQ25DLG9CQUFJLFlBQVksWUFBWTtBQUU1QixzQkFBTSxhQUFhLFNBQVMsY0FBYyxJQUFJO0FBQzlDLHNCQUFNLGVBQWUsU0FBUyxjQUFjLFFBQVE7QUFDcEQsNkJBQWEsY0FBYztBQUMzQiw2QkFBYSxVQUFVLElBQUksY0FBYztBQUN6Qyw2QkFBYSxVQUFVLE1BQU0sc0JBQXNCLFlBQVksY0FBYyxRQUFRO0FBQ3JGLDJCQUFXLFlBQVksWUFBWTtBQUNuQyxvQkFBSSxZQUFZLFVBQVU7QUFDMUIsc0JBQU0sWUFBWSxHQUFHO0FBQUEsY0FDekI7QUFBQSxZQUNKLENBQUM7QUFBQSxVQUNMO0FBQUEsUUFDSixDQUFDO0FBQUEsTUFDTCxDQUFDO0FBQUEsSUFDTCxPQUFPO0FBQ0gsY0FBUSxJQUFJLDJCQUEyQjtBQUFBLElBQzNDO0FBQUEsRUFDSjtBQUVBLGlCQUFlLHNCQUFzQixjQUFjLFVBQVU7QUFDekQsVUFBTSxXQUFXLGFBQWEsUUFBUSxVQUFVO0FBRWhELFFBQUksQ0FBQyxVQUFVO0FBQ1gsY0FBUSxJQUFJLG1DQUFtQztBQUMvQztBQUFBLElBQ0o7QUFFQSxVQUFNLGNBQWM7QUFBQSxNQUNoQjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDSjtBQUVBLFVBQU0sV0FBVyxNQUFNLE1BQU0saUVBQWlFO0FBQUEsTUFDMUYsUUFBUTtBQUFBLE1BQ1IsU0FBUztBQUFBLFFBQ0wsZ0JBQWdCO0FBQUEsTUFDcEI7QUFBQSxNQUNBLE1BQU0sS0FBSyxVQUFVLFdBQVc7QUFBQSxJQUNwQyxDQUFDO0FBRUQsUUFBSSxTQUFTLElBQUk7QUFDYixZQUFNLE9BQU8sTUFBTSxTQUFTLEtBQUs7QUFDakMsWUFBTSxLQUFLLE9BQU87QUFDbEIsMkJBQXFCO0FBQUEsSUFDekIsT0FBTztBQUNILGNBQVEsSUFBSSx1Q0FBdUM7QUFBQSxJQUN2RDtBQUFBLEVBQ0o7QUFFQSxXQUFTLG1CQUFtQjtBQUN4QixVQUFNLGtCQUFrQixTQUFTLGVBQWUsWUFBWTtBQUM1RCxVQUFNLDJCQUEyQixTQUFTLGVBQWUsa0JBQWtCO0FBRTNFLG9CQUFnQixXQUFXLENBQUMseUJBQXlCO0FBRXJELFFBQUksQ0FBQyx5QkFBeUIsU0FBUztBQUNuQyxzQkFBZ0IsUUFBUTtBQUFBLElBQzVCO0FBRUEsZ0JBQVk7QUFBQSxFQUNoQjtBQUVBLFdBQVMsY0FBYztBQUNuQixVQUFNLGNBQWMsU0FBUyxlQUFlLFlBQVksRUFBRSxNQUFNLFlBQVk7QUFDNUUsVUFBTSxZQUFZLFNBQVMsZUFBZSxZQUFZLEVBQUU7QUFDeEQsVUFBTSxtQkFBbUIsU0FBUyxlQUFlLGtCQUFrQixFQUFFO0FBQ3JFLFVBQU0sUUFBUSxTQUFTLGVBQWUsdUJBQXVCO0FBQzdELFVBQU0sT0FBTyxNQUFNLHFCQUFxQixJQUFJO0FBRTVDLGFBQVMsSUFBSSxHQUFHLElBQUksS0FBSyxRQUFRLEtBQUs7QUFDbEMsWUFBTSxRQUFRLEtBQUssQ0FBQyxFQUFFLHFCQUFxQixJQUFJO0FBQy9DLFlBQU0sV0FBVyxNQUFNLENBQUM7QUFDeEIsWUFBTSxtQkFBbUIsTUFBTSxDQUFDO0FBRWhDLFVBQUksWUFBWSxrQkFBa0I7QUFDOUIsY0FBTSxXQUFXLFNBQVMsZUFBZSxTQUFTO0FBQ2xELGNBQU0sbUJBQW1CLGlCQUFpQixZQUFZLEtBQUs7QUFFM0QsY0FBTSxDQUFDLFVBQVUsUUFBUSxJQUFJLGlCQUFpQixNQUFNLElBQUk7QUFFeEQsY0FBTSxDQUFDLEtBQUssT0FBTyxJQUFJLElBQUksU0FBUyxNQUFNLEdBQUc7QUFDN0MsY0FBTSxtQkFBbUIsSUFBSSxLQUFLLEdBQUcsYUFBSSxLQUFJLGFBQU0sU0FBUyxHQUFHLEdBQUcsR0FBQyxLQUFJLFdBQUksU0FBUyxHQUFHLEdBQUcsR0FBQyxLQUFJLGdCQUFVO0FBRXpHLGNBQU0sZ0JBQWdCLGlCQUFpQixZQUFZO0FBQ25ELGNBQU0sa0JBQWtCLGlCQUFpQixTQUFTLElBQUksR0FBRyxTQUFTLEVBQUUsU0FBUyxHQUFHLEdBQUc7QUFDbkYsY0FBTSxlQUFlLGlCQUFpQixRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVMsR0FBRyxHQUFHO0FBRTFFLGNBQU0sZ0JBQWdCLEdBQUcsc0JBQWEsS0FBSSx1QkFBYyxLQUFJO0FBRTVELFlBQUksWUFBWSxTQUFTLFlBQVksRUFBRSxTQUFTLFdBQVc7QUFDM0QsWUFBSSxZQUFZO0FBRWhCLFlBQUksb0JBQW9CLFdBQVc7QUFDL0Isc0JBQVksa0JBQWtCO0FBQUEsUUFDbEM7QUFFQSxZQUFJLGFBQWEsV0FBVztBQUN4QixlQUFLLENBQUMsRUFBRSxNQUFNLFVBQVU7QUFBQSxRQUM1QixPQUFPO0FBQ0gsZUFBSyxDQUFDLEVBQUUsTUFBTSxVQUFVO0FBQUEsUUFDNUI7QUFBQSxNQUNKO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFFQSxNQUFNLGNBQWMsU0FBUyxlQUFlLGFBQWE7QUFDekQsTUFBTSxlQUFlLFNBQVMsZUFBZSxjQUFjO0FBRTNELE1BQUksZUFBZSxVQUFhLGdCQUFnQixRQUFXO0FBQ3ZELGdCQUFZLGlCQUFpQixVQUFVLHNCQUFzQjtBQUM3RCxpQkFBYSxpQkFBaUIsVUFBVSxzQkFBc0I7QUFBQSxFQUNsRTtBQUVBLE1BQU0sY0FBYyxPQUFPLFNBQVM7QUFDcEMsTUFBSSxZQUFZLFNBQVMsZUFBZSxHQUFHO0FBQ3ZDLGNBQVU7QUFDVix5QkFBcUI7QUFBQSxFQUN6QjtBQUVBLFdBQVMsd0JBQXdCO0FBQ2pDLFdBQVMsa0JBQWtCO0FBQzNCLFdBQVMsd0JBQXdCO0FBQ2pDLFdBQVMsY0FBYztBQUN2QixXQUFTLG1CQUFtQjsiLAogICJuYW1lcyI6IFsiY2x1YkRyb3Bkb3duIiwgInNlc3Npb25UeXBlIl0KfQo=
