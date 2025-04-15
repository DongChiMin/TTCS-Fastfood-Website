import React from "react";
import styles from "./Reservation.module.css";

function Reservation() {
  return (
    <form className={styles.formContainer}>
      <div className="row">
        <div className="col-lg-12 text-center">
          <h4>Table Reservation</h4>
        </div>

        <div className="col-lg-6 col-sm-12">
          <fieldset>
            <input
              name="name"
              type="text"
              id="name"
              placeholder="Your Name*"
              required
              className={styles.input}
            />
          </fieldset>
        </div>

        <div className="col-lg-6 col-sm-12">
          <fieldset>
            <input
              name="email"
              type="text"
              id="email"
              pattern="[^ @]*@[^ @]*"
              placeholder="Your Email Address"
              required
              className={styles.input}
            />
          </fieldset>
        </div>

        <div className="col-lg-6 col-sm-12">
          <fieldset>
            <input
              name="phone"
              type="text"
              id="phone"
              placeholder="Phone Number*"
              required
              className={styles.input}
            />
          </fieldset>
        </div>

        <div className="col-md-6 col-sm-12">
          <fieldset>
            <select
              name="number-guests"
              id="number-guests"
              className={styles.select}
            >
              <option value="number-guests">Number Of Guests</option>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </fieldset>
        </div>

        <div className="col-lg-6">
          <fieldset>
            <input
              name="date"
              id="date"
              type="text"
              placeholder="dd/mm/yyyy"
              className={styles.input}
            />
          </fieldset>
        </div>

        <div className="col-md-6 col-sm-12">
          <fieldset>
            <select name="time" id="time" className={styles.select}>
              <option value="time">Time</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </select>
          </fieldset>
        </div>

        <div className="col-lg-12">
          <fieldset>
            <textarea
              name="message"
              rows="6"
              id="message"
              placeholder="Message"
              required
              className={styles.textarea}
            ></textarea>
          </fieldset>
        </div>

        <div className="col-lg-12">
          <fieldset>
            <button type="submit" className={styles.button}>
              Make A Reservation
            </button>
          </fieldset>
        </div>
      </div>
    </form>
  );
}

export default Reservation;
