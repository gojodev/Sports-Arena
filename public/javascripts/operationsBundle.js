(() => {
  // public/javascripts/operations.js
  async function bookFacility() {
    try {
      const description = "Test booking for facility";
      const clubID = "club1";
      const facilityID = "facility1";
      const datetime = "2024-11-21T10:00:00Z";
      const duration = 60;
      const response = await fetch("http://127.0.0.1:5001/sports-arena-39a32/europe-west2/bookFacility", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          description,
          clubID,
          facilityID,
          datetime,
          duration
        })
      });
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error);
        throw new Error("HTTP error! Status: ".concat(response.status));
      }
      const bookingData = await response.json();
      alert("Booking successful!");
      console.log("Booking Successful:", bookingData);
      return bookingData;
    } catch (error) {
      console.error("Error booking facility:", error);
    }
  }
  bookFacility();
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsib3BlcmF0aW9ucy5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiYXN5bmMgZnVuY3Rpb24gYm9va0ZhY2lsaXR5KCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9ICdUZXN0IGJvb2tpbmcgZm9yIGZhY2lsaXR5JztcclxuICAgICAgICBjb25zdCBjbHViSUQgPSAnY2x1YjEnO1xyXG4gICAgICAgIGNvbnN0IGZhY2lsaXR5SUQgPSAnZmFjaWxpdHkxJztcclxuICAgICAgICBjb25zdCBkYXRldGltZSA9ICcyMDI0LTExLTIxVDEwOjAwOjAwWic7XHJcbiAgICAgICAgY29uc3QgZHVyYXRpb24gPSA2MDtcclxuXHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cDovLzEyNy4wLjAuMTo1MDAxL3Nwb3J0cy1hcmVuYS0zOWEzMi9ldXJvcGUtd2VzdDIvYm9va0ZhY2lsaXR5Jywge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgY2x1YklEOiBjbHViSUQsXHJcbiAgICAgICAgICAgICAgICBmYWNpbGl0eUlEOiBmYWNpbGl0eUlELFxyXG4gICAgICAgICAgICAgICAgZGF0ZXRpbWU6IGRhdGV0aW1lLFxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uLFxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xyXG4gICAgICAgICAgICBjb25zdCBlcnJvckRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICAgIGFsZXJ0KGVycm9yRGF0YS5lcnJvcik7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSFRUUCBlcnJvciEgU3RhdHVzOiAke3Jlc3BvbnNlLnN0YXR1c31gKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGJvb2tpbmdEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgIGFsZXJ0KFwiQm9va2luZyBzdWNjZXNzZnVsIVwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnQm9va2luZyBTdWNjZXNzZnVsOicsIGJvb2tpbmdEYXRhKTtcclxuICAgICAgICByZXR1cm4gYm9va2luZ0RhdGE7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGJvb2tpbmcgZmFjaWxpdHk6JywgZXJyb3IpO1xyXG4gICAgfVxyXG59XHJcblxyXG5ib29rRmFjaWxpdHkoKVxyXG4iXSwKICAibWFwcGluZ3MiOiAiOztBQUFBLGlCQUFlLGVBQWU7QUFDMUIsUUFBSTtBQUNBLFlBQU0sY0FBYztBQUNwQixZQUFNLFNBQVM7QUFDZixZQUFNLGFBQWE7QUFDbkIsWUFBTSxXQUFXO0FBQ2pCLFlBQU0sV0FBVztBQUVqQixZQUFNLFdBQVcsTUFBTSxNQUFNLHNFQUFzRTtBQUFBLFFBQy9GLFFBQVE7QUFBQSxRQUNSLFNBQVM7QUFBQSxVQUNMLGdCQUFnQjtBQUFBLFFBQ3BCO0FBQUEsUUFDQSxNQUFNLEtBQUssVUFBVTtBQUFBLFVBQ2pCO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFFBQ0osQ0FBQztBQUFBLE1BQ0wsQ0FBQztBQUVELFVBQUksQ0FBQyxTQUFTLElBQUk7QUFDZCxjQUFNLFlBQVksTUFBTSxTQUFTLEtBQUs7QUFDdEMsY0FBTSxVQUFVLEtBQUs7QUFDckIsY0FBTSxJQUFJLE1BQU0sdUJBQXVCLGdCQUFTLE9BQVE7QUFBQSxNQUM1RDtBQUVBLFlBQU0sY0FBYyxNQUFNLFNBQVMsS0FBSztBQUN4QyxZQUFNLHFCQUFxQjtBQUMzQixjQUFRLElBQUksdUJBQXVCLFdBQVc7QUFDOUMsYUFBTztBQUFBLElBQ1gsU0FBUyxPQUFPO0FBQ1osY0FBUSxNQUFNLDJCQUEyQixLQUFLO0FBQUEsSUFDbEQ7QUFBQSxFQUNKO0FBRUEsZUFBYTsiLAogICJuYW1lcyI6IFtdCn0K
