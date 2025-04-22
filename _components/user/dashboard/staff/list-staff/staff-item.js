"use client";

import Image from "next/image";
import { deleteStaffMember, moveStaffToTop } from "../utils/staff-service";
import classNames from "classnames";

const StaffItem = ({ staff, index, totalStaff, onEdit }) => {
  const handleDelete = async () => {
    await deleteStaffMember(staff.id, staff.image);
  };

  const handleMoveToTop = async () => {
    await moveStaffToTop(staff.id);
  };

  return (
    <>
      <h3>{staff.name}</h3>
      {staff.image && (
        <div className="admin-staff__list__item__image">
          <Image src={staff.image} alt={staff.name} width={300} height={300} />
        </div>
      )}

      <p>{staff.bio}</p>
      <div
        className={classNames({
          "admin-staff__list__item__buttons": index !== 0,
          "admin-staff__list__item__buttons-first": index === 0,
        })}
      >
        <button onClick={() => onEdit(staff.id)} aria-label="Edit staff member">
          Edit
        </button>
        <button onClick={handleDelete} aria-label="Delete staff member">
          Delete
        </button>
        {index !== 0 && index < totalStaff && (
          <button
            onClick={handleMoveToTop}
            aria-label="Move staff member to top"
          >
            Reorder
          </button>
        )}
      </div>
    </>
  );
};

export default StaffItem;
