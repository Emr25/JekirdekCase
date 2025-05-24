import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchCustomers,
    deleteCustomer,
    addCustomer,
    updateCustomer
} from '../redux/CustomerSlice';
import CustomerForm from './CustomerForm ';

const CustomerList = () => {
    const dispatch = useDispatch();
    const { customers, loading, error } = useSelector((state) => state.customer);

    const [filters, setFilters] = useState({
        fullName: '',
        region: '',
        fromDate: '',
        toDate: '',
    });

    const [showModal, setShowModal] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);

    useEffect(() => {
        dispatch(fetchCustomers(filters));
    }, [dispatch, filters]);

    const handleDelete = (id) => {
        if (window.confirm("Müşteriyi silmek istediğinize emin misiniz?")) {
            dispatch(deleteCustomer(id));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddNew = () => {
        setEditingCustomer(null);
        setShowModal(true);
    };

    const handleEdit = (customer) => {
        setEditingCustomer(customer);
        setShowModal(true);
    };

    const handleFormSubmit = (customerData) => {
        if (editingCustomer) {
            dispatch(updateCustomer({ id: editingCustomer.id, customerData }));
        } else {
            dispatch(addCustomer(customerData));
        }
        setShowModal(false);
    };

    return (
        <div className="container my-4">
            <h2 className="mb-4">Müşteri Yönetimi</h2>

            {/* Filtreler */}
            <div className="row mb-3 g-3 align-items-center">
                <div className="col-md-3">
                    <input
                        name="fullName"
                        type="text"
                        placeholder="İsim ile ara"
                        value={filters.fullName}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <div className="col-md-3">
                    <input
                        name="region"
                        type="text"
                        placeholder="Bölge ile ara"
                        value={filters.region}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>
                <div className="col-md-2 d-grid">
                    <button className="btn btn-success" onClick={handleAddNew}>
                        Yeni Müşteri Ekle
                    </button>
                </div>
            </div>

            {/* Tablo */}
            {loading && <p>Yükleniyor...</p>}
            {error && <p className="text-danger">Hata: {error}</p>}
            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead className="table-light">
                        <tr>
                            <th>ID</th>
                            <th>İsim</th>
                            <th>Bölge</th>
                            <th>İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center p-4">
                                    Müşteri bulunamadı.
                                </td>
                            </tr>
                        ) : (
                            customers.map((customer) => (
                                <tr key={customer.id}>
                                    <td>{customer.id}</td>
                                    <td>{customer.fullName}</td>
                                    <td>{customer.region}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-primary me-2"
                                            onClick={() => handleEdit(customer)}
                                        >
                                            Düzenle
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleDelete(customer.id)}
                                        >
                                            Sil
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div
                    className="modal fade show d-block"
                    tabIndex="-1"
                    role="dialog"
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                    onClick={() => setShowModal(false)}
                >
                    <div
                        className="modal-dialog"
                        role="document"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {editingCustomer ? 'Müşteri Düzenle' : 'Yeni Müşteri Ekle'}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <CustomerForm
                                    initialData={editingCustomer}
                                    onSubmit={handleFormSubmit}
                                    onClose={() => setShowModal(false)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomerList;
