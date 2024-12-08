(() => {
  // public/javascripts/profile.js
  async function editBMR() {
    let currentValue = localStorage.getItem("bmr");
    let newValue = prompt("Enter new BMR:", currentValue);
    if (newValue !== null && newValue !== "") {
      if (isNaN(newValue) || newValue <= 0) {
        alert("BMR must be a positive number.");
        return;
      }
      await updateUserProfile("bmr", newValue);
    }
  }
  async function editWeight() {
    let currentValue = localStorage.getItem("weight");
    let newValue = prompt("Enter new weight:", currentValue);
    if (newValue !== null && newValue !== "") {
      if (isNaN(newValue) || newValue <= 0) {
        alert("Weight must be a positive number.");
        return;
      }
      await updateUserProfile("weight", newValue);
    }
  }
  async function editAge() {
    let currentValue = localStorage.getItem("age");
    let newValue = prompt("Enter new age:", currentValue);
    if (newValue !== null && newValue !== "") {
      if (isNaN(newValue) || newValue <= 0) {
        alert("Age must be a positive number.");
        return;
      }
      await updateUserProfile("age", newValue);
    }
  }
  async function editHeight() {
    let currentValue = localStorage.getItem("height");
    let newValue = prompt("Enter new height (in cm):", currentValue);
    if (newValue !== null && newValue !== "") {
      if (isNaN(newValue) || newValue <= 0) {
        alert("Height must be a positive number.");
        return;
      }
      await updateUserProfile("height", newValue);
    }
  }
  async function editAddress() {
    let currentValue = localStorage.getItem("address");
    let newValue = prompt("Enter new address:", currentValue);
    if (newValue !== null && newValue !== "") {
      await updateUserProfile("address", newValue);
    }
  }
  async function editPhone() {
    let currentValue = localStorage.getItem("phone");
    let newValue = prompt("Enter new phone number:", currentValue);
    if (newValue !== null && newValue !== "") {
      if (newValue.length < 10) {
        alert("Phone number must be at least 10 digits long.");
        return;
      }
      await updateUserProfile("phone", newValue);
    }
  }
  async function updateUserProfile(field, newValue) {
    try {
      const bmr = localStorage.getItem("bmr");
      const age = localStorage.getItem("age");
      const weight = localStorage.getItem("weight");
      const height = localStorage.getItem("height");
      const address = localStorage.getItem("address");
      const phone = localStorage.getItem("phone");
      let updatedData = {
        username: localStorage.getItem("username"),
        bmr,
        age,
        weight,
        height,
        address,
        phone
      };
      updatedData[field] = newValue;
      const response = await fetch("http://127.0.0.1:5001/sports-arena-39a32/europe-west2/updateDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedData)
      });
      if (!response.ok) {
        throw new Error("HTTP error! Status: ".concat(response.status));
      }
      localStorage.setItem(field, newValue);
      loadProfileData();
      alert("".concat(field, " updated successfully!"));
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again later.");
    }
  }
  function loadProfileData() {
    const name = localStorage.getItem("name");
    const role = localStorage.getItem("role");
    const bmr = localStorage.getItem("bmr");
    const gender = localStorage.getItem("gender");
    const age = localStorage.getItem("age");
    const weight = localStorage.getItem("weight");
    const height = localStorage.getItem("height");
    const address = localStorage.getItem("address");
    const phone = localStorage.getItem("phone");
    document.getElementById("name").textContent = name || "Not available";
    document.getElementById("role").textContent = role || "Not available";
    document.getElementById("bmr").textContent = bmr || "Not available";
    document.getElementById("gender").textContent = gender || "Not available";
    document.getElementById("age").textContent = age || "Not available";
    document.getElementById("weight").textContent = weight || "Not available";
    document.getElementById("height").textContent = height || "Not available";
    document.getElementById("address").textContent = address || "Not available";
    document.getElementById("phone").textContent = phone || "Not available";
  }
  loadProfileData();
  document.editBMR = editBMR;
  document.editAge = editAge;
  document.editWeight = editWeight;
  document.editHeight = editHeight;
  document.editAddress = editAddress;
  document.editPhone = editPhone;
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicHJvZmlsZS5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiYXN5bmMgZnVuY3Rpb24gZWRpdEJNUigpIHtcclxuICAgIGxldCBjdXJyZW50VmFsdWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYm1yJyk7XHJcbiAgICBsZXQgbmV3VmFsdWUgPSBwcm9tcHQoYEVudGVyIG5ldyBCTVI6YCwgY3VycmVudFZhbHVlKTtcclxuXHJcbiAgICBpZiAobmV3VmFsdWUgIT09IG51bGwgJiYgbmV3VmFsdWUgIT09IFwiXCIpIHtcclxuICAgICAgICBpZiAoaXNOYU4obmV3VmFsdWUpIHx8IG5ld1ZhbHVlIDw9IDApIHtcclxuICAgICAgICAgICAgYWxlcnQoJ0JNUiBtdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyLicpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhd2FpdCB1cGRhdGVVc2VyUHJvZmlsZSgnYm1yJywgbmV3VmFsdWUpO1xyXG4gICAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBlZGl0V2VpZ2h0KCkge1xyXG4gICAgbGV0IGN1cnJlbnRWYWx1ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd3ZWlnaHQnKTtcclxuICAgIGxldCBuZXdWYWx1ZSA9IHByb21wdChgRW50ZXIgbmV3IHdlaWdodDpgLCBjdXJyZW50VmFsdWUpO1xyXG5cclxuICAgIGlmIChuZXdWYWx1ZSAhPT0gbnVsbCAmJiBuZXdWYWx1ZSAhPT0gXCJcIikge1xyXG4gICAgICAgIGlmIChpc05hTihuZXdWYWx1ZSkgfHwgbmV3VmFsdWUgPD0gMCkge1xyXG4gICAgICAgICAgICBhbGVydCgnV2VpZ2h0IG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXIuJyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGF3YWl0IHVwZGF0ZVVzZXJQcm9maWxlKCd3ZWlnaHQnLCBuZXdWYWx1ZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGVkaXRBZ2UoKSB7XHJcbiAgICBsZXQgY3VycmVudFZhbHVlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FnZScpO1xyXG4gICAgbGV0IG5ld1ZhbHVlID0gcHJvbXB0KGBFbnRlciBuZXcgYWdlOmAsIGN1cnJlbnRWYWx1ZSk7XHJcblxyXG4gICAgaWYgKG5ld1ZhbHVlICE9PSBudWxsICYmIG5ld1ZhbHVlICE9PSBcIlwiKSB7XHJcbiAgICAgICAgaWYgKGlzTmFOKG5ld1ZhbHVlKSB8fCBuZXdWYWx1ZSA8PSAwKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KCdBZ2UgbXVzdCBiZSBhIHBvc2l0aXZlIG51bWJlci4nKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYXdhaXQgdXBkYXRlVXNlclByb2ZpbGUoJ2FnZScsIG5ld1ZhbHVlKTtcclxuICAgIH1cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gZWRpdEhlaWdodCgpIHtcclxuICAgIGxldCBjdXJyZW50VmFsdWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaGVpZ2h0Jyk7XHJcbiAgICBsZXQgbmV3VmFsdWUgPSBwcm9tcHQoYEVudGVyIG5ldyBoZWlnaHQgKGluIGNtKTpgLCBjdXJyZW50VmFsdWUpO1xyXG5cclxuICAgIGlmIChuZXdWYWx1ZSAhPT0gbnVsbCAmJiBuZXdWYWx1ZSAhPT0gXCJcIikge1xyXG4gICAgICAgIGlmIChpc05hTihuZXdWYWx1ZSkgfHwgbmV3VmFsdWUgPD0gMCkge1xyXG4gICAgICAgICAgICBhbGVydCgnSGVpZ2h0IG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXIuJyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGF3YWl0IHVwZGF0ZVVzZXJQcm9maWxlKCdoZWlnaHQnLCBuZXdWYWx1ZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGVkaXRBZGRyZXNzKCkge1xyXG4gICAgbGV0IGN1cnJlbnRWYWx1ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhZGRyZXNzJyk7XHJcbiAgICBsZXQgbmV3VmFsdWUgPSBwcm9tcHQoYEVudGVyIG5ldyBhZGRyZXNzOmAsIGN1cnJlbnRWYWx1ZSk7XHJcblxyXG4gICAgaWYgKG5ld1ZhbHVlICE9PSBudWxsICYmIG5ld1ZhbHVlICE9PSBcIlwiKSB7XHJcbiAgICAgICAgYXdhaXQgdXBkYXRlVXNlclByb2ZpbGUoJ2FkZHJlc3MnLCBuZXdWYWx1ZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGVkaXRQaG9uZSgpIHtcclxuICAgIGxldCBjdXJyZW50VmFsdWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGhvbmUnKTtcclxuICAgIGxldCBuZXdWYWx1ZSA9IHByb21wdChgRW50ZXIgbmV3IHBob25lIG51bWJlcjpgLCBjdXJyZW50VmFsdWUpO1xyXG5cclxuICAgIGlmIChuZXdWYWx1ZSAhPT0gbnVsbCAmJiBuZXdWYWx1ZSAhPT0gXCJcIikge1xyXG4gICAgICAgIGlmIChuZXdWYWx1ZS5sZW5ndGggPCAxMCkge1xyXG4gICAgICAgICAgICBhbGVydCgnUGhvbmUgbnVtYmVyIG11c3QgYmUgYXQgbGVhc3QgMTAgZGlnaXRzIGxvbmcuJyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGF3YWl0IHVwZGF0ZVVzZXJQcm9maWxlKCdwaG9uZScsIG5ld1ZhbHVlKTtcclxuICAgIH1cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gdXBkYXRlVXNlclByb2ZpbGUoZmllbGQsIG5ld1ZhbHVlKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGJtciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdibXInKTtcclxuICAgICAgICBjb25zdCBhZ2UgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWdlJyk7XHJcbiAgICAgICAgY29uc3Qgd2VpZ2h0ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3dlaWdodCcpO1xyXG4gICAgICAgIGNvbnN0IGhlaWdodCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdoZWlnaHQnKTtcclxuICAgICAgICBjb25zdCBhZGRyZXNzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FkZHJlc3MnKTtcclxuICAgICAgICBjb25zdCBwaG9uZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwaG9uZScpO1xyXG5cclxuICAgICAgICBsZXQgdXBkYXRlZERhdGEgPSB7XHJcbiAgICAgICAgICAgIHVzZXJuYW1lOiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlcm5hbWUnKSxcclxuICAgICAgICAgICAgYm1yLFxyXG4gICAgICAgICAgICBhZ2UsXHJcbiAgICAgICAgICAgIHdlaWdodCxcclxuICAgICAgICAgICAgaGVpZ2h0LFxyXG4gICAgICAgICAgICBhZGRyZXNzLFxyXG4gICAgICAgICAgICBwaG9uZSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB1cGRhdGVkRGF0YVtmaWVsZF0gPSBuZXdWYWx1ZTtcclxuXHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cDovLzEyNy4wLjAuMTo1MDAxL3Nwb3J0cy1hcmVuYS0zOWEzMi9ldXJvcGUtd2VzdDIvdXBkYXRlRGV0YWlscycsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHVwZGF0ZWREYXRhKSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEhUVFAgZXJyb3IhIFN0YXR1czogJHtyZXNwb25zZS5zdGF0dXN9YCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShmaWVsZCwgbmV3VmFsdWUpO1xyXG5cclxuICAgICAgICBsb2FkUHJvZmlsZURhdGEoKTtcclxuXHJcbiAgICAgICAgYWxlcnQoYCR7ZmllbGR9IHVwZGF0ZWQgc3VjY2Vzc2Z1bGx5IWApO1xyXG5cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgdXBkYXRpbmcgcHJvZmlsZTonLCBlcnJvcik7XHJcbiAgICAgICAgYWxlcnQoJ0ZhaWxlZCB0byB1cGRhdGUgcHJvZmlsZS4gUGxlYXNlIHRyeSBhZ2FpbiBsYXRlci4nKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gbG9hZFByb2ZpbGVEYXRhKCkge1xyXG4gICAgY29uc3QgbmFtZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCduYW1lJyk7XHJcbiAgICBjb25zdCByb2xlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3JvbGUnKTtcclxuICAgIGNvbnN0IGJtciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdibXInKTtcclxuICAgIGNvbnN0IGdlbmRlciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdnZW5kZXInKTtcclxuICAgIGNvbnN0IGFnZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhZ2UnKTtcclxuICAgIGNvbnN0IHdlaWdodCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd3ZWlnaHQnKTtcclxuICAgIGNvbnN0IGhlaWdodCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdoZWlnaHQnKTtcclxuICAgIGNvbnN0IGFkZHJlc3MgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWRkcmVzcycpO1xyXG4gICAgY29uc3QgcGhvbmUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGhvbmUnKTtcclxuXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmFtZScpLnRleHRDb250ZW50ID0gbmFtZSB8fCAnTm90IGF2YWlsYWJsZSc7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9sZScpLnRleHRDb250ZW50ID0gcm9sZSB8fCAnTm90IGF2YWlsYWJsZSc7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm1yJykudGV4dENvbnRlbnQgPSBibXIgfHwgJ05vdCBhdmFpbGFibGUnO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dlbmRlcicpLnRleHRDb250ZW50ID0gZ2VuZGVyIHx8ICdOb3QgYXZhaWxhYmxlJztcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZ2UnKS50ZXh0Q29udGVudCA9IGFnZSB8fCAnTm90IGF2YWlsYWJsZSc7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2VpZ2h0JykudGV4dENvbnRlbnQgPSB3ZWlnaHQgfHwgJ05vdCBhdmFpbGFibGUnO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hlaWdodCcpLnRleHRDb250ZW50ID0gaGVpZ2h0IHx8ICdOb3QgYXZhaWxhYmxlJztcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGRyZXNzJykudGV4dENvbnRlbnQgPSBhZGRyZXNzIHx8ICdOb3QgYXZhaWxhYmxlJztcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwaG9uZScpLnRleHRDb250ZW50ID0gcGhvbmUgfHwgJ05vdCBhdmFpbGFibGUnO1xyXG59XHJcblxyXG5sb2FkUHJvZmlsZURhdGEoKTtcclxuXHJcbmRvY3VtZW50LmVkaXRCTVIgPSBlZGl0Qk1SO1xyXG5kb2N1bWVudC5lZGl0QWdlID0gZWRpdEFnZTtcclxuZG9jdW1lbnQuZWRpdFdlaWdodCA9IGVkaXRXZWlnaHQ7XHJcbmRvY3VtZW50LmVkaXRIZWlnaHQgPSBlZGl0SGVpZ2h0O1xyXG5kb2N1bWVudC5lZGl0QWRkcmVzcyA9IGVkaXRBZGRyZXNzO1xy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
