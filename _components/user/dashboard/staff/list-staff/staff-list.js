"use client";

import { useState, useEffect } from "react";
import { onSnapshot } from "firebase/firestore";
import { staffCollectionRef } from "@/_firebase/firebase";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StaffItem from "./staff-item";
import StaffEditForm from "../edit-staff/edit-staff-form";
import AddStaffForm from "../add-staff/add-staff-form";

const StaffList = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingStaffId, setEditingStaffId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(staffCollectionRef, (snapshot) => {
      const staffData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      staffData.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

      setStaff(staffData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleEdit = (staffId) => {
    setEditingStaffId(staffId);
  };

  const handleSaveComplete = () => {
    setEditingStaffId(null);
  };

  const handleCancel = () => {
    setEditingStaffId(null);
  };

  const getStaffToEdit = () => {
    return staff.find((member) => member.id === editingStaffId);
  };

  return (
    <section className="admin-staff">
      <h3>Staff</h3>
      <button
        className="admin-staff__add-staff-button"
        onClick={() => setShowAddForm(!showAddForm)}
      >
        {showAddForm ? "Hide add form" : "Add new staff member"}
      </button>

      {showAddForm && <AddStaffForm />}
      <div>
        {loading ? (
          <p>Loading staff...</p>
        ) : staff.length === 0 ? (
          <p>No staff members added yet.</p>
        ) : (
          <ul className="admin-staff__list">
            {staff.map((member, index) => (
              <li key={`${member.id}-${member.timestamp}`} className="admin-staff__list__item">
                {editingStaffId === member.id ? (
                  <StaffEditForm
                    staff={getStaffToEdit()}
                    onSave={handleSaveComplete}
                    onCancel={handleCancel}
                  />
                ) : (
                  <StaffItem
                    staff={member}
                    index={index}
                    totalStaff={staff.length}
                    onEdit={handleEdit}
                  />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <ToastContainer />
    </section>
  );
};

export default StaffList;
