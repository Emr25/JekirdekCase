import React, { useState, useEffect } from 'react';

const CustomerForm = ({ onSubmit, onClose, initialData }) => {
    const [customer, setCustomer] = useState({
        fullName: '',
        email: '',
        region: '',
    });

    useEffect(() => {
        if (initialData) {
            setCustomer({
                fullName: initialData.fullName || '',
                email: initialData.email || '',
                region: initialData.region || '',
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomer(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Gönderilen müşteri:', customer);
        onSubmit(customer);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="fullName" className="form-label">İsim</label>
                <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    name="fullName"
                    value={customer.fullName}
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
                    value={customer.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-3">
                <label htmlFor="region" className="form-label">Bölge</label>
                <input
                    type="text"
                    className="form-control"
                    id="region"
                    name="region"
                    value={customer.region}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-secondary me-2" onClick={onClose}>İptal</button>
                <button type="submit" className="btn btn-primary">Kaydet</button>
            </div>
        </form>
    );
};

export default CustomerForm;
