"use client";

import Image from "next/image";
import { deleteStaffMember, moveStaffToTop } from "../utils/staff-service";

const StaffItem = ({ staff, index, totalStaff, onEdit }) => {
  const handleDelete = async () => {
    await deleteStaffMember(staff.id, staff.image);
  };

  const handleMoveToTop = async () => {
    await moveStaffToTop(staff.id);
  };

  return (
    <div className="staff-item">
      <div className="staff-header">
        <h3>{staff.name}</h3>
        <div className="staff-actions">
          <button
            onClick={() => onEdit(staff.id)}
            className="edit-btn"
            aria-label="Edit staff member"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="delete-btn"
            aria-label="Delete staff member"
          >
            Delete
          </button>
          {index !== 0 && index < totalStaff && (
            <button
              onClick={handleMoveToTop}
              className="reorder-btn"
              aria-label="Move staff member to top"
            >
              Reorder
            </button>
          )}
        </div>
      </div>

      <div className="staff-content">
        {staff.image && (
          <div className="staff-image">
            <Image
              src={staff.image}
              alt={staff.name}
              width={100}
              height={100}
              style={{ objectFit: "cover", borderRadius: "50%" }}
            />
          </div>
        )}

        <div className="staff-details">
          <p className="staff-bio">{staff.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default StaffItem;
