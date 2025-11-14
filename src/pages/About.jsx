import React from "react";

const About = () => {
  return (
    <div className="container py-5" style={{ maxWidth: "900px" }}>
      <div className="text-center mb-5">
        <h2 className="fw-bold mb-3 text-primary">
          <i className="bi bi-info-circle me-2"></i>
          About EventEase
        </h2>
        <p className="text-muted fs-5">
          EventEase is a platform designed to help you discover, manage, and enjoy events effortlessly. 
          From concerts to workshops, cultural events to competitions — everything becomes smoother with EventEase.
        </p>
      </div>

      <div className="card shadow-sm border-0 mb-5">
        <div className="card-body p-4">
          <h3 className="fw-semibold text-dark mb-4">
            <i className="bi bi-credit-card me-2 text-primary"></i>
            Payment & Refund Policy
          </h3>

          <div className="row g-4">
            <div className="col-md-6">
              <div className="d-flex align-items-start">
                <i className="bi bi-check-circle-fill text-success me-3 mt-1"></i>
                <div>
                  <h6 className="fw-bold">Instant Booking Confirmation</h6>
                  <p className="text-muted small mb-0">Once your ticket is booked and payment is completed, your seat will be successfully reserved.</p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="d-flex align-items-start">
                <i className="bi bi-arrow-clockwise text-primary me-3 mt-1"></i>
                <div>
                  <h6 className="fw-bold">Event Cancellation</h6>
                  <p className="text-muted small mb-0">If the organizer cancels the event, a full refund (100%) will be initiated.</p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="d-flex align-items-start">
                <i className="bi bi-clock text-warning me-3 mt-1"></i>
                <div>
                  <h6 className="fw-bold">Cancellation Timeframe</h6>
                  <p className="text-muted small mb-0">You must cancel your ticket at least 12 hours before the event start time.</p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="d-flex align-items-start">
                <i className="bi bi-percent text-info me-3 mt-1"></i>
                <div>
                  <h6 className="fw-bold">Standard Cancellation</h6>
                  <p className="text-muted small mb-0">You will receive 80% refund (20% platform & processing charge applies).</p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="d-flex align-items-start">
                <i className="bi bi-x-circle text-danger me-3 mt-1"></i>
                <div>
                  <h6 className="fw-bold">Late Cancellation</h6>
                  <p className="text-muted small mb-0">Cancellation within 12 hours of the event: No refund will be provided.</p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="d-flex align-items-start">
                <i className="bi bi-building text-secondary me-3 mt-1"></i>
                <div>
                  <h6 className="fw-bold">Platform Responsibility</h6>
                  <p className="text-muted small mb-0">EventEase is a booking platform. We do not organize events.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm border-0 bg-warning bg-opacity-10">
        <div className="card-body p-4">
          <h5 className="fw-semibold text-dark mb-3">
            <i className="bi bi-exclamation-triangle me-2"></i>
            Important Notice
          </h5>
          <p className="mb-3">
            कृपया बुकिंग करण्यापूर्वी कार्यक्रमाची माहिती, वेळ, आणि अटी नीट वाचा. 
            पेमेंट एकदा पूर्ण झाल्यावर वरील धोरणांनुसारच रिफंड प्रक्रिया होईल.
          </p>
          <p className="mb-0 fw-semibold">
            Please read the event information, time, and terms carefully before booking. 
            Refund process will be as per the above policies once payment is completed.
          </p>
        </div>
      </div>

      <div className="text-center mt-5">
        <p className="fw-semibold text-primary fs-5">
          Thank you for choosing EventEase! 
        </p>
      </div>
    </div>
  );
};

export default About;