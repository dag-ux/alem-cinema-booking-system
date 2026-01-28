/************************************
 * 1. CUSTOMER FORM (index.html)
 ************************************/
// ================================
// CUSTOMER FORM SUBMIT (index.html)
// ================================
const customerForm = document.getElementById("customerForm");

if (customerForm) {
  customerForm.addEventListener("submit", function (e) {
    e.preventDefault(); // stop page reload

    const fullName = document.getElementById("fullName").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const tickets = document.getElementById("tickets").value;

    fetch("http://localhost:3000/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName,
        phone,
        email
      })
    })
      .then(res => res.json())
      .then(data => {
        // save customer id
        localStorage.setItem("customerId", data.customerId);

        // also save booking info for next pages
        localStorage.setItem("bookingDate", date);
        localStorage.setItem("bookingTime", time);
        localStorage.setItem("ticketCount", tickets);

        // go to movies page
        window.location.href = "movies.html";
      })
      .catch(err => {
        alert("❌ Server error. Try again.");
        console.error(err);
      });
  });
}


/************************************
 * 2. MOVIE SELECTION (movies.html)
 ************************************/
function goToSeats(movieTitle) {
  localStorage.setItem("selectedMovie", movieTitle);
  window.location.href = "seat-selection.html";
}

/************************************
 * 3. SEAT SELECTION (seat-selection.html)
 ************************************/
document.addEventListener("DOMContentLoaded", () => {
  const seatButtons = document.querySelectorAll(".seat-btn");
  const confirmBtn = document.getElementById("confirmBtn");

  if (seatButtons.length > 0) {
    let selectedSeats = [];

    seatButtons.forEach(seat => {
      seat.addEventListener("click", () => {
        if (seat.classList.contains("occupied")) return;

        seat.classList.toggle("selected");

        const seatNo = seat.innerText;

        if (selectedSeats.includes(seatNo)) {
          selectedSeats = selectedSeats.filter(s => s !== seatNo);
        } else {
          selectedSeats.push(seatNo);
        }
      });
    });

    confirmBtn.addEventListener("click", () => {
      if (selectedSeats.length === 0) {
        alert("እባክዎ መቀመጫ ይምረጡ");
        return;
      }

      localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
      window.location.href = "payment.html";
    });
  }
});

/************************************
 * 4. PAYMENT PAGE (payment.html)
 ************************************/
document.addEventListener("DOMContentLoaded", () => {
  const seatInfo = document.getElementById("seatInfo");
  const paymentForm = document.getElementById("paymentForm");

  if (seatInfo) {
    const movie = localStorage.getItem("selectedMovie");
    const seats = JSON.parse(localStorage.getItem("selectedSeats")) || [];
    const pricePerSeat = 150;
    const totalPrice = seats.length * pricePerSeat;

    seatInfo.innerHTML = `
      <strong>ፊልም:</strong> ${movie}<br>
      <strong>መቀመጫ:</strong> ${seats.join(", ")}<br>
      <strong>ዋጋ:</strong> ${totalPrice} ብር
    `;

    paymentForm.addEventListener("submit", (e) => {
      e.preventDefault();

      localStorage.setItem("totalPrice", totalPrice);
      window.location.href = "booking.html";
    });
  }
});

/************************************
 * 5. BOOKING PAGE (booking.html)
 ************************************/
document.addEventListener("DOMContentLoaded", () => {
  const bookingDetails = document.getElementById("bookingDetails");

  if (bookingDetails) {
    const customer = JSON.parse(localStorage.getItem("customer"));
    const movie = localStorage.getItem("selectedMovie");
    const seats = JSON.parse(localStorage.getItem("selectedSeats"));
    const price = localStorage.getItem("totalPrice");

    bookingDetails.innerHTML = `
      ፊልም: <strong>${movie}</strong><br>
      መቀመጫ: ${seats.join(", ")}<br>
      ቀን: ${customer.date}<br>
      ሰዓት: ${customer.time}<br>
      ክፍያ: ${price} ብር
    `;
  }
});
