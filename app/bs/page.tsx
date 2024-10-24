"use client"
import { useState, ChangeEvent, FormEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '@/components/navbar/Navbar';
import { toast } from 'react-hot-toast'; // Import toast for notifications

interface FormData {
    name: string;
    mobile: string;
    email: string;
    address: string;
}

interface Submission extends FormData {
    id: number;
}

export default function Home() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        mobile: '',
        email: '',
        address: ''
    });

    const [submissions, setSubmissions] = useState<Submission[]>([]);
  
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
        ...prevData,
        [name]: value
        }));
    };

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validateMobile = (mobile: string) => {
        const re = /^\d{10}$/; // Assuming a 10-digit mobile number
        return re.test(mobile);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!validateEmail(formData.email)) {
            toast.error('Invalid email format'); // Ensure toast is called without return
            return; // Return after showing the toast
        }

        if (!validateMobile(formData.mobile)) {
            toast.error('Mobile number must be 10 digits'); // Ensure toast is called without return
            return; // Return after showing the toast
        }

        setSubmissions(prev => [...prev, { ...formData, id: Date.now() }]);
        setFormData({
            name: '',
            mobile: '',
            email: '',
            address: ''
        });
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h3>User Information Form</h3>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="mobile" className="form-label">Mobile</label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            id="mobile"
                                            name="mobile"
                                            value={formData.mobile}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="address" className="form-label">Home Address</label>
                                        <textarea
                                            className="form-control"
                                            id="address"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            required
                                        ></textarea>
                                    </div>

                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 mt-5 md:mt-0">
                        <div className="card">
                            <div className="card-header">
                                <h3>Submitted Data</h3>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                            <th>Name</th>
                                            <th>Mobile</th>
                                            <th>Email</th>
                                            <th>Address</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {submissions.map(submission => (
                                            <tr key={submission.id}>
                                                <td>{submission.name}</td>
                                                <td>{submission.mobile}</td>
                                                <td>{submission.email}</td>
                                                <td>{submission.address}</td>
                                            </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}