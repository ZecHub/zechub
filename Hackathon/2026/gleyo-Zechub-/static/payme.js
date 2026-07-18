let paymentConfirmed = false;
let selectedOption = null;

function initPayDistributionUI() {
  const radios = document.querySelectorAll('input[name="distribution"]');
  const output = document.getElementById("distributionOutput");
  const saveBtn = document.querySelector('button[type="submit"]');
  const errorDiv = document.getElementById("paymentError");

  radios.forEach(radio => {
    radio.addEventListener("change", () => {
      selectedOption = radio.value;
      paymentConfirmed = false;
      output.innerHTML = '';
      errorDiv.style.display = "none"; // Hide previous error

      if (radio.value === "pay_to_creator") {
        // Show Pay Now button
        output.innerHTML = `
          <button type="button" onclick="window.open('pay', '_blank')"
            style="margin-top: 15px; background-color: #00c896; color: white; font-weight: bold; padding: 12px 20px; border-radius: 10px; border: none; cursor: pointer; font-size: 14px;">
            💸 Pay Now
          </button>
        `;
      } else if (radio.value === "self_distribute") {
        output.innerHTML = `
          <div style="margin-top: 10px; font-size: 13px; color: #aaa; line-height: 1.5;">
            ⚠️ <strong>Note:</strong> Paying the platform builds trust and attracts more participants to your sprint.<br>
            Self-distribution may reduce participation and perceived fairness.
          </div>
        `;
      }
    });
  });

  saveBtn.addEventListener("click", (e) => {
    if (selectedOption === "pay_to_creator" && !paymentConfirmed) {
      e.preventDefault();
      errorDiv.innerHTML = `<i class="fas fa-exclamation-circle" style="margin-right: 6px; color: #e74c3c;"></i> <span style="color: #e74c3c;">Please complete payment before saving.</span>`;
      errorDiv.style.display = "block";
    } else {
      errorDiv.style.display = "none"; // Hide error if condition passed
    }
  });
}



function handlePayNow() {
  fetch('/create_payment', { method: 'POST' })
    .then(res => res.json())
    .then(data => {
      const paymentId = data.payment_id;
      const communitySlug = data.community_slug;

      window.open(`/pay/${paymentId}`, '_blank');

      // Start polling for payment confirmation
      const output = document.getElementById("distributionOutput");
      const pollInterval = setInterval(() => {
        fetch(`/${communitySlug}/payment_status/${paymentId}`)
          .then(res => res.json())
          .then(status => {
            if (status.status === 'paid') {
              clearInterval(pollInterval);
              paymentConfirmed = true;
              output.innerHTML += `<div style="color: green; margin-top: 10px;">✅ Payment received.</div>`;
            } else if (status.status === 'expired') {
              clearInterval(pollInterval);
              output.innerHTML += `<div style="color: red; margin-top: 10px;">❌ Payment session expired. Refresh to try again.</div>`;
            }
          });
      }, 5000);
    });
}
