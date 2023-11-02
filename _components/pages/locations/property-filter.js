import { useContext } from "react";

import { LocationsContext } from "@/_context/locations-provider";

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
    <ul className="property-filter">
      <li
        onClick={() => {
          setShowJohannesburg(true);
          setShowGeorge(false);
          setShowMosselBay(false);
          setShowPretoria(false);
          setShowClearFilter(true);
        }}
        className={classNames("", {
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
        className={classNames("", {
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
        className={classNames("", {
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
        className={classNames("", {
          underline: showGeorge && showClearFilter,
        })}
      >
        George
      </li>
      {showClearFilter && (
        <>
          <span>|</span>
          <li
            onClick={() => {
              setShowClearFilter(false);
              setShowGeorge(true);
              setShowJohannesburg(true);
              setShowMosselBay(true);
              setShowPretoria(true);
            }}
            id="clear-filter"
          >
            Clear filter
          </li>
        </>
      )}
    </ul>
  );
};

export default PropertyFilter;
