"use client";

import Image from "next/image";
import { deleteStaffMember, moveStaffToTop } from "../utils/staff-service";
import { addCacheBustingTimestamp } from "@/_lib/cache-busting-url";

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
        <div className="admin-staff__list__item__image-container">
          <Image src={addCacheBustingTimestamp(staff.image, staff.timestamp || Date.now())} alt={staff.name} width={300} height={300} />
          <button
            className="admin-staff__list__item__image-container__edit"
            type="button"
            onClick={() => onEdit(staff.id)}
            aria-label="Edit staff member"
          >
            <Image
              src="/icons/edit.svg"
              alt="Edit staff member"
              width={40}
              height={40}
            />
          </button>
          <button
            className="admin-staff__list__item__image-container__delete"
            type="button"
            onClick={handleDelete}
            aria-label="Delete staff member"
          >
            <Image
              src="/icons/close-icon2.svg"
              alt="Delete staff member"
              width={40}
              height={40}
            />
          </button>
          {index !== 0 && index < totalStaff && (
            <button
              className="admin-staff__list__item__image-container__arrow"
              type="button"
              onClick={handleMoveToTop}
              aria-label="Move staff member to top"
            >
              <Image
                src="/icons/up-arrow.svg"
                alt="Move staff member to top"
                width={40}
                height={40}
              />
            </button>
          )}
        </div>
      )}

      <p>{staff.bio}</p>
    </>
  );
};

export default StaffItem;
