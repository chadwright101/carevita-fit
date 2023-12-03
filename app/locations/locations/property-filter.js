"use client";

import { useContext } from "react";

import { LocationsContext } from "@/app/_context/locations-context";

import classNames from "classnames";

const PropertyFilter = () => {
  const {
    showJohannesburg,
    showPretoria,
    showGeorge,
    showMosselBay,
    showClearFilter,
    setShowJohannesburg,
    setShowPretoria,
    setShowGeorge,
    setShowMosselBay,
    setShowClearFilter,
  } = useContext(LocationsContext);

  return (
    <div className="property-filter">
      <ul className="property-filter__list">
        <li
          onClick={() => {
            setShowJohannesburg(true);
            setShowGeorge(false);
            setShowMosselBay(false);
            setShowPretoria(false);
            setShowClearFilter(true);
          }}
          className={classNames("property-filter__list-item", {
            underline: showJohannesburg && showClearFilter,
          })}
        >
          Johannesburg
        </li>
        <span>|</span>
        <li
          onClick={() => {
            setShowPretoria(true);
            setShowGeorge(false);
            setShowMosselBay(false);
            setShowJohannesburg(false);
            setShowClearFilter(true);
          }}
          className={classNames("property-filter__list-item", {
            underline: showPretoria && showClearFilter,
          })}
        >
          Pretoria
        </li>
        <span>|</span>
        <li
          onClick={() => {
            setShowMosselBay(true);
            setShowGeorge(false);
            setShowJohannesburg(false);
            setShowPretoria(false);
            setShowClearFilter(true);
          }}
          className={classNames("property-filter__list-item", {
            underline: showMosselBay && showClearFilter,
          })}
        >
          Mossel Bay
        </li>
        <span>|</span>
        <li
          onClick={() => {
            setShowGeorge(true);
            setShowJohannesburg(false);
            setShowMosselBay(false);
            setShowPretoria(false);
            setShowClearFilter(true);
          }}
          className={classNames("property-filter__list-item", {
            underline: showGeorge && showClearFilter,
          })}
        >
          George
        </li>
      </ul>
      {showClearFilter && (
        <button
          onClick={() => {
            setShowClearFilter(false);
            setShowGeorge(true);
            setShowJohannesburg(true);
            setShowMosselBay(true);
            setShowPretoria(true);
          }}
          className="property-filter__clear-filter"
        >
          Clear filter
        </button>
      )}
    </div>
  );
};

export default PropertyFilter;
