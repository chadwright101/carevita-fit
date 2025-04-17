"use client";

import { useState, useEffect } from "react";
import { onSnapshot } from "firebase/firestore";
import { staffCollectionRef } from "@/_firebase/firebase";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StaffItem from "./staff-item";
import StaffEditForm from "../edit-staff/staff-edit-form";
import AddStaffForm from "../add-staff/add-staff-form";

const StaffList = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingStaffId, setEditingStaffId] = useState(null);

  // Set up real-time listener for staff collection
  useEffect(() => {
    const unsubscribe = onSnapshot(staffCollectionRef, (snapshot) => {
      const staffData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Sort by timestamp (newest first)
      staffData.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

      setStaff(staffData);
      setLoading(false);
    });

    // Clean up listener on unmount
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
    <section className="staff-management-section">
      <h2>Staff Management</h2>

      {/* Add new staff form */}
      <AddStaffForm onStaffAdded={() => {}} />

      {/* Staff list */}
      <div className="staff-list-container">
        <h3>Current Staff</h3>

        {loading ? (
          <p>Loading staff...</p>
        ) : staff.length === 0 ? (
          <p>No staff members added yet.</p>
        ) : (
          <ul className="staff-list">
            {staff.map((member, index) => (
              <li key={member.id} className="staff-list-item">
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
