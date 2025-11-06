"use client";

import { useContext, useState } from "react";
import StaffItem from "./staff-item";
import StaffEditForm from "../edit-staff/edit-staff-form";
import AddStaffForm from "../add-staff/add-staff-form";
import { StaffContext } from "@/_context/staff-context";

const StaffList = () => {
  const { staff, isLoading } = useContext(StaffContext);
  const [editingStaffId, setEditingStaffId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

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
        {isLoading ? (
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
    </section>
  );
};

export default StaffList;
