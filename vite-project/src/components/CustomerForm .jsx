import React, { useState, useEffect } from 'react';

const CustomerForm = ({ onSubmit, onClose, initialData }) => {
    const [customer, setCustomer] = useState({
        name: '',
        region: '',
        registrationDate: '',
    });

    useEffect(() => {
        if (initialData) {
            setCustomer({
                name: initialData.name || '',
                region: initialData.region || '',
                registrationDate: initialData.registrationDate ? initialData.registrationDate.split('T')[0] : '',
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomer(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(customer);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">İsim</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={customer.name}
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

            <div className="mb-3">
                <label htmlFor="registrationDate" className="form-label">Kayıt Tarihi</label>
                <input
                    type="date"
                    className="form-control"
                    id="registrationDate"
                    name="registrationDate"
                    value={customer.registrationDate}
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
