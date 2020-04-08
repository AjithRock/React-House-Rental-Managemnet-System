import React from "react";
import { useParams } from "react-router-dom";

export default function Admin() {
  let { topicId } = useParams();
  return (
    <div className="header-div">
      <h1 className="header-title">Tenantdetails {topicId}</h1>
    </div>
  );
}
