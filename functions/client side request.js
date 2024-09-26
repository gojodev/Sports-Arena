(async () => {
    try {
      const res = await fetch('http://127.0.0.1:5001/sports-arena-39a32/us-central1/verifyUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'user2',
        }),
      });
  
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
  
      const userData = await res.json();
      console.log(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  })();

  // working