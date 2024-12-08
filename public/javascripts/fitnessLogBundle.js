(() => {
  // public/javascripts/fitnessLog.js
  function loadFitnessLogData() {
    const bmr = localStorage.getItem("bmr");
    document.getElementById("bmr").textContent = bmr || "Not available";
    resetNewDay();
    updateTotalCalories();
  }
  function dailyCalories(bmr, description) {
    const factors = {
      "sedentary": 1.2,
      "lightly active": 1.375,
      "moderately active": 1.55,
      "very active": 1.725,
      "extra active": 1.9
    };
    const result = factors[description];
    if (result != void 0) {
      bmr = Number(bmr) * result;
      return bmr;
    } else {
      return "Description not recognised";
    }
  }
  function updateTotalCalories() {
    const totalCalories = Number(localStorage.getItem("totalCalories")) || 0;
    document.getElementById("totalCalories").textContent = "Total Calories Today: ".concat(totalCalories);
    const bmr = localStorage.getItem("bmr");
    const activityRate = document.getElementById("factors").value;
    const dailyCalorieRequirement = dailyCalories(bmr, activityRate);
    const statusMessage = document.getElementById("statusMessage");
    if (dailyCalorieRequirement) {
      if (totalCalories < dailyCalorieRequirement) {
        statusMessage.textContent = "You are under your daily calories requirement";
      } else if (totalCalories > dailyCalorieRequirement) {
        statusMessage.textContent = "You are over your daily calories requirement, please burn ".concat(totalCalories - dailyCalorieRequirement, " calories");
      } else if (totalCalories === dailyCalorieRequirement) {
        statusMessage.textContent = "You are equal to your daily calories requirement";
      }
    } else {
      statusMessage.textContent = "Select an activity rare to calculate your required calorie intake";
    }
  }
  function resetNewDay() {
    const today = (/* @__PURE__ */ new Date()).toDateString();
    const lastUpdated = localStorage.getItem("lastUpdatedDate");
    if (lastUpdated !== today) {
      localStorage.setItem("totalCalories", 0);
      localStorage.setItem("lastUpdatedDate", today);
    }
  }
  document.getElementById("calories").addEventListener("change", (event) => {
    const addedCalories = Number(event.target.value);
    if (addedCalories <= 0) {
      alert("Please enter a positive calorie value");
      return;
    }
    const currentTotal = Number(localStorage.getItem("totalCalories")) || 0;
    localStorage.setItem("totalCalories", currentTotal + addedCalories);
    updateTotalCalories();
    event.target.value = "";
  });
  document.getElementById("factors").addEventListener("change", (event) => {
    const activityRate = event.target.value;
    const bmr = localStorage.getItem("bmr");
    if (bmr) {
      const requiredCalories = dailyCalories(bmr, activityRate);
      document.querySelector("p").textContent = "Required Calories: ".concat(requiredCalories);
    } else {
      alert("BMR data is not available");
    }
  });
  loadFitnessLogData();
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZml0bmVzc0xvZy5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZnVuY3Rpb24gbG9hZEZpdG5lc3NMb2dEYXRhKCkge1xyXG4gICAgY29uc3QgYm1yID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2JtcicpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JtcicpLnRleHRDb250ZW50ID0gYm1yIHx8ICdOb3QgYXZhaWxhYmxlJztcclxuICAgIHJlc2V0TmV3RGF5KCk7XHJcbiAgICB1cGRhdGVUb3RhbENhbG9yaWVzKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRhaWx5Q2Fsb3JpZXMoYm1yLCBkZXNjcmlwdGlvbikge1xyXG4gICAgY29uc3QgZmFjdG9ycyA9IHtcclxuICAgICAgICAnc2VkZW50YXJ5JzogMS4yLFxyXG4gICAgICAgICdsaWdodGx5IGFjdGl2ZSc6IDEuMzc1LFxyXG4gICAgICAgICdtb2RlcmF0ZWx5IGFjdGl2ZSc6IDEuNTUsXHJcbiAgICAgICAgJ3ZlcnkgYWN0aXZlJzogMS43MjUsXHJcbiAgICAgICAgJ2V4dHJhIGFjdGl2ZSc6IDEuOSxcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZXN1bHQgPSBmYWN0b3JzW2Rlc2NyaXB0aW9uXVxyXG4gICAgaWYgKHJlc3VsdCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICBibXIgPSBOdW1iZXIoYm1yKSAqIHJlc3VsdDtcclxuICAgICAgICByZXR1cm4gYm1yXHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICByZXR1cm4gJ0Rlc2NyaXB0aW9uIG5vdCByZWNvZ25pc2VkJztcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlVG90YWxDYWxvcmllcygpe1xyXG4gICAgY29uc3QgdG90YWxDYWxvcmllcyA9IE51bWJlcihsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG90YWxDYWxvcmllcycpKSB8fCAwO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvdGFsQ2Fsb3JpZXMnKS50ZXh0Q29udGVudCA9IGBUb3RhbCBDYWxvcmllcyBUb2RheTogJHt0b3RhbENhbG9yaWVzfWA7XHJcblxyXG4gICAgY29uc3QgYm1yID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2JtcicpO1xyXG4gICAgY29uc3QgYWN0aXZpdHlSYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZhY3RvcnMnKS52YWx1ZTtcclxuICAgIGNvbnN0IGRhaWx5Q2Fsb3JpZVJlcXVpcmVtZW50ID0gZGFpbHlDYWxvcmllcyhibXIsYWN0aXZpdHlSYXRlKTtcclxuXHJcbiAgICBjb25zdCBzdGF0dXNNZXNzYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXR1c01lc3NhZ2UnKTtcclxuICAgIGlmIChkYWlseUNhbG9yaWVSZXF1aXJlbWVudCl7XHJcbiAgICAgICAgaWYgKHRvdGFsQ2Fsb3JpZXMgPCBkYWlseUNhbG9yaWVSZXF1aXJlbWVudCl7XHJcbiAgICAgICAgICAgIHN0YXR1c01lc3NhZ2UudGV4dENvbnRlbnQgPSBcIllvdSBhcmUgdW5kZXIgeW91ciBkYWlseSBjYWxvcmllcyByZXF1aXJlbWVudFwiO1xyXG4gICAgICAgIH1lbHNlIGlmICh0b3RhbENhbG9yaWVzID4gZGFpbHlDYWxvcmllUmVxdWlyZW1lbnQpe1xyXG4gICAgICAgICAgICBzdGF0dXNNZXNzYWdlLnRleHRDb250ZW50ID0gYFlvdSBhcmUgb3ZlciB5b3VyIGRhaWx5IGNhbG9yaWVzIHJlcXVpcmVtZW50LCBwbGVhc2UgYnVybiAke3RvdGFsQ2Fsb3JpZXMgLSBkYWlseUNhbG9yaWVSZXF1aXJlbWVudH0gY2Fsb3JpZXNgO1xyXG4gICAgICAgIH1lbHNlIGlmICh0b3RhbENhbG9yaWVzID09PSBkYWlseUNhbG9yaWVSZXF1aXJlbWVudCl7XHJcbiAgICAgICAgICAgIHN0YXR1c01lc3NhZ2UudGV4dENvbnRlbnQgPSBcIllvdSBhcmUgZXF1YWwgdG8geW91ciBkYWlseSBjYWxvcmllcyByZXF1aXJlbWVudFwiO1xyXG4gICAgICAgIH1cclxuICAgIH1lbHNle1xyXG4gICAgICAgIHN0YXR1c01lc3NhZ2UudGV4dENvbnRlbnQgPSBcIlNlbGVjdCBhbiBhY3Rpdml0eSByYXJlIHRvIGNhbGN1bGF0ZSB5b3VyIHJlcXVpcmVkIGNhbG9yaWUgaW50YWtlXCI7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlc2V0TmV3RGF5KCl7XHJcbiAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCkudG9EYXRlU3RyaW5nKCk7XHJcbiAgICBjb25zdCBsYXN0VXBkYXRlZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsYXN0VXBkYXRlZERhdGUnKTtcclxuXHJcbiAgICBpZiAobGFzdFVwZGF0ZWQgIT09IHRvZGF5KSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvdGFsQ2Fsb3JpZXMnLCAwKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbGFzdFVwZGF0ZWREYXRlJywgdG9kYXkpO1xyXG4gICAgfVxyXG59XHJcblxyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2Fsb3JpZXMnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLChldmVudCkgPT57XHJcbiAgICBjb25zdCBhZGRlZENhbG9yaWVzID0gTnVtYmVyKGV2ZW50LnRhcmdldC52YWx1ZSk7XHJcbiAgICBpZiAoYWRkZWRDYWxvcmllcyA8PSAwKXtcclxuICAgICAgICBhbGVydChcIlBsZWFzZSBlbnRlciBhIHBvc2l0aXZlIGNhbG9yaWUgdmFsdWVcIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGN1cnJlbnRUb3RhbCA9IE51bWJlcihsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG90YWxDYWxvcmllcycpKSB8fCAwO1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvdGFsQ2Fsb3JpZXMnLCBjdXJyZW50VG90YWwgKyBhZGRlZENhbG9yaWVzKTtcclxuXHJcbiAgICB1cGRhdGVUb3RhbENhbG9yaWVzKCk7XHJcbiAgICBldmVudC50YXJnZXQudmFsdWUgPSAnJztcclxufSk7XHJcblxyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmFjdG9ycycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChldmVudCkgPT57XHJcbiAgICBjb25zdCBhY3Rpdml0eVJhdGUgPSBldmVudC50YXJnZXQudmFsdWU7XHJcbiAgICBjb25zdCBibXIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYm1yJyk7XHJcbiAgICBpZiAoYm1yKXtcclxuICAgICAgICBjb25zdCByZXF1aXJlZENhbG9yaWVzID0gZGFpbHlDYWxvcmllcyhibXIsYWN0aXZpdHlSYXRlKTtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdwJykudGV4dENvbnRlbnQgPSBgUmVxdWlyZWQgQ2Fsb3JpZXM6ICR7cmVxdWlyZWRDYWxvcmllc31gO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgICAgYWxlcnQoXCJCTVIgZGF0YSBpcyBub3QgYXZhaWxhYmxlXCIpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbmxvYWRGaXRuZXNzTG9nRGF0YSgpO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiOztBQUFBLFdBQVMscUJBQXFCO0FBQzFCLFVBQU0sTUFBTSxhQUFhLFFBQVEsS0FBSztBQUN0QyxhQUFTLGVBQWUsS0FBSyxFQUFFLGNBQWMsT0FBTztBQUNwRCxnQkFBWTtBQUNaLHdCQUFvQjtBQUFBLEVBQ3hCO0FBRUEsV0FBUyxjQUFjLEtBQUssYUFBYTtBQUNyQyxVQUFNLFVBQVU7QUFBQSxNQUNaLGFBQWE7QUFBQSxNQUNiLGtCQUFrQjtBQUFBLE1BQ2xCLHFCQUFxQjtBQUFBLE1BQ3JCLGVBQWU7QUFBQSxNQUNmLGdCQUFnQjtBQUFBLElBQ3BCO0FBRUEsVUFBTSxTQUFTLFFBQVEsV0FBVztBQUNsQyxRQUFJLFVBQVUsUUFBVztBQUNyQixZQUFNLE9BQU8sR0FBRyxJQUFJO0FBQ3BCLGFBQU87QUFBQSxJQUNYLE9BQ0s7QUFDRCxhQUFPO0FBQUEsSUFDWDtBQUFBLEVBQ0o7QUFFQSxXQUFTLHNCQUFxQjtBQUMxQixVQUFNLGdCQUFnQixPQUFPLGFBQWEsUUFBUSxlQUFlLENBQUMsS0FBSztBQUN2RSxhQUFTLGVBQWUsZUFBZSxFQUFFLGNBQWMseUJBQXlCO0FBRWhGLFVBQU0sTUFBTSxhQUFhLFFBQVEsS0FBSztBQUN0QyxVQUFNLGVBQWUsU0FBUyxlQUFlLFNBQVMsRUFBRTtBQUN4RCxVQUFNLDBCQUEwQixjQUFjLEtBQUksWUFBWTtBQUU5RCxVQUFNLGdCQUFnQixTQUFTLGVBQWUsZUFBZTtBQUM3RCxRQUFJLHlCQUF3QjtBQUN4QixVQUFJLGdCQUFnQix5QkFBd0I7QUFDeEMsc0JBQWMsY0FBYztBQUFBLE1BQ2hDLFdBQVUsZ0JBQWdCLHlCQUF3QjtBQUM5QyxzQkFBYyxjQUFjLDZEQUE2RCx1QkFBZ0IseUJBQXVCO0FBQUEsTUFDcEksV0FBVSxrQkFBa0IseUJBQXdCO0FBQ2hELHNCQUFjLGNBQWM7QUFBQSxNQUNoQztBQUFBLElBQ0osT0FBSztBQUNELG9CQUFjLGNBQWM7QUFBQSxJQUNoQztBQUFBLEVBQ0o7QUFFQSxXQUFTLGNBQWE7QUFDbEIsVUFBTSxTQUFRLG9CQUFJLEtBQUssR0FBRSxhQUFhO0FBQ3RDLFVBQU0sY0FBYyxhQUFhLFFBQVEsaUJBQWlCO0FBRTFELFFBQUksZ0JBQWdCLE9BQU87QUFDdkIsbUJBQWEsUUFBUSxpQkFBaUIsQ0FBQztBQUN2QyxtQkFBYSxRQUFRLG1CQUFtQixLQUFLO0FBQUEsSUFDakQ7QUFBQSxFQUNKO0FBRUEsV0FBUyxlQUFlLFVBQVUsRUFBRSxpQkFBaUIsVUFBUyxDQUFDLFVBQVM7QUFDcEUsVUFBTSxnQkFBZ0IsT0FBTyxNQUFNLE9BQU8sS0FBSztBQUMvQyxRQUFJLGlCQUFpQixHQUFFO0FBQ25CLFlBQU0sdUNBQXVDO0FBQzdDO0FBQUEsSUFDSjtBQUVBLFVBQU0sZUFBZSxPQUFPLGFBQWEsUUFBUSxlQUFlLENBQUMsS0FBSztBQUN0RSxpQkFBYSxRQUFRLGlCQUFpQixlQUFlLGFBQWE7QUFFbEUsd0JBQW9CO0FBQ3BCLFVBQU0sT0FBTyxRQUFRO0FBQUEsRUFDekIsQ0FBQztBQUVELFdBQVMsZUFBZSxTQUFTLEVBQUUsaUJBQWlCLFVBQVUsQ0FBQyxVQUFTO0FBQ3BFLFVBQU0sZUFBZSxNQUFNLE9BQU87QUFDbEMsVUFBTSxNQUFNLGFBQWEsUUFBUSxLQUFLO0FBQ3RDLFFBQUksS0FBSTtBQUNKLFlBQU0sbUJBQW1CLGNBQWMsS0FBSSxZQUFZO0FBQ3ZELGVBQVMsY0FBYyxHQUFHLEVBQUUsY0FBYyxzQkFBc0I7QUFBQSxJQUNwRSxPQUFLO0FBQ0QsWUFBTSwyQkFBMkI7QUFBQSxJQUNyQztBQUFBLEVBQ0osQ0FBQztBQUVELHFCQUFtQjsiLAogICJuYW1lcyI6IFtdCn0K
