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
    let username = localStorage.getItem("name");
    console.log(username);
    const response = await fetch("http://127.0.0.1:5001/sports-arena-39a32/europe-west2/fetchTrainerClubs?trainerUsername=${username}", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.ok) {
      const data = await response.json();
      const clubDropdown = document.querySelector("#clubDropdown");
      Object.entries(data.trainerClubs).forEach(([clubID, club]) => {
        const option = document.createElement("option");
        option.value = clubID;
        option.textContent = clubID;
        clubDropdown.appendChild(option);
      });
    }
  }
  loadFacilities();
  loadTrainerClubs();
  document.toggleTrainingSessionForm = toggleTrainingSessionForm;
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidHJhaW5lci5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZnVuY3Rpb24gdG9nZ2xlVHJhaW5pbmdTZXNzaW9uRm9ybSgpIHtcclxuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHJhaW5pbmdTZXNzaW9uRm9ybScpO1xyXG4gICAgZm9ybS5zdHlsZS5kaXNwbGF5ID0gZm9ybS5zdHlsZS5kaXNwbGF5ID09PSAnbm9uZScgPyAnYmxvY2snIDogJ25vbmUnO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rlc2NyaXB0aW9uJykudmFsdWUgPSAnJztcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkdXJhdGlvbicpLnZhbHVlID0gJyc7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2x1YkRyb3Bkb3duJykuc2VsZWN0ZWRJbmRleCA9IDA7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmFjaWxpdHlEcm9wZG93bicpLnNlbGVjdGVkSW5kZXggPSAwO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBsb2FkRmFjaWxpdGllcygpIHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vc2hvd2FsbGZhY2lsaXRpZXMtNzdoa2kzMnFuYS1udy5hLnJ1bi5hcHAnLCB7XHJcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChyZXNwb25zZS5vaykge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGZhY2lsaXR5RHJvcGRvd24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2ZhY2lsaXR5RHJvcGRvd25cIik7XHJcblxyXG4gICAgICAgIE9iamVjdC5lbnRyaWVzKGRhdGEuZmFjaWxpdGllcykuZm9yRWFjaCgoW2ZhY2lsaXR5SURdKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XHJcbiAgICAgICAgICAgIG9wdGlvbi52YWx1ZSA9IGZhY2lsaXR5SUQ7XHJcbiAgICAgICAgICAgIG9wdGlvbi50ZXh0Q29udGVudCA9IGZhY2lsaXR5SUQ7XHJcblxyXG4gICAgICAgICAgICBmYWNpbGl0eURyb3Bkb3duLmFwcGVuZENoaWxkKG9wdGlvbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGxvYWRUcmFpbmVyQ2x1YnMoKXtcclxuICAgIC8vIGNvbnN0IHRyYWluZXJVc2VybmFtZSA9IFdFIEhBVkUgVE8gR0VUIFRISVNcclxuICAgIGxldCB1c2VybmFtZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCduYW1lJyk7XHJcbiAgICBjb25zb2xlLmxvZyh1c2VybmFtZSk7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwOi8vMTI3LjAuMC4xOjUwMDEvc3BvcnRzLWFyZW5hLTM5YTMyL2V1cm9wZS13ZXN0Mi9mZXRjaFRyYWluZXJDbHVicz90cmFpbmVyVXNlcm5hbWU9JHt1c2VybmFtZX0nLCB7XHJcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChyZXNwb25zZS5vaykge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGNsdWJEcm9wZG93biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2x1YkRyb3Bkb3duXCIpO1xyXG5cclxuICAgICAgICBPYmplY3QuZW50cmllcyhkYXRhLnRyYWluZXJDbHVicykuZm9yRWFjaCgoW2NsdWJJRCwgY2x1Yl0pID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcclxuICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gY2x1YklEO1xyXG4gICAgICAgICAgICBvcHRpb24udGV4dENvbnRlbnQgPSBjbHViSUQ7XHJcblxyXG4gICAgICAgICAgICBjbHViRHJvcGRvd24uYXBwZW5kQ2hpbGQob3B0aW9uKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxubG9hZEZhY2lsaXRpZXMoKVxyXG5sb2FkVHJhaW5lckNsdWJzKClcclxuXHJcbmRvY3VtZW50LnRvZ2dsZVRyYWluaW5nU2Vzc2lvbkZvcm0gPSB0b2dnbGVUcmFpbmluZ1Nlc3Npb25Gb3JtOyJdLAogICJtYXBwaW5ncyI6ICI7O0FBQUEsV0FBUyw0QkFBNEI7QUFDakMsVUFBTSxPQUFPLFNBQVMsZUFBZSxxQkFBcUI7QUFDMUQsU0FBSyxNQUFNLFVBQVUsS0FBSyxNQUFNLFlBQVksU0FBUyxVQUFVO0FBQy9ELGFBQVMsZUFBZSxhQUFhLEVBQUUsUUFBUTtBQUMvQyxhQUFTLGVBQWUsVUFBVSxFQUFFLFFBQVE7QUFDNUMsYUFBUyxlQUFlLGNBQWMsRUFBRSxnQkFBZ0I7QUFDeEQsYUFBUyxlQUFlLGtCQUFrQixFQUFFLGdCQUFnQjtBQUFBLEVBQ2hFO0FBRUEsaUJBQWUsaUJBQWlCO0FBQzVCLFVBQU0sV0FBVyxNQUFNLE1BQU0scURBQXFEO0FBQUEsTUFDOUUsUUFBUTtBQUFBLE1BQ1IsU0FBUztBQUFBLFFBQ0wsZ0JBQWdCO0FBQUEsTUFDcEI7QUFBQSxJQUNKLENBQUM7QUFFRCxRQUFJLFNBQVMsSUFBSTtBQUNiLFlBQU0sT0FBTyxNQUFNLFNBQVMsS0FBSztBQUVqQyxZQUFNLG1CQUFtQixTQUFTLGNBQWMsbUJBQW1CO0FBRW5FLGFBQU8sUUFBUSxLQUFLLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQyxVQUFVLE1BQU07QUFDdEQsY0FBTSxTQUFTLFNBQVMsY0FBYyxRQUFRO0FBQzlDLGVBQU8sUUFBUTtBQUNmLGVBQU8sY0FBYztBQUVyQix5QkFBaUIsWUFBWSxNQUFNO0FBQUEsTUFDdkMsQ0FBQztBQUFBLElBQ0w7QUFBQSxFQUNKO0FBRUEsaUJBQWUsbUJBQWtCO0FBRTdCLFFBQUksV0FBVyxhQUFhLFFBQVEsTUFBTTtBQUMxQyxZQUFRLElBQUksUUFBUTtBQUNwQixVQUFNLFdBQVcsTUFBTSxNQUFNLHVHQUF1RztBQUFBLE1BQ2hJLFFBQVE7QUFBQSxNQUNSLFNBQVM7QUFBQSxRQUNMLGdCQUFnQjtBQUFBLE1BQ3BCO0FBQUEsSUFDSixDQUFDO0FBRUQsUUFBSSxTQUFTLElBQUk7QUFDYixZQUFNLE9BQU8sTUFBTSxTQUFTLEtBQUs7QUFFakMsWUFBTSxlQUFlLFNBQVMsY0FBYyxlQUFlO0FBRTNELGFBQU8sUUFBUSxLQUFLLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQyxRQUFRLElBQUksTUFBTTtBQUMxRCxjQUFNLFNBQVMsU0FBUyxjQUFjLFFBQVE7QUFDOUMsZUFBTyxRQUFRO0FBQ2YsZUFBTyxjQUFjO0FBRXJCLHFCQUFhLFlBQVksTUFBTTtBQUFBLE1BQ25DLENBQUM7QUFBQSxJQUNMO0FBQUEsRUFDSjtBQUVBLGlCQUFlO0FBQ2YsbUJBQWlCO0FBRWpCLFdBQVMsNEJBQTRCOyIsCiAgIm5hbWVzIjogW10KfQo=
