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
    alert("Wanna edit ".concat(facilityID, "!"));
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
  }
  loadFacilities();
  document.createFacility = createFacility;
  document.editFacility = editFacility;
  document.deleteFacility = deleteFacility;
  document.toggleFacilityForm = toggleFacilityForm;
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsib3BlcmF0aW9ucy5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiYXN5bmMgZnVuY3Rpb24gYm9va0ZhY2lsaXR5KCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9ICdUZXN0IGJvb2tpbmcgZm9yIGZhY2lsaXR5JztcclxuICAgICAgICBjb25zdCBjbHViSUQgPSAnY2x1YjEnO1xyXG4gICAgICAgIGNvbnN0IGZhY2lsaXR5SUQgPSAnZmFjaWxpdHkxJztcclxuICAgICAgICBjb25zdCBkYXRldGltZSA9ICcyMDI0LTExLTIxVDEwOjAwOjAwWic7XHJcbiAgICAgICAgY29uc3QgZHVyYXRpb24gPSA2MDtcclxuXHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cDovLzEyNy4wLjAuMTo1MDAxL3Nwb3J0cy1hcmVuYS0zOWEzMi9ldXJvcGUtd2VzdDIvYm9va0ZhY2lsaXR5Jywge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgY2x1YklEOiBjbHViSUQsXHJcbiAgICAgICAgICAgICAgICBmYWNpbGl0eUlEOiBmYWNpbGl0eUlELFxyXG4gICAgICAgICAgICAgICAgZGF0ZXRpbWU6IGRhdGV0aW1lLFxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uLFxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xyXG4gICAgICAgICAgICBjb25zdCBlcnJvckRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICAgIGFsZXJ0KGVycm9yRGF0YS5lcnJvcik7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSFRUUCBlcnJvciEgU3RhdHVzOiAke3Jlc3BvbnNlLnN0YXR1c31gKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGJvb2tpbmdEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgIGFsZXJ0KFwiQm9va2luZyBzdWNjZXNzZnVsIVwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnQm9va2luZyBTdWNjZXNzZnVsOicsIGJvb2tpbmdEYXRhKTtcclxuICAgICAgICByZXR1cm4gYm9va2luZ0RhdGE7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGJvb2tpbmcgZmFjaWxpdHk6JywgZXJyb3IpO1xyXG4gICAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBsb2FkRmFjaWxpdGllcygpIHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHA6Ly8xMjcuMC4wLjE6NTAwMS9zcG9ydHMtYXJlbmEtMzlhMzIvZXVyb3BlLXdlc3QyL3Nob3dBbGxGYWNpbGl0aWVzJywge1xyXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAocmVzcG9uc2Uub2spIHtcclxuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhLmZhY2lsaXRpZXMpO1xyXG5cclxuICAgICAgICBjb25zdCB0YWJsZUJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2ZhY2lsaXRpZXNUYWJsZSB0Ym9keVwiKTtcclxuICAgICAgICB0YWJsZUJvZHkuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcbiAgICAgICAgT2JqZWN0LmVudHJpZXMoZGF0YS5mYWNpbGl0aWVzKS5mb3JFYWNoKChbZmFjaWxpdHlJRCwgZmFjaWxpdHldKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWVDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xyXG4gICAgICAgICAgICBuYW1lQ2VsbC50ZXh0Q29udGVudCA9IGZhY2lsaXR5SUQ7XHJcbiAgICAgICAgICAgIGNvbnN0IGxvY2F0aW9uQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuICAgICAgICAgICAgbG9jYXRpb25DZWxsLnRleHRDb250ZW50ID0gZmFjaWxpdHkubG9jYXRpb247XHJcbiAgICAgICAgICAgIGNvbnN0IGVkaXRDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xyXG4gICAgICAgICAgICBlZGl0Q2VsbC5pbm5lckhUTUwgPSBgPGEgaHJlZj1cIiNcIiBvbmNsaWNrPVwiZWRpdEZhY2lsaXR5KCcke2ZhY2lsaXR5SUR9JylcIj5cdTI3MEZcdUZFMEY8L2E+YDtcclxuICAgICAgICAgICAgY29uc3QgZGVsZXRlQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcclxuICAgICAgICAgICAgZGVsZXRlQ2VsbC5pbm5lckhUTUwgPSBgPGEgaHJlZj1cIiNcIiBvbmNsaWNrPVwiZGVsZXRlRmFjaWxpdHkoJyR7ZmFjaWxpdHlJRH0nKVwiPlx1Mjc0QzwvYT5gO1xyXG5cclxuICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKG5hbWVDZWxsKTtcclxuICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKGxvY2F0aW9uQ2VsbCk7XHJcbiAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChlZGl0Q2VsbCk7XHJcbiAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChkZWxldGVDZWxsKTtcclxuXHJcbiAgICAgICAgICAgIHRhYmxlQm9keS5hcHBlbmRDaGlsZChyb3cpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBjcmVhdGVGYWNpbGl0eSgpIHtcclxuICAgIGNvbnN0IGZhY2lsaXR5SUQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmFjaWxpdHlJRCcpLnZhbHVlO1xyXG4gICAgY29uc3QgbG9jYXRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9jYXRpb24nKS52YWx1ZTtcclxuXHJcbiAgICBpZiAoIWZhY2lsaXR5SUQgfHwgIWxvY2F0aW9uKSB7XHJcbiAgICAgICAgYWxlcnQoXCJQbGVhc2UgZmlsbCBpbiBib3RoIGZpZWxkcy5cIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cDovLzEyNy4wLjAuMTo1MDAxL3Nwb3J0cy1hcmVuYS0zOWEzMi9ldXJvcGUtd2VzdDIvY3JlYXRlRmFjaWxpdHknLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IGZhY2lsaXR5SUQ6IGZhY2lsaXR5SUQsIGxvY2F0aW9uOiBsb2NhdGlvbiB9KSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgICAgYWxlcnQocmVzdWx0Lm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB0b2dnbGVGYWNpbGl0eUZvcm0oKTtcclxuICAgICAgICAgICAgbG9hZEZhY2lsaXRpZXMoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChgRXJyb3I6ICR7cmVzdWx0LmVycm9yfWApO1xyXG4gICAgICAgIH1cclxuICAgIH0gXHJcbiAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGR1cmluZyBmYWNpbGl0eSBjcmVhdGlvbjpcIiwgZXJyb3IpO1xyXG4gICAgICAgIGFsZXJ0KFwiVGhlcmUgd2FzIGFuIGVycm9yIGNyZWF0aW5nIHRoZSBmYWNpbGl0eS5cIik7IFxyXG4gICAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBlZGl0RmFjaWxpdHkoZmFjaWxpdHlJRCl7XHJcbiAgICBhbGVydChgV2FubmEgZWRpdCAke2ZhY2lsaXR5SUR9IWApO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBkZWxldGVGYWNpbGl0eShmYWNpbGl0eUlEKXtcclxuICAgIGNvbnN0IGNvbmZpcm1lZCA9IHdpbmRvdy5jb25maXJtKGBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgZmFjaWxpdHk/YCk7XHJcbiAgICBpZiAoY29uZmlybWVkKXtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwOi8vMTI3LjAuMC4xOjUwMDEvc3BvcnRzLWFyZW5hLTM5YTMyL2V1cm9wZS13ZXN0Mi9kZWxldGVGYWNpbGl0eScsIHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0RFTEVURScsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IGZhY2lsaXR5SUQ6IGZhY2lsaXR5SUQgfSksXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChyZXN1bHQubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICBsb2FkRmFjaWxpdGllcygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoYEVycm9yOiAke3Jlc3VsdC5lcnJvcn1gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBkdXJpbmcgZGVsZXRpb246XCIsIGVycm9yKTtcclxuICAgICAgICAgICAgYWxlcnQoXCJUaGVyZSB3YXMgYW4gZXJyb3IgZGVsZXRpbmcgdGhlIGZhY2lsaXR5LlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRvZ2dsZUZhY2lsaXR5Rm9ybSgpIHtcclxuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmFjaWxpdHlGb3JtJyk7XHJcbiAgICBmb3JtLnN0eWxlLmRpc3BsYXkgPSBmb3JtLnN0eWxlLmRpc3BsYXkgPT09ICdub25lJyA/ICdibG9jaycgOiAnbm9uZSc7XHJcbn1cclxuXHJcbi8vIGJvb2tGYWNpbGl0eSgpXHJcbmxvYWRGYWNpbGl0aWVzKCk7XHJcblxyXG5kb2N1bWVudC5jcmVhdGVGYWNpbGl0eSA9IGNyZWF0ZUZhY2lsaXR5O1xyXG5kb2N1bWVudC5lZGl0RmFjaWxpdHkgPSBlZGl0RmFjaWxpdHk7XHJcbmRvY3VtZW50LmRlbGV0ZUZhY2lsaXR5ID0gZGVsZXRlRmFjaWxpdHk7XHJcbmRvY3VtZW50LnRvZ2dsZUZhY2lsaXR5Rm9ybSA9IHRvZ2dsZUZhY2lsaXR5Rm9ybTsiXSwKICAibWFwcGluZ3MiOiAiOztBQXFDQSxpQkFBZSxpQkFBaUI7QUFDNUIsVUFBTSxXQUFXLE1BQU0sTUFBTSwyRUFBMkU7QUFBQSxNQUNwRyxRQUFRO0FBQUEsTUFDUixTQUFTO0FBQUEsUUFDTCxnQkFBZ0I7QUFBQSxNQUNwQjtBQUFBLElBQ0osQ0FBQztBQUVELFFBQUksU0FBUyxJQUFJO0FBQ2IsWUFBTSxPQUFPLE1BQU0sU0FBUyxLQUFLO0FBRWpDLGNBQVEsSUFBSSxLQUFLLFVBQVU7QUFFM0IsWUFBTSxZQUFZLFNBQVMsY0FBYyx3QkFBd0I7QUFDakUsZ0JBQVUsWUFBWTtBQUV0QixhQUFPLFFBQVEsS0FBSyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUMsWUFBWSxRQUFRLE1BQU07QUFDaEUsY0FBTSxNQUFNLFNBQVMsY0FBYyxJQUFJO0FBRXZDLGNBQU0sV0FBVyxTQUFTLGNBQWMsSUFBSTtBQUM1QyxpQkFBUyxjQUFjO0FBQ3ZCLGNBQU0sZUFBZSxTQUFTLGNBQWMsSUFBSTtBQUNoRCxxQkFBYSxjQUFjLFNBQVM7QUFDcEMsY0FBTSxXQUFXLFNBQVMsY0FBYyxJQUFJO0FBQzVDLGlCQUFTLFlBQVksdUNBQXNDLG1CQUFVO0FBQ3JFLGNBQU0sYUFBYSxTQUFTLGNBQWMsSUFBSTtBQUM5QyxtQkFBVyxZQUFZLHlDQUF3QyxtQkFBVTtBQUV6RSxZQUFJLFlBQVksUUFBUTtBQUN4QixZQUFJLFlBQVksWUFBWTtBQUM1QixZQUFJLFlBQVksUUFBUTtBQUN4QixZQUFJLFlBQVksVUFBVTtBQUUxQixrQkFBVSxZQUFZLEdBQUc7QUFBQSxNQUM3QixDQUFDO0FBQUEsSUFDTDtBQUFBLEVBQ0o7QUFFQSxpQkFBZSxpQkFBaUI7QUFDNUIsVUFBTSxhQUFhLFNBQVMsZUFBZSxZQUFZLEVBQUU7QUFDekQsVUFBTSxXQUFXLFNBQVMsZUFBZSxVQUFVLEVBQUU7QUFFckQsUUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVO0FBQzFCLFlBQU0sNkJBQTZCO0FBQ25DO0FBQUEsSUFDSjtBQUVBLFFBQUk7QUFDQSxZQUFNLFdBQVcsTUFBTSxNQUFNLHdFQUF3RTtBQUFBLFFBQ2pHLFFBQVE7QUFBQSxRQUNSLFNBQVM7QUFBQSxVQUNMLGdCQUFnQjtBQUFBLFFBQ3BCO0FBQUEsUUFDQSxNQUFNLEtBQUssVUFBVSxFQUFFLFlBQXdCLFNBQW1CLENBQUM7QUFBQSxNQUN2RSxDQUFDO0FBRUQsWUFBTSxTQUFTLE1BQU0sU0FBUyxLQUFLO0FBRW5DLFVBQUksU0FBUyxXQUFXLEtBQUs7QUFDekIsY0FBTSxPQUFPLE9BQU87QUFDcEIsMkJBQW1CO0FBQ25CLHVCQUFlO0FBQUEsTUFDbkIsT0FBTztBQUNILGNBQU0sVUFBVSxjQUFPLE1BQU87QUFBQSxNQUNsQztBQUFBLElBQ0osU0FDTyxPQUFPO0FBQ1YsY0FBUSxJQUFJLG1DQUFtQyxLQUFLO0FBQ3BELFlBQU0sMkNBQTJDO0FBQUEsSUFDckQ7QUFBQSxFQUNKO0FBRUEsaUJBQWUsYUFBYSxZQUFXO0FBQ25DLFVBQU0sY0FBYyxtQkFBVSxJQUFHO0FBQUEsRUFDckM7QUFFQSxpQkFBZSxlQUFlLFlBQVc7QUFDckMsVUFBTSxZQUFZLE9BQU8sUUFBUSxnREFBZ0Q7QUFDakYsUUFBSSxXQUFVO0FBQ1YsVUFBSTtBQUNBLGNBQU0sV0FBVyxNQUFNLE1BQU0sd0VBQXdFO0FBQUEsVUFDakcsUUFBUTtBQUFBLFVBQ1IsU0FBUztBQUFBLFlBQ0wsZ0JBQWdCO0FBQUEsVUFDcEI7QUFBQSxVQUNBLE1BQU0sS0FBSyxVQUFVLEVBQUUsV0FBdUIsQ0FBQztBQUFBLFFBQ25ELENBQUM7QUFFRCxjQUFNLFNBQVMsTUFBTSxTQUFTLEtBQUs7QUFFbkMsWUFBSSxTQUFTLFdBQVcsS0FBSztBQUN6QixnQkFBTSxPQUFPLE9BQU87QUFDcEIseUJBQWU7QUFBQSxRQUNuQixPQUNLO0FBQ0QsZ0JBQU0sVUFBVSxjQUFPLE1BQU87QUFBQSxRQUNsQztBQUFBLE1BQ0osU0FDTyxPQUFPO0FBQ1YsZ0JBQVEsSUFBSSwwQkFBMEIsS0FBSztBQUMzQyxjQUFNLDJDQUEyQztBQUFBLE1BQ3JEO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFFQSxXQUFTLHFCQUFxQjtBQUMxQixVQUFNLE9BQU8sU0FBUyxlQUFlLGNBQWM7QUFDbkQsU0FBSyxNQUFNLFVBQVUsS0FBSyxNQUFNLFlBQVksU0FBUyxVQUFVO0FBQUEsRUFDbkU7QUFHQSxpQkFBZTtBQUVmLFdBQVMsaUJBQWlCO0FBQzFCLFdBQVMsZUFBZTtBQUN4QixXQUFTLGlCQUFpQjtBQUMxQixXQUFTLHFCQUFxQjsiLAogICJuYW1lcyI6IFtdCn0K
