const headlines = [
    "Oops! The Stream Took a Coffee Break ☕ Be Right Back Soon!",
    "Looks Like the Stream Hit Snooze 💤 Check Back Later!",
    "No Stream Here Right Now, But Our Pixels Are Recharging!",
    "The Stream is Out Grabbing Snacks 🍿 Come Back in a Bit!",
    "Our Stream is on a Coffee Run ☕ Tune In Soon!",
    "Currently Off-Air: Our Stream is Meditating 🧘‍♂️",
    "The Stream Went for a Power Nap 😴 Stay Tuned!",
    "Oops! The Stream's Busy Chasing Wi-Fi Ghosts 👻",
    "No Stream Right Now—It's in Stealth Mode 🕵️‍♂️",
    "The Stream Took a Detour—Back Soon with Better Directions!",
    "Stream's on a Break, Probably Binge-Watching Other Streams!"
  ];
  
  function setRandomHeadline() {
    const randomIndex = Math.floor(Math.random() * headlines.length);
    const headlineElement = document.getElementById("stream-off-message");
    
    headlineElement.textContent = headlines[randomIndex];
  }
  
  window.onload = setRandomHeadline;
  