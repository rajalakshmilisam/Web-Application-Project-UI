import { Component } from "inferno";
import "./AddBank.css";

class AddBank extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bankName: "",
      bankAddress: "",
      email: "",
      contactNumber: "",
      notification: "",
      successMessage: "",
      addedBankDetails: null,
    };
  }

  handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { bankName, bankAddress, email, contactNumber } = this.state;

    if (!bankName.trim()) {
      this.setState({ notification: "Bank Name is required." });
      return;
    }

    if (!bankAddress.trim()) {
      this.setState({ notification: "Bank Address is required." });
      return;
    }

    if (!email.trim()) {
      this.setState({ notification: "Email is required." });
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      this.setState({
        notification:
          'Email format is invalid. It should contain "@" and end with ".com".',
      });
      return;
    }

    if (!contactNumber.trim()) {
      this.setState({ notification: "Contact Number is required." });
      return;
    }

    if (!/^\d{10}$/.test(contactNumber)) {
      this.setState({ notification: "Contact Number should be 10 digits." });
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/bank/addBank", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bankName,
          bankAddress,
          email,
          contactNumber,
        }),
      });

      if (response.ok) {
        const bankDetails = {
          bankName,
          bankAddress,
          email,
          contactNumber,
        };
        this.setState({
          bankName: "",
          bankAddress: "",
          email: "",
          contactNumber: "",
          notification: "",
          successMessage: "Bank successfully added!",
          addedBankDetails: bankDetails,
        });
      } else {
        const errorData = await response.json();
        this.setState({ notification: errorData.message });
      }
    } catch (error) {
      this.setState({
        notification: "An error occurred while adding the bank.",
      });
    }
  };

  handleBackToHome = () => {
    // Implement the logic to navigate back to the home page here.
  };

  render() {
    const {
      bankName,
      bankAddress,
      email,
      contactNumber,
      notification,
      successMessage,
      addedBankDetails,
    } = this.state;

    return (
      <div className="bank-form-container">
        <h2 className="form-title">Add Bank details</h2>
        {successMessage ? (
          <div className="alert alert-success">
            {successMessage}
            
          </div>
        ) : (
          <form onSubmit={this.handleSubmit}>
            {notification && (
              <div className="alert alert-danger">{notification}</div>
            )}
            <div className="form-group">
              <label htmlFor="bankName">Bank Name:</label>
              <input
                type="text"
                className="form-control"
                id="bankName"
                name="bankName"
                value={bankName}
                disabled={successMessage !== ""}
                onInput={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="bankAddress">Bank Address:</label>
              <input
                type="text"
                className="form-control"
                id="bankAddress"
                name="bankAddress"
                value={bankAddress}
                disabled={successMessage !== ""}
                onInput={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                disabled={successMessage !== ""}
                onInput={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="contactNumber">Phone Number:</label>
              <input
                type="tel"
                className="form-control"
                id="contactNumber"
                name="contactNumber"
                value={contactNumber}
                disabled={successMessage !== ""}
                onInput={this.handleInputChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-dark"
              disabled={successMessage !== ""}
            >
              Submit
            </button>
          </form>
        )}

        {addedBankDetails && (
          <div className="added-bank-details">
            <h3>Added Bank Details:</h3>
            <p>Bank Name: {addedBankDetails.bankName}</p>
            <p>Bank Address: {addedBankDetails.bankAddress}</p>
            <p>Email: {addedBankDetails.email}</p>
            <p>Phone Number: {addedBankDetails.contactNumber}</p>

            <button className="btn btn-primary" onClick={this.handleBackToHome}>
              Back to Home
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default AddBank;
