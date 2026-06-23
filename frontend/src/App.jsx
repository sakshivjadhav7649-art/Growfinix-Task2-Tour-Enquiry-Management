import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    message: "",
  });

  const [enquiries, setEnquiries] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchEnquiries = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/enquiries"
      );

      setEnquiries(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(
          `http://localhost:5000/api/enquiries/${editId}`,
          formData
        );

        alert("Enquiry Updated Successfully");
      } else {
        const response = await axios.post(
          "http://localhost:5000/api/enquiries",
          formData
        );

        alert(response.data.message);
      }

      fetchEnquiries();

      setFormData({
        name: "",
        email: "",
        phone: "",
        destination: "",
        message: "",
      });

      setEditId(null);

    } catch (error) {
      console.error(error);
      alert("Operation Failed");
    }
  };

  const deleteEnquiry = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/enquiries/${id}`
      );

      alert("Enquiry Deleted Successfully");

      fetchEnquiries();

    } catch (error) {
      console.error(error);
      alert("Error deleting enquiry");
    }
  };

  const editEnquiry = (enquiry) => {
    setFormData({
      name: enquiry.name,
      email: enquiry.email,
      phone: enquiry.phone,
      destination: enquiry.destination,
      message: enquiry.message,
    });

    setEditId(enquiry.id);
  };

  const cancelEdit = () => {
    setEditId(null);

    setFormData({
      name: "",
      email: "",
      phone: "",
      destination: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">

        <h1 className="text-3xl font-bold text-center mb-6">
          Tour Enquiry Management
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Enter Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="text"
            name="destination"
            placeholder="Enter Destination"
            value={formData.destination}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <textarea
            name="message"
            placeholder="Enter Message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <div className="flex gap-3">

            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded"
            >
              {editId ? "Update Enquiry" : "Submit Enquiry"}
            </button>

            {editId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="bg-gray-500 text-white px-5 py-2 rounded"
              >
                Cancel
              </button>
            )}

          </div>

        </form>

        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-4">
            All Enquiries
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full border border-collapse">

              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">ID</th>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Phone</th>
                  <th className="border p-2">Destination</th>
                  <th className="border p-2">Message</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>

              <tbody>

                {enquiries.map((enquiry) => (
                  <tr key={enquiry.id}>

                    <td className="border p-2">{enquiry.id}</td>
                    <td className="border p-2">{enquiry.name}</td>
                    <td className="border p-2">{enquiry.email}</td>
                    <td className="border p-2">{enquiry.phone}</td>
                    <td className="border p-2">{enquiry.destination}</td>
                    <td className="border p-2">{enquiry.message}</td>

                    <td className="border p-2">

                      <button
                        onClick={() => editEnquiry(enquiry)}
                        className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteEnquiry(enquiry.id)
                        }
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </div>
  );
}

export default App;